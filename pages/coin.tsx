import Head from 'next/head';
import React from 'react';
import { Landing } from '../components/landing/Landing';
import { LandingSplit } from '../components/landing/LandingSplit';
import { METADATA } from '../constants';

const Coin = () => {
  return (
    <div>
      <Head>
        <title>{`Oxen Coin - ${METADATA.TITLE_SUFFIX}`}</title>
        <meta property="og:title" content="Oxen - Coin" key="title" />
      </Head>

      <Landing
        split
        background="linear-gradient(0deg, rgba(219,247,245,1) 0%, rgba(255,255,255,0) 100%)"
      >
        <LandingSplit
          title="$OXEN coin"
          subtitle="Transact, privately."
        ></LandingSplit>

        <LandingSplit>
          <div
            style={{ width: '100%', paddingBottom: '100%' }}
            className="flex-grow h-0 bg-secondary rounded-full"
          ></div>
        </LandingSplit>
      </Landing>
    </div>
  );
};

export default Coin;
