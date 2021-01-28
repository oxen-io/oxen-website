import React, { useContext } from 'react';
import { useWindowScroll } from 'react-use';
// import SearchPrimarySVG from '../../assets/svgs/search-primary.svg';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { DesktopHeader } from './DesktopHeader';
import { MenuBar } from './MenuBar';
import { MobileHeader } from './MobileHeader';

export function Header() {
  const { isMobile } = useContext(ScreenContext);

  // Track scroll for absolute positioning of header on MenuBar hide
  const { y: windowScrollY } = useWindowScroll();
  const isSticky = windowScrollY > UI.MENUBAR_HEIGHT_PX;

  return (
    <>
      <MenuBar />
      {isMobile ? (
        <MobileHeader sticky={isSticky} />
      ) : (
        <DesktopHeader sticky={isSticky} />
      )}
    </>
  );
}
