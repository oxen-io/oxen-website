import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { SideMenuDefault } from './SideMenuDefault';
import { SideMenuInner } from './SideMenuInner';
import { SideMenuMobile } from './SideMenuMobile';

export interface ISideMenuItem {
  id: number;
  label: string;
  href?: string;
}

export function SideMenu() {
  const { isMobile, isTablet } = useContext(ScreenContext);
  const overlay = false;

  return isMobile || isTablet ? (
    <SideMenuMobile />
  ) : overlay ? (
    <div className="fixed inset-0">
      <SideMenuInner />
    </div>
  ) : (
    <SideMenuDefault />
  );
}
