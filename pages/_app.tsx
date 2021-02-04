import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { useLocation } from 'react-use';
import { createStore } from 'redux';
import '../assets/style.scss';
import Layout from '../components/layout';
import { METADATA } from '../constants';
import ScreenProvider from '../contexts/screen';
import { collapseSideMenu } from '../state/navigation';
import { rootReducer } from '../state/reducers';

const store = createStore(rootReducer);

function App({ Component, pageProps }: AppProps) {
  // Close side menu on page changed
  const location = useLocation();
  useEffect(() => {
    store.dispatch(collapseSideMenu());
  }, [location.pathname, location.search]);

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

export default App;
