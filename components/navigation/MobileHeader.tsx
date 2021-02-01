import { MenuOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import { UI } from '../../constants';
import { toggleMobileMenu } from '../../state/navigation';
import { MobileMenu } from './MobileMenu';

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
      className={classNames('w-full bg-white')}
    >
      <div className="relative w-full h-full flex items-center justify-between">
        <div className="antialiased">
          <Link href="/">
            <a className="flex items-center flex-shrink-0 text-secondary">
              <OxenLogoSVG className="fill-current h-10" />
            </a>
          </Link>
        </div>

        <MenuOutlined
          onClick={() => dispatch(toggleMobileMenu())}
          className="text-3xl outline-none"
        />
      </div>

      <MobileMenu />
    </div>
  );
}
