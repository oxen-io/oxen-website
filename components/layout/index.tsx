import React, { ReactNode } from 'react';
import { Footer } from '../Footer';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div style={{ height: '100vh' }} className="flex flex-col justify-between">
      <div className="relative flex-grow">
        {/* <SearchOverlay /> */}
        {/* <Header /> */}

        <div className="flex-grow">{children}</div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
