// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Article } from '../../components/article/Article';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType, setPostTitle } from '../../state/navigation';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';

export async function getServerSideProps({ params }) {
  const api = new CmsApi();
  const post = await api.fetchBlogBySlug(String(params?.slug) ?? '');

  if (!post) {
    return {
      props: undefined,
      notFound: true,
    };
  }

  return { props: { post } };
}

function Post({ post }: { post: IPost }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.POST));
    dispatch(setPostTitle(post.title));
  }, []);

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
