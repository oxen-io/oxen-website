import classNames from 'classnames';
import React, { CSSProperties, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UI } from '../../constants';
import { expandSearchOverlay } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { SearchDropdown } from '../search/SearchDropdown';
import { SearchInput } from '../search/SearchInput';

interface Props {
  isShown: boolean;
  innerOverlayStyle: CSSProperties;
}

export function HeaderSearch({ isShown, innerOverlayStyle = {} }: Props) {
  const navigationState = useSelector((state: IState) => state.navigation);
  const searchState = useSelector((state: IState) => state.search);
  const { searchOverlayExpanded } = navigationState;
  const dispatch = useDispatch();

  const searchRef = useRef(null);

  return (
    <div
      style={{
        zIndex: isShown
          ? searchOverlayExpanded
            ? UI.Z_INDEX_HEADER_SEARCH
            : 1
          : -1,
        maxWidth: '650px',
      }}
      className={classNames(
        'mx-8 flex-grow',
        isShown ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        ref={searchRef}
        className={classNames(
          'flex items-center w-full justify-between h-10 pl-3 bg-white px-2',
          'border-primary border-t-2 border-l-2 border-r-2',
          searchOverlayExpanded ? 'rounded-t-lg' : 'rounded-lg',
          searchOverlayExpanded ? 'border-b-0' : 'border-b-2',
        )}
      >
        <SearchInput
          searchIcon="primary"
          placeholder="Search..."
          onFocus={() => dispatch(expandSearchOverlay())}
        />
      </div>

      <div className="h-0">
        <SearchDropdown
          isShown={isShown}
          innerOverlayStyle={innerOverlayStyle}
        />
      </div>
    </div>
  );
}
