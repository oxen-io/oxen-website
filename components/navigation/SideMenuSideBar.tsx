import classNames from 'classnames';
import { useRouter } from 'next/router';
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
  const { sideMenuExpanded: expanded, sideMenuSplit } = useSelector(
    (state: IState) => state.navigation,
  );

  const isCollapsible = isTablet || isMobile;

  const router = useRouter();
  const dispatch = useDispatch();

  const selectedSideMenuItem = Object.values(NAVIGATION.SIDE_MENU_ITEMS).find(
    item => item.href === router.asPath,
  )?.label;

  const label = sideMenuSplit ? selectedSideMenuItem : 'Blog';
  const isBlog = !sideMenuSplit;

  console.log('SideMenuSideBar ➡️ label:', label);
  console.log(
    'SideMenuSideBar ➡️ NAVIGATION.SIDE_MENU_ITEMS:',
    NAVIGATION.SIDE_MENU_ITEMS,
  );

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
      onClick={() => isCollapsible && toggleSideMenu()}
    >
      <div>
        {isCollapsible && (
          <TriangleSVG
            className={classNames(
              'h-4 transform outline-none duration-300 cursor-pointer',
              expanded ? 'rotate-180' : '-rotate-60',
            )}
          />
        )}
        {isBlog && !isCollapsible && (
          <TriangleSVG
            onClick={() => router.push('/blog', '/blog')}
            className={classNames(
              'h-4 transform outline-none duration-300 cursor-pointer',
            )}
          />
        )}
      </div>

      <div
        className={classNames(
          'flex items-center justify-start w-0 h-0 duration-300 transform -rotate-90',
        )}
      >
        <span className="whitespace-no-wrap">
          {mode === SideBarMode.LABEL ? label : 'Menu'}
        </span>
      </div>
    </div>
  );
}
