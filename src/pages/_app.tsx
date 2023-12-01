import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
