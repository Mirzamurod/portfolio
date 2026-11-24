import { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Main from '@/components/Main'
import { fetchProjects, fetchExperiences, fetchBlogs } from '@/libs/fetchData'

const SITE_URL = 'https://mirzamurod.uz'
const SITE_NAME = 'Mirzamurod'
const SEO_TITLE = 'Mirzamurod — Full-Stack Web Developer'
const OG_IMAGE = `${SITE_URL}/images/og-image.png`

export default function Home({ projects, experiences, blogs }: any) {
  useEffect(() => {
    // AOS ni dynamic import qilish - faqat client-side yuklash
    import('aos').then(AOS => {
      AOS.default.init({ duration: 700, once: true, offset: 48 })
    })
  }, [])

  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='./images/logo.png' />
        <link rel='apple-touch-icon' href='./images/logo.png' />
        <meta name='theme-color' content='#000000' />
        <meta name='application-name' content={SITE_NAME} />
        <meta name='author' content={SITE_NAME} />
        <meta
          name='google-site-verification'
          content='DyKgwQ0Z-CK17Q6XsIDqVOad0KJq5bWLt0HwAQw9eFA'
        />
        <link rel='canonical' href={`${SITE_URL}/`} />
        {/* Open Graph */}
        <meta property='og:site_name' content={SITE_NAME} />
        <meta property='og:title' content={SEO_TITLE} />
        <meta property='og:url' content={`${SITE_URL}/`} />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:image' content={OG_IMAGE} />
        <meta property='og:image:width' content='512' />
        <meta property='og:image:height' content='512' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:alt' content={SITE_NAME} />
        {/* Twitter — `summary` keeps the small square image next to the text */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={SEO_TITLE} />
        <meta name='twitter:image' content={OG_IMAGE} />
        {/* Google Analytics Script - Performance optimization */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-XKLBHLPF8M'
          strategy='afterInteractive'
        />
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
      <Main initialProjects={projects} initialExperiences={experiences} initialBlogs={blogs} />
    </>
  )
}

// Static Generation (SSG) with Incremental Static Regeneration (ISR)
export async function getStaticProps() {
  try {
    // Parallel API calls - performance optimization
    const [projects, experiences, blogs] = await Promise.all([
      fetchProjects(),
      fetchExperiences(),
      fetchBlogs(),
    ])

    return {
      props: {
        projects,
        experiences,
        blogs,
      },
      // ISR - 60 soniyada bir yangilanadi
      revalidate: 60,
    }
  } catch (error) {
    // Error handling - fallback to empty arrays
    return {
      props: {
        projects: [],
        experiences: [],
        blogs: [],
      },
      revalidate: 60,
    }
  }
}
