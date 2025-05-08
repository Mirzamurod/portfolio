import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { format } from 'date-fns'
import { Container } from 'reactstrap'
import SidebarBlog from '@/components/SidebarBlog'
import { TText } from '@/types/text'

const Blog = () => {
  const router = useRouter()
  const [text, setText] = useState<TText | null>(null)

  useEffect(() => {
    if (router.query.slug) {
      const getText = async () =>
        await axios
          .get(`/api/texts?slug=${router.query.slug}`)
          .then(res => setText(res.data))
          .catch(error => console.log(error))

      getText()
    }
  }, [router.query.slug])

  return (
    <div>
      <SidebarBlog />
      {text ? (
        <Container id='blogview' className='color-lightn p-medium'>
          <img
            alt={text.blog.name}
            src={text.blog.image}
            style={{ height: '350px', objectPosition: 'center center' }}
            className='w-100 object-fit-cover'
          />
          <p className='m-0 fs-xl-14 py-3'>{format(text.createdAt, 'd MMM yyyy')}</p>
          <h2 className='fs-xl-32'>{text.blog.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: text.text }} />
        </Container>
      ) : null}
    </div>
  )
}

export default Blog
