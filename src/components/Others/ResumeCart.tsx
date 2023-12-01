const ResumeCart = ({ h4, years, text }: { h4: string; years: string; text: string }) => {
  return (
    <div className='box-shadow bg-color-1 p-lg-4 p-xl-5 p-xl-5 p-3 time-table borr-6 hover-bg-color-1'>
      <div className='line' />
      <div className='d-xl-flex d justify-content-between'>
        <div>
          <h4 className='color-lightn font-primary fs-xl-24 fs-24 fs-lg-24 p-medium text-capitalize lh-39'>
            {h4}
          </h4>
          <span className='color-years d-block fs-xl-14 fs-14'>{years}</span>
        </div>
      </div>
      <div className='mt-4 mb-3 border bor-color-dark' />
      <div>
        <p className='fs-xl-18 fs-18 color-body lh-28'>{text}</p>
      </div>
    </div>
  )
}

export default ResumeCart
