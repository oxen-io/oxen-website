import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // <- needed if using firestore
import { IFirestore } from '../../constants/firebase';
import { IPost } from '../../types/blog';
import { INavigation } from '../navigation';
import { ISearch } from '../search';
import { articleReducer } from './article';
import { navigationReducer } from './navigation';
import { searchReducer } from './search';

export interface IState {
  navigation: INavigation;
  search: ISearch;
  article: IPost;
  firestore: IFirestore;
}

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  search: searchReducer,
  article: articleReducer,

  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});
