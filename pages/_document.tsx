import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class CustomDocument extends Document<any> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico"></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            key="rss-feed"
            rel="alternative"
            type="application/rss+xml"
            title="RSS feed for just-be.dev"
            href="/feed"
          />
          <link
            key="atom-feed"
            rel="alternative"
            type="application/atom+xml"
            title="Atom feed for just-be.dev"
            href="/feed/atom"
          />
          <link
            key="json-feed"
            rel="alternative"
            type="application/feed+json"
            title="JSON feed for just-be.dev"
            href="/feed/json"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />

          {this.props?.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
