import Head from "next/head";
import React from "react";
import "tailwindcss/tailwind.css";

const WebalizerApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Webalizer</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Head>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

export default WebalizerApp;
