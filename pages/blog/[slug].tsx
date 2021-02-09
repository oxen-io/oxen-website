// [slug].js
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Article } from '../../components/article/Article';
import { CmsApi } from '../../services/cms';
import { setPostTitle } from '../../state/navigation';
import { IState } from '../../state/reducers';
import { IPost } from '../../types/cms';
import { generateTitle } from '../../utils/metadata';

export async function getServerSideProps({ params }) {
  const api = new CmsApi();
  const post = await api.fetchBlogBySlug(String(params.slug) ?? '');

  if (!post) {
    return {
      props: undefined,
      notFound: true,
    };
  }

  return { props: { post } };
}

function Post({ post }: { post: IPost }) {
  const { pageType, postTitle } = useSelector(
    (state: IState) => state.navigation,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPostTitle(postTitle));
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
