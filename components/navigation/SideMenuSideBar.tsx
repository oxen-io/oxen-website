import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TriangleSVG from '../../assets/svgs/triangle.svg';
import { NAVIGATION, UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { collapseSideMenu, expandSideMenu } from '../../state/navigation';
import { IState } from '../../state/reducers';

export enum SideBarMode {
  MENU = 'MENU',
  LABEL = 'LABEL',
}

interface Props {
  mode: SideBarMode;
}

export function SideMenuSideBar({ mode }: Props) {
  const { isMobile, isTablet, isDesktop, isHuge } = useContext(ScreenContext);
  const isCollapsible = isTablet || isMobile;
  const { sideMenuExpanded: expanded, sideMenuActive: active } = useSelector(
    (state: IState) => state.navigation,
  );

  const dispatch = useDispatch();

  const toggleSideMenu = () =>
    dispatch(expanded ? collapseSideMenu() : expandSideMenu());

  return (
    <div
      style={{
        width: `${UI.SIDE_MENU_SIDE_BAR_WIDTH_PX}px`,
      }}
      className={classNames(
        'flex flex-col justify-between items-center h-full bg-blue-300 px-4 py-6 border-l border-black',
        isHuge ? 'text-3xl' : 'w-12 text-2xl',
        mode === SideBarMode.LABEL && 'border-r border-b',
        mode === SideBarMode.MENU && !expanded && 'border-r',
      )}
      onClick={() => mode === SideBarMode.MENU && toggleSideMenu()}
    >
      <div>
        {isCollapsible && (
          <>
            <TriangleSVG
              className={classNames(
                'h-4 transform outline-none duration-300 cursor-pointer',
                expanded ? 'rotate-180' : '-rotate-60',
              )}
            />
          </>
        )}
      </div>

      <div
        className={classNames(
          'flex items-center justify-start w-0 h-0 duration-300 transform -rotate-90',
        )}
      >
        <span className="whitespace-no-wrap">
          {mode === SideBarMode.LABEL
            ? NAVIGATION.SIDE_MENU_ITEMS[active].label
            : 'Menu'}
        </span>
      </div>
    </div>
  );
}
