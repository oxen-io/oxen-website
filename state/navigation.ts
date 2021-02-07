import { ISplitPage } from '../types/cms';

export enum SideMenuItem {
  WHO_ARE_WE = 'WHO_ARE_WE',
  MISSION = 'MISSION',
  TRADE = 'TRADE',
  TOOLS = 'TOOLS',
  BUILD = 'BUILD',
  SUPPORT = 'SUPPORT',
  LEARN_MORE = 'LEARN_MORE',
  BLOG = 'BLOG',
}

export type TPages = {
  [name: string]: ISplitPage;
};

export interface INavigation {
  sideMenuExpanded: boolean;
  pages?: TPages;
}

export const initialNavigationState: INavigation = {
  // Side menu expanded only toggles for mobile.
  // On desktop it's always open (if it fits).
  sideMenuExpanded: false,
};

export enum NavigationActions {
  EXPAND_SIDE_MENU = 'EXPAND_SIDE_MENU',
  COLLAPSE_SIDE_MENU = 'COLLAPSE_SIDE_MENU',
  SET_SPLIT_PAGES_CONTENT = 'SET_SPLIT_PAGES_CONTENT',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //
export const expandSideMenu = () => ({
  type: NavigationActions.EXPAND_SIDE_MENU,
});

export const collapseSideMenu = () => ({
  type: NavigationActions.COLLAPSE_SIDE_MENU,
});

export const setSplitPagesContent = (pages: TPages) => ({
  type: NavigationActions.SET_SPLIT_PAGES_CONTENT,
  payload: pages,
});
