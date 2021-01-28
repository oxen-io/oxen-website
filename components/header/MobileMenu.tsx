import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
import { menuItems } from '../../constants/navigation';
import { IState } from '../../state/reducers';

interface Props {
  sticky: boolean;
}

export function MobileMenu({ sticky }: Props) {
  const { mobileMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );

  return (
    <div
      style={{
        marginTop: `${UI.HEADER_HEIGHT_PX}px`,
      }}
      className="absolute top-0 left-0 right-0 overflow-hidden"
    >
      <div
        style={{
          transform: expanded ? 'translateY(0)' : 'translateY(-100%)',
        }}
        className="flex flex-col bg-gray-100 duration-300"
      >
        {menuItems.map(item => (
          <Link key={item.label} href={item.href} as={item.href}>
            <a className="w-full py-4 focus:bg-secondary hover:bg-secondary focus:text-white hover:text-white text-lg text-center uppercase">
              {item.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
