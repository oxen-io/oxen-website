import { Contained } from '@/components/Contained';
import { ReactElement } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const SIGNUP_URL = 'https://getsession.org/#signup';

interface Props {
  classes?: string;
}

export default function EmailSignup(props: Props): ReactElement {
  const { classes } = props;
  const router = useRouter();

  return (
    <Contained
      id="signup"
      classes={classNames(
        'border-2 border-solid border-primary py-6 px-2 mt-6 mb-10',
        'tablet:w-4/5 tablet:mx-auto tablet:py-4 tablet:mt-6 tablet:mb-8',
        'desktop:py-6',
        router.asPath !== '/get-involved' && 'tablet:w-full',
        classes,
      )}
    >
      <h3
        className={classNames(
          'text-2xl font-semibold leading-none mb-2',
          'tablet:text-3xl',
          'desktop:text-4xl desktop:mb-3',
        )}
      >
        You&apos;ve got mail!
      </h3>
      <p
        className={classNames(
          'leading-none mb-6',
          'tablet:mb-3 tablet:leading-tight',
          'desktop:mb-6 desktop:text-xl',
        )}
      >
        Sign up to the Session newsletter on getsession.org to keep up to date.
      </p>
      <a
        href={SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
          'flex justify-center items-center mx-auto px-4 py-1',
          'text-base text-white text-center font-raleway font-semibold',
          'bg-primary border-2 border-solid border-primary rounded-none',
          'duration-300 ease-in-out hover:opacity-75',
          'tablet:w-40',
        )}
      >
        Sign up
      </a>
    </Contained>
  );
}
