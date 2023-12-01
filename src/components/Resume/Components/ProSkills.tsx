import { Col, Container, Row } from 'reactstrap'
import { ResumeType } from '@/components/Others/ResumeType'

const Image = ({ item }: any) => (
  <div
    className={`d-flex flex-wrap ${
      item.length > 5 &&
      'justify-content-xl-between justify-content-lg-start justify-content-md-between justify-content-sm-start justify-content-center overflow-hidden'
    }`}
  >
    {item.map((item: any, index: number) => (
      <div
        key={index}
        className='d-flex align-items-center justify-content-center w-h-81 mb-4 my-2 mx-3 bg-color-1 box-shadow borr-6'
        data-aos={`${index % 2 === 0 ? 'fade-down-right' : 'fade-down-left'}`}
        data-aos-delay={`${index + '00'}`}
      >
        <img src={`/images/${item}.png`} alt={item} className='w-auto' />
      </div>
    ))}
  </div>
)

const ProSkills = () => {
  return (
    <div id='proskills'>
      <Container>
        <Row>
          <Col lg='6'>
            <ResumeType maintitle={'design skill'} />
            <Image item={['photoshop', 'figma']} />
          </Col>
          <Col lg='6'>
            <ResumeType maintitle={'development skill'} />
            <Image
              item={[
                'html',
                'css',
                'js',
                'react',
                'redux',
                'node',
                'next',
                'bootstrap',
                'antd',
                'tailwind',
                'mui',
                'postman',
                'gulp',
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProSkills
