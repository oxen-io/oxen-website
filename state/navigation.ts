export enum ModalInstance {
  LOGIN = 'LOGIN',
}

export interface INavigation {
  searchOverlayExpanded: boolean;
  openedModal: ModalInstance | null;
}

export const initialNavigationState: INavigation = {
  searchOverlayExpanded: false,
  openedModal: null,
};

export enum NavigationActions {
  EXPAND_SEARCH_OVERLAY = 'EXPAND_SEARCH_OVERLAY',
  COLLAPSE_SEARCH_OVERLAY = 'COLLAPSE_SEARCH_OVERLAY',
  TOGGLE_SEARCH_OVERLAY = 'TOGGLE_SEARCH_OVERLAY',
  SET_MODAL_IS_OPEN = 'SET_MODAL_IS_OPEN',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //
export const expandSearchOverlay = () => ({
  type: NavigationActions.EXPAND_SEARCH_OVERLAY,
});

export const collapseSearchOverlay = () => ({
  type: NavigationActions.COLLAPSE_SEARCH_OVERLAY,
});

export const toggleSearchOverlay = () => ({
  type: NavigationActions.TOGGLE_SEARCH_OVERLAY,
});

export const setCurrentOpenModal = (isOpen: boolean) => ({
  type: NavigationActions.SET_MODAL_IS_OPEN,
  payload: isOpen,
});
