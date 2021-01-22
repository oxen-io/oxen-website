import * as contentful from 'contentful';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Article } from '../../components/article/Article';
import { Contained } from '../../components/Contained';
import { generateTitle } from '../../utils/metadata';

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Blog() {
  async function fetchEntries() {
    const entries = await client.getEntries();
    if (entries.items) {
      return entries.items;
    }

    console.log('Error getting entries');

    // console.log(`Error getting Entries for ${contentType.name}.`);
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      setPosts([...allPosts]);
    }
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>{generateTitle('Blog')}</title>
      </Head>

      <div className="flex flex-col w-full space-y-10">
        <Contained>
          <div className="flex justify-center items-baseline space-x-6 space-y-4 mt-6 mb-16">
            {posts.map(post => (
              <Article key={post.id} {...post} />
            ))}
          </div>
        </Contained>
      </div>
    </div>
  );
}
