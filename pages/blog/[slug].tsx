// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Article } from '../../components/article/Article';
import { BlogApi } from '../../services/blog';
import { IPost } from '../../types/blog';
import { generateTitle } from '../../utils/metadata';

export async function getServerSideProps({ params }) {
  const api = new BlogApi();
  const post = await api.fetchBlogBySlug(String(params.slug) ?? '');

  console.log('index ➡️   post:', post);

  if (!post) {
    return {
      props: undefined,
      notFound: true,
    };
  }

  return { props: post };
}

function Post(post: IPost) {
  // Scroll to top on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  console.log('[slug] ➡️   posts:', post);

  return (
    <>
      <Head>
        <title>{generateTitle(post.title)}</title>
      </Head>

      <Article {...post} />
    </>
  );
}

export default Post;
