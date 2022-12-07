import '@/common/styles/global.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthGuard } from '@/AuthComponents/AuthGuard';
import { persistor, store } from '@/redux/store';

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export default function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} />
        )}
      </PersistGate>
    </Provider>
  );
}
