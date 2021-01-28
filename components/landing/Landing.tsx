import React, { ReactNode } from 'react';
import { UI } from '../../constants';
import { Contained } from '../Contained';

interface Props {
  // Use split if you want to use LandingSplit
  split?: boolean;
  children: ReactNode;
  background?: string;
}

export function Landing({ split, children, background }: Props) {
  return (
    <div
      style={{
        height: `calc(100vh - ${UI.HEADER_HEIGHT_PX}px)`,
        marginTop: `${UI.MENUBAR_HEIGHT_PX}px`,
        background,
      }}
      className="relative flex items-center w-full"
    >
      {split ? (
        <Contained>
          <div className="flex w-full h-full justify-between items-center">
            {children}
          </div>
        </Contained>
      ) : (
        <Contained>{children}</Contained>
      )}
    </div>
  );
}
