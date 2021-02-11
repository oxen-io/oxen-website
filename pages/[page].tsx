// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Contained } from '../components/Contained';
import { RichBody } from '../components/RichBody';
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

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log('[page] ➡️ params:', params);

  const id = unslugify(String(params?.page) ?? '');

  console.log('[page] ➡️ id:', id);

  const api = new CmsApi();
  const page = await api.fetchPageById(SideMenuItem[id]);

  console.log('[page] ➡️ page:', page);

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

  console.log('[page] ➡️ page:', page);

  useEffect(() => {
    dispatch(setPageType(PageType.NORMAL));
  }, []);

  return (
    <>
      <Head>
        <title>{generateTitle(page?.label)}</title>
      </Head>

      <div>
        <div className="aspect-w-16 aspect-h-10">
          <div className="flex items-center justify-center bg-gradient-to-br from-blush to-hyper">
            <img
              style={{ maxHeight: '90%' }}
              src={page?.hero?.imageUrl}
              className="w-8/12 py-12"
            />
          </div>
        </div>

        <Contained>
          <h1 className="w-10/12 mt-6 mb-4 text-5xl font-bold leading-none text-primary font-prompt">
            {page?.title}
          </h1>

          <RichBody body={page?.body} />
        </Contained>
      </div>
    </>
  );
}

export default Page;
