const Icons = (props: any) => {
  const others = {
    facebook: 'https://www.facebook.com/mrmirzamurod.rahimberdiyev.1',
    instagram: 'https://www.instagram.com/m_rahimberdiyev77',
    telegram: 'https://t.me/mirzamurod_dev',
    linkedin:
      'https://www.linkedin.com/in/mirzamurod-rahimberdiyev-56a936229?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bc4a3902bTlKpjNmXE5UP2w%3D%3D',
    github: 'https://github.com/Mirzamurod',
  }

  return (
    <div id='icons'>
      <div>
        <p
          className={`fs-xl-14 text-uppercase ${
            props.contact
              ? 'p-medium color-body font-secondary'
              : 'p-light color-lightn font-primary'
          }`}
        >
          find me with &nbsp;. . .
        </p>
      </div>
      <div className={`d-flex ${props.contact ? 'mb-1' : 'mb-4'}`}>
        <div className='m-10-12 me-2'>
          <a href={others?.github}>
            <div
              className={`${
                props.sidebar ? 'w-h-51' : 'w-h-60 box-shadow'
              } bg-color-1 text-center ${props.sidebar ? 'pt-3' : 'pt-xl-20'}`}
            >
              <span className={`${props.sidebar ? 'icon-size' : ''} icon github`} />
            </div>
          </a>
        </div>
        {/* <div className='m-10-12 mx-2'>
          <a href={others?.instagram}>
            <div
              className={`${
                props.sidebar ? 'w-h-51' : 'w-h-60 box-shadow'
              } bg-color-1 text-center ${props.sidebar ? 'pt-3' : 'pt-xl-20'}`}
            >
              <span className={`${props.sidebar ? 'icon-size' : ''} icon instagram`} />
            </div>
          </a>
        </div> */}
        <div className='m-10-12 mx-2'>
          <a href={others?.telegram}>
            <div
              className={`${
                props.sidebar ? 'w-h-51' : 'w-h-60 box-shadow'
              } bg-color-1 text-center ${props.sidebar ? 'pt-3' : 'pt-xl-20'}`}
            >
              <span className={`${props.sidebar ? 'icon-size' : ''} icon telegram`} />
            </div>
          </a>
        </div>
        <div className='m-10-12 ms-2'>
          <a href={others?.linkedin}>
            <div
              className={`${
                props.sidebar ? 'w-h-51' : 'w-h-60 box-shadow'
              } bg-color-1 text-center ${props.sidebar ? 'pt-3' : 'pt-xl-20'}`}
            >
              <span className={`${props.sidebar ? 'icon-size' : ''} icon linkedin`} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Icons
