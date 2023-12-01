import { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import { Title } from '@/components/Title'
import { Heart } from '@/components/Others/Heart'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ProjectModal from '@/components/Projects/ProjectModal'
import { TProject } from '@/types/project'
import { addLike } from '@/services'

const Project = ({ projects }: { projects: TProject[] }) => {
  const [modal, setModal] = useState(false)
  let [data, setData] = useState<TProject | null>(null)
  const modalBtn = () => setModal(!modal)

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
  }, [modal])

  const add_like = (project: TProject) => {
    console.log(project.id)
    addLike({ like: ++project.like, id: project.id })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div id='project'>
      <Container>
        <Title
          subtitle={'visit my portfolio and keep your feedback'}
          title={'my portfolio'}
          center
        />
        <Row>
          {projects.map((project: TProject, index: number) => (
            <Col
              md='6'
              xl='4'
              key={project.id}
              className='px-xl-25 py-4'
              data-aos={`${index % 2 === 0 ? 'fade-up' : 'fade-down'}`}
              data-aos-delay={`${index + '00'}`}
            >
              <div className='h-100'>
                <div
                  className='bg-color-1 box-shadow hover-bg-color-1 p-sm-4 p-4 p-lg-4 p-xl-5 borr-20 hover-card h-100'
                  onClick={() => setData(project)}
                >
                  <Card className='bg-transparent border-0 h-100'>
                    <div className='w-100 overflow-hidden mx-auto borr-10'>
                      <LazyLoadImage
                        effect='blur'
                        // top
                        width='100%'
                        height='250px'
                        src={project.image.url}
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
                        <div onClick={() => add_like(project)}>
                          <Heart rating={project.like} />
                        </div>
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
          <ProjectModal modalBtn={modalBtn} data={data!} />
        </div>
      </Container>
    </div>
  )
}

export default Project
