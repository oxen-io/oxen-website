const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
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
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  },
};

module.exports = withPlugins([withSass, withFonts, withSvgr], nextConfig);
