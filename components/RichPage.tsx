import { PageType, setPageType } from '@/state/navigation';
import { useEffect, useState } from 'react';

import { Contained } from '@/components/Contained';
import CustomHead from '@/components/CustomHead';
import { ISplitPage } from '@/types/cms';
import Image from 'next/image';
import { METADATA } from '@/constants';
import { RichBody } from '@/components/RichBody';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

interface Props {
  page: ISplitPage;
}

export default function RichPage(props: Props) {
  const { page } = props;
  const [loaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.NORMAL));
  }, []);

  return (
    <>
      <CustomHead
        title={page?.label}
        metadata={{
          DESCRIPTION: page?.label,
          OG_IMAGE: {
            URL: page?.hero?.imageUrl ?? METADATA.OG_IMAGE.URL,
            WIDTH: Number(page?.hero?.width) ?? METADATA.OG_IMAGE.WIDTH,
            HEIGHT: Number(page?.hero?.height) ?? METADATA.OG_IMAGE.HEIGHT,
            ALT: page?.hero?.title ?? METADATA.OG_IMAGE.ALT,
          },
        }}
      />
      <div className="bg-alt">
        <div className="relative flex items-center justify-center w-full h-full pt-3 bg-gradient-to-bl from-hyper to-blush">
          <div
            className={classNames(
              'relative w-full',
              loaded ? 'block' : 'hidden',
            )}
            style={{ height: '33vh' }}
          >
            <Image
              src={`${page?.hero?.imageUrl}`}
              alt={page?.hero?.description ?? page?.label}
              layout="fill"
              quality={100}
              priority={true}
              placeholder="blur"
              blurDataURL={`${page?.hero?.imageUrl}?q=5`}
              onLoadingComplete={() => setIsLoaded(true)}
              className="object-contain"
            />
          </div>
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
