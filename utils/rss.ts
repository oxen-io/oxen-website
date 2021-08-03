import { Feed } from 'feed';
import { mkdirSync, writeFileSync } from 'fs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { IPost } from '../types/cms';
import { METADATA } from '../constants';

const baseUrl = METADATA.OXEN_HOST_URL;
// TODO decide on categories
const categories = [
  'Privacy',
  'co-op',
  'Community contribution',
  'decentralisation',
  'decentralised',
  // 'messaging',
  // 'Private messaging',
];
const date = new Date();
const feed = new Feed({
  title: METADATA.TITLE_SUFFIX,
  description: METADATA.SITE_META_DESCRIPTION,
  id: baseUrl,
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
categories.forEach(category => {
  feed.addCategory(category);
});

export default function generateRSSFeed(posts: IPost[]) {
  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: `${baseUrl}/blog/${post.slug}`,
      description: post.description,
      content: documentToHtmlString(post.body),
      date: new Date(post.publishedDate),
    });
  });

  mkdirSync(`./public/rss`, { recursive: true });
  writeFileSync(`./public/rss/feed.xml`, feed.rss2());
  writeFileSync(`./public/rss/feed.json`, feed.json1());
  writeFileSync(`./public/rss/atom.xml`, feed.atom1());
}
