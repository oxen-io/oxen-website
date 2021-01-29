// import groq from 'groq';
// import { useDispatch, useSelector } from 'react-redux';
// import client from '../client';
// import { IState } from '../state/reducers';
// import { setSearchResultItems } from '../state/search';
// import { IPost } from '../types/blog';

// export function useSearch() {
//   const searchState = useSelector((state: IState) => state.search);
//   const results = searchState?.searchResultItems ?? [];
//   const query = searchState.searchQuery ?? '';
//   const dispatch = useDispatch();

//   const search = async (query: string): Promise<Array<ISanityArticle>> => {
//     const sanityQuery = groq`*[_type == "post" && title match "${query}*"][0..5] {
//       ${sanityPostQuery}
//     }`;

//     let posts: IPost[];
//     try {
//       posts = await client.fetch(sanityQuery);
//     } catch (error) {
//       console.warn('Error: ', error);
//     }

//     const results = posts?.filter(post =>
//       // Ensure all values are present in each post
//       Object.values(post).every(value => Boolean(value)),
//     );
//     // .map(post => ({
//     //   ...post,
//     // }));

//     console.log('search ➡️ posts:', posts);
//     console.log('search ➡️ results:', results);

//     // throttledSetSearchResultItems(results);
//     dispatch(setSearchResultItems(results));
//     return results;
//   };

//   return { search, query, results };
// }
