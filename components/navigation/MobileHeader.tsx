import classNames from 'classnames';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import TriangleSVG from '../../assets/svgs/triangle.svg';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { collapseSideMenu, expandSideMenu } from '../../state/navigation';
import { IState } from '../../state/reducers';

export function MobileHeader() {
  const { isMobile } = useContext(ScreenContext);
  const { sideMenuExpanded: expanded } = useSelector(
    (state: IState) => state.navigation,
  );
  const dispatch = useDispatch();

  const toggleSideMenu = () =>
    dispatch(expanded ? collapseSideMenu() : expandSideMenu());

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

        {isMobile && (
          <TriangleSVG
            onClick={() => toggleSideMenu()}
            className={classNames(
              'h-3 transform outline-none duration-300',
              expanded ? 'rotate-180' : '-rotate-60',
            )}
          />
        )}
      </div>
    </div>
  );
}
