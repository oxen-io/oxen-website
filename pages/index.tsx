import { GetStaticProps, GetStaticPropsContext } from 'next';

import { CMS } from '@/constants';
import { CmsApi } from '@/services/cms';
import { HomeHero } from '@/components/HomeHero';
import { IPost } from '@/types/cms';
import generateRSSFeed from '@/utils/rss';

export default function Index() {
  return (
    <>
      <HomeHero />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  if (process.env.NEXT_PUBLIC_SITE_ENV !== 'development') {
    const cms = new CmsApi();
    const posts: IPost[] = [];
    let page = 1;
    let foundAllPosts = false;

    // Contentful only allows 100 at a time
    while (!foundAllPosts) {
      const { entries: _posts } = await cms.fetchBlogEntries(100, page);

      if (_posts.length === 0) {
        foundAllPosts = true;
        continue;
      }

      posts.push(..._posts);
      page++;
    }

    generateRSSFeed(posts);
  }

  return {
    props: {},
    revalidate: CMS.CONTENT_REVALIDATE_RATE,
  };
};
