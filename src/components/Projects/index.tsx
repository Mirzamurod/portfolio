import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import axios from 'axios'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Title } from '@/components/Title'
import { Heart } from '@/components/Others/Heart'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ProjectModal from '@/components/Projects/ProjectModal'
import { TProject } from '@/types/project'
import Loader from '@/components/Projects/Loader'

const Project = () => {
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  let [data, setData] = useState<TProject | null>(null)
  const [projects, setProjects] = useState<TProject[]>([])
  const [visitorId, setVisitorId] = useState('')

  useEffect(() => {
    const getFingerprint = async () => {
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
        console.log(error.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
  }, [modal])

  useEffect(() => {
    setLoading(true)

    getProducts()
  }, [])

  const add_like = async (project: TProject) => {
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
        console.log(error)
      })
  }

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
                      className='bg-color-1 box-shadow hover-bg-color-1 p-sm-4 p-4 p-lg-4 p-xl-5 borr-20 hover-card h-100'
                      onClick={() => setData(project)}
                    >
                      <Card className='bg-transparent border-0 h-100'>
                        <div className='w-100 overflow-hidden mx-auto borr-10' onClick={modalBtn}>
                          <LazyLoadImage
                            effect='blur'
                            // top
                            width='100%'
                            height='250px'
                            src={project.image}
                            alt='Card image cap1'
                            style={{ objectFit: 'cover' }}
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

export default Project
