import React, { ReactNode } from 'react';
import { Header } from '../navigation/Header';

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
        {children}
      </div>
    </div>
  );
}
