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
import { CmsApi } from '../services/cms';
import {
  collapseSideMenu,
  setSideMenuSplit,
  setSplitPagesContent,
} from '../state/navigation';
import { rootReducer } from '../state/reducers';

const store = createStore(rootReducer);

function App({ Component, pageProps }: AppProps) {
  const { pages } = pageProps;
  const router = useRouter();

  const handleLocationChange = url => {
    // Break out of split view
    const split = !NAVIGATION.OVERLAY_PAGE_REGEX.test(url);
    store.dispatch(setSideMenuSplit(split));
    store.dispatch(collapseSideMenu());
  };

  useEffect(() => {
    // Set all pages on app load
    store.dispatch(setSplitPagesContent(pages));
    store.dispatch(collapseSideMenu());
    handleLocationChange(router.pathname);

    console.log('NAVIGATION.OVERLAY_PAGE_REGEX', NAVIGATION.OVERLAY_PAGE_REGEX);
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
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ScreenProvider>
      </StoreProvider>
    </>
  );
}

App.getInitialProps = async () => {
  const api = new CmsApi();
  const pages = await api.fetchPageEntries();

  return { pageProps: { pages } };
};

export default App;
