// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NAVIGATION } from '../constants';
import { CmsApi, unslugify } from '../services/cms';
import { PageType, setPageType, SideMenuItem } from '../state/navigation';
import { ISplitPage } from '../types/cms';
import { generateTitle } from '../utils/metadata';

interface IPath {
  params: { page: string };
}

export async function getStaticPaths() {
  // Get paths to all pages
  // Hardcoded in navigation constants.
  // Contentful can edit entries but cannot add/remove
  // without touching code.

  const paths: IPath[] = Object.values(NAVIGATION.SIDE_MENU_ITEMS).map(
    item => ({
      params: { page: item.href },
    }),
  );

  console.log('[page] ➡️   paths:', paths);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log('[page] ➡️ params:', params);

  const id = unslugify(String(params?.page) ?? '');

  const api = new CmsApi();
  const page = await api.fetchPageById(SideMenuItem[id]);

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
}

function Page({ page }: { page: ISplitPage }) {
  const dispatch = useDispatch();

  console.log('[page] ➡️   page:', page);

  useEffect(() => {
    dispatch(setPageType(PageType.NORMAL));
  }, []);

  return (
    <>
      <Head>
        <title>{generateTitle(page?.label)}</title>
      </Head>

      <div>
        {/* <div className="w-full aspect-w-16 aspect-h-16">
          <img src={page?.hero?.imageUrl} className="object-cover" />
        </div>
        {page?.title} {page} */}
        sddsf
      </div>
    </>
  );
}

export default Page;
