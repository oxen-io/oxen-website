import classNames from 'classnames';
import Link from 'next/link';
import React, { useRef } from 'react';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import { UI } from '../../constants';
import { menuItems } from '../../constants/navigation';

export function DesktopHeader() {
  const navBarRef = useRef(null);

  return (
    <div
      ref={navBarRef}
      style={{
        height: `${UI.HEADER_HEIGHT_PX}px`,
      }}
      className={classNames('w-full bg-white flex items-center')}
    >
      <div className="w-full h-full flex items-center px-6">
        <div className="antialiased flex w-full items-center justify-between">
          <div className="flex flex-grow">
            <Link href="/">
              <a className="flex items-center flex-shrink-0 text-secondary">
                <OxenLogoSVG className="fill-current h-10" />
              </a>
            </Link>
          </div>

          <div className="flex space-x-4 ml-6">
            {menuItems.map(item => (
              <Link key={item.label} href={item.href} as={item.href}>
                <a className="uppercase whitespace-no-wrap hover:underline">
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
