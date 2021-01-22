import classNames from 'classnames';
import React, { CSSProperties, useRef } from 'react';
import { useSelector } from 'react-redux';
import { UI } from '../../constants';
import { IState } from '../../state/reducers';
import { SearchOverlayInner } from './SearchOverlayInner';

interface Props {
  isShown: boolean;
  innerOverlayStyle?: CSSProperties;
}

export function SearchDropdown({ isShown, innerOverlayStyle = {} }: Props) {
  const { searchOverlayExpanded } = useSelector(
    (state: IState) => state.navigation,
  );
  const { searchBarPinnedToHeader } = useSelector(
    (state: IState) => state.search,
  );

  const overlayContentRef = useRef(null);

  // Desktop overlay styles depend on wether or not the search bar is
  // in the navbar or not
  const desktopOverlayStyles = {
    zIndex: searchOverlayExpanded && isShown ? UI.Z_INDEX_SEARCH_DROPDOWN : -1,
    display: searchOverlayExpanded && isShown ? 'block' : 'none',
    minHeight: '600px',
  };

  return (
    <>
      <div ref={overlayContentRef} style={desktopOverlayStyles}>
        <div
          className={classNames(
            'relative',
            'flex',
            // Allows shadow to overflow
            'bg-white',
            'border-primary',
            'border-t-none',
            'border-l-2',
            'border-r-2',
            'border-b-2',
            'rounded-b-lg',
            'pb-4',
          )}
        >
          <div
            style={innerOverlayStyle}
            className="relative overflow-y-auto w-full"
          >
            <SearchOverlayInner />
          </div>
        </div>
      </div>
    </>
  );
}
