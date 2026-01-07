import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Font Preloading - Performance optimization */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&family=Poppins:wght@200;300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
        {/* Resource Hints - Performance optimization */}
        {/* Critical image preload */}
        <link rel='preload' href='/images/logo.png' as='image' />
        {/* DNS prefetch for external services */}
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='dns-prefetch' href='https://api.telegram.org' />
        <link rel='dns-prefetch' href='https://prgutxuaf0.ufs.sh' />
      </Head>
      <body>
        {process.env.NODE_ENV === 'production' && (
          <noscript
            dangerouslySetInnerHTML={{
              __html:
                '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXC85K4K" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
            }}
          />
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
