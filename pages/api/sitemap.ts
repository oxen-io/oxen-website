import { CMS, METADATA, NAVIGATION } from '@/constants';
import { NextApiRequest, NextApiResponse } from 'next';

import { CmsApi } from '@/services/cms';
import { IPost } from '@/types/cms';
import { SideMenuItem } from '@/state/navigation';
import getConfig from 'next/config';
import { isLocal } from '@/utils/links';
import { readdirSync } from 'fs';

interface IRedirection {
  source: string;
  destination: string;
  permanent: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cms = new CmsApi();

  const baseUrl = {
    development: 'http://localhost:3000',
    test: 'http://localhost:3000',
    production: METADATA.HOST_URL,
  }[process.env.NODE_ENV];

  const staticPages = readdirSync('pages')
    .filter(page => {
      return ![
        '.DS_Store',
        '_app.tsx',
        '_document.tsx',
        '_error.tsx',
        '404.tsx',
        '[page].tsx',
        'sitemap.xml.tsx',
        'roadmap.tsx',
        'faq.tsx',
        'api',
        'tag',
        'preview',
      ].includes(page);
    })
    .map(pagePath => {
      if (pagePath.includes('index')) {
        pagePath = '';
      } else {
        pagePath = pagePath.split('.tsx')[0];
      }
      return `${baseUrl}/${pagePath}`;
    });

  const navigationPages = Object.keys(NAVIGATION.SIDE_MENU_ITEMS)
    .filter(url => {
      return isLocal(NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem[url]].href);
    })
    .map(key => {
      return `${baseUrl}${NAVIGATION.SIDE_MENU_ITEMS[SideMenuItem[key]].href}`;
    });

  const redirectPages = getConfig().serverRuntimeConfig.redirects.map(
    (redirect: IRedirection) => {
      if (redirect.source.includes(':slug')) {
        return '';
      } else {
        return `${baseUrl}${redirect.source}`;
      }
    },
  );

  const _blogPages: IPost[] = [];
  let currentPage = 1;
  let foundAllPosts = false;

  // Contentful only allows 100 at a time
  while (!foundAllPosts) {
    const { entries: _posts } = await cms.fetchBlogEntries(100, currentPage);

    if (_posts.length === 0) {
      foundAllPosts = true;
      continue;
    }

    _blogPages.push(..._posts);
    currentPage++;
  }

  const blogPages = _blogPages.map(page => {
    return {
      url: `${baseUrl}/blog/${page.slug}`,
      published: page.publishedDateISO,
    };
  });

  const bloglistPages = [];
  const totalBlogPages = currentPage + 1;

  for (let i = 1; i <= totalBlogPages; i++) {
    bloglistPages.push(`${baseUrl}/blog/${i}`);
  }

  const devUpdateUrl = `${baseUrl}/tag/dev-update`;
  const { entries, total } = await cms.fetchBlogEntriesByTag('dev-update');
  const pageCount = Math.ceil(total / CMS.BLOG_RESULTS_PER_PAGE);
  const devUpdatePages = [devUpdateUrl];

  for (let i = 1; i <= pageCount; i++) {
    devUpdatePages.push(`${devUpdateUrl}/${i}`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[
        ...staticPages,
        ...navigationPages,
        ...redirectPages,
        ...bloglistPages,
        ...devUpdatePages,
      ]
        .map(url => {
          return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
        })
        .join('')}
      ${blogPages
        .map(post => {
          return `
            <url>
              <loc>${post.url}</loc>
              <lastmod>${post.published}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
