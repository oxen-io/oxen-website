import {
  INavigation,
  initialNavigationState,
  NavigationActions,
} from '../navigation';

export interface NavigationAction {
  type: NavigationActions;
  payload: any;
}

export const navigationReducer = (
  state: INavigation = initialNavigationState,
  action: NavigationAction,
) => {
  switch (action.type) {
    case NavigationActions.SET_HEADER_COLLAPSED: {
      return { ...state, headerCollapsed: action.payload };
    }
    case NavigationActions.SET_PAGE_TYPE: {
      return { ...state, pageType: action.payload };
    }
    case NavigationActions.SET_POST_TITLE: {
      return { ...state, postTitle: action.payload };
    }
    case NavigationActions.EXPAND_SIDE_MENU: {
      return { ...state, sideMenuExpanded: true };
    }
    case NavigationActions.COLLAPSE_SIDE_MENU: {
      return { ...state, sideMenuExpanded: false };
    }
    case NavigationActions.SET_SPLIT_PAGES_CONTENT: {
      return { ...state, pages: action.payload };
    }
    case NavigationActions.EXPAND_MOBILE_HEADER_MENU: {
      return { ...state, headerMobileMenuExpanded: true };
    }
    case NavigationActions.COLLAPSE_MOBILE_HEADER_MENU: {
      return { ...state, headerMobileMenuExpanded: false };
    }
    default:
      return state;
  }
};
