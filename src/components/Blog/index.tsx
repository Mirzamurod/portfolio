import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { Title } from '../Title'
import Loader from '../Projects/Loader'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Time } from '../Others/Time'
import { TBlog } from '@/types/blog'

const Blog = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([])
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    axios
      .get('/api/blogs')
      .then(res => {
        setBlogs(res.data)
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
    <div id='blog'>
      <Container>
        <Title subtitle='Visit my blog' title='My Blog' center />
        <Row>
          {loading
            ? [...new Array(3)].map((_, index) => (
                <Col md='6' xl='4' key={index} className='px-xl-25 py-4'>
                  <Loader />
                </Col>
              ))
            : blogs.map((blog, index) => (
                <Col
                  md='6'
                  xl='4'
                  key={blog._id}
                  className='px-xl-25 py-4'
                  data-aos={index % 2 === 0 ? 'fade-up' : 'fade-down'}
                  data-aos-delay={index + '00'}
                >
                  <div className='h-100'>
                    <div className='bg-color-1 box-shadow hover-bg-color-1 p-sm-4 p-4 p-lg-4 p-xl-30 borr-20 hover-card h-100'>
                      <Card className='bg-transparent border-0 h-100'>
                        <div className='w-100 overflow-hidden mx-auto borr-10'>
                          <LazyLoadImage
                            effect='blur'
                            // top
                            width='100%'
                            height='250px'
                            src={blog.image}
                            alt='Card image cap1'
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <CardBody className='p-0'>
                          <div className='d-flex my-3 justify-content-between'>
                            <p className='color-primary text-decoration-none p-medium font-primary fs-xl-12 text-uppercase mb-0'>
                              {blog.name}
                            </p>
                            <p className='bg-transparent border-0 mb-0'>
                              <Time date={blog.createdAt} />
                            </p>
                          </div>
                          <div className='hover-commet'>
                            <Link
                              href={`/blog/${blog.text.slug}`}
                              className='fs-xl-24 fs-md-24 color-lightn p-semi-bold cursor-pointer text-decoration-none'
                            >
                              {blog.title}
                            </Link>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </Col>
              ))}
        </Row>
      </Container>
    </div>
  )
}

export default Blog
