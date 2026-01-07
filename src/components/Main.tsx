import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Hr } from '@/components/Hr'
import Footer from '@/components/Footer'
import Loader from '@/components/Projects/Loader'

// ProgressBar ni dynamic import qilish - performance optimization
// @ts-ignore
const ProgressBar = dynamic(() => import('react-scroll-progress-bar'), {
  ssr: false,
})

// Below-the-fold komponentlarni dynamic import qilish - lazy loading
const Project = dynamic(() => import('@/components/Projects'), {
  loading: () => (
    <div id='project'>
      <div className='container'>
        <div className='row'>
          {[...new Array(3)].map((_, index) => (
            <div key={index} className='col-md-6 col-xl-4 px-xl-25 py-4'>
              <Loader />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: true,
})

const Resume = dynamic(() => import('@/components/Resume'), {
  loading: () => (
    <div id='resume'>
      <div className='container'>
        <Loader />
      </div>
    </div>
  ),
  ssr: true,
})

const Blog = dynamic(() => import('@/components/Blog'), {
  loading: () => (
    <div id='blog'>
      <div className='container'>
        <div className='row'>
          {[...new Array(3)].map((_, index) => (
            <div key={index} className='col-md-6 col-xl-4 px-xl-25 py-4'>
              <Loader />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: true,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => (
    <div id='contact'>
      <div className='container'>
        <Loader />
      </div>
    </div>
  ),
  ssr: true,
})

const Main = ({
  initialProjects,
  initialExperiences,
  initialBlogs,
}: {
  initialProjects?: any[]
  initialExperiences?: any[]
  initialBlogs?: any[]
}) => {
  return (
    <div>
      <ProgressBar />
      <Sidebar />
      <Header />
      {/* <Hr />
        <WhatIDo /> */}
      <Hr />
      <Project initialProjects={initialProjects} />
      <Hr />
      <Resume initialExperiences={initialExperiences} />
      <Hr />
      <Blog initialBlogs={initialBlogs} />
      <Hr />
      <Contact />
      <Hr />
      <Footer />
    </div>
  )
}

export default Main
