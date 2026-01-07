import type { TProject } from '@/types/project'

import { useEffect, useState, useCallback, memo } from 'react'
import Image from 'next/image'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import axios from 'axios'
import { Title } from '@/components/Title'
import { Heart } from '@/components/Others/Heart'
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

  const modalBtn = () => setModal(!modal)

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
              : data.push(item)
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
    [visitorId, projects]
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
                  <div className='h-100'>
                    <div
                      className='bg-color-1 box-shadow hover-bg-color-1 p-sm-4 p-4 p-lg-4 p-xl-30 borr-20 hover-card h-100'
                      onClick={() => setData(project)}
                    >
                      <Card className='bg-transparent border-0 h-100'>
                        <div className='w-100 overflow-hidden mx-auto borr-10' onClick={modalBtn}>
                          <Image
                            src={project.image}
                            alt={project.name}
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
                            <a
                              href={project.url}
                              className='color-primary text-decoration-none p-medium font-primary fs-xl-12 text-uppercase'
                            >
                              {project.featured}
                            </a>
                            <button
                              className='bg-transparent border-0'
                              disabled={disabled}
                              onClick={() => add_like(project)}
                            >
                              <Heart rating={project.like} />
                            </button>
                          </div>
                          <div className='hover-commet' onClick={modalBtn}>
                            <div className='fs-xl-24 fs-md-24 color-lightn p-semi-bold cursor-pointer text-decoration-none'>
                              {project.name}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </Col>
              ))}
        </Row>
        {modal ? (
          <div
            className='position-fixed start-0 top-0 bottom-0 end-0 bg-color w-100 overflow-hidden'
            style={{ zIndex: '998' }}
            onClick={() => setModal(!modal)}
          />
        ) : null}
        <div className={`position-fixed ${modal ? 'project-modal' : 'd-none'}`}>
          <ProjectModal modalBtn={modalBtn} data={data!} add_like={add_like} disabled={disabled} />
        </div>
      </Container>
    </div>
  )
}

// React.memo bilan komponentni memoize qilish - re-render ni oldini olish
export default memo(Project)
