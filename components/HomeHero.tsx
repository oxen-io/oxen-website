import Image from 'next/image';
import { EXCHANGES, UI } from '@/constants';
import classNames from 'classnames';
import { Button } from './Button';

type HeroButtonProps = {
  href: string;
  ariaLabel: string;
  label: string;
  internal?: boolean;
};

function HeroButton({ href, ariaLabel, label, internal }: HeroButtonProps) {
  return (
    <a
      href={href}
      target={internal ? '_self' : '_blank'}
      rel="noreferrer"
      aria-label={ariaLabel}
      className={classNames('mt-4', 'tablet:mt-12', 'desktop:mt-8')}
    >
      <Button size="large" className="font-sans">
        {label}
      </Button>
    </a>
  );
}

const heroButtons: Array<HeroButtonProps> = [
  {
    href: '/blog/development-is-transitioning-to-session-token/',
    ariaLabel: 'Link to Oxen blog post about the migration',
    label: 'Learn more about the migration',
    internal: true,
  },
  {
    href: 'https://swap.oxen.io/',
    ariaLabel: 'Link to Session Token Swap Program',
    label: 'Participate in the Session Token Swap Program',
  },
  {
    href: 'https://token.getsession.org/oxen-coin-claims',
    label: 'Learn more about the Oxen Coin Claims Program',
    ariaLabel: 'Link to Oxen Coin Claims Program',
  },
] as const;

export function HomeHero() {
  return (
    <div
      className={classNames(
        'relative w-full flex justify-center items-center overflow-x-hidden',
        'before:bg-hero before:bg-right before:bg-no-repeat before:bg-cover before:absolute before:inset-0 before:opacity-10',
        'desktop:before:opacity-100 desktop:min-h-screen',
        'xl:before:bg-center',
      )}
    >
      <div
        className={classNames(
          'font-prompt relative flex flex-col justify-center items-center text-center max-w-5xl p-8 pt-24',
          'desktop:text-left desktop:items-start desktop:-mt-8 desktop:mx-7 desktop:py-2 desktop:px-20 desktop:bg-alt desktop:bg-opacity-95 desktop:border-2 desktop:border-secondary desktop:rounded-2xl',
          'xl:mt-0 xl:mx-8',
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
            rel="noreferrer"
            target="_blank"
            aria-label="Link to Session Token website"
          >
            their website
          </a>
          .
        </h2>
        {heroButtons.map(props => (
          <HeroButton key={props.href} {...props} />
        ))}
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
