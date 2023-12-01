import ResumeCart from '@/components/Others/ResumeCart'
import { Col, Container, Row } from 'reactstrap'

const Education = () => {
  return (
    <div id='education'>
      <Container>
        <Row>
          <Col lg='6' md='12'>
            <div className='time-line ps-lg-5 ps-4 ps-sm-5 pt-5 pe-2'>
              <div className='mb-5' data-aos='flip-up'>
                <ResumeCart
                  h4={'personal portfolio April fools'}
                  years={'University of DVI (1997 - 2001)'}
                  text={
                    'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante.'
                  }
                />
              </div>
            </div>
          </Col>
          <Col lg='6' md='12' className='mt-5 mt-sm-5 mt-md-5 mt-lg-0'>
            <div className='time-line ps-lg-5 ps-4 ps-sm-5 pt-5 pe-2'>
              <div className='mb-5' data-aos='flip-up'>
                <ResumeCart
                  h4={'personal portfolio April fools'}
                  years={'University of DVI (1997 - 2001)'}
                  text={
                    'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante.'
                  }
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Education
