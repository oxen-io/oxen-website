import React, { ReactNode, useContext } from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { IState } from '../../state/reducers';
import { Contained } from '../Contained';
import { Header } from '../navigation/Header';
import { SideMenu } from '../navigation/SideMenu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isTablet } = useContext(ScreenContext);
  const { sideMenuExpanded } = useSelector((state: IState) => state.navigation);

  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      className="relative flex flex-col justify-between"
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
          }}
          className="overflow-y-auto"
        >
          <Contained>{children}</Contained>
        </div>
      </div>
    </div>
  );
}
