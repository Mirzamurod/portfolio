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
  add_like: (value: TProject) => void
}) => {
  return (
    <Container fluid className='px-0'>
      <Row className='g-0 justify-content-center'>
        <Col xs={12}>
          <div className='position-relative box-shadow bg-color-1 color-body borr-10 pb-4 pb-xl-5 px-3 px-md-4 px-xl-5 pt-4'>
            <button
              type='button'
              className='position-absolute top-0 start-0 z-3 m-2 m-md-3 border-0 rounded-circle box-shadow bg-color-1 text-center cursor-pointer d-flex align-items-center justify-content-center p-0'
              style={{ width: 40, height: 40 }}
              aria-label='Close project details'
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
                <p className='project-card-featured mb-2'>Featured — {data?.featured}</p>
                <h3
                  id='project-modal-title'
                  className='color-lightn fs-xl-29 text-capitalize p-bold font-secondary mb-3'
                >
                  {data?.name}
                </h3>
                <div
                  className='font-primary p-regular fs-xl-16 mb-xl-4 text-break'
                  style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                >
                  {formatProjectDescription(data?.description)}
                </div>
                <div className='project-card-actions mt-2'>
                  {data?.url ? (
                    <a
                      href={data.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='project-action-btn'
                    >
                      Live site
                      <BsChevronRight aria-hidden />
                    </a>
                  ) : null}
                  <button
                    type='button'
                    disabled={disabled}
                    className='project-action-btn project-action-btn--ghost'
                    aria-label={`Like project ${data?.name}`}
                    onClick={() => add_like(data)}
                  >
                    <BiLike aria-hidden />
                    Like · {data?.like}
                  </button>
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
