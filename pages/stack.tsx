import Head from 'next/head';
import React from 'react';
import { Landing } from '../components/landing/Landing';
import { METADATA } from '../constants';

const Stack = () => {
  return (
    <div>
      <Head>
        <title>{`Stack - ${METADATA.TITLE_SUFFIX}`}</title>
        <meta property="og:title" content="Oxen - Stack" key="title" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <Landing>STACK</Landing>
    </div>
  );
};

export default Stack;
