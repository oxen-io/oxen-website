const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withSvgr = require('@newhighsco/next-plugin-svgr');

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' ${
    process.env.NODE_ENV == 'development' ? "'unsafe-eval' " : ''
  }'unsafe-inline' *.ctfassets.net *.youtube.com *.twitter.com;
  child-src 'self' *.ctfassets.net *.youtube.com player.vimeo.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src 'self' blob: data: *.ctfassets.net *.youtube.com *.twitter.com;
  media-src 'self' *.youtube.com;
  connect-src *;
  font-src 'self' blob: data: fonts.gstatic.com maxcdn.bootstrapcdn.com;
  worker-src 'self' blob:;
`;

function redirectSessionTokenPosts(postNameMap) {
  return postNameMap.flatMap(({ source, destination }) => {
    return ['', '/blog'].map(prefix => ({
      source: `${prefix}${source}`,
      destination: `https://token.getsession.org/blog${destination}`,
      permanent: true,
    }));
  });
}

const securityHeaders = () => {
  const headers = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Content-Security-Policy',
      value: ContentSecurityPolicy.replace(/\n/g, ''),
    },
  ];
  return headers;
};

const nextConfig = {
  env: {
    STAGING_SECRET: process.env.STAGING_SECRET,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT_ID: process.env.CONTENTFUL_ENVIRONMENT_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    MAILERLITE_API_KEY: process.env.MAILERLITE_API_KEY,
    MAILERLITE_GROUP_ID: process.env.MAILERLITE_GROUP_ID,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders(),
      },
    ];
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
      {
        source: '/new-ceo',
        destination: '/new-leadership-new-possibilities',
        permanent: true,
      },
      {
        source: '/blog/new-ceo',
        destination: '/blog/new-leadership-new-possibilities',
        permanent: true,
      },
      ...redirectSessionTokenPosts([
        {
          source: '/session-token-utility',
          destination: '/say-hello-to-session-token',
        },
        {
          source: '/genesis-distribution',
          destination: '/session-token-genesis-distribution',
        },
      ]),
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
