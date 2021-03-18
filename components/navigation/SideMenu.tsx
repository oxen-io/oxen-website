import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ScreenContext } from '../../contexts/screen';
import { PageType } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { SideMenuFullscreen } from './SideMenuFullscreen';
import { SideMenuSplit } from './SideMenuSplit';

export interface ISideMenuItem {
  id: number;
  label: string;
  href: string;
  isExternal?: boolean;
  shouldHide?: boolean;
}

export function SideMenu() {
  const { isMobile, isTablet } = useContext(ScreenContext);
  const { sideMenuExpanded: expanded, pageType, postTitle } = useSelector(
    (state: IState) => state.navigation,
  );

  const isBlog = pageType === PageType.BLOG;
  const isPost = pageType === PageType.POST;

  return (isMobile || isTablet) && !isBlog && !isPost ? (
    <SideMenuFullscreen withSideBar={isTablet} />
  ) : (
    <SideMenuSplit />
  );
}
