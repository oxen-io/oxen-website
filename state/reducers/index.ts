import { combineReducers } from 'redux';
import { IPost } from '../../types/cms';
import { INavigation } from '../navigation';
import { articleReducer } from './article';
import { navigationReducer } from './navigation';

export interface IState {
  navigation: INavigation;
  article: IPost;
}

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  article: articleReducer,
});
