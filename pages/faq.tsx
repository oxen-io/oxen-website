import { GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';

import { NAVIGATION, METADATA, CMS } from '../constants';
import { SideMenuItem } from '../state/navigation';
import { CmsApi } from '../services/cms';
import { IFAQItem } from '../types/cms';

import { Accordion } from '../components/Accordion';
import { Contained } from '../components/Contained';
import CustomHead from '../components/CustomHead';

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const cms = new CmsApi();

  const { entries: faqItems, total } = await cms.fetchFAQItems();

  return {
    props: {
      faqItems,
      total,
    },
    revalidate: CMS.CONTENT_REVALIDATE_RATE,
  };
};

interface Props {
  faqItems: IFAQItem[];
  total: number;
}
function FAQ(props: Props) {
  const { faqItems } = props;

  return (
    <>
      <CustomHead
        title={NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem.FAQ].label}
        metadata={METADATA.FAQ_PAGE}
      />
      <div className="bg-alt">
        <div className="relative flex items-center justify-center w-full h-full pt-3 bg-gradient-to-bl from-hyper to-blush">
          <div className="relative w-full" style={{ height: '33vh' }}>
            <Image
              src={METADATA.FAQ_PAGE.OG_IMAGE.URL}
              alt={METADATA.FAQ_PAGE.OG_IMAGE.ALT}
              layout="fill"
              className="object-contain"
            />
          </div>
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
