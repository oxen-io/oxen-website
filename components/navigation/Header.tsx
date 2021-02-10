import React, { useContext } from 'react';
import { ScreenContext } from '../../contexts/screen';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

export function Header() {
  const { isDesktop } = useContext(ScreenContext);
  return <>{isDesktop ? <DesktopHeader /> : <MobileHeader />}</>;
}
