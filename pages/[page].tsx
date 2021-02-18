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
  params: { page: string; isRoadmap?: boolean };
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
  const id = unslugify(String(params?.page) ?? '');

  // Roadmap page is special 👁️👄👁️
  if (SideMenuItem[id] == [SideMenuItem.ROADMAP]) {
    return {
      props: {
        page: null,
        isRoadmap: true,
      },
      revalidate: 60,
    };
  }

  const api = new CmsApi();
  const page = await api.fetchPageById(SideMenuItem[id]);

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
      isRoadmap: false,
    },
    revalidate: 60,
  };
}

function Page({
  page,
  isRoadmap,
}: {
  page: ISplitPage | null;
  isRoadmap?: boolean;
}) {
  console.log('[page] ➡️ isRoadmap:', isRoadmap);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageType(PageType.NORMAL));
  }, []);

  return (
    <>
      <Head>
        <title>
          {generateTitle(
            isRoadmap
              ? NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.ROADMAP].label
              : page?.label,
          )}
        </title>
      </Head>

      <div className="bg-alt">
        {isRoadmap ? (
          <Roadmap />
        ) : (
          <>
            <div className="aspect-w-16 aspect-h-10">
              <img
                style={{ maxHeight: '90%' }}
                src={page?.hero?.imageUrl}
                className="object-cover w-full"
              />
            </div>

            <Contained>
              <h1 className="w-10/12 mt-6 mb-4 text-4xl font-bold leading-none text-primary font-prompt">
                {page?.title}
              </h1>

              <div className="mb-10">
                <RichBody body={page?.body} />
              </div>
            </Contained>
          </>
        )}
      </div>
    </>
  );
}

function Roadmap() {
  return (
    <>
      <div className="aspect-w-16 aspect-h-10">
        <div className="flex items-center justify-center">
          <img
            style={{ maxHeight: '90%' }}
            src={'img/roadmap.png'}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col px-6 space-y-10">
        <img
          style={{ maxHeight: '90%' }}
          src={'img/session-roadmap.png'}
          className="w-full rounded-md"
        />

        <img
          style={{ maxHeight: '90%' }}
          src={'img/lokinet-roadmap.png'}
          className="w-full rounded-md"
        />
      </div>
    </>
  );
}

export default Page;
