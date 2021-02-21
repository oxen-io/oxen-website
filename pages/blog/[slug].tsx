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
  const api = new CmsApi();
  let posts: IPost[] = [];
  let page = 1;
  let foundAllPosts = false;

  // Contentful only allows 100 at a time
  try {
    while (!foundAllPosts) {
      const { posts: _posts } = await api.fetchBlogEntries(100, page);

      if (_posts.length === 0) {
        foundAllPosts = true;
        continue;
      }

      posts = [...posts, ..._posts];
      page++;
    }

    const paths: IPath[] = posts.map(item => ({
      params: { slug: item.slug },
    }));

    return { paths, fallback: true };
  } catch (e) {
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  console.log(`Building page: ${params.slug}`);

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

  const pageTitle = generateTitle(post?.title);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          property="og:image"
          content={post.featureImage.imageUrl}
          key="ogimage"
        />
        <meta property="og:site_name" content="oxen.io" key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={post.description}
          key="ogdesc"
        />
      </Head>

      <div className="bg-alt">
        <Article {...post} />
      </div>
    </>
  );
}

export default Post;
