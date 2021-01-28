import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import OxenLogoSVG from '../../assets/svgs/brand.svg';
import { UI } from '../../constants';
import { menuItems } from '../../constants/navigation';
import { IState } from '../../state/reducers';

interface Props {
  sticky: boolean;
}

export function DesktopHeader({ sticky }: Props) {
  const { searchOverlayExpanded } = useSelector(
    (state: IState) => state.navigation,
  );
  const { searchBarPinnedToHeader } = useSelector(
    (state: IState) => state.search,
  );

  // We only wnat the searchbar to be invisible on the home page
  // and given that they have not scrolled past the main home search
  const [searchIsShown, setSearchIsShown] = useState(false);

  useEffect(() => {
    if (
      (location.pathname === '/' && searchBarPinnedToHeader) ||
      location.pathname !== '/'
    ) {
      if (!searchIsShown) {
        setSearchIsShown(true);
      }
    } else {
      if (searchIsShown) {
        setSearchIsShown(false);
      }
    }
  }, [location.pathname, searchBarPinnedToHeader]);

  const navBarRef = useRef(null);
  console.log('Header ➡️ location.pathname:', location.pathname);

  return (
    <div
      ref={navBarRef}
      style={{
        zIndex:
          searchOverlayExpanded && searchIsShown
            ? UI.Z_INDEX_HEADER_SEARCH
            : UI.Z_INDEX_HEADER,
        height: `${UI.HEADER_HEIGHT_PX}px`,
        marginTop: sticky ? '0' : `${UI.MENUBAR_HEIGHT_PX}px`,
      }}
      className={classNames(
        sticky ? 'fixed' : 'absolute',
        'left-0 right-0 top-0 w-full bg-white flex items-center',
      )}
    >
      {/* <Contained> */}
      <div className="w-full h-full flex items-center px-6">
        <div className="antialiased flex w-full items-center justify-between">
          <div className="flex flex-grow">
            <Link href="/">
              <a className="flex items-center flex-shrink-0 text-secondary">
                <OxenLogoSVG className="fill-current h-8" />
              </a>
            </Link>
          </div>

          <div className="flex space-x-4">
            {menuItems.map(item => (
              <a key={item.label} href={item.href} className="uppercase">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* </Contained> */}
    </div>
  );
}
