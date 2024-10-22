import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { Title } from '../Title'
import Education from './Components/Education'
import ProSkills from './Components/ProSkills'
import Experience from './Components/Experience'
import Interview from '@/components/Resume/Components/Interview'
import { TExperience } from '@/types/experience'
import axios from 'axios'

const Resume = () => {
  const [focus, setFocus] = useState('pro')
  const [experiences, setExperiences] = useState<TExperience[]>([])
  const [loading, setLoading] = useState(false)

  const classButton =
    'hover-box-shadow py-4 hover-color-primary focus-color-primary borr-10 text-capitalize hover-button font-primary fs-xl-18 p-medium'
  const focusButton = 'color-primary box-shadow bg-color-1'

  const tabs = [
    // {
    //     shortName: 'edu',
    //     longName: 'education',
    // },
    {
      shortName: 'pro',
      longName: 'professional skills',
    },
    {
      shortName: 'exp',
      longName: 'experience',
    },
    {
      shortName: 'int',
      longName: 'interview',
    },
  ]

  const getProducts = async () => {
    axios
      .get('/api/experiences')
      .then(res => {
        setExperiences(res.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)

    getProducts()
  }, [])

  return (
    <div id='resume'>
      <Container>
        <Title subtitle='1+ years of experience' title='my resume' center />
        <Row className='color-white text-center box-shadow bg-color-1 borr-10 mt-xl-5 mt-lg-5 mt-md-4 '>
          {tabs.map(nma => (
            <Col md={4} className='px-0' key={nma.shortName}>
              <div
                className={`${classButton} ${focus === nma.shortName ? focusButton : ''}`}
                onClick={() => setFocus(nma.shortName)}
                style={{ cursor: 'pointer' }}
              >
                {nma.longName}
              </div>
            </Col>
          ))}
        </Row>
        <Row className='color-white mt-5'>
          {focus === 'edu' ? (
            <Education />
          ) : focus === 'pro' ? (
            <ProSkills />
          ) : focus === 'exp' ? (
            <Experience experiences={experiences} />
          ) : (
            <Interview />
          )}
        </Row>
      </Container>
    </div>
  )
}

export default Resume
