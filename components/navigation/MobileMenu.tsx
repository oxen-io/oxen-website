import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { NAVIGATION, UI } from '../../constants';
import { IState } from '../../state/reducers';

export function MobileMenu() {
  const { headerMobileMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );

  return (
    <div
      style={{
        top: `${UI.HEADER_HEIGHT_PX}px`,
        left: `${UI.SIDE_MENU_SIDE_BAR_WIDTH_PX}px`,
        display: expanded ? 'block' : 'none',
      }}
      className="fixed right-0 overflow-hidden"
    >
      <div
        style={{
          transform: expanded ? 'translateY(0)' : 'translateY(-100%)',
        }}
        className="flex flex-col duration-300 bg-gray-100"
      >
        {NAVIGATION.MENU_ITEMS.map(item => {
          return (
            <div key={uuid()} className="flex justify-center px-6 py-1">
              {item.external ? (
                <a className="w-full py-4 text-lg text-center uppercase focus:bg-secondary hover:bg-secondary focus:text-white hover:text-white">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} as={item.href}>
                  <a className="w-full py-4 text-lg text-center uppercase focus:bg-secondary hover:bg-secondary focus:text-white hover:text-white">
                    {item.label}
                  </a>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
