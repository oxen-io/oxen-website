import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { NAVIGATION, UI } from '../../constants';
import { IState } from '../../state/reducers';
import { SideMenuInner } from './SideMenuInner';
import { SideBarMode, SideMenuSideBar } from './SideMenuSideBar';

interface Props {
  withSideBar?: boolean;
}

export function SideMenuFullscreen({ withSideBar }: Props) {
  const { sideMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );

  console.log(
    'SideMenuMobile ➡️ NAVIGATION.MENU_ITEMS:',
    NAVIGATION.MENU_ITEMS,
  );

  return (
    <div
      style={{
        height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
        top: `${UI.HEADER_HEIGHT_PX}px`,
        zIndex: 30000,
        transform: expanded
          ? 'translateX(0)'
          : `translateX(-100%) ${
              withSideBar
                ? `translateX(${UI.SIDE_MENU_SIDE_BAR_WIDTH_PX - 1}px)`
                : ''
            }`,
      }}
      className={classNames(
        'fixed inset-0 flex duration-300 transform border-t bg-alt border-primary',
      )}
    >
      <div className="flex flex-col w-full space-y-4">
        <SideMenuInner />
      </div>

      {withSideBar && <SideMenuSideBar mode={SideBarMode.MENU} />}
    </div>
  );
}
