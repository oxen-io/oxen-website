import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import BackSVG from '../../assets/svgs/back.svg';
import { UI } from '../../constants';
import { collapseSearchOverlay } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { Contained } from '../Contained';
import { SearchInput } from './SearchInput';
import { SearchOverlayInner } from './SearchOverlayInner';

export function SearchOverlayMobile() {
  const navigationState = useSelector((state: IState) => state.navigation);
  const { searchOverlayExpanded } = navigationState;

  const dispatch = useDispatch();

  // Internal functions
  const handleExit = (e: React.MouseEvent) => {
    // Timeout to prevent action immediately firing on the elemnt under with onMouseUp
    setTimeout(() => dispatch(collapseSearchOverlay()), 50);
    e.stopPropagation();
  };

  // Internal elements
  const searchInputPrefix = (
    <span onMouseDown={handleExit} className="text-secondary">
      {/* <BackSVG className={classNames('h-8 w-8 fill-current')} /> */}
    </span>
  );

  return (
    <div
      style={{
        zIndex: searchOverlayExpanded ? UI.Z_INDEX_SEARCH_OVERLAY : -1,
      }}
      className={classNames(
        'fixed top-0 bottom-0 left-0 right-0 bg-white',
        searchOverlayExpanded ? 'block' : 'hidden',
      )}
    >
      <div className="flex flex-col h-full flex-grow overflow-y-auto">
        <Contained>
          <SearchInput
            autofocus
            className=""
            inputClassName="h-24 pl-2 text-xl"
            placeholder="Search"
            prefix={searchInputPrefix}
          />

          <SearchOverlayInner />
        </Contained>
      </div>
    </div>
  );
}
