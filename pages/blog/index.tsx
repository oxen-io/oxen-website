import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import { Article } from '../../components/article/Article';
import { Contained } from '../../components/Contained';
import { BlogApi } from '../../services/blog';
import { generateTitle } from '../../utils/metadata';

export async function getServerSideProps(context) {
  const api = new BlogApi();
  const posts = await api.fetchBlogEntries();
  return { props: { posts } };
}

const Blog = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { posts } = props;

  console.log('index ➡️ posts:', posts);

  return (
    <div>
      <Head>
        <title>{generateTitle('Blog')}</title>
      </Head>

      <div className="flex flex-col w-full space-y-10">
        <Contained>
          <div className="flex justify-center items-baseline space-x-6 space-y-4 mt-6 mb-16">
            {posts?.map(post => (
              <Article key={post.id} {...post} />
            ))}
          </div>
        </Contained>
      </div>
    </div>
  );
};

export default Blog;
