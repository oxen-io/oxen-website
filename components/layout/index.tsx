import { useRouter } from 'next/router';
import React, { ReactNode, useContext } from 'react';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { Header } from '../navigation/Header';
import { SideMenu } from '../navigation/SideMenu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isTablet } = useContext(ScreenContext);
  const router = useRouter();

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
          className="w-full py-6 overflow-y-auto bg-alt"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
