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
}

export const initialNavigationState: INavigation = {
  // Side menu expanded only toggles for mobile.
  // On desktop it's always open (if it fits).
  sideMenuExpanded: false,
  sideMenuActive: SideMenuItem.WHO_ARE_WE,
};

export enum NavigationActions {
  EXPAND_SIDE_MENU = 'EXPAND_SIDE_MENU',
  SET_SIDE_MENU_ACTIVE = 'SET_SIDE_MENU_ACTIVE',
  COLLAPSE_SIDE_MENU = 'COLLAPSE_SIDE_MENU',
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
