import { useEffect, useState } from 'react'
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap'
import { MdClose } from 'react-icons/md'
import { SidebarData } from '@/components/Sidebar/SidebarData'
import Icons from '@/components/Others/Icons'
// @ts-ignore
import ScrollspyNav from 'react-scrollspy-nav'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  let toggle = () => setIsOpen(!isOpen)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [show])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  const handleScroll = () => {
    if (typeof window !== 'undefined') setShow(window.scrollY > 100)
  }

  return (
    <div id='sidebar' className={show ? 'scroll_navbar' : ''}>
      <Navbar expand='md' className='py-4'>
        <Container className='d-flex justify-content-between'>
          <NavbarBrand href='/'>
            <img src='/images/logo.png' style={{ width: '38px' }} alt='logo' />
          </NavbarBrand>
          <ScrollspyNav
            scrollTargetIds={[
              'header',
              // 'whatido',
              'project',
              'resume',
              'blog',
              'contact',
            ]}
            offset={-136}
            activeNavClass='active'
            scrollDuration='100'
          >
            <Collapse navbar className='navbar-tepa'>
              <Nav className='ms-auto' navbar>
                {SidebarData.map(data => (
                  <NavItem className='me-4' key={data.id}>
                    <NavLink
                      href={data.id}
                      // className={`${data.class} ${
                      //   typeof window !== 'undefined' && window.scrollY > 100 ? 'scroll-color' : ''
                      // }`}
                    >
                      {data.name}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Collapse>
            <Collapse navbar className='navbar-chap' onClick={toggle}>
              <div className=''>
                <img src='/images/navbar-toggle.svg' width='36px' height='36px' alt='navbar' />
              </div>
            </Collapse>
          </ScrollspyNav>
        </Container>
      </Navbar>
      {!isOpen ? null : (
        <div
          className='position-fixed start-0 top-0 bottom-0 start-0 end-0 w-100 h-100vh p-0 m-0 zindex-600 navbar-chap-bg'
          onClick={toggle}
        />
      )}
      <div
        className={`h-100vh w-319 position-fixed top-0 bottom-0 zindex-999 ${
          isOpen ? 'left-0' : 'l--50'
        }`}
      >
        <div className={`p-2 position-relative h-100vh ${isOpen ? '' : 'l--50'}`}>
          <div className='d-flex justify-content-between'>
            <div className='navbar-brand color-white'>
              <img src='/images/logo.png' style={{ width: '38px' }} alt='logo' />
            </div>
            <div
              onClick={toggle}
              className='rounded-circle mt-1 pt-2 close-btn text-center color-lightn'
            >
              <MdClose className='color-primary' style={{ paddingTop: '2px' }} />
            </div>
          </div>
          <div className='my-4'>
            <p
              className='fs-xl-16 color-lighter p-regular opacity-75'
              style={{ lineHeight: '22px' }}
            >
              {/* {loading ? 'Loading...' : error ? 'Something went wrong!!!' : others?.mobileAboutMe} */}
              {/* year-month-day */}
              {Math.floor(
                (Date.parse(String(new Date())) - Date.parse('2002-02-08')) /
                  (1000 * 60 * 60 * 24 * 30 * 12)
              )}{' '}
              y.o. Junior Web Full Stack Developer
            </p>
          </div>
          <div className='my-2'>
            <hr style={{ backgroundColor: '#303235', height: '3px' }} />
          </div>
          <div className='my-2'>
            <Nav navbar>
              {SidebarData.map(data => (
                <NavItem className='me-4' key={data.id}>
                  <NavLink
                    href={data.id}
                    className='color-lightn my-2 fs-xl-18 font-secondary p-medium opacity-75'
                    onClick={toggle}
                  >
                    {data.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>
          <div className='position-absolute bottom-0 w-100'>
            <div className='my-2'>
              <hr style={{ backgroundColor: '#303235', height: '3px' }} />
            </div>
            <div>
              <Icons sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
