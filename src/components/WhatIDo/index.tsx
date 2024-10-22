import { Card, CardBody, CardImg, CardTitle, Col, Container, Row } from 'reactstrap'
import { Title } from '@/components/Title'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { WhatIDoData } from '@/components/WhatIDo/WhatIDoData'

const WhatIDo = () => {
  return (
    <div id='whatido'>
      <Container>
        <Title subtitle='features' title='what i do' />
        <Row>
          {WhatIDoData.map(data => (
            <Col
              md='6'
              lg='6'
              xl='4'
              key={data.id}
              className='px-xl-25'
              data-aos={data.id % 2 === 0 ? 'fade-left' : 'fade-right'}
              data-aos-delay={data.id + '00'}
            >
              <div className='bg-color-1 borr-10 border-0 box-shadow hover-bg-color-1 my-4'>
                <Card className='bg-color p-4 p-sm-4 p-lg-4 p-xl-5'>
                  <div className='qwe'>
                    <CardImg top className={`icon ${data.icon} mb-4`} />
                    <CardBody className='hover-color-white p-0 position-relative'>
                      <CardTitle tag='h4' className='mb-4'>
                        <a
                          href='/'
                          className='text-decoration-none color-lightn font-primary p-medium fs-xl-24 fs-md-24 mb-3'
                        >
                          {data.title}
                        </a>
                      </CardTitle>
                      <CardTitle
                        tag='p'
                        className='color-lightn fs-xl-16 fs-md-16 p-regular font-primary mb-3'
                      >
                        {data.desc}
                      </CardTitle>
                      <CardTitle tag='div' className='mt-4 mb-0 hover-right position-absolute'>
                        <a href={data.url}>
                          <AiOutlineArrowRight className='color-primary fs-xl-32' />
                        </a>
                      </CardTitle>
                    </CardBody>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default WhatIDo
