import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
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
