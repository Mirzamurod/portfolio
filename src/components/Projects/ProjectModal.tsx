import type { TProject } from '@/types/project'

import Image from 'next/image'
import { Col, Container, Row } from 'reactstrap'
import { BsChevronRight } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'

const ProjectModal = ({
  data,
  modalBtn,
  add_like,
  disabled,
}: {
  data: TProject
  disabled: boolean
  modalBtn: (value: boolean) => void
  add_like: (value: any) => any
}) => {
  const btnColor =
    'color-primary text-uppercase fs-xl-14 p-medium font-primary d-flex box-shadow bg-color-1 px-4 py-2 borr-6'

  return (
    <Container>
      <Col xl='12' className='px-xl-4 scroll-auto'>
        <div className='box-shadow bg-color-1 color-body pb-xl-5 pb-lg-4 borr-10'>
          <Row>
            <Col sm='12' className='d-flex justify-content-end'>
              <div
                className='p-lg-2 p-md- mt-lg-2 mt-md-1 me-lg-2 me-md-1 border-0 box-shadow bg-color-1 rounded-circle text-center cursor-pointer w-md-35'
                style={{ width: '40px' }}
                // @ts-ignore
                onClick={modalBtn}
              >
                <AiOutlineClose />
              </div>
            </Col>
            <div>
              <Row className='mx-xl-5 mx-md-4 mx-3 pb-lg-0 pb-4'>
                <Col lg='6' md='12' className='pe-lg-4 ps-lg-3 h-md-280 h-sm-200 mb-lg-0 mb-3'>
                  <div className='w-100 h-100 borr-10 overflow-hidden position-relative'>
                    <Image
                      src={data?.image}
                      alt={data?.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes='(max-width: 768px) 100vw, 50vw'
                      priority
                    />
                  </div>
                </Col>
                <Col lg='6' md='12' className='ps-xl-3'>
                  <div>
                    <div>
                      <p className='text-capitalize fs-xl-16 p-medium font-secondary'>
                        Featured - {data?.featured}
                      </p>
                    </div>
                    <div>
                      <p className='color-lightn fs-xl-29 text-capitalize p-bold font-secondary'>
                        {data?.name}
                      </p>
                    </div>
                    <div className='font-primary p-regular fs-xl-16 mb-xl-4'>
                      {data?.description}
                    </div>
                    <div className='d-flex mt-2'>
                      <div className='me-sm-4 cursor-pointer'>
                        <button
                          disabled={disabled}
                          className={`bg-transparent border-0 ${btnColor}`}
                          onClick={() => add_like(data)}
                        >
                          <p className='mb-0 me-md-1' style={{ marginTop: '1px' }}>
                            like this
                          </p>
                          <span>
                            <BiLike />
                          </span>
                        </button>
                      </div>
                      <div>
                        <a
                          href={data?.url}
                          target='_blank'
                          className={`text-decoration-none ${btnColor}`}
                        >
                          <p className='mb-0 me-md-1' style={{ marginTop: '1px' }}>
                            view project
                          </p>
                          <span>
                            <BsChevronRight />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </Col>
    </Container>
  )
}

export default ProjectModal
