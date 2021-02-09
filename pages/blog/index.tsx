import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import { ArticleCard } from '../../components/cards/ArticleCard';
import { ArticleCardFeature } from '../../components/cards/ArticleCardFeature';
import { CardGrid } from '../../components/cards/CardGrid';
import { Contained } from '../../components/Contained';
import { CmsApi } from '../../services/cms';
import { generateTitle } from '../../utils/metadata';

export async function getServerSideProps(context) {
  const api = new CmsApi();
  const posts = await api.fetchBlogEntries();

  console.log('index ➡️   posts:', posts);
  return { props: { posts } };
}

const Blog = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
