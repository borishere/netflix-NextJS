import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>{'siteTitle'}</title>
      </Head>

      <div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {}
  };
}
