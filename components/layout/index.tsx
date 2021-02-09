import React, { ReactNode } from 'react';
import { UI } from '../../constants';
import { Header } from '../navigation/Header';
import { SideMenu } from '../navigation/SideMenu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
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
        <div className="w-full py-6 overflow-y-auto duration-300 bg-alt">
          {children}
        </div>
      </div>
    </div>
  );
}
