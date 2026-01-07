import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { format } from 'date-fns'
import { Container } from 'reactstrap'
import SidebarBlog from '@/components/SidebarBlog'
import { TText } from '@/types/text'
import { fetchTextBySlug, fetchAllBlogSlugs } from '@/libs/fetchData'

const Blog = ({ text: initialText }: { text: TText | null }) => {
  const router = useRouter()
  const [text, setText] = useState<TText | null>(initialText || null)

  useEffect(() => {
    // Agar initialText bo'lmasa va router.query.slug bo'lsa, API call qilish (fallback)
    if (!initialText && router.query.slug) {
      const getText = async () =>
        await axios
          .get(`/api/texts?slug=${router.query.slug}`)
          .then(res => setText(res.data))
          .catch(error => {
            if (process.env.NODE_ENV === 'development') {
              console.log(error)
            }
          })

      getText()
    }
  }, [router.query.slug, initialText])

  return (
    <div>
      <SidebarBlog />
      {text ? (
        <Container id='blogview' className='color-lightn p-medium'>
          <Image
            alt={text.blog.title}
            src={text.blog.image}
            width={1200}
            height={350}
            className='w-100'
            style={{ height: '350px', objectFit: 'cover', objectPosition: 'center center' }}
            priority
          />
          <p className='m-0 fs-xl-14 py-3'>{format(text.createdAt, 'd MMM yyyy')}</p>
          <h2 className='fs-xl-32'>{text.blog.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: text.text }} />
        </Container>
      ) : null}
    </div>
  )
}

// Incremental Static Regeneration (ISR) - Blog postlar uchun
export async function getStaticPaths() {
  try {
    const paths = await fetchAllBlogSlugs()
    return {
      paths,
      fallback: 'blocking', // Yangi blog postlar uchun blocking fallback
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const text = await fetchTextBySlug(params.slug)

    if (!text) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        text,
      },
      // ISR - 1 soatda bir yangilanadi
      revalidate: 3600,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default Blog
