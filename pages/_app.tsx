import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';
import '../assets/style.scss';
import Layout from '../components/layout';
import { METADATA, NAVIGATION } from '../constants';
import ScreenProvider from '../contexts/screen';
import {
  collapseMobileHeader,
  collapseSideMenu,
  PageType,
  setPageType,
} from '../state/navigation';
import { rootReducer } from '../state/reducers';

const store = createStore(rootReducer);

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleLocationChange = url => {
    // Break out of split view
    const onBlog = NAVIGATION.BLOG_REGEX.test(url);
    const onPost = NAVIGATION.POST_REGEX.test(url);

    const pageType = onBlog
      ? PageType.BLOG
      : onPost
      ? PageType.POST
      : PageType.NORMAL;

    store.dispatch(setPageType(pageType));
    store.dispatch(collapseSideMenu());
    store.dispatch(collapseMobileHeader());
  };

  useEffect(() => {
    // Set all pages on app load
    // store.dispatch(setSplitPagesContent(pages));
    store.dispatch(collapseSideMenu());
    handleLocationChange(router.pathname);
  }, []);

  // Close side menu on page changed
  useEffect(() => {
    router.events.on('routeChangeComplete', handleLocationChange);

    return () => {
      router.events.off('routeChangeComplete', handleLocationChange);
    };
  }, []);

  return (
    <>
      <StoreProvider store={store}>
        <ScreenProvider>
          <Head>
            <title>{METADATA.TITLE_SUFFIX}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1"
            ></meta>
            <meta property="og:site_name" content="Oxen" key="ogsitename" />
            <meta property="og:locale" content="en_US" />
            <meta name="apple-itunes-app" content="app-id=1547745078" />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ScreenProvider>
      </StoreProvider>
    </>
  );
}

export default App;
