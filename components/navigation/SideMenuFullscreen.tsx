import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
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
      //{/* Update padding for navigation  */}

      className={classNames('fixed inset-0 flex duration-300 transform bg-alt')}
    >
      <div className="flex flex-col w-full space-y-4">
        <SideMenuInner />
      </div>

      {withSideBar && <SideMenuSideBar mode={SideBarMode.MENU} />}
    </div>
  );
}
