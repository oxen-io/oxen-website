/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withSvgr = require('next-svgr');

const nextConfig = {
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  images: {
    domains: ['downloads.ctfassets.net', 'images.ctfassets.net'],
  },
  serverRuntimeConfig: {
    redirects: [
      {
        source: '/blog/session-the-road-to-monetisation-and-oxen-value-capture',
        destination: '/blog/session-the-road-to-monetisation',
        permanent: true,
      },
    ],
  },
  async redirects() {
    return this.serverRuntimeConfig.redirects;
  },
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/feed/rss',
      },
      {
        source: '/feed/:slug',
        destination: '/api/feed/:slug',
      },
      // Redirects blog posts i.e. https://oxen.io/blog/hello or https://oxen.io/blog/hello-world
      // Ignores page results i.e. https://oxen.io/blog/1
      {
        source: '/blog/:slug((?:[\\w]{1,}[\\-]{1,}).*|[\\D]{1,})',
        destination: '/:slug',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = withPlugins([withFonts, withSvgr], nextConfig);
