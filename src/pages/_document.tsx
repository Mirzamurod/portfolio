import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        {process.env.NODE_ENV === 'production' && (
          <noscript dangerouslySetInnerHTML={{ __html: process.env.GOOGLE_TAG_MANAGER_BODY! }} />
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
