import classNames from 'classnames';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ScreenContext } from '../contexts/screen';
import { expandSideMenu } from '../state/navigation';

export function HomeHeroBubble() {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        marginTop:
          isMobile || isTablet ? '0' : isHuge ? '16rem' : 'min(50vh, 20rem)',
      }}
      onClick={() => dispatch(expandSideMenu())}
      className={classNames(
        'absolute z-40 px-6 mobile:px-4 tablet:px-6 duration-300 w-full h-full tablet:w-auto tablet:h-auto flex justify-center items-center tablet:flex-none',
        !isDesktop && 'cursor-pointer',
      )}
    >
      <div
        className={classNames(
          'px-4 desktop:px-6 desktop:py-4 py-2 leading-tight text-base desktop:text-xl border rounded-lg bg-opacity-90 border-secondary bg-alt front-prompt text-primary animate-float',
          //   isMobile ? 'text-base' : 'text-xl',
        )}
      >
        <p className="mb-1 text-xs desktop:text-base text-secondary">OXEN</p>
        Welcome to Oxen.
        <br />
        We know you have questions;
        <br /> here are the answers.
      </div>
    </div>
  );
}
