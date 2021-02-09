import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ArticleCard } from '../../components/cards/ArticleCard';
import { ArticleCardFeature } from '../../components/cards/ArticleCardFeature';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';
import { CmsApi } from '../../services/cms';
import { PageType, setPageType } from '../../state/navigation';
import { generateTitle } from '../../utils/metadata';

export const getServerSideProps: GetServerSideProps = async context => {
  const api = new CmsApi();
  const posts = await api.fetchBlogEntries();

  // const { url } = context.req;
  // const onBlog = NAVIGATION.BLOG_REGEX.test(url);
  // const onPost = NAVIGATION.POST_REGEX.test(url);

  // const pageType = onBlog
  //   ? PageType.BLOG
  //   : onPost
  //   ? PageType.POST
  //   : PageType.NORMAL;

  return { props: { posts } };
};

const Blog = ({
  posts,
  pageType,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.BLOG));
  }, []);

  return (
    <div>
      <Head>
        <title>{generateTitle('Blog')}</title>
      </Head>

      <div className="flex flex-col w-full mt-6 space-y-10">
        <Contained>
          <ArticleCardFeature {...posts[0]} />
        </Contained>

        <CardGrid>
          {[...posts, ...posts, ...posts, ...posts, ...posts]?.map(post => (
            <ArticleCard key={post.id} {...post} />
          ))}
        </CardGrid>
      </div>
    </div>
  );
};

export default Blog;
