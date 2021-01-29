import React from 'react';
import { ArticleCard } from '../components/cards/ArticleCard';
import { IPost } from '../types/blog';

export function postsToCards(posts: Array<IPost>) {
  const cards = posts
    ? posts.slice(0, 4).map(post => <ArticleCard key={post.id} {...post} />)
    : [];

  return cards;
}
