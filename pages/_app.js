import React from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Script from 'next/script';

function FacebookPixel() {
  React.useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('293052318402482');
        ReactPixel.pageView();

        Router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  });
  return null;
}

function MyApp({ Component, pageProps }) {

  // const FB_PIXEL = process.env.PIXEL_FB;
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <Script
        strategy='lazyOnload'
        id='GA-scriptOne'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        strategy='lazyOnload'
        id='GA-scriptTwo'
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <FacebookPixel />
      <ThemeProvider theme={theme}>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />    
      </ThemeProvider>
    </>
  )
}

export default MyApp
