import React, { ReactNode, useContext } from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { PageType } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { Header } from '../navigation/Header';
import { SideMenu } from '../navigation/SideMenu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isTablet, isDesktop } = useContext(ScreenContext);
  const { pageType, sideMenuExpanded } = useSelector(
    (state: IState) => state.navigation,
  );

  const marginLeft =
    pageType === PageType.NORMAL && isTablet
      ? UI.SIDE_MENU_SIDE_BAR_WIDTH_PX
      : 0;

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
            marginLeft: `${marginLeft}px`,
          }}
          className="relative w-full h-full py-6 overflow-y-auto duration-300 bg-alt"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
