import { CMS, NAVIGATION } from '@/constants';
import { CmsApi, generateLinkMeta, unslugify } from '@/services/cms';
import { IPost, ISplitPage, isPost } from '@/types/cms';

import BlogPost from '@/components/BlogPost';
import { GetStaticPaths } from 'next';
import { IPath } from '@/types';
import RichPage from '@/components/RichPage';
import { SideMenuItem } from '@/state/navigation';
import { isLocal } from '@/utils/links';

export const getStaticPaths: GetStaticPaths = async () => {
  // Get paths to all pages stored in navigation constants.
  // Contentful can edit entries but cannot add/remove without touching code.
  const navigationPaths: IPath[] = Object.values(NAVIGATION.SIDE_MENU_ITEMS)
    .filter(item => {
      return item.hasOwnRoute === undefined && isLocal(item.href);
    })
    .map(item => ({
      params: { page: item.href.slice(1) },
    }));

  const cms = new CmsApi();
  const posts: IPost[] = [];
  let currentPage = 1;
  let foundAllPosts = false;

  // Contentful only allows 100 at a time
  while (!foundAllPosts) {
    const { entries: _posts } = await cms.fetchBlogEntries(100, currentPage);

    if (_posts.length === 0) {
      foundAllPosts = true;
      continue;
    }

    posts.push(..._posts);
    currentPage++;
  }

  const postPaths: IPath[] = posts.map(post => ({
    params: { page: post.slug },
  }));

  return { paths: [...navigationPaths, ...postPaths], fallback: 'blocking' };
};

export async function getStaticProps({ params }) {
  console.log(`Building  Page %c${params.page}`, 'color: purple;');
  const url = params?.page ?? '';
  const id = unslugify(String(url));

  try {
    const cms = new CmsApi();
    let page: ISplitPage | IPost;

    if (SideMenuItem[id]) {
      page = await cms.fetchPageById(SideMenuItem[id]);
    } else {
      page = await cms.fetchEntryBySlug(url, 'post');
    }

    // embedded links in post body need metadata for preview
    page.body = await generateLinkMeta(page.body);

    return {
      props: {
        page,
      },
      revalidate: CMS.CONTENT_REVALIDATE_RATE,
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
      revalidate: CMS.CONTENT_REVALIDATE_RATE,
    };
  }
}

export default function Page({ page }: { page: ISplitPage | IPost }) {
  if (isPost(page)) {
    return <BlogPost post={page} />;
  } else {
    return <RichPage page={page} />;
  }
}
