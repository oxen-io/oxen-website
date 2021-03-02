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

  const cms = new CmsApi();
  const page = await cms.fetchPageById(SideMenuItem[id]);

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
        <div className="relative flex items-center justify-center w-full h-full pt-3 bg-gradient-to-bl from-hyper to-blush">
          <img
            style={{ maxHeight: '33vh' }}
            src={page?.hero?.imageUrl}
            className="object-contain w-full"
          />
        </div>

        <Contained>
          <h1 className="mt-12 mb-4 text-4xl font-bold leading-none text-primary font-prompt">
            {page?.title}
          </h1>

          <div className="mb-10">
            <RichBody body={page?.body} />
          </div>
        </Contained>
      </div>
    </>
  );
}

export default Page;
