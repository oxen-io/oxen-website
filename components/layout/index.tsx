import React, { ReactNode } from 'react';
import { UI } from '../../constants';
import { Footer } from '../Footer';
import { Header } from '../header/Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      className="flex flex-col justify-between"
    >
      <div className="relative flex-grow">
        {/* <SearchOverlay /> */}
        <Header />
        <div
          style={{ marginTop: `${UI.HEADER_HEIGHT_PX}px` }}
          className="flex-grow"
        >
          {children}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
