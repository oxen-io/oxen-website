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
    case NavigationActions.EXPAND_SIDE_MENU: {
      return { ...state, sideMenuExpanded: true };
    }
    case NavigationActions.COLLAPSE_SIDE_MENU: {
      return { ...state, sideMenuExpanded: false };
    }
    case NavigationActions.SET_SIDE_MENU_ACTIVE: {
      return { ...state, sideMenuActive: action.payload };
    }
    default:
      return state;
  }
};
