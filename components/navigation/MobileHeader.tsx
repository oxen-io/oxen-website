import {
  PageType,
  collapseMobileHeader,
  collapseSideMenu,
  expandMobileHeaderMenu,
  expandSideMenu,
} from '@/state/navigation';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '@/state/reducers';
import Link from 'next/link';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { ReactComponent as OxenLogoSVG } from '@/assets/svgs/brand.svg';
import { ScreenContext } from '@/contexts/screen';
import { ReactComponent as TriangleSVG } from '@/assets/svgs/triangle.svg';
import { UI } from '@/constants';
import classNames from 'classnames';

export function MobileHeader() {
  const { isMobile, isTablet } = useContext(ScreenContext);
  const { sideMenuExpanded, headerMobileMenuExpanded, pageType } = useSelector(
    (state: IState) => state.navigation,
  );
  const dispatch = useDispatch();

  // On blog page, the sidebar disappears so we need a
  // hamburger menu for topbar linksn
  const isBlog = pageType === PageType.BLOG || pageType === PageType.POST;

  const toggleSideMenu = () =>
    dispatch(sideMenuExpanded ? collapseSideMenu() : expandSideMenu());

  const toggleMobileMenu = () =>
    dispatch(
      headerMobileMenuExpanded
        ? collapseMobileHeader()
        : expandMobileHeaderMenu(),
    );

  return (
    <div
      style={{
        zIndex: UI.Z_INDEX_HEADER,
        paddingLeft: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
        paddingRight: `${UI.PAGE_CONTAINED_PADDING_VW}vw`,
        height: `${UI.HEADER_HEIGHT_PX}px`,
      }}
      className={classNames('w-full bg-alt border-b border-primary')}
    >
      <div className="relative flex items-center justify-between w-full h-full">
        <div className="antialiased">
          <Link href="/">
            <a className="flex items-center flex-shrink-0 text-primary">
              <OxenLogoSVG className="h-8 fill-current" />
            </a>
          </Link>
        </div>

        {(isMobile || isTablet) && !isBlog && (
          <TriangleSVG
            onClick={() => toggleSideMenu()}
            className={classNames(
              'h-4 fill-current text-primary transform outline-none duration-300 cursor-pointer',
              sideMenuExpanded ? 'rotate-90' : '',
            )}
          />
        )}

        {(isTablet || isMobile) && isBlog && (
          <>
            <TriangleSVG
              onClick={() => toggleMobileMenu()}
              className={classNames(
                'h-4 fill-current text-primary transform outline-none duration-300 cursor-pointer',
                headerMobileMenuExpanded ? 'rotate-90' : '',
              )}
            />
            <MobileMenu />
          </>
        )}
      </div>
    </div>
  );
}
