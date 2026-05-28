type LinkProps = {
  url: string
  words: string
  contact?: boolean
  ariaLabel?: string
}

const Link = ({ url, words, contact, ariaLabel }: LinkProps) => {
  return (
    <a
      id='link'
      href={url}
      className={`${
        contact ? 'color-lightn p-regular fs-xl-18' : 'fs-xl-17 color-body font-primary ms-2'
      } hover-color-primary position-relative text-decoration-none`}
      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      aria-label={ariaLabel || words}
    >
      {words}
      <span className='hover-width position-absolute' />
    </a>
  )
}

export default Link
