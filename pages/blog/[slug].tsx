// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Article } from '../../components/article/Article';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType, setPostTitle } from '../../state/navigation';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';

interface IPath {
  params: { slug: string };
}

export async function getStaticPaths() {
  // Get paths to all pages
  // Hardcoded in navigation constants.
  // Contentful can edit entries but cannot add/remove
  // without touching code.
  const api = new CmsApi();
  const { posts } = await api.fetchBlogEntries();

  const paths: IPath[] = posts.map(item => ({
    params: { slug: item.slug },
  }));

  console.log('[slug] ➡️ paths:', paths);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const api = new CmsApi();
  const post = await api.fetchBlogBySlug(String(params?.slug) ?? '');

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}

// Parallax on bg as mouse moves
function Post({ post }: { post: IPost }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.POST));
    dispatch(setPostTitle(post.title));
  }, []);

  return (
    <>
      <Head>
        <title>{generateTitle(post?.title)}</title>
      </Head>

      <div className="bg-alt">
        <Article {...post} />
      </div>
    </>
  );
}

export default Post;
