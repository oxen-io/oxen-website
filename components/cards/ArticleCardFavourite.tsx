import classNames from 'classnames';
import router from 'next/dist/client/router';
import Link from 'next/link';
import React, { SyntheticEvent, useContext } from 'react';
import { useMeasure } from 'react-use';
// import ShareSVG from '../../assets/svgs/share.svg';
import { ScreenContext } from '../../contexts/screen';
import { ISanityArticle } from '../../types/article';
import { generateURL } from '../../utils/routing';

interface Props extends Partial<ISanityArticle> {
  isFavourite: boolean;
}

export function ArticleCardFavourite(props: Props): JSX.Element {
  const { id, featureImage, title, city, slug, category, isFavourite } = props;
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);

  const [ref, { width }] = useMeasure();
  const isSmall = width < 130;

  const { href, as } = generateURL(slug);
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(href, as);
  };

  return (
    <div
      ref={ref}
      className={classNames(
        'overflow-hidden w-full bg-opacity-75',
        isSmall ? 'pb-3' : 'pb-1',
      )}
    >
      <div
        onClick={e => handleClick(e)}
        style={{ paddingBottom: '80%' }}
        className={classNames(
          'relative w-full h-0 overflow-hidden bg-primary bg-opacity-10',
          isSmall ? 'rounded-lg' : 'rounded-xl',
        )}
      >
        {featureImage.source && (
          <div className="absolute inset-0 ">
            <img
              className="object-cover w-full h-full"
              src={featureImage?.source}
              alt={featureImage?.altText}
            />
          </div>
        )}
      </div>

      <div className={isSmall ? 'py-1' : 'py-3'}>
        <div
          style={{
            lineHeight: '1em',
            height: '2em',
            paddingBottom: '2.1em',
          }}
          className={classNames(
            isMobile ? 'text-base' : isSmall ? 'text-lg' : 'text-twoxl',
            'font-roboto text-primary overflow-hidden cursor-pointer',
          )}
        >
          <Link href={href} as={as}>
            <a>{title}</a>
          </Link>
        </div>

        <div className="flex justify-between text-primary mt-2 pr-2">
          <div className="flex items-center cursor-pointer">
            {/* <ShareSVG className={isMobile ? 'h-8' : 'h-8'} /> */}
            {!isMobile && 'Share'}
          </div>
        </div>
      </div>
    </div>
  );
}
