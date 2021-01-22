import { IArticle } from '../../types/article';

export const initialArticleState: IArticle | Record<string, unknown> = {};

export enum ArticleActions {
  SET_ARTICLE = 'SET_ARTICLE',
}

// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //

export const setArticle = (article: IArticle) => ({
  type: ArticleActions.SET_ARTICLE,
  payload: article,
});

export interface ArticleAction {
  type: ArticleActions;
  payload: any;
}

export const articleReducer = (
  state: IArticle | Record<string, unknown> = initialArticleState,
  action: ArticleAction,
): IArticle | Record<string, unknown> => {
  switch (action.type) {
    case ArticleActions.SET_ARTICLE: {
      return { ...action.payload };
    }
    default:
      return state;
  }
};
