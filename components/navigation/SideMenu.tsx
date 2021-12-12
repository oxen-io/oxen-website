import React, { useContext } from 'react';

import { IState } from '@/state/reducers';
import { PageType } from '@/state/navigation';
import { ScreenContext } from '@/contexts/screen';
import { SideMenuFullscreen } from '@/components/navigation/SideMenuFullscreen';
import { SideMenuSplit } from '@/components/navigation/SideMenuSplit';
import { useSelector } from 'react-redux';

export interface ISideMenuItem {
  id: number;
  label: string;
  href: string;
  isExternal?: boolean;
  hasOwnRoute?: boolean;
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
