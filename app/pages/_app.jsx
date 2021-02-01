import React from "react";
import "tailwindcss/tailwind.css";

function WebalizerApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default WebalizerApp;
