import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Spinner,
} from 'reactstrap'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Title } from '@/components/Title'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Link from '@/components/Others/Link'
import Icons from '@/components/Others/Icons'

interface IData {
  email?: string
  message: string
  name: string
  phone: string
  subject: string
}

const Contact = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const [snack, setSnack] = useState(false)
  const [loading, setLoading] = useState(false)

  const class1 = 'font-secondary color-lightn w-100 mb-3 borr-6'

  const onSubmit = (data: IData) => {
    setLoading(true)
    let my_text = `
Name: ${data.name} %0A
Number: ${data.phone} %0A
Email: ${data?.email} %0A
Subject: ${data.subject} %0A
Message: ${data.message} %0A`
    const url = `https://api.telegram.org/bot${'8162622071:AAGisU80sm3Mv1LuDqWghN5S7A0OXoXsUIE'}/sendMessage?chat_id=${'-1001300088307'}&text=${my_text}` // &parse_mode = html => teglarini my_text ichida ishlatishga yordam beradi. Lekin ishlamadi warning ham bermadi!!!
    let api = new XMLHttpRequest()
    api.open('GET', url, true)
    api.send()
    setLoading(false)
    setSnack(true)
    setValue('name', '')
    setValue('phone', '')
    setValue('email', '')
    setValue('subject', '')
    setValue('message', '')
    setTimeout(() => {
      setSnack(false)
    }, 4000)
  }

  return (
    <div id='contact'>
      <Container>
        <Title subtitle='contact' title='contact with me' center />
        <Row className='my-5'>
          <Col md='12' xl='5' lg='5' className='px-xl-25'>
            <div className='bg-color-1 box-shadow p-4 hover-img borr-10' data-aos='fade-left'>
              <Card className='bg-transparent border-0'>
                <div className='border border-0 overflow-hidden borr-10'>
                  <LazyLoadImage
                    effect='blur'
                    src='/images/contact1.png'
                    alt='contact.png'
                    className='w-100'
                  />
                </div>
                <CardBody className='px-0 pb-0'>
                  <div>
                    <CardTitle tag='h4' className='color-lightn fs-xl-29 p-bold font-secondary'>
                      Mirzamurod
                    </CardTitle>
                    <CardTitle tag='p' className='color-body fs-xl-18 font-primary mt-2'>
                      Software Engineer
                    </CardTitle>
                  </div>
                  <div>
                    <CardText
                      tag='p'
                      className='color-body fs-xl-18 font-primary p-regular my-2'
                      style={{ lineHeight: '30px' }}
                    >
                      I am available for freelance work. Connect with me via and call in to my
                      account.
                    </CardText>
                    <CardText tag='span'>
                      <div className='d-flex'>
                        <div className='color-body me-2 fs-xl-18'>Phone:</div>
                        <Link url='tel:998946565706' words='+998 94 656-57-06' contact />
                      </div>
                      <div className='d-flex text-truncate'>
                        <div className='color-body me-2 fs-xl-18'>Email:</div>
                        <Link
                          url='mailto:mirzamurodrahimberdiyev@gmail.com'
                          words='mirzamurodrahimberdiyev@gamil.com'
                          contact
                        />
                      </div>
                    </CardText>
                  </div>
                  <div className='mt-3'>
                    <Icons contact />
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col
            md='12'
            xl='7'
            lg='7'
            className='px-xl-25 mt-sm-5 mt-5 mt-xl-0 mt-md-5 mt-lg-0 mt-lg-0'
          >
            <div className='bg-color-1 box-shadow p-4 borr-10' data-aos='fade-right'>
              <form
                className='form-color text-uppercase fs-xl-12 p-medium font-secondary text-start'
                onSubmit={handleSubmit(onSubmit as any)}
              >
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <Label className='d-block text-uppercase mb-3' for='name'>
                        your name <span className='color-primary'>*</span>
                      </Label>
                      <Controller
                        name='name'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            id='name'
                            {...field}
                            className={`${class1} fs-xl-14 text-capitalize ${
                              !!errors?.name ? 'dan' : ''
                            }`}
                            invalid={!!errors?.name}
                          />
                        )}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <InputGroup>
                      <Label className='d-block text-uppercase mb-3' for='phone'>
                        phone number <span className='color-primary'>*</span>
                      </Label>
                      <Controller
                        name='phone'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            id='phone'
                            {...field}
                            placeholder='901234567'
                            className={`${class1} fs-xl-14 ${!!errors?.phone ? 'dan' : ''}`}
                            invalid={!!errors?.phone}
                          />
                        )}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label className='d-block text-uppercase mb-3' for='email'>
                    email
                  </Label>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field }) => (
                      <Input {...field} className={`${class1} fs-14`} id='email' type='email' />
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className='d-block text-uppercase mb-3' for='subject'>
                    subject <span className='color-primary'>*</span>
                  </Label>
                  <Controller
                    name='subject'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        id='subject'
                        invalid={!!errors?.subject}
                        {...field}
                        className={`${class1} fs-14 ${!!errors?.subject ? 'dan' : ''}`}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className='d-block text-uppercase mb-3' for='message'>
                    your message <span className='color-primary'>*</span>
                  </Label>
                  <Controller
                    name='message'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        type='textarea'
                        id='message'
                        cols='30'
                        rows='8'
                        invalid={!!errors?.message}
                        {...field}
                        className={`${class1} fs-14 outline-none pt-2 ${
                          !!errors?.message ? 'dan' : ''
                        }`}
                      />
                    )}
                  />
                </FormGroup>
                <Button
                  type='submit'
                  className='d-flex align-items-center justify-content-center w-100 cursor-pointer borr-6 bg-color-1 box-shadow fs-14 p-medium color-primary font-primary text-uppercase border-0 hover-bg-color-1'
                  disabled={loading}
                >
                  {loading && <Spinner animation='border' />}
                  <span className='ms-2'>send message</span>
                  <span>
                    <AiOutlineArrowRight />
                  </span>
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
      <div
        className={`snack-success text-center d-flex item-center ${
          snack ? 'snack-right-10' : 'snack-right--100'
        }`}
      >
        <div>
          <svg viewBox='0 0 26 26' aria-hidden='true' width='18px' height='18px' fill='#ffffff'>
            <path d='M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z' />
          </svg>
        </div>
        <p className='color-white ps-1' style={{ paddingTop: '1px' }}>
          Message successfully sended!!!
        </p>
      </div>
    </div>
  )
}

export default Contact
