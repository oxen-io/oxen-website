import { MenuOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import { UI } from '../../constants';
import { toggleMobileMenu } from '../../state/navigation';
import { MobileMenu } from './MobileMenu';

interface Props {
  sticky: boolean;
}

export function MobileHeader({ sticky }: Props) {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        zIndex: UI.Z_INDEX_HEADER,
        paddingLeft: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
        paddingRight: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
        height: `${UI.HEADER_HEIGHT_PX}px`,
        marginTop: sticky ? '0' : `${UI.MENUBAR_HEIGHT_PX}px`,
      }}
      className={classNames(
        sticky ? 'fixed' : 'absolute',
        'left-0 right-0 top-0 w-full bg-white',
      )}
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

      <MobileMenu sticky={sticky} />
    </div>
  );
}
