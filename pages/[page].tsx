// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Contained } from '../components/Contained';
import { RichBody } from '../components/RichBody';
import { CMS, NAVIGATION } from '../constants';
import { CmsApi, unslugify } from '../services/cms';
import { PageType, setPageType, SideMenuItem } from '../state/navigation';
import { ISplitPage } from '../types/cms';
import { generateTitle, generateURL } from '../utils/metadata';

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
  const href = params?.page ?? '';
  const id = unslugify(String(href));

  const cms = new CmsApi();
  const page = await cms.fetchPageById(SideMenuItem[id] ?? '');

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
      href: `/${href}`,
    },
    revalidate: CMS.CONTENT_REVALIDATE_RATE,
  };
}

function Page({ page, href }: { page: ISplitPage | null; href: string }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageType(PageType.NORMAL));
  }, []);

  const pageTitle = generateTitle(page?.label);
  const pageDescription = page?.title;
  const pageURL = generateURL(href);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription}></meta>
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={pageDescription}
          key="ogdesc"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={page?.hero?.imageUrl}
          key="ogimage"
        />
        <meta property="og:url" content={pageURL} />

        <link rel="canonical" href={pageURL}></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={page?.hero?.imageUrl} />
      </Head>

      <div className="bg-alt">
        <div className="relative flex items-center justify-center w-full h-full pt-3 bg-gradient-to-bl from-hyper to-blush">
          <img
            style={{ maxHeight: '33vh' }}
            src={page?.hero?.imageUrl}
            className="object-contain w-full"
            alt={page?.hero?.description ?? pageTitle}
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
