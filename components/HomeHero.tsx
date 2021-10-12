import Image from 'next/image';
import classNames from 'classnames';

import { UI } from '../constants';

export function HomeHero() {
  return (
    <div
      className={classNames(
        'relative w-full flex justify-center items-center overflow-x-hidden',
        'before:bg-hero before:bg-right before:bg-no-repeat before:bg-cover before:absolute before:inset-0 before:opacity-10',
        'tablet:before:opacity-100',
        'xl:before:bg-center',
      )}
      style={{ height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px` }}
    >
      <div
        className={classNames(
          'font-prompt relative flex flex-col justify-center items-center text-center',
          'tablet:text-left tablet:items-start tablet:-mt-8 tablet:mx-7 tablet:py-2 tablet:px-20 tablet:bg-alt tablet:bg-opacity-95 tablet:border-2 tablet:border-secondary tablet:rounded-2xl',
          'desktop:mt-0 desktop:mx-8',
        )}
      >
        <h1
          className={classNames(
            'text-4xl font-bold leading-snug mt-8 mb-4',
            'tablet:text-5xl tablet:mt-8',
          )}
        >
          Privacy is possible
        </h1>
        <h2
          className={classNames(
            'text-xl leading-snug mb-4 mx-4',
            'tablet:text-2xl tablet:mx-0 tablet:mb-12 tablet:max-w-xl',
            'desktop:mb-8',
          )}
        >
          Oxen is a cryptocurrency powering a new class of interconnected
          privacy apps.
        </h2>
        <h3
          className={classNames(
            'text-3xl font-semibold leading-tight mb-4',
            'tablet:text-4xl tablet:mb-2',
            'desktop:mb-4',
          )}
        >
          Available on
        </h3>
        <div
          className={classNames(
            'flex flex-col justify-center items-center w-full',
            'tablet:flex-row tablet:justify-between',
          )}
        >
          <a
            href="https://trade.kucoin.com/LOKI-USDT"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Kucoin website"
            className={classNames(
              'block py-6 px-8 mt-4 mb-8 cursor-pointer border-2 border-secondary rounded-2xl w-60',
              'xl:w-68',
              'duration-300',
              'hover:bg-secondary hover:bg-opacity-30',
            )}
          >
            <Image
              src={'/svgs/kucoin-logo-full.svg'}
              alt="Bittrex Logo"
              width={700}
              height={161.7}
              quality={100}
              priority={true}
            />
          </a>
          <a
            href="https://global.bittrex.com/Market/Index?MarketName=USDT-OXEN"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Bittrex website"
            className={classNames(
              'block py-6 px-8 mt-4 mb-8 cursor-pointer border-2 w- border-secondary rounded-2xl w-60',
              'xl:w-68',
              'duration-300',
              'hover:bg-secondary hover:bg-opacity-30',
            )}
          >
            <Image
              src={'/svgs/bittrex-logo-full.svg'}
              alt="Bittrex Logo"
              width={600.1}
              height={143.8}
              quality={100}
              priority={true}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
