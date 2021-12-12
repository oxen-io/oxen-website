import {
  SideBarMode,
  SideMenuSideBar,
} from '@/components/navigation/SideMenuSideBar';

import { IState } from '@/state/reducers';
import React from 'react';
import { SideMenuInner } from '@/components/navigation/SideMenuInner';
import { UI } from '@/constants';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

interface Props {
  withSideBar?: boolean;
}

export function SideMenuFullscreen({ withSideBar }: Props) {
  const { sideMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );

  return (
    <div
      style={{
        top: `${UI.HEADER_HEIGHT_PX}px`,
        zIndex: 20000,
        transform: expanded
          ? 'translateX(0)'
          : `translateX(-100%) ${
              withSideBar
                ? `translateX(${UI.SIDE_MENU_SIDE_BAR_WIDTH_PX - 1}px)`
                : ''
            }`,
      }}
      className={classNames('fixed inset-0 flex duration-300 transform bg-alt')}
    >
      <div className="flex flex-col w-full space-y-4">
        <SideMenuInner />
      </div>

      {withSideBar && <SideMenuSideBar mode={SideBarMode.MENU} />}
    </div>
  );
}
