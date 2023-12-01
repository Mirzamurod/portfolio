const Link = (props: any) => {
  return (
    <a
      id='link'
      href={props.url}
      className={`${
        props.contact ? 'color-lightn p-regular fs-xl-18' : 'fs-xl-17 color-body font-primary ms-2'
      } hover-color-primary position-relative text-decoration-none`}
      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      {props.words}
      <span className='hover-width position-absolute' />
    </a>
  )
}

export default Link
