export enum ModalInstance {
  LOGIN = 'LOGIN',
}

export interface INavigation {
  mobileMenuExpanded: boolean;
  searchOverlayExpanded: boolean;
  openedModal: ModalInstance | null;
}

export const initialNavigationState: INavigation = {
  mobileMenuExpanded: false,
  searchOverlayExpanded: false,
  openedModal: null,
};

export enum NavigationActions {
  EXPAND_MOBILE_MENU = 'EXPAND_MOBILE_MENU',
  COLLAPSE_MOBILE_MENU = 'COLLAPSE_MOBILE_MENU',
  TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU',
  EXPAND_SEARCH_OVERLAY = 'EXPAND_SEARCH_OVERLAY',
  COLLAPSE_SEARCH_OVERLAY = 'COLLAPSE_SEARCH_OVERLAY',
  TOGGLE_SEARCH_OVERLAY = 'TOGGLE_SEARCH_OVERLAY',
  SET_MODAL_IS_OPEN = 'SET_MODAL_IS_OPEN',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //
export const expandMobileMenu = () => ({
  type: NavigationActions.EXPAND_MOBILE_MENU,
});

export const collapseMobileMenu = () => ({
  type: NavigationActions.COLLAPSE_MOBILE_MENU,
});

export const toggleMobileMenu = () => ({
  type: NavigationActions.TOGGLE_MOBILE_MENU,
});

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
