import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { UI } from '../../constants';
import { collapseSearchOverlay } from '../../state/navigation';
import { IState } from '../../state/reducers';

export function SearchOverlayBackdrop() {
  const navigationState = useSelector((state: IState) => state.navigation);
  const dispatch = useDispatch();

  const { searchOverlayExpanded } = navigationState;
  const onClickAway = () => {
    if (searchOverlayExpanded) {
      dispatch(collapseSearchOverlay());
    }
  };

  return (
    <div
      onClick={onClickAway}
      style={{ zIndex: searchOverlayExpanded ? UI.Z_INDEX_SEARCH_OVERLAY : -1 }}
      className={classNames(
        'fixed',
        'bottom-0',
        'left-0',
        'right-0',
        'h-full',
        'w-full',
        'bg-white',
        'bg-opacity-75',
        'transition-opacity',
        searchOverlayExpanded ? 'opacity-100' : 'opacity-0',
      )}
    ></div>
  );
}
