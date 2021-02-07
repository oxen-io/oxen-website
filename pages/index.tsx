import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { RichBody } from '../components/RichBody';
import { METADATA } from '../constants';
import { SideMenuItem } from '../state/navigation';
import { IState } from '../state/reducers';

const Index = () => {
  const { pages } = useSelector((state: IState) => state.navigation);
  const page = pages ? pages[SideMenuItem.WHO_ARE_WE] : undefined;

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

      <div>
        <RichBody body={page?.body} />
      </div>
    </div>
  );
};

export default Index;
