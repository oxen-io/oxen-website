import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';

import { IPost } from '../types/cms';
import { CMS, METADATA } from '../constants';
import { CmsApi } from '../services/cms';
import generateRSSFeed from '../utils/rss';

import { HomeHero } from '../components/HomeHero';
import { HomeHeroBubble } from '../components/HomeHeroBubble';

export default function Index() {
  const imageURL = `${METADATA.OXEN_HOST_URL}/site-banner.png`;
  return (
    <>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          name="description"
          content={METADATA.SITE_META_DESCRIPTION}
        ></meta>
        <meta
          property="og:title"
          content={METADATA.TITLE_SUFFIX}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={METADATA.SITE_META_DESCRIPTION}
          key="ogdesc"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imageURL} key="ogimage" />
        <meta property="og:url" content={METADATA.OXEN_HOST_URL} />

        <link rel="canonical" href={METADATA.OXEN_HOST_URL}></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={METADATA.TITLE_SUFFIX} />
        <meta
          name="twitter:description"
          content={METADATA.SITE_META_DESCRIPTION}
        />
        <meta name="twitter:image" content={imageURL} />
      </Head>

      {/* Only visible when no pages are open */}
      <HomeHero />
      <HomeHeroBubble />
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
