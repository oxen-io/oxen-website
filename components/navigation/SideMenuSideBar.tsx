import { NAVIGATION, UI } from '@/constants';
import { PageType, collapseSideMenu, expandSideMenu } from '@/state/navigation';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '@/state/reducers';
import { ScreenContext } from '@/contexts/screen';
import { ReactComponent as TriangleSVG } from '@/assets/svgs/triangle.svg';
import classNames from 'classnames';
import { useRouter } from 'next/router';

export enum SideBarMode {
  MENU = 'MENU',
  LABEL = 'LABEL',
}

interface Props {
  mode: SideBarMode;
}

export function SideMenuSideBar({ mode }: Props) {
  const { isMobile, isTablet, isHuge } = useContext(ScreenContext);
  const { sideMenuExpanded: expanded, pageType, postTitle } = useSelector(
    (state: IState) => state.navigation,
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const selectedSideMenuItem =
    Object.values(NAVIGATION.SIDE_MENU_ITEMS ?? {}).find(
      item => item.href === router.asPath,
    )?.label ?? 'Menu';

  const isBlog = pageType === PageType.BLOG;
  const isPost = pageType === PageType.POST;
  const label = isPost
    ? postTitle?.substr(0, 120)
    : isBlog
    ? 'Blog'
    : selectedSideMenuItem;
  const isCollapsible = (isTablet || isMobile) && !isPost && !isBlog;

  const toggleSideMenu = () =>
    dispatch(expanded ? collapseSideMenu() : expandSideMenu());

  return (
    <div
      style={{
        width: `${UI.SIDE_MENU_SIDE_BAR_WIDTH_PX}px`,
      }}
      className={classNames(
        'flex flex-col justify-between w-12 text-2xl items-center h-full bg-blue-300 px-4 py-6 border-l border-black select-none',
        mode === SideBarMode.LABEL && 'border-r',
        mode === SideBarMode.MENU && !expanded && 'border-r',
      )}
    >
      <div>
        {isCollapsible && (
          <TriangleSVG
            onClick={() => isCollapsible && toggleSideMenu()}
            className={classNames(
              'h-4 transform outline-none duration-300 cursor-pointer',
              expanded ? 'rotate-180' : '-rotate-60',
            )}
          />
        )}
        {(isBlog || isPost) && !isCollapsible && (
          <a href={isPost ? '/blog' : '/'}>
            <TriangleSVG
              className={classNames(
                'h-4 transform outline-none duration-300 rotate-180 cursor-pointer',
              )}
            />
          </a>
        )}
      </div>

      <div
        className={classNames(
          'flex items-center justify-start w-0 h-0 duration-300 transform -rotate-90',
        )}
      >
        <span className="whitespace-nowrap">
          {mode === SideBarMode.LABEL ? label : 'Menu'}
        </span>
      </div>
    </div>
  );
}
