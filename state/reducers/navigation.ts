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
    case NavigationActions.SET_SIDE_MENU_SPLIT: {
      return { ...state, sideMenuSplit: action.payload };
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
    default:
      return state;
  }
};
