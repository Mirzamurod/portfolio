import { useEffect } from 'react'
import Head from 'next/head'
import AOS from 'aos'
import Main from '@/components/Main'
import Script from 'next/script'

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <>
      <Head>
        <title>Mirzamurod</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='./images/logo.png' />
        <meta name='theme-color' content='#000000' />
        <meta name='description' content='Web site maked by Mirzamurod' />
        <meta
          name='google-site-verification'
          content='DyKgwQ0Z-CK17Q6XsIDqVOad0KJq5bWLt0HwAQw9eFA'
        />
        <link rel='apple-touch-icon' href='./images/logo.png' />
        <Script async src='https://www.googletagmanager.com/gtag/js?id=G-XKLBHLPF8M'></Script>
        {process.env.NODE_ENV === 'production' && (
          <Script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-XKLBHLPF8M');`,
            }}
          />
        )}
      </Head>
      <Main />
    </>
  )
}
