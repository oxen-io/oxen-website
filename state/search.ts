import { IPost } from '../types/blog';

export interface ISearch {
  searchQuery: string;
  searchBarPinnedToHeader: boolean;
  searchResultItems: Array<IPost>;
}

export const initialSearchState: ISearch = {
  searchQuery: '',
  searchResultItems: [],
  searchBarPinnedToHeader: false,
};

export enum SearchActions {
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULT_ITEMS = 'SET_SEARCH_RESULT_ITEMS',
  SET_SEARCH_BAR_PINNED_TO_HEADER = 'SET_SEARCH_BAR_PINNED_TO_HEADER',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //
export const setSearchResultItems = (payload: Array<IPost>) => ({
  type: SearchActions.SET_SEARCH_RESULT_ITEMS,
  payload,
});

export const setSearchQuery = (payload: string) => ({
  type: SearchActions.SET_SEARCH_QUERY,
  payload,
});

export const setSearchBarPinnedToHeader = (payload: boolean) => ({
  type: SearchActions.SET_SEARCH_BAR_PINNED_TO_HEADER,
  payload,
});
