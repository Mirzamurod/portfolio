import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import '@/styles/globals.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from 'next/app'
import { SkeletonTheme } from 'react-loading-skeleton'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SkeletonTheme baseColor='#343a40' highlightColor='#212428'>
      <Component {...pageProps} />
    </SkeletonTheme>
  )
}
