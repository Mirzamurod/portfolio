export const ResumeType = ({ subtitle, maintitle }: { subtitle?: string; maintitle?: string }) => {
  return (
    <div>
      <span className='color-subtitle text-capitalize fs-xl-14 p-medium'>{subtitle}</span>
      <h4 className='fs-xl-36 fs-md-36 p-bold color-lightn text-capitalize my-2'>{maintitle}</h4>
    </div>
  )
}
