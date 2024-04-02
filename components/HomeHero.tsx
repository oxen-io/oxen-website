import Image from 'next/image';
import { EXCHANGES, UI } from '@/constants';
import classNames from 'classnames';
import { Button } from './Button';

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
          'font-prompt relative flex flex-col justify-center items-center text-center max-w-5xl p-8 pt-24',
          'tablet:text-left tablet:items-start tablet:-mt-8 tablet:mx-7 tablet:py-2 tablet:px-20 tablet:bg-alt tablet:bg-opacity-95 tablet:border-2 tablet:border-secondary tablet:rounded-2xl',
          'desktop:mt-0 desktop:mx-8',
        )}
      >
        <h1
          className={classNames(
            'text-4xl font-bold leading-snug mb-4',
            'tablet:text-5xl tablet:mt-8',
          )}
        >
          Oxen is migrating to Session Token
        </h1>
        <h2
          className={classNames(
            'text-xl leading-snug mx-4',
            'tablet:text-2xl tablet:mx-0',
          )}
        >
          Find out more about Session Token on{' '}
          <a
            className="cursor-pointer text-blue hover:underline"
            href="https://token.getsession.org/"
            rel='noreferrer'
            target="_blank"
            aria-label="Link to Session Token website"
          >
            their website
          </a>
          .
        </h2>
        <a
          href="https://swap.oxen.io/"
          target="_blank"
          rel="noreferrer"
          aria-label="Link to Session Token Swap Program"
          className={classNames('mt-4', 'tablet:mt-12', 'desktop:mt-8')}
        >
          <Button size="large" className='font-sans'>
            Participate in the Session Token Swap Program
          </Button>
        </a>
        <h3
          className={classNames(
            'text-3xl font-semibold leading-tight mb-4 mt-4',
            'tablet:text-4xl tablet:mb-2 tablet:mt-12',
            'desktop:mb-4 desktop:mt-8',
          )}
        >
          Oxen available on
        </h3>
        <div
          className={classNames(
            'flex flex-col justify-center items-center',
            'tablet:items-start',
            'desktop:flex-row desktop:justify-between desktop:items-center desktop:gap-8',
          )}
        >
          {EXCHANGES.map(({ url, name, logo }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Link to ${name} website`}
              className={classNames(
                'block py-6 px-8 mt-4 mb-8 cursor-pointer border-2 border-secondary rounded-2xl w-full',
                'tablet:py-4 tablet:px-6',
                'duration-300',
                'hover:bg-secondary hover:bg-opacity-30',
              )}
            >
              <Image
                src={logo}
                alt={`${name} Logo`}
                width={961}
                height={240}
                quality={100}
                priority={true}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
