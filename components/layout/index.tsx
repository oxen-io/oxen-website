import React, { ReactNode, useContext } from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { IState } from '../../state/reducers';
import { Header } from '../navigation/Header';
import { SideMenu } from '../navigation/SideMenu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isTablet } = useContext(ScreenContext);
  const { sideMenuSplit, sideMenuExpanded } = useSelector(
    (state: IState) => state.navigation,
  );

  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      className="relative flex flex-col justify-between bg-alt"
    >
      <Header />

      <div
        style={{
          height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px`,
        }}
        className="flex w-full h-full"
      >
        <SideMenu />
        <div
          style={{
            marginLeft: `${isTablet ? UI.SIDE_MENU_SIDE_BAR_WIDTH_PX : 0}px`,
            filter:
              !sideMenuSplit && sideMenuExpanded
                ? 'brightness(0.9)'
                : 'brightness(1)',
          }}
          className="w-full py-6 overflow-y-auto duration-300 bg-alt"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
