import { useEffect } from 'react'
import Main from '@/components/Main'
import Head from 'next/head'
import AOS from 'aos'
import { getExperiences, getProjects } from '@/services'
import { TProject } from '@/types/project'
import { TExperience } from '@/types/experience'

export default function Home({
  projects,
  experiences,
}: {
  projects: TProject[]
  experiences: TExperience[]
}) {
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
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-TXC85K4K');`,
            }}
          />
        )}
      </Head>
      <Main projects={projects} experiences={experiences} />
    </>
  )
}

export async function getStaticProps() {
  const projects = (await getProjects()) || []
  const experiences = (await getExperiences()) || []

  return {
    props: { projects, experiences },
  }
}
