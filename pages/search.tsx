// import { useRouter } from 'next/router';
// import React, { useContext, useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import { ArticleCardRow } from '../components/cards/ArticleCardRow';
// import { Contained } from '../components/Contained';
// import { SectionTitle } from '../components/SectionTitle';
// import { Title } from '../components/Title';
// import { METADATA, SEARCH } from '../constants';
// import { ScreenContext } from '../contexts/screen';

// interface Props {
//   sanityQuery: string;
//   posts: ISanityArticle[];
//   totalCount: number;
//   currentPage: number;
// }

// interface ISanityPageResults {
//   posts: ISanityArticle[];
//   count: number;
// }

// function Search(props: Props) {
//   const posts = props.posts.map(p => buildArticleInfo(p));

//   const { isMobile } = useContext(ScreenContext);

//   const router = useRouter();
//   const [isLoading, setLoading] = useState(false); //State for loading indicator
//   const startLoading = () => setLoading(true);
//   const stopLoading = () => setLoading(false);

//   const [topPosts, setTopPosts] = useState([] as ISanityArticle[]);

//   useEffect(() => {
//     const getPosts = async () => {
//       const posts = await getTopPosts(4);
//       setTopPosts(posts);
//     };

//     getPosts();
//   }, []);

//   // Since requests happens after chaning routes url ?page={n} we need to bind loading events
//   // on the router change event.
//   useEffect(() => {
//     //Setting router event handlers after component is located
//     router.events.on('routeChangeStart', startLoading);
//     router.events.on('routeChangeComplete', stopLoading);

//     return () => {
//       router.events.off('routeChangeStart', startLoading);
//       router.events.off('routeChangeComplete', stopLoading);
//     };
//   }, []);

//   const paginationHandler = page => {
//     const currentPath = router.pathname;

//     //Copy current query to avoid its removing
//     const currentQuery = { ...router.query };
//     currentQuery.page = page.selected + 1;

//     router.push({
//       pathname: currentPath,
//       query: currentQuery,
//     });
//   };

//   //
//   //
//   //
//   //
//   // USING QUERY          ?s=
//   // OR USING CITY        ?city=
//   // OR USING CATEGORY`    ?category=
//   //
//   //
//   //
//   //

//   const pageCount = Math.ceil(props.totalCount / SEARCH.SEARCH_ITEMS_PER_PAGE);
//   const showPagination = posts.length > 0 && pageCount > 1;

//   console.log('search ➡️ pageCount:', pageCount);
//   console.log('search ➡️ props.totalCount:', props.totalCount);

//   return (
//     <div>
//       <title>{METADATA.TITLE_SUFFIX}</title>

//       <div className="relative w-full mt-6 mb-12">
//         {isMobile ? (
//           <>
//             {/* <SearchBackdropMobileSVG
//               style={{
//                 width: '150%',
//                 transform: 'translateX(-18%)',
//               }}
//             /> */}
//             <div className="absolute inset-0 flex justify-center items-center">
//               <Title level={1} className="font-roboto text-primary">
//                 {posts.length > 0 ? 'Search Results' : 'Nothing Found'}
//               </Title>
//             </div>
//           </>
//         ) : (
//           <Contained>
//             {/* <SearchBackdropDesktopSVG className="w-full" /> */}
//             <div className="absolute inset-0 flex justify-center items-center">
//               <Title level={1} className="font-roboto text-primary">
//                 {posts.length > 0 ? 'Search Results' : 'Nothing Found'}
//               </Title>
//             </div>
//           </Contained>
//         )}
//       </div>

//       <Contained>
//         <div className="flex flex-col space-y-8">
//           {posts.map(post => (
//             <ArticleCardRow key={post.slug} {...post} />
//           ))}
//         </div>

//         {showPagination && (
//           <div className="mobile:mt-12 mt-8">
//             <ReactPaginate
//               previousLabel={'<'}
//               nextLabel={'>'}
//               breakLabel={'...'}
//               breakClassName={'break-me'}
//               activeClassName={'active'}
//               containerClassName={'pagination'}
//               subContainerClassName={''}
//               initialPage={props.currentPage - 1}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={paginationHandler}
//             />
//           </div>
//         )}
//       </Contained>

//       <div className="mt-12 mb-12">
//         <Contained>
//           <SectionTitle>Didn't find what you were looking for?</SectionTitle>
//         </Contained>
//       </div>
//     </div>
//   );
// }

// // Search.getInitialProps = async ({ query }): Promise<Props> => {
// //   const page = query.page ?? 1;
// //   const { s: encodedSearchQuery } = query;
// //   const searchQuery = decodeURI(encodedSearchQuery);

// //   let posts: ISanityArticle[] = [];
// //   let totalCount = 0;

// //   const resultsStart = SEARCH.SEARCH_ITEMS_PER_PAGE * (page - 1);
// //   const resultsEnd = resultsStart + SEARCH.SEARCH_ITEMS_PER_PAGE;

// //   const specifier = `*[_type == "post" && (title match "*${searchQuery}*" || description match "${searchQuery}*" || "${searchQuery}*" || category match "${searchQuery}*")]`;
// //   const sanityQuery = `
// //     *[][0]{
// //       "posts": ${specifier}[${resultsStart}..${resultsEnd}]{
// //         ${sanityPostQuery}
// //       },
// //       "count": count(${specifier})
// //     }
// //   `;

// //   if (searchQuery) {
// //     try {
// //       const results: ISanityPageResults = await client.fetch(sanityQuery);

// //       if (results?.posts?.length) {
// //         posts = results.posts;
// //         totalCount = results.count;
// //       }
// //     } catch (error) {
// //       console.warn('Error: ', error);
// //     }
// //   }

// //   return {
// //     posts,
// //     sanityQuery,
// //     totalCount,
// //     currentPage: page,
// //   };
// // };

// export default Search;
