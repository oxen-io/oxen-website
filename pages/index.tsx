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
          name="description"
          content={NAVIGATION.SITE_META_DESCRIPTION}
        ></meta>
        <meta
          property="og:description"
          content={NAVIGATION.SITE_META_DESCRIPTION}
          key="ogdesc"
        />
        <meta name="apple-itunes-app" content="app-id=1547745078" />
      </Head>

      {/* Only visible when no pages are open */}
      <HomeHero />
      <HomeHeroBubble />
    </>
  );
};

export default Index;
