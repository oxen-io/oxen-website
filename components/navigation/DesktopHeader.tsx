import classNames from 'classnames';
import Link from 'next/link';
import React, { useRef } from 'react';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import { NAVIGATION, UI } from '../../constants';

export function DesktopHeader() {
  const navBarRef = useRef(null);

  return (
    <div
      ref={navBarRef}
      style={{
        height: `${UI.HEADER_HEIGHT_PX}px`,
      }}
      className={classNames(
        'w-full bg-alt flex items-center border-b border-primary',
      )}
    >
      <div className="flex items-center w-full h-full px-6">
        <div className="flex items-center justify-between w-full antialiased">
          <div className="flex flex-grow">
            <Link href="/">
              <a className="flex items-center flex-shrink-0 text-primary">
                <OxenLogoSVG className="h-8 fill-current" />
              </a>
            </Link>
          </div>

          <div className="flex items-center ml-6 space-x-4 text-sm">
            {NAVIGATION.MENU_ITEMS.map(item => (
              <Link key={item.label} href={item.href} as={item.href}>
                <a
                  className={classNames(
                    'uppercase whitespace-no-wrap',
                    item.subtle
                      ? 'text-xs hover:underline'
                      : 'text-base font-bold py-1 px-2 hover:bg-primary rounded hover:bg-opacity-25',
                  )}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noreferrer' : undefined}
                >
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
