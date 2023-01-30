import '@/common/styles/global.css';
import "nprogress/nprogress.css";

import NProgress from "nprogress";
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthGuard } from '@/AuthComponents/AuthGuard';
import { persistor, store } from '@/redux/store';
import { Router } from 'next/router';

NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
          //// public page
          <Component {...pageProps} />
        )}
      </PersistGate>
    </Provider>
  );
}
