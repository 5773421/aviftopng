import { Html, Head, Main, NextScript } from 'next/document'
import GoogleAnalytics from '@/components/GoogleAnalytics';
// @ts-ignore
// import { Analytics } from '@vercel/analytics/react';
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <GoogleAnalytics id='G-SSJCGDRTHM' />
      {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2474433659735494" crossOrigin="anonymous"></script> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
