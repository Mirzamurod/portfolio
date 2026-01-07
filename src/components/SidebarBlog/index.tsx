import { useEffect, useState } from 'react'
import { Container, Navbar, NavbarBrand, NavbarText } from 'reactstrap'

const SidebarBlog = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [show])

  const handleScroll = () => {
    if (typeof window !== 'undefined') setShow(window.scrollY > 100)
  }

  return (
    <div id='sidebarblog' className={show ? 'scroll_navbar' : ''}>
      <Navbar expand='md' className='py-4'>
        <Container className='d-flex justify-content-between'>
          <NavbarBrand href='/'>
            <img src='/images/logo.png' style={{ width: '38px' }} alt='logo' />
          </NavbarBrand>
          <NavbarText>Blog</NavbarText>
        </Container>
      </Navbar>
    </div>
  )
}

export default SidebarBlog
