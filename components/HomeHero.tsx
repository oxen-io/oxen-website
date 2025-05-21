import classNames from 'classnames';
import { Button } from './Button';
import { Spacer } from './Spacer';
import { useContext } from 'react';
import { ScreenContext } from '@/contexts/screen';

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
    href: '/blog/oxen-landing-hardfork-11-3-0',
    ariaLabel: 'Link to Oxen blog post about the migration',
    label: 'Learn more about the migration',
    internal: true,
  },
  {
    href: 'https://claim.oxen.io',
    ariaLabel: 'Link to SESH Coin Claims Portal.',
    label: 'Swap your OXEN for SESH',
  },
];

export function HomeHero() {
  const { isMobile, isTablet, isDesktop, isHuge, isEnormous } = useContext(
    ScreenContext,
  );
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
          'font-prompt relative flex flex-col justify-center items-center text-center max-w-5xl py-8 pt-24',
          'desktop:text-left desktop:items-start desktop:-mt-8 desktop:mx-7 desktop:py-2 desktop:px-16 desktop:bg-alt desktop:bg-opacity-95 desktop:border-2 desktop:border-secondary desktop:rounded-2xl',
          'xl:mt-0 xl:mx-8',
        )}
      >
        <h1
          className={classNames(
            'text-4xl font-bold leading-snug mb-4',
            'tablet:text-5xl tablet:mt-8',
          )}
        >
          Oxen has migrated to Session Token
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
        {isMobile ? (
          <>
            <Spacer spaceX={24} spaceY={24} />
            <Spacer spaceX={24} spaceY={24} />
          </>
        ) : !isTablet ? (
          <Spacer spaceX={10} spaceY={10} />
        ) : null}
      </div>
    </div>
  );
}
