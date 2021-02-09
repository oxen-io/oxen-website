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
  href?: string;
}

export function SideMenu() {
  const { isMobile, isTablet } = useContext(ScreenContext);
  const { sideMenuExpanded: expanded, pageType, postTitle } = useSelector(
    (state: IState) => state.navigation,
  );

  // ON MOBILE: overlay with no sidebar
  // ON TABLET: overlay with sidebar
  // ON DESKTOP: fixed with sidebar (overlay on /blog)

  // Fullscreen overlay with no sidebar: ONLY ON MOBILE
  // Fullscreen overlay with sidebar: ONLY ON TABLET
  // Split screen overlay with sidebar: ONLY ON DESKTOP && /blog
  // Just sidebar: /blog

  const isBlog = pageType === PageType.BLOG;
  const isPost = pageType === PageType.POST;

  return (isMobile || isTablet) && !isBlog && !isPost ? (
    <SideMenuFullscreen withSideBar={isTablet} />
  ) : (
    <SideMenuSplit />
  );
}
