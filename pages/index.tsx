import Head from 'next/head';
import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { HomeHeroBubble } from '../components/HomeHeroBubble';
import { METADATA, NAVIGATION } from '../constants';

const Index = () => {
  return (
    <>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Oxen - Privacy should be simple."
          key="title"
        />
        <meta property="og:image" content={'site-banner.png'} key="ogimage" />
        <meta property="og:site_name" content="oxen.io" key="ogsitename" />
        <meta property="og:title" content={'Oxen'} key="ogtitle" />
        <meta
          property="og:description"
          content={NAVIGATION.SITE_META_DESCRIPTION}
          key="ogdesc"
        />
      </Head>

      {/* Only visible when no pages are open */}
      <div className="relative w-full h-full">
        <HomeHero />
        <HomeHeroBubble />
      </div>
    </>
  );
};

export default Index;
