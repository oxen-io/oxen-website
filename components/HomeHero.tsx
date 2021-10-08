import Image from 'next/image';
import classNames from 'classnames';

import { UI } from '../constants';

export function HomeHero() {
  return (
    <div
      className={classNames(
        'relative w-full flex justify-center items-center overflow-hidden',
        'before:bg-hero before:bg-right before:bg-no-repeat before:bg-cover before:absolute before:inset-0 before:opacity-10',
        'tablet:before:opacity-100',
        'xl:before:bg-center',
      )}
      style={{ height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px` }}
    >
      <div
        className={classNames(
          'relative flex flex-col justify-center items-center text-center',
          'tablet:-mt-8 tablet:mx-7 tablet:py-4 tablet:px-8 tablet:bg-alt tablet:bg-opacity-95 tablet:border tablet:border-primary',
          'desktop:mt-0 desktop:mx-8 desktop:px-16',
        )}
      >
        <h1
          className={classNames(
            'text-4xl font-bold leading-snug mt-8 mb-4',
            'tablet:text-5xl tablet:-mx-3',
          )}
        >
          Fast, powerful, and private.
        </h1>
        <h2
          className={classNames(
            'text-xl leading-snug mb-8',
            'tablet:text-2xl tablet:mb-12 tablet:max-w-lg',
          )}
        >
          The only crypto in the world with instant confidential transactions.
        </h2>
        <h3
          className={classNames(
            'font-prompt text-5xl font-semibold leading-tight mb-4',
            'tablet:mb-2',
            'desktop:mb-4',
          )}
        >
          Buy Oxen
        </h3>
        <div
          className={classNames(
            'flex flex-col justify-center items-center w-full',
            'tablet:flex-row',
          )}
        >
          <a
            href="https://global.bittrex.com/Market/Index?MarketName=USDT-OXEN"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Bittrex website"
            className={classNames(
              'block p-4 cursor-pointer border border-transparent',
              'duration-300',
              'tablet:p-6',
              'hover:bg-secondary hover:bg-opacity-30 hover:border-primary',
            )}
          >
            <Image
              src={'/svgs/bittrex-logo.svg'}
              alt="Bittrex Logo"
              width={96}
              height={96}
              quality={100}
              priority={true}
            />
            <span
              className={classNames(
                'font-prompt text-5xl ml-4 font-medium align-top',
              )}
            >
              Bittrex
            </span>
          </a>
          <a
            href="https://trade.kucoin.com/LOKI-USDT"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Kucoin website"
            className={classNames(
              'block p-4 cursor-pointer border border-transparent',
              'tablet:p-6',
              'duration-300',
              'hover:bg-secondary hover:bg-opacity-30 hover:border-primary',
            )}
          >
            <Image
              src={'/svgs/kucoin-logo.svg'}
              alt="Bittrex Logo"
              width={96}
              height={96}
              quality={100}
              priority={true}
            />
            <span
              className={classNames(
                'font-prompt text-5xl ml-4 font-medium align-top',
              )}
            >
              Kucoin
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
