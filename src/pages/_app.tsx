import React from 'react';
import { wrapper } from '../app/store';
import { AppProps } from 'next/app';
import '../styles/global.css';

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
