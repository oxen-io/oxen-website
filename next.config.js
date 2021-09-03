/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withSvgr = require('next-svgr');

const nextConfig = {
  webpack(config) {
    const rules = [{}];

    return {
      ...config,
      module: {
        ...config.module,
        rules: [...config.module.rules, ...rules],
      },
      node: {
        fs: 'empty',
      },
    };
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  images: {
    domains: ['downloads.ctfassets.net', 'images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/blog/session-the-road-to-monetisation-and-oxen-value-capture',
        destination: '/blog/session-the-road-to-monetisation',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/feed/rss',
      },
      {
        // The /:slug part is a generic parameter handler to catch all other cases
        source: '/feed/:slug',
        destination: '/api/feed/:slug',
      },
    ];
  },
};

module.exports = withPlugins([withFonts, withSvgr], nextConfig);
