import groq from 'groq';
import React from 'react';
import client from '../client';
import { ArticleCard } from '../components/cards/ArticleCard';
import { sanityPostQuery } from '../hooks/search';
import { ISanityArticle } from '../types/article';
import { titleCase } from './text';

export async function getCuisinePosts(category: string, limit: number) {
  const query = groq`
      *[_type == "post" && category->title match "${titleCase(category)}"][0..${
    limit ?? 100
  }]|order(publishedAt desc) {
        ${sanityPostQuery}
      }
    `;

  let posts: Array<ISanityArticle>;

  try {
    posts = await client.fetch(query);
    console.log('Posts', posts);
  } catch (error) {
    console.warn('Error:', error);
  }

  return posts;
}

export async function getTopPosts(limit?: number) {
  const query = groq`
    *[_type == "post"][0..${(limit ?? 100) - 1}]|order(publishedAt desc) {
      ${sanityPostQuery}
    }
  `;

  let posts: Array<ISanityArticle>;

  try {
    posts = await client.fetch(query);
    console.log('Posts', posts);
  } catch (error) {
    console.warn('Error:', error);
  }

  return posts;
}

export function postsToCards(posts: ISanityArticle[]) {
  const cards = posts
    ? posts.slice(0, 4).map(post => <ArticleCard key={post.id} {...post} />)
    : [];

  return cards;
}
