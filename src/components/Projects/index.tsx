import type { TProject } from '@/types/project'

import { useCallback, useEffect, useState, memo } from 'react'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import Image from 'next/image'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import axios from 'axios'
import { Title } from '@/components/Title'
import { BiLike } from 'react-icons/bi'
import { BsChevronRight } from 'react-icons/bs'
import ProjectModal from '@/components/Projects/ProjectModal'
import Loader from '@/components/Projects/Loader'

const Project = ({ initialProjects }: { initialProjects?: TProject[] }) => {
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(!initialProjects || initialProjects.length === 0)
  const [disabled, setDisabled] = useState(false)
  let [data, setData] = useState<TProject | null>(null)
  const [projects, setProjects] = useState<TProject[]>(initialProjects || [])
  const [visitorId, setVisitorId] = useState('')

  useEffect(() => {
    // FingerprintJS ni dynamic import qilish - faqat kerak bo'lganda yuklash
    const getFingerprint = async () => {
      const FingerprintJS = (await import('@fingerprintjs/fingerprintjs')).default
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      setVisitorId(result.visitorId)
    }

    getFingerprint()
  }, [])

  const closeModal = useCallback(() => setModal(false), [])

  useEscapeKey(closeModal, modal)

  const openProjectModal = (project: TProject) => {
    setData(project)
    setModal(true)
  }

  const getProducts = async () => {
    axios
      .get('/api/projects')
      .then(res => {
        setProjects(res.data)
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
    document.body.style.overflow = modal ? 'hidden' : ''
  }, [modal])

  useEffect(() => {
    // Fallback - API call qilish (faqat initialProjects bo'lmasa)
    if (!initialProjects || initialProjects.length === 0) {
      getProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // add_like funksiyasini memoize qilish - re-render ni oldini olish
  const add_like = useCallback(
    async (project: TProject) => {
      setDisabled(true)
      await axios({
        method: 'patch',
        url: '/api/edit-project',
        data: { id: project._id, like: Number(project.like) + 1, fingerprint: visitorId },
      })
        .then(res => {
          let data: TProject[] = []
          projects.map(item =>
            item._id === project._id
              ? data.push({ ...item, like: Number(project.like) + Number(res.data) })
              : data.push(item),
          )
          setProjects([...data])
          setDisabled(false)
          getProducts()
        })
        .catch(error => {
          setDisabled(false)
          if (process.env.NODE_ENV === 'development') {
            console.log(error)
          }
        })
    },
    [visitorId, projects],
  )

  return (
    <div id='project'>
      <Container>
        <Title subtitle='visit my portfolio and keep your feedback' title='my portfolio' center />
        <Row>
          {loading
            ? [...new Array(3)].map((_, index) => (
                <Col md='6' xl='4' key={index} className='px-xl-25 py-4'>
                  <Loader />
                </Col>
              ))
            : projects.map((project: TProject, index: number) => (
                <Col
                  md='6'
                  xl='4'
                  key={project._id}
                  className='px-xl-25 py-4'
                  data-aos={index % 2 === 0 ? 'fade-up' : 'fade-down'}
                  data-aos-delay={index + '00'}
                >
                  <article className='bg-color-1 box-shadow hover-bg-color-1 p-sm-4 p-4 p-lg-4 p-xl-30 borr-20 hover-card project-card h-100'>
                    <div className='w-100 overflow-hidden mx-auto borr-10'>
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={250}
                        className='w-100 project-card-image'
                        loading='lazy'
                        placeholder='blur'
                        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                      />
                    </div>
                    <Card className='bg-transparent border-0 flex-grow-1 d-flex flex-column'>
                      <CardBody className='p-0 d-flex flex-column flex-grow-1'>
                        <p className='project-card-featured mb-0'>{project.featured}</p>
                        <h3 className='project-card-title'>{project.name}</h3>
                        <div className='project-card-actions'>
                          <button
                            type='button'
                            className='project-action-btn'
                            onClick={() => openProjectModal(project)}
                          >
                            View details
                            <BsChevronRight aria-hidden />
                          </button>
                          {project.url ? (
                            <a
                              href={project.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='project-action-btn project-action-btn--ghost'
                            >
                              Live site
                            </a>
                          ) : null}
                          <button
                            type='button'
                            className='project-action-btn project-action-btn--ghost'
                            disabled={disabled}
                            aria-label={`Like project ${project.name}`}
                            onClick={() => add_like(project)}
                          >
                            <BiLike aria-hidden />
                            {project.like}
                          </button>
                        </div>
                      </CardBody>
                    </Card>
                  </article>
                </Col>
              ))}
        </Row>
      </Container>
      {modal ? (
        <div
          className='project-modal-overlay position-fixed top-0 start-0 end-0 bottom-0 w-100 min-vh-100 d-flex justify-content-center overflow-auto overflow-x-hidden px-3 px-md-4'
          style={{
            zIndex: 999,
            paddingTop: 'max(2rem, calc(1rem + env(safe-area-inset-top, 0px)))',
            paddingBottom: 'max(2rem, calc(1rem + env(safe-area-inset-bottom, 0px)))',
          }}
        >
          <div
            className='position-fixed top-0 start-0 end-0 bottom-0 bg-color'
            style={{ opacity: 0.92 }}
            onClick={closeModal}
            aria-hidden='true'
          />
          <div
            className='w-100 flex-shrink-0 my-auto position-relative'
            style={{ maxWidth: 1140 }}
            role='dialog'
            aria-modal='true'
            aria-labelledby='project-modal-title'
          >
            <ProjectModal
              modalBtn={closeModal}
              data={data!}
              add_like={add_like}
              disabled={disabled}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

// React.memo bilan komponentni memoize qilish - re-render ni oldini olish
export default memo(Project)
