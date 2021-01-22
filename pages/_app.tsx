import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
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
import { collapseSearchOverlay } from '../state/navigation';
import { rootReducer } from '../state/reducers';

// if (!firebase.apps.length) {
//   // Initialize firebase instance
//   firebase.initializeApp(FIREBASE.CLIENT_CONFIG);

//   // Initialize other services on firebase instance
//   firebase.firestore();
//   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
// }

const store = createStore(rootReducer);

// const rrfProps = {
//   firebase,
//   config: FIREBASE.RRF_CONFIG,
//   dispatch: store.dispatch,
//   createFirestoreInstance,
// };

function App({ Component, pageProps }: AppProps) {
  // Close search overlay on page changed
  const location = useLocation();
  useEffect(() => {
    store.dispatch(collapseSearchOverlay());
  }, [location.pathname, location.search]);

  // const { info } = useGetInfo();

  return (
    <StoreProvider store={store}>
      <ScreenProvider>
        <Head>
          <title>{METADATA.TITLE_SUFFIX}</title>
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ScreenProvider>
    </StoreProvider>
  );
}

export default App;
