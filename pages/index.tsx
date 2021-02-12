import Head from 'next/head';
import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { HomeHeroBubble } from '../components/HomeHeroBubble';
import { METADATA } from '../constants';

const Index = () => {
  return (
    <div>
      <Head>
        <title>{METADATA.TITLE_SUFFIX}</title>
        <meta
          property="og:title"
          content="Oxen - Privacy should be simple."
          key="title"
        />
      </Head>

      {/* Only visible when no pages are open */}
      <HomeHero />
      <HomeHeroBubble />
    </div>
  );
};

export default Index;
