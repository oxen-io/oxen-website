import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import SearchPrimarySVG from '../../assets/svgs/search-primary.svg';
import { UI } from '../../constants';
import { ScreenContext } from '../../contexts/screen';
import { expandSearchOverlay } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { Contained } from '../Contained';
import { HeaderSearch } from './HeaderSearch';

export function Header() {
  const { isMobile } = useContext(ScreenContext);

  return (
    <div className="flex flex-col w-full">
      <div>{isMobile ? <MobileHeader /> : <DesktopHeader />}</div>
    </div>
  );
}

function MobileHeader() {
  const navigationState = useSelector((state: IState) => state.navigation);
  const searchState = useSelector((state: IState) => state.search);
  const dispatch = useDispatch();

  const handleExpandSearch = (e: React.MouseEvent) => {
    // Timeout to prevent action immediately firing on the elemnt under with onMouseUp
    setTimeout(() => dispatch(expandSearchOverlay()), 50);
    e.stopPropagation();
  };

  return (
    <div
      style={{
        zIndex: UI.Z_INDEX_HEADER,
        paddingLeft: '5vw',
        paddingRight: '5vw',
      }}
      className="fixed left-0 right-0 top-0 w-full h-24 bg-white"
    >
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex flex-shrink-0" onMouseDown={handleExpandSearch}>
          {/* <SearchPrimarySVG className="h-10 cursor-pointer" /> */}
        </div>

        <div className="antialiased">
          <Link href="/">
            <a className="oxen-logo-link flex items-center flex-shrink-0 text-secondary">
              {/* <OxenLogo className="fill-current h-8" /> */}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DesktopHeader() {
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
      }}
      className="fixed left-0 right-0 top-0 w-full h-20 bg-white flex items-center"
    >
      <Contained>
        <div className="w-full h-full flex items-center">
          <div className="antialiased flex w-full items-center justify-between">
            <div className="flex flex-grow">
              <Link href="/">
                <a className="oxen-logo-link flex items-center flex-shrink-0 text-secondary">
                  {/* <OxenLogo className="fill-current h-8" /> */}
                </a>
              </Link>
              <HeaderSearch
                isShown={searchIsShown}
                innerOverlayStyle={{
                  // When pinned to header, limit height to vh and lock body scroll
                  maxHeight: searchIsShown ? '80vh' : 'unset',
                }}
              />
            </div>
          </div>
        </div>
      </Contained>
    </div>
  );
}
