export enum ModalInstance {
  LOGIN = 'LOGIN',
}

export enum SideMenuItem {
  WHO_ARE_WE = 'WHO_ARE_WE',
  MISSION = 'MISSION',
  BUY_OXEN = 'BUY_OXEN',
  TOOLS = 'TOOLS',
  BUILD = 'BUILD',
  SUPPORT = 'SUPPORT',
  LEARN_MORE = 'LEARN_MORE',
  BLOG = 'BLOG',
}

export interface INavigation {
  sideMenuExpanded: boolean;
  sideMenuActive: SideMenuItem;
  mobileMenuExpanded: boolean;
  searchOverlayExpanded: boolean;
  openedModal: ModalInstance | null;
}

export const initialNavigationState: INavigation = {
  // Side menu expanded only toggles for mobile.
  // On desktop it's always open (if it fits).
  sideMenuExpanded: false,
  sideMenuActive: SideMenuItem.WHO_ARE_WE,
  mobileMenuExpanded: false,
  searchOverlayExpanded: false,
  openedModal: null,
};

export enum NavigationActions {
  EXPAND_SIDE_MENU = 'EXPAND_SIDE_MENU',
  SET_SIDE_MENU_ACTIVE = 'SET_SIDE_MENU_ACTIVE',
  COLLAPSE_SIDE_MENU = 'COLLAPSE_SIDE_MENU',
  OPEN_MOBILE_MENU = 'OPEN_MOBILE_MENU',
  CLOSE_MOBILE_MENU = 'CLOSE_MOBILE_MENU',
  TOGGLE_MOBILE_MENU = 'TOGGLE_MOBILE_MENU',
  EXPAND_SEARCH_OVERLAY = 'EXPAND_SEARCH_OVERLAY',
  COLLAPSE_SEARCH_OVERLAY = 'COLLAPSE_SEARCH_OVERLAY',
  TOGGLE_SEARCH_OVERLAY = 'TOGGLE_SEARCH_OVERLAY',
  SET_MODAL_IS_OPEN = 'SET_MODAL_IS_OPEN',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //
export const expandSideMenu = () => ({
  type: NavigationActions.EXPAND_SIDE_MENU,
});

export const setSideMenuActive = (active: SideMenuItem) => ({
  type: NavigationActions.SET_SIDE_MENU_ACTIVE,
  payload: active,
});

export const collapseSideMenu = () => ({
  type: NavigationActions.COLLAPSE_SIDE_MENU,
});

export const openMobileMenu = () => ({
  type: NavigationActions.OPEN_MOBILE_MENU,
});

export const closeMobileMenu = () => ({
  type: NavigationActions.CLOSE_MOBILE_MENU,
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
