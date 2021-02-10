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
  pageType: PageType;
  postTitle?: string;
  headerCollapsed: boolean;
  sideMenuExpanded: boolean;
  headerMobileMenuExpanded: boolean;
  pages?: TPages;
}

export enum PageType {
  NORMAL = 'NORMAL',
  BLOG = 'BLOG',
  POST = 'POST',
}

export const initialNavigationState: INavigation = {
  // Side menu expanded only toggles for mobile.
  // On desktop it's always open (if it fits).
  pageType: PageType.NORMAL,
  postTitle: undefined,
  headerCollapsed: true,
  sideMenuExpanded: false,
  headerMobileMenuExpanded: false,
};

export enum NavigationActions {
  SET_HEADER_COLLAPSED = 'SET_HEADER_COLLAPSED',
  SET_PAGE_TYPE = 'SET_PAGE_TYPE',
  SET_POST_TITLE = 'SET_POST_TITLE',
  EXPAND_SIDE_MENU = 'EXPAND_SIDE_MENU',
  COLLAPSE_SIDE_MENU = 'COLLAPSE_SIDE_MENU',
  SET_SPLIT_PAGES_CONTENT = 'SET_SPLIT_PAGES_CONTENT',
  EXPAND_MOBILE_HEADER_MENU = 'EXPAND_MOBILE_HEADER_MENU',
  COLLAPSE_MOBILE_HEADER_MENU = 'COLLAPSE_MOBILE_HEADER_MENU',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //
export const setHeaderCollapsed = (collapsed: boolean) => ({
  type: NavigationActions.SET_HEADER_COLLAPSED,
  payload: collapsed,
});

export const setPageType = (type: PageType) => ({
  type: NavigationActions.SET_PAGE_TYPE,
  payload: type,
});

// For sidebar title
export const setPostTitle = (title: string) => ({
  type: NavigationActions.SET_POST_TITLE,
  payload: title,
});

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

export const expandMobileHeaderMenu = () => ({
  type: NavigationActions.EXPAND_MOBILE_HEADER_MENU,
});

export const collapseMobileHeader = () => ({
  type: NavigationActions.COLLAPSE_MOBILE_HEADER_MENU,
});
