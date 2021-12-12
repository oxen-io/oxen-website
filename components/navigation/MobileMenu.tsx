import { NAVIGATION, UI } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '@/state/reducers';
import Link from 'next/link';
import React from 'react';
import { collapseMobileHeader } from '@/state/navigation';
import { v4 as uuid } from 'uuid';

export function MobileMenu() {
  const { headerMobileMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );

  const dispatch = useDispatch();
  // const ref = useRef(null);
  // useClickAway(ref, () => {
  //   dispatch(collapseMobileHeader());
  // });

  return (
    <div
      // ref={ref}
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
        className="flex flex-col duration-300 bg-alt"
      >
        {NAVIGATION.MENU_ITEMS.map(item => {
          return (
            <div
              key={uuid()}
              onClick={() => dispatch(collapseMobileHeader())}
              className="flex justify-center"
            >
              {item.external ? (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a
                  href={item.href}
                  target={item.external ? '_blank' : ''}
                  className="w-full py-4 text-lg text-center uppercase cursor-pointer focus:bg-secondary hover:bg-secondary focus:text-white hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} as={item.href}>
                  <a className="w-full py-4 text-lg text-center uppercase cursor-pointer focus:bg-secondary hover:bg-secondary focus:text-white hover:text-white">
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
