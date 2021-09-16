import { GetStaticPaths } from 'next';

import { CMS, NAVIGATION } from '../constants';
import { CmsApi, generateLinkMeta, unslugify } from '../services/cms';
import { SideMenuItem } from '../state/navigation';
import { IPost, ISplitPage, isPost } from '../types/cms';
import { isLocal } from '../utils/links';

import BlogPost from '../components/BlogPost';
import RichPage from '../components/RichPage';

interface IPath {
  params: { page: string };
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get paths to all pages
  // Hardcoded in navigation constants.
  // Contentful can edit entries but cannot add/remove
  // without touching code.
  const navigationPaths: IPath[] = Object.values(NAVIGATION.SIDE_MENU_ITEMS)
    .filter(item => {
      return item.hasOwnRoute === undefined && isLocal(item.href);
    })
    .map(item => ({
      params: { page: item.href.slice(1) },
    }));

  const cms = new CmsApi();
  let posts: IPost[] = [];
  let currentPage = 1;
  let foundAllPosts = false;

  // Contentful only allows 100 at a time
  while (!foundAllPosts) {
    const { entries: _posts } = await cms.fetchBlogEntries(100, currentPage);

    if (_posts.length === 0) {
      foundAllPosts = true;
      continue;
    }

    posts = [...posts, ..._posts];
    currentPage++;
  }

  const postPaths: IPath[] = posts.map(post => ({
    params: { page: post.slug },
  }));

  return { paths: [...navigationPaths, ...postPaths], fallback: 'blocking' };
};

export async function getStaticProps({ params }) {
  console.log(`Building %c${params.page} page`, 'color: purple;');
  const href = params?.page ?? '';
  const id = unslugify(String(href));

  try {
    const cms = new CmsApi();
    let page: ISplitPage | IPost;
    if (SideMenuItem[id]) {
      page = await cms.fetchPageById(SideMenuItem[id]);
    } else {
      page = await cms.fetchEntryBySlug(href, 'post');
      // embedded links in post body need metadata for preview
      page.body = await generateLinkMeta(page.body);
      // TODO might be URL issues
    }

    return {
      props: {
        page,
        href: `/${href}`,
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

function Page({ page, href }: { page: ISplitPage | IPost; href: string }) {
  if (isPost(page)) {
    return <BlogPost post={page} url={href} />;
  } else {
    return <RichPage page={page} href={href} />;
  }
}

export default Page;
