import React from 'react';
import { UI } from '../../constants';
import { SideMenuActiveIndicator } from './SideMenuActiveIndicator';
import { SideMenuInner } from './SideMenuInner';

export function SideMenuMobile() {
  return (
    <div
      style={{
        height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
        top: `${UI.HEADER_HEIGHT_PX}px`,
        zIndex: 30000,
      }}
      className="fixed inset-0 flex bg-alt"
    >
      <div className="flex flex-col w-full">
        <SideMenuInner />
      </div>

      <SideMenuActiveIndicator />
    </div>
  );
}
