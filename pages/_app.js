import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {

  const FB_PIXEL = process.env.PIXEL_FB;
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <Script id="facebook-pixel">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL}');
          fbq('track', 'PageView');
        `}
      </Script>
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
      <ThemeProvider theme={theme}>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />    
      </ThemeProvider>
    </>
  )
}

export default MyApp
