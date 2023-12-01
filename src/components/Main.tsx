import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Project from '@/components/Projects'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import { Hr } from '@/components/Hr'
import Footer from '@/components/Footer'
// @ts-ignore
import ProgressBar from 'react-scroll-progress-bar'
import { TProject } from '@/types/project'
import { TExperience } from '@/types/experience'

const Main = ({ projects, experiences }: { projects: TProject[]; experiences: TExperience[] }) => {
  return (
    <div>
      <ProgressBar />
      <Sidebar />
      <Header />
      {/* <Hr />
        <WhatIDo /> */}
      <Hr />
      <Project projects={projects} />
      <Hr />
      <Resume experiences={experiences} />
      <Hr />
      <Contact />
      <Hr />
      <Footer />
    </div>
  )
}

export default Main
