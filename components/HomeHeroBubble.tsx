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
        transform:
          isMobile || isTablet
            ? 'translateY(min(40vh, 20rem))'
            : isHuge
            ? 'translateY(50%)'
            : 'translateY(33%)',
        maxHeight: '400px',
      }}
      onClick={() => dispatch(expandSideMenu())}
      className={classNames(
        'absolute h-full z-40 px-10 duration-300',
        !isDesktop && 'cursor-pointer',
      )}
    >
      <div
        className={classNames(
          'px-4 py-2 leading-tight text-base border rounded-lg bg-opacity-90 border-secondary bg-alt front-prompt text-primary animate-float',
          //   isMobile ? 'text-base' : 'text-xl',
        )}
      >
        <p className="mb-1 text-xs text-secondary">OXEN</p>
        Welcome to Oxen.
        <br />
        We know you have questions;
        <br /> here are the answers.
      </div>
    </div>
  );
}
