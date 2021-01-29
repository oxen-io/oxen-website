import { IPost } from '../../types/blog';

export const initialArticleState: IPost | Record<string, unknown> = {};

export enum ArticleActions {
  SET_ARTICLE = 'SET_ARTICLE',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //

export const setArticle = (article: IPost) => ({
  type: ArticleActions.SET_ARTICLE,
  payload: article,
});

export interface ArticleAction {
  type: ArticleActions;
  payload: any;
}

export const articleReducer = (
  state: IPost | Record<string, unknown> = initialArticleState,
  action: ArticleAction,
): IPost | Record<string, unknown> => {
  switch (action.type) {
    case ArticleActions.SET_ARTICLE: {
      return { ...action.payload };
    }
    default:
      return state;
  }
};
