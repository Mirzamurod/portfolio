import { format } from 'date-fns'
import { IoMdTime } from 'react-icons/io'

export const Time = ({ date }: { date: string }) => {
  return (
    <div className='ms-auto'>
      <div className='d-flex align-items-center'>
        <IoMdTime className='color-lightn hover-color-primary me-2 p-medium' />
        <p className='color-lightn p-medium m-0 fs-xl-12'>{format(date, 'd MMM yyyy')}</p>
      </div>
    </div>
  )
}
