const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withSvgr = require('@newhighsco/next-plugin-svgr');

// Statically exported: the web server must apply headers, redirects and
// rewrites (see README).
const nextConfig = {
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT_ID: process.env.CONTENTFUL_ENVIRONMENT_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  images: {
    // next export has no image optimizer; every <Image> must set `unoptimized`.
    loader: 'custom',
  },
};

module.exports = withPlugins([withFonts, withSvgr], nextConfig);
