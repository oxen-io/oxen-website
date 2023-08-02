import Image from 'next/image';
import { UI } from '@/constants';
import classNames from 'classnames';

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
            'text-4xl font-bold leading-snug mt-16 mb-4',
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
            'tablet:items-start',
            'desktop:flex-row desktop:justify-between desktop:items-center',
          )}
        >
          <a
            href="https://v2.info.uniswap.org/pair/0xbaeca7c35346a8d31811ef971f38603012a12c1e"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Uniswap website"
            className={classNames(
              'block py-6 px-8 mt-4 mb-8 cursor-pointer border-2 border-secondary rounded-2xl w-60',
              'tablet:w-40 tablet:py-4 tablet:px-6',
              'xl:w-44',
              'duration-300',
              'hover:bg-secondary hover:bg-opacity-30',
            )}
          >
            <Image
              src={'/svgs/uniswap.svg'}
              alt="Uniswap Logo"
              width={961}
              height={240}
              quality={100}
              priority={true}
            />
          </a>
          <a
            href="https://www.coinex.com/exchange/oxen-usdt"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Coinex website"
            className={classNames(
              'block py-6 px-8 mt-4 mb-8 cursor-pointer border-2 w- border-secondary rounded-2xl w-60',
              'tablet:w-40 tablet:py-4 tablet:px-6',
              'xl:w-44',
              'duration-300',
              'hover:bg-secondary hover:bg-opacity-30',
            )}
          >
            <Image
              src={'/svgs/coinex.svg'}
              alt="Coinex Logo"
              width={961}
              height={240}
              quality={100}
              priority={true}
            />
          </a>
          <a
            href="https://tradeogre.com/exchange/OXEN-BTC"
            target="_blank"
            rel="noreferrer"
            aria-label="Link to Tradeogre website"
            className={classNames(
              'block py-6 px-8 mt-4 mb-8 cursor-pointer border-2 w- border-secondary rounded-2xl w-60',
              'tablet:w-40 tablet:py-4 tablet:px-6',
              'xl:w-44',
              'duration-300',
              'hover:bg-secondary hover:bg-opacity-30',
            )}
          >
            <Image
              src={'/svgs/tradeogre.svg'}
              alt="Tradeogre Logo"
              width={961}
              height={240}
              quality={100}
              priority={true}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
