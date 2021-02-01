import React, { ReactNode } from 'react';
import { Header } from '../navigation/Header';
import { SideMenu } from '../navigation/SideMenu';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      className="flex flex-col justify-between"
    >
      <div className="relative flex flex-col">
        <Header />
        <div className="flex-grow border-t border-black">
          <div className="flex w-full h-full">
            <SideMenu />
            <div className="flex-1 overflow-x-hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
