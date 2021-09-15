// [slug].js
import { GetStaticPaths } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Article } from '../../components/article/Article';
import { CMS } from '../../constants';
import { CmsApi, generateLinkMeta } from '../../services/cms';
import { PageType, setPageType, setPostTitle } from '../../state/navigation';
import { IPost } from '../../types/cms';
import { generateTitle, generateURL } from '../../utils/metadata';

interface IPath {
  params: { slug: string };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cms = new CmsApi();
  let posts: IPost[] = [];
  let page = 1;
  let foundAllPosts = false;

  // Contentful only allows 100 at a time
  while (!foundAllPosts) {
    const { entries: _posts } = await cms.fetchBlogEntries(100, page);

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

  return { paths, fallback: 'blocking' };
};

export async function getStaticProps({ params }) {
  try {
    console.log(`Building page: %c${params.slug}`, 'color: purple;');

    const cms = new CmsApi();
    const post = await cms.fetchEntryBySlug(String(params?.slug) ?? '', 'post');
    // embedded links in post body need metadata for preview
    post.body = await generateLinkMeta(post.body);
    const url = generateURL(params?.slug ? `/blog/${params?.slug}` : '/blog');

    return {
      props: {
        post,
        url,
      },
      revalidate: CMS.CONTENT_REVALIDATE_RATE,
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
      revalidate: CMS.CONTENT_REVALIDATE_RATE,
    };
  }
}

// Parallax on bg as mouse moves
function Post({ post, url }: { post: IPost; url: string }) {
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

export default Post;
