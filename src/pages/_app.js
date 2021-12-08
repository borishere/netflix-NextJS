import React from 'react';
import '../styles/styles.css';

const { wrapper } = require('../app/store');

export function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
