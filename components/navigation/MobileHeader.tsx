import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import TriangleSVG from '../../assets/svgs/triangle.svg';
import { UI } from '../../constants';
import { collapseSideMenu, expandSideMenu } from '../../state/navigation';
import { IState } from '../../state/reducers';

export function MobileHeader() {
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
      className={classNames('w-full bg-alt')}
    >
      <div className="relative flex items-center justify-between w-full h-full">
        <div className="antialiased">
          <Link href="/">
            <a className="flex items-center flex-shrink-0 text-primary">
              <OxenLogoSVG className="h-10 fill-current" />
            </a>
          </Link>
        </div>

        <TriangleSVG
          onClick={() => toggleSideMenu()}
          className={classNames(
            'h-5 transform outline-none duration-300',
            expanded ? '-rotate-60' : 'rotate-180',
          )}
        />
      </div>
    </div>
  );
}
