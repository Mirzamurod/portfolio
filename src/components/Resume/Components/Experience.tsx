import type { TExperience } from '@/types/experience'

import { Col, Container, Row } from 'reactstrap'
import ResumeCart from '@/components/Others/ResumeCart'

const Experience = ({ experiences }: { experiences: TExperience[] }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col lg='6' md='12'>
            <div className='time-line ps-lg-5 ps-4 ps-sm-5 pt-5 pe-2'>
              {experiences.map((item, index) =>
                index < Math.ceil(experiences.length / 2) ? (
                  <div className='mb-5' data-aos='flip-up' key={item._id}>
                    <ResumeCart h4={item.name} years={item.year} text={item.description} />
                  </div>
                ) : null
              )}
            </div>
          </Col>
          <Col lg='6' md='12' className=''>
            <div className='time-line ps-lg-5 ps-4 ps-sm-5 pt-lg-5 pe-2'>
              {experiences.map((item, index) =>
                index >= Math.ceil(experiences.length / 2) ? (
                  <div className='mb-5' data-aos='flip-up' key={item._id}>
                    <ResumeCart h4={item.name} years={item.year} text={item.description} />
                  </div>
                ) : null
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Experience
