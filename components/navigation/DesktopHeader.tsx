import classNames from 'classnames';
import Link from 'next/link';
import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
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
            {NAVIGATION.MENU_ITEMS.map(item => {
              const link = (
                <a
                  className={classNames(
                    'uppercase whitespace-no-wrap cursor-pointer',
                    item.subtle
                      ? 'text-xs hover:underline'
                      : 'duration-300 text-base font-bold py-1 px-2 hover:bg-primary rounded hover:bg-opacity-10',
                  )}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noreferrer' : undefined}
                >
                  {item.label}
                </a>
              );

              return (
                <div key={uuid()}>
                  {item.external ? (
                    link
                  ) : (
                    <Link href={item.href} as={item.href}>
                      {link}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
