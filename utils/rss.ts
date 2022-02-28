import { mkdirSync, writeFileSync } from 'fs';

import { Feed } from 'feed';
import { IPost } from '@/types/cms';
import { METADATA } from '@/constants';

const baseUrl = METADATA.HOST_URL;
const date = new Date();
const feed = new Feed({
  title: METADATA.TITLE,
  description: METADATA.DESCRIPTION,
  id: `${baseUrl}/`,
  link: baseUrl,
  language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: `${baseUrl}/android-chrome-192x192.png`,
  favicon: `${baseUrl}/favicon.ico`,
  copyright: `All rights reserved ${date.getFullYear()}, OPTF`,
  updated: date, // optional, default = today
  generator: 'Next.js using Feed for Node.js', // optional, default = 'Feed for Node.js'
  feedLinks: {
    rss2: `${baseUrl}/rss/feed.xml`,
    json: `${baseUrl}/rss/feed.json`,
    atom: `${baseUrl}/rss/atom.xml`,
  },
});

METADATA.TAGS.forEach(tag => {
  feed.addCategory(tag);
});

export default function generateRSSFeed(posts: IPost[]) {
  posts.forEach(post => {
    const postLink = `${baseUrl}/blog/${post.slug}`;
    const postContent = `<p>${post.description}</p><p><a href="${postLink}">Read more</a></p>`;
    feed.addItem({
      title: post.title,
      id: postLink,
      link: postLink,
      description: post.description,
      content: postContent,
      date: new Date(post.publishedDate),
    });
  });

  mkdirSync(`./public/rss`, { recursive: true });
  writeFileSync(`./public/rss/feed.xml`, feed.rss2(), {
    encoding: 'utf-8',
    flag: 'w',
  });
  writeFileSync(`./public/rss/feed.json`, feed.json1(), {
    encoding: 'utf-8',
    flag: 'w',
  });
  writeFileSync(`./public/rss/atom.xml`, feed.atom1(), {
    encoding: 'utf-8',
    flag: 'w',
  });
}
