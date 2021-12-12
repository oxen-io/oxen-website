import React, { useContext } from 'react';

import { DesktopHeader } from '@/components/navigation/DesktopHeader';
import { MobileHeader } from '@/components/navigation/MobileHeader';
import { ScreenContext } from '@/contexts/screen';

export function Header() {
  const { isDesktop } = useContext(ScreenContext);
  return <>{isDesktop ? <DesktopHeader /> : <MobileHeader />}</>;
}
