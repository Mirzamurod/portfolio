import { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Main from '@/components/Main'
import { fetchProjects, fetchExperiences, fetchBlogs } from '@/libs/fetchData'

const SITE_URL = 'https://mirzamurod.uz'
const OG_IMAGE = `${SITE_URL}/images/logo.png`

export default function Home({ projects, experiences, blogs }: any) {
  useEffect(() => {
    // AOS ni dynamic import qilish - faqat client-side yuklash
    import('aos').then(AOS => {
      AOS.default.init({ duration: 1000 })
    })
  }, [])

  return (
    <>
      <Head>
        <title>Mirzamurod</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='./images/logo.png' />
        <link rel='apple-touch-icon' href='./images/logo.png' />
        <meta name='theme-color' content='#000000' />
        <meta name='description' content='Web site maked by Mirzamurod' />
        <meta
          name='google-site-verification'
          content='DyKgwQ0Z-CK17Q6XsIDqVOad0KJq5bWLt0HwAQw9eFA'
        />
        {/* Open Graph */}
        <meta property='og:title' content='Mirzamurod' />
        <meta property='og:description' content='Web site maked by Mirzamurod' />
        <meta property='og:image' content={OG_IMAGE} />
        <meta property='og:url' content={SITE_URL} />
        <meta property='og:type' content='website' />
        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Mirzamurod' />
        <meta name='twitter:description' content='Web site maked by Mirzamurod' />
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
