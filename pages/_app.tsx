import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';

import '../assets/style.css';
import { NAVIGATION } from '../constants';
import ScreenProvider from '../contexts/screen';
import {
  collapseMobileHeader,
  collapseSideMenu,
  PageType,
  setPageType,
} from '../state/navigation';
import { rootReducer } from '../state/reducers';

import CustomHead from '../components/CustomHead';
import Layout from '../components/layout';

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
          <CustomHead />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ScreenProvider>
      </StoreProvider>
    </>
  );
}

export default App;
