import { Col, Container, Row } from 'reactstrap'
import Link from '@/components/Others/Link'

const Footer = () => {
  return (
    <Container>
      <Row className='my-5 text-center fs-xl-17 color-body font-primary'>
        <Col md='12'>
          <div>Portfolio</div>
        </Col>
        <Col className='text-center'>
          <p>
            &copy; 2024. All rights reserved by
            <Link url='https://t.me/mirzamurod_dev' words={'Mirzamurod.'} />
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
