// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CmsApi, slugify, unslugify } from '../services/cms';
import { PageType, setPageType } from '../state/navigation';
import { ISplitPage } from '../types/cms';
import { generateTitle } from '../utils/metadata';

interface IPath {
  params: { page: string };
}

export async function getStaticPaths() {
  // Get paths to all pages
  const api = new CmsApi();
  const pages = await api.fetchPageEntries();

  const paths: IPath[] = Object.values(pages).map(p => ({
    params: { page: slugify(p.id) },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const id = unslugify(String(params?.page) ?? '');

  console.log('[page] ➡️ params:', params);
  console.log('[page] ➡️ id:', id);

  const api = new CmsApi();
  const page = await api.fetchPageById(id);

  console.log('[page] ➡️ page:', page);

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page: {
        title: 'tasdfa',
        label: 'sdfsdf',
      },
    },
    revalidate: 60,
  };
}

function Page({ page }: { page: ISplitPage }) {
  const dispatch = useDispatch();

  console.log('[page] ➡️   page:',   page);

  useEffect(() => {
    dispatch(setPageType(PageType.NORMAL));
  }, []);

  return (
    <>
      <Head>
        <title>{generateTitle(page.label)}</title>
      </Head>

      <div>{page.title}</div>
    </>
  );
}

export default Page;
