import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { SideMenuFullscreen } from './SideMenuFullscreen';
import { SideMenuInner } from './SideMenuInner';
import { SideMenuSplit } from './SideMenuSplit';

export interface ISideMenuItem {
  id: number;
  label: string;
  href?: string;
}

export function SideMenu() {
  const { isMobile, isTablet } = useContext(ScreenContext);
  const overlay = false;

  // ON MOBILE: overlay with no sidebar
  // ON TABLET: overlay with sidebar
  // ON DESKTOP: fixed with sidebar (overlay on /blog)

  // Fullscreen overlay with no sidebar: ONLY ON MOBILE
  // Fullscreen overlay with sidebar: ONLY ON TABLET
  // Split screen overlay with sidebar: ONLY ON DESKTOP && /blog
  // Just sidebar: /blog

  return isMobile || isTablet ? (
    <SideMenuFullscreen withSideBar={isTablet} />
  ) : overlay ? (
    <div className="fixed inset-0">
      <SideMenuInner />
    </div>
  ) : (
    <SideMenuSplit />
  );
}
