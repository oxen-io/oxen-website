import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useKey } from 'react-use';
import { ScreenContext } from '../../contexts/screen';
import { collapseSearchOverlay } from '../../state/navigation';
import { SearchOverlayBackdrop } from './SearchOverlayBackdrop';
import { SearchOverlayMobile } from './SearchOverlayMobile';

// Search overlay includes the backdrop and the mobile overlay.
// Search dropdown is desktop only and is rendered per component
export function SearchOverlay() {
  const { isMobile } = useContext(ScreenContext);
  const dispatch = useDispatch();

  // Close on escape
  useKey('Escape', () => dispatch(collapseSearchOverlay()));

  return <>{isMobile ? <SearchOverlayMobile /> : <SearchOverlayBackdrop />}</>;
}
