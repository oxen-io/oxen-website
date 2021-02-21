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
          property="og:title"
          content="Oxen - Privacy should be simple."
          key="title"
        />
        <meta property="og:image" content={'site-banner.png'} key="ogimage" />
        <meta property="og:site_name" content="oxen.io" key="ogsitename" />
        <meta property="og:title" content={'Oxen'} key="ogtitle" />
        <meta
          property="og:description"
          content={post.description}
          key="ogdesc"
        />
      </Head>

      {/* Only visible when no pages are open */}
      <div style={{ width: '100vw' }}>
        <HomeHero />
        <HomeHeroBubble />
      </div>
    </>
  );
};

export default Index;
