import React from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
import { IState } from '../../state/reducers';
import { SideMenuInner } from './SideMenuInner';
import { SideBarMode, SideMenuSideBar } from './SideMenuSideBar';

export function SideMenuDefault() {
  const { sideMenuActive: active } = useSelector(
    (state: IState) => state.navigation,
  );

  return (
    <div
      style={{
        width: '50vw',
        minWidth: '375px',
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
