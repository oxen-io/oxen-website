// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Article } from '../../components/article/Article';
import { setArticle } from '../../state/reducers/article';
import { IArticle } from '../../types/article';
import { generateTitle } from '../../utils/metadata';

// export const getServerSideProps: GetServerSideProps = async context => {
//   const article = await getArticleBy('slug', String(context.query.slug) ?? '');

//   // Redirect to 404 for nonexistent page
//   if (!article) {
//     return {
//       props: undefined,
//       notFound: true,
//     };
//   }

//   return {
//     props: article,
//   };
// };

function Post(props: IArticle) {
  const dispatch = useDispatch();
  dispatch(setArticle(props));

  // Scroll to top on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{generateTitle(props.title)}</title>
      </Head>

      <Article {...props} />
    </>
  );
}

export default Post;
