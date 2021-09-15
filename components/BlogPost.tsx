import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Article } from '../components/article/Article';
import { PageType, setPageType, setPostTitle } from '../state/navigation';
import { IPost } from '../types/cms';
import { generateTitle } from '../utils/metadata';

// Parallax on bg as mouse moves
export default function BlogPost({ post, url }: { post: IPost; url: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      dispatch(setPageType(PageType.POST));
      dispatch(setPostTitle(post.title));
    }
  }, []);

  const pageTitle = generateTitle(post?.title);
  const imageURL = post?.featureImage?.imageUrl;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={post?.description}></meta>
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={post?.description}
          key="ogdesc"
        />
        <meta property="og:type" content="article" />
        <meta name="image_src" content={imageURL} />
        <meta name="image_url" content={imageURL} />
        <meta name="keywords" content={post?.tags?.join(' ')} />
        <meta property="og:image" content={imageURL} key="ogimage" />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url}></link>{' '}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={post?.description} />
        <meta name="twitter:image" content={imageURL} />
      </Head>

      <div className="bg-alt">
        <Article {...post} />
      </div>
    </>
  );
}
