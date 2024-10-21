import Skeleton from 'react-loading-skeleton'

const Loader = () => {
  return (
    <div className='h-100'>
      <div className='bg-color-1 box-shadow hover-bg-color-1 p-sm-4 p-4 p-lg-4 p-xl-5 borr-20 h-100'>
        <Skeleton height={250} borderRadius={10} />
        <div className='d-flex justify-content-between my-3'>
          <Skeleton width={75} />
          <Skeleton width={50} />
        </div>
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  )
}

export default Loader
