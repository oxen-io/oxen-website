import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { METADATA } from '../constants';
import { CmsApi } from '../services/cms';
import { SideMenuItem } from '../state/navigation';
import { ISplitPage } from '../types/cms';

const Tools = () => {
  const [page, setPage] = useState<ISplitPage>();

  useEffect(() => {
    const getContent = async () => {
      const api = new CmsApi();
      setPage(await api.fetchPageById(SideMenuItem.WHO_ARE_WE));
    };

    getContent();
  }, []);

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

      <div>TOOLS</div>
    </div>
  );
};

export default Tools;
