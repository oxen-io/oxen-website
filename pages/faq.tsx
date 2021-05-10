import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';
import { NAVIGATION, METADATA, CMS } from '../constants';
import { SideMenuItem } from '../state/navigation';
import { generateTitle, generateURL } from '../utils/metadata';
import { CmsApi } from '../services/cms';
import { IFAQItem } from '../types/cms';
import { RichBody } from '../components/RichBody';
import { Contained } from '../components/Contained';
import { Accordion } from '../components/Accordion';
import classNames from 'classnames';

export const getServerSideProps: GetServerSideProps = async context => {
  const cms = new CmsApi();

  // Fetch posts even when tag, for related etc
  // Pagination only occurs when tag isnt defined.
  // If tag is defined, pagination is for tag results
  const { faqItems, total } = await cms.fetchFAQItems();

  console.log(await cms.fetchFAQItems());
  return {
    props: {
      faqItems,
      total,
    },
  };
};

interface Props {
  faqItems: IFAQItem[];
  total: number;
}
function FAQ(props: Props) {
  const { faqItems, total } = props;

  const pageTitle = generateTitle(
    NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.FAQ].label,
  );
  const pageURL = generateURL(
    NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.FAQ].href,
  );
  const imageURL = `${METADATA.OXEN_HOST_URL}/hero.svg`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={METADATA.FAQ.DESCRIPTION}></meta>
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={METADATA.FAQ.DESCRIPTION}
          key="ogdesc"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageURL} />

        <link rel="canonical" href={pageURL}></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={METADATA.FAQ.DESCRIPTION} />
        <meta name="twitter:image" content={imageURL} />
      </Head>

      <div>
        <div className="flex items-center justify-center">
          <img src={`hero.svg`} className="w-full" />
        </div>
      </div>

      <div className="w-full h-full">
        <div className="flex flex-col pb-6 mx-4">
          <div>
            <h1 className="mt-6 mb-3 text-3xl font-medium text-left tablet:text-4xl font-prompt text-primary">
              FAQ
            </h1>
          </div>

          {faqItems.map(faqItem => (
            <div key={faqItem.id}>
              <Accordion question={faqItem.question} answer={faqItem.answer} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FAQ;
