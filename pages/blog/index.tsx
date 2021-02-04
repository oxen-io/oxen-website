import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import { ArticleCard } from '../../components/cards/ArticleCard';
import { CardGrid } from '../../components/cards/CardGrid';
import { BlogApi } from '../../services/blog';
import { generateTitle } from '../../utils/metadata';

export async function getServerSideProps(context) {
  const api = new BlogApi();
  const posts = await api.fetchBlogEntries();

  console.log('index ➡️   posts:', posts);
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
