import Head from 'next/head';
import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { HomeHeroBubble } from '../components/HomeHeroBubble';
import { METADATA } from '../constants';

const Index = () => {
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
        <meta property="og:image" content={'site-banner.png'} key="ogimage" />
        <meta property="og:url" content={METADATA.OXEN_HOST_URL} />

        <link rel="canonical" href={METADATA.OXEN_HOST_URL}></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={METADATA.TITLE_SUFFIX} />
        <meta
          name="twitter:description"
          content={METADATA.SITE_META_DESCRIPTION}
        />
        <meta name="twitter:image" content={'site-banner.png'} />
      </Head>

      {/* Only visible when no pages are open */}
      <HomeHero />
      <HomeHeroBubble />
    </>
  );
};

export default Index;
