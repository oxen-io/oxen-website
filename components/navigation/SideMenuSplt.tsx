import React from 'react';
import { UI } from '../../constants';
import { SideMenuInner } from './SideMenuInner';
import { SideBarMode, SideMenuSideBar } from './SideMenuSideBar';

export function SideMenuSplt() {
  return (
    <div
      style={{
        minWidth: '50vw',
      }}
      className="relative flex text-primary bg-alt"
    >
      <div
        style={{
          height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
        }}
        className="w-full overflow-y-auto"
      >
        <SideMenuInner />
      </div>

      <SideMenuSideBar mode={SideBarMode.LABEL} />
    </div>
  );
}
