import type { TBlog } from '@/types/blog'

import { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { Title } from '../Title'
import Loader from '../Projects/Loader'
import { Time } from '../Others/Time'

const Blog = ({ initialBlogs }: { initialBlogs?: TBlog[] }) => {
  const [blogs, setBlogs] = useState<TBlog[]>(initialBlogs || [])
  const [loading, setLoading] = useState(!initialBlogs || initialBlogs.length === 0)

  const getProducts = async () => {
    axios
      .get('/api/blogs')
      .then(res => {
        setBlogs(res.data)
        setLoading(false)
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.log(error.message)
        }
        setLoading(false)
      })
  }

  useEffect(() => {
    // Fallback - API call qilish (faqat initialBlogs bo'lmasa)
    if (!initialBlogs || initialBlogs.length === 0) {
      getProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            width={400}
                            height={250}
                            className='w-100'
                            style={{ objectFit: 'cover', height: '250px' }}
                            loading='lazy'
                            placeholder='blur'
                            blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                          />
                        </div>
                        <CardBody className='p-0'>
                          <div className='d-flex my-3 justify-content-between'>
                            <p className='color-primary text-decoration-none p-medium font-primary fs-xl-12 text-uppercase mb-0'>
                              {blog.name}
                            </p>
                            <div className='bg-transparent border-0 mb-0'>
                              <Time date={blog.createdAt} />
                            </div>
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

// React.memo bilan komponentni memoize qilish - re-render ni oldini olish
export default memo(Blog)
