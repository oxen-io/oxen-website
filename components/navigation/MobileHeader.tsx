import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import TriangleSVG from '../../assets/svgs/triangle.svg';
import { UI } from '../../constants';
import { toggleMobileMenu } from '../../state/navigation';

export function MobileHeader() {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        zIndex: UI.Z_INDEX_HEADER,
        paddingLeft: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
        paddingRight: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
        height: `${UI.HEADER_HEIGHT_PX}px`,
      }}
      className={classNames('w-full bg-alt')}
    >
      <div className="relative flex items-center justify-between w-full h-full">
        <div className="antialiased">
          <Link href="/">
            <a className="flex items-center flex-shrink-0 text-primary">
              <OxenLogoSVG className="h-10 fill-current" />
            </a>
          </Link>
        </div>

        <TriangleSVG
          onClick={() => dispatch(toggleMobileMenu())}
          className="h-12 transform rotate-90 outline-none"
        />
      </div>
    </div>
  );
}
