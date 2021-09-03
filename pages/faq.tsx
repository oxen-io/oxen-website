import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';
import { NAVIGATION, METADATA } from '../constants';
import { SideMenuItem } from '../state/navigation';
import { generateTitle, generateURL } from '../utils/metadata';
import { CmsApi } from '../services/cms';
import { IFAQItem } from '../types/cms';
import { Accordion } from '../components/Accordion';
import { Contained } from '../components/Contained';

export const getServerSideProps: GetServerSideProps = async () => {
  const cms = new CmsApi();

  const { entries: faqItems, total } = await cms.fetchFAQItems();

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
  const { faqItems } = props;

  const pageTitle = generateTitle(
    NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.FAQ].label,
  );
  const pageURL = generateURL(
    NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.FAQ].href,
  );
  const imagePathLocal = 'img/faq.png';
  const imageURL = `${METADATA.OXEN_HOST_URL}/${imagePathLocal}`;

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
        <meta property="og:image" content={imageURL} key="ogimage" />
        <meta property="og:url" content={pageURL} />

        <link rel="canonical" href={pageURL}></link>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={METADATA.FAQ.DESCRIPTION} />
        <meta name="twitter:image" content={imageURL} />
      </Head>

      <div className="bg-alt">
        <div className="relative flex items-center justify-center w-full h-full pt-3 bg-gradient-to-bl from-hyper to-blush">
          <img
            style={{ maxHeight: '33vh' }}
            src={imagePathLocal}
            className="object-contain w-full"
          />
        </div>

        <Contained>
          <div className="flex flex-col pb-6 mx-4">
            <div>
              <h1 className="mt-6 mb-3 text-3xl font-medium text-left tablet:text-4xl font-prompt text-primary">
                FAQ
              </h1>
            </div>

            {faqItems.map(faqItem => (
              <div key={faqItem.id}>
                <Accordion
                  question={faqItem.question}
                  answer={faqItem.answer}
                />
              </div>
            ))}
          </div>
        </Contained>
      </div>
    </>
  );
}

export default FAQ;
