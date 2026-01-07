import { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Main from '@/components/Main'
import { fetchProjects, fetchExperiences, fetchBlogs } from '@/libs/fetchData'

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
        <meta name='theme-color' content='#000000' />
        <meta name='description' content='Web site maked by Mirzamurod' />
        <meta
          name='google-site-verification'
          content='DyKgwQ0Z-CK17Q6XsIDqVOad0KJq5bWLt0HwAQw9eFA'
        />
        <link rel='apple-touch-icon' href='./images/logo.png' />
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
