import type { TProject } from '@/types/project'

import Image from 'next/image'
import { Col, Container, Row } from 'reactstrap'
import { BsChevronRight } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'

/** DB/JSON da ba'zan literal `\n` saqlanadi; HTML esa faqat haqiqiy yangi qatorni `pre-wrap` bilan ko'rsatadi */
function formatProjectDescription(raw: string | undefined): string {
  if (!raw) return ''
  return raw.replace(/\r\n/g, '\n').replace(/\\n/g, '\n')
}

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
    <Container fluid className='px-0'>
      <Row className='g-0 justify-content-center'>
        <Col xs={12}>
          <div className='position-relative box-shadow bg-color-1 color-body borr-10 pb-4 pb-xl-5 px-3 px-md-4 px-xl-5 pt-4'>
            <button
              type='button'
              className='position-absolute top-0 start-0 z-3 m-2 m-md-3 border-0 rounded-circle box-shadow bg-color-1 text-center cursor-pointer d-flex align-items-center justify-content-center p-0'
              style={{ width: 40, height: 40 }}
              aria-label='Close'
              onClick={() => modalBtn(false)}
            >
              <AiOutlineClose />
            </button>

            <Row className='align-items-start g-4 g-lg-4 mt-1'>
              <Col lg={6} md={12}>
                <div className='w-100 borr-10 overflow-hidden bg-color'>
                  <Image
                    src={data?.image}
                    alt={data?.name}
                    width={1200}
                    height={1200}
                    sizes='(max-width: 991px) 100vw, 50vw'
                    priority
                    className='d-block w-100'
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </Col>
              <Col lg={6} md={12} style={{ minWidth: 0 }}>
                <p className='text-capitalize fs-xl-16 p-medium font-secondary mb-2 mb-md-3'>
                  Featured - {data?.featured}
                </p>
                <p className='color-lightn fs-xl-29 text-capitalize p-bold font-secondary mb-3'>
                  {data?.name}
                </p>
                <div
                  className='font-primary p-regular fs-xl-16 mb-xl-4 text-break'
                  style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                >
                  {formatProjectDescription(data?.description)}
                </div>
                <div className='d-flex flex-wrap gap-2 mt-2'>
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
                      rel='noopener noreferrer'
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
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProjectModal
