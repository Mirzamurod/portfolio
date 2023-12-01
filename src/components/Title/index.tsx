export const Title = (props: any) => {
  return (
    <div>
      <p
        className={`color-subtitle text-uppercase fs-xl-14 fs-14 fs-sm-14 p-medium font-secondary ${
          props.center ? 'text-center' : 'text-start'
        }`}
        style={{ lineHeight: '14px', letterSpacing: '1px' }}
      >
        {props.subtitle}
      </p>
      <p
        className={`fs-xl-60 fs-sm-60 fs-lg-60 fs-md-60 fs-60 p-bold color-lightn font-secondary mb-3 ${
          props.center ? 'text-center' : 'text-start'
        }`}
        style={{ lineHeight: 1.2, marginTop: '15px', textTransform: 'capitalize' }}
      >
        {props.title}
      </p>
    </div>
  )
}
