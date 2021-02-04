import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { NAVIGATION, UI } from '../../constants';
import { IState } from '../../state/reducers';

export function MobileMenu() {
  const { mobileMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );

  return (
    <div
      style={{
        marginTop: `${UI.HEADER_HEIGHT_PX}px`,
        display: expanded ? 'block' : 'none',
      }}
      className="absolute top-0 left-0 right-0 overflow-hidden"
    >
      <div
        style={{
          transform: expanded ? 'translateY(0)' : 'translateY(-100%)',
        }}
        className="flex flex-col duration-300 bg-gray-100"
      >
        {NAVIGATION.MENU_ITEMS.map(item => (
          <Link key={item.label} href={item.href} as={item.href}>
            <a className="w-full py-4 text-lg text-center uppercase focus:bg-secondary hover:bg-secondary focus:text-white hover:text-white">
              {item.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
