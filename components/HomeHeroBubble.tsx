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
          isMobile || isTablet ? '33px' : isHuge ? '16rem' : 'min(50vh, 20rem)',
      }}
      onClick={() => dispatch(expandSideMenu())}
      className={classNames(
        'absolute z-40 px-4 tablet:px-6 duration-300 w-full h-full tablet:w-auto tablet:h-auto flex justify-center items-center tablet:flex-none',
        !isDesktop && 'cursor-pointer',
      )}
    >
      <div
        className={classNames(
          'px-4 py-2 leading-tight text-base desktop:text-xl border rounded-lg bg-opacity-90 border-secondary bg-alt text-primary animate-float',
          // isMobile ? 'text-base' : 'text-xl',
        )}
      >
        <p className="mb-1 text-xs desktop:text-base text-secondary">OXEN</p>
        <h1>
          Welcome to Oxen.
          <br />
          We know you have questions;
          <br /> here are the answers.
        </h1>
      </div>
    </div>
  );
}
