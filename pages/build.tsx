import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { RichBody } from '../components/RichBody';
import { METADATA } from '../constants';
import { SideMenuItem } from '../state/navigation';
import { IState } from '../state/reducers';

const Build = () => {
  const page = useSelector((state: IState) => state.navigation).pages[
    SideMenuItem.BUILD
  ];

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

      <RichBody body={page?.body} />
    </div>
  );
};

export default Build;
