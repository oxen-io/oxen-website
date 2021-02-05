import React from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
import { IState } from '../../state/reducers';
import { SideMenuInner } from './SideMenuInner';
import { SideBarMode, SideMenuSideBar } from './SideMenuSideBar';

export function SideMenuSplt() {
  const { sideMenuActive: active } = useSelector(
    (state: IState) => state.navigation,
  );

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
