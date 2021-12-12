import React, { ReactNode, useContext, useEffect, useRef } from 'react';

import { Header } from '@/components/navigation/Header';
import { IState } from '@/state/reducers';
import { PageType } from '@/state/navigation';
import { ScreenContext } from '@/contexts/screen';
import { SideMenu } from '@/components/navigation/SideMenu';
import { UI } from '@/constants';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isMobile, isTablet, isDesktop } = useContext(ScreenContext);
  const { pageType, headerMobileMenuExpanded } = useSelector(
    (state: IState) => state.navigation,
  );

  const router = useRouter();

  const marginLeft = `${
    pageType === PageType.NORMAL && isTablet
      ? UI.SIDE_MENU_SIDE_BAR_WIDTH_PX
      : 0
  }px`;

  const mobileMenuOpen =
    (pageType === PageType.BLOG || pageType === PageType.POST) &&
    headerMobileMenuExpanded;

  const ref = useRef<HTMLDivElement>(null);
  const handleLocationChange = () => {
    // Reset scroll position
    ref.current.scrollTo(0, 0);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleLocationChange);

    return () => {
      router.events.off('routeChangeComplete', handleLocationChange);
    };
  }, []);

  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      className="relative flex flex-col justify-between overflow-hidden bg-alt text-primary"
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
          ref={ref}
          style={{
            marginLeft,
            filter: `brightness(${mobileMenuOpen ? 0.85 : 1})`,
          }}
          className="relative z-50 w-full h-full overflow-y-auto duration-300 bg-alt"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
