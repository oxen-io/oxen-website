import Head from 'next/head';
import React from 'react';
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

      <div className="absolute inset-0">
        <img className="object-cover w-full h-full" src="/hero.jpg" />
      </div>
    </div>
  );
};

export default Index;
