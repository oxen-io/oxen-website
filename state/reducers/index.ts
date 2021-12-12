import { INavigation } from '@/state/navigation';
import { IPost } from '@/types/cms';
import { articleReducer } from '@/state/reducers/article';
import { combineReducers } from 'redux';
import { navigationReducer } from '@/state/reducers/navigation';

export interface IState {
  navigation: INavigation;
  article: IPost;
}

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  article: articleReducer,
});
