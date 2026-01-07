import 'bootstrap/dist/css/bootstrap.min.css'
// AOS CSS ni dynamic import qilish - performance optimization
// import 'aos/dist/aos.css' // Dynamic import qilindi (pages/index.tsx da useEffect orqali)
import '@/styles/globals.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from 'next/app'
import { SkeletonTheme } from 'react-loading-skeleton'
import type { NextWebVitalsMetric } from 'next/app'
import { useEffect } from 'react'

// Web Vitals reporting - Performance monitoring
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics ga Web Vitals yuborish
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }
  }
  // Development da console.log
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
}

export default function App({ Component, pageProps }: AppProps) {
  // AOS CSS ni dynamic yuklash - performance optimization
  useEffect(() => {
    // CSS faylni dynamic yuklash (faqat client-side)
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css'
      link.onload = () => {
        // CSS yuklangandan keyin AOS init qilish
      }
      document.head.appendChild(link)

      return () => {
        // Cleanup
        const existingLink = document.querySelector(
          'link[href="https://unpkg.com/aos@2.3.1/dist/aos.css"]'
        )
        if (existingLink) {
          existingLink.remove()
        }
      }
    }
  }, [])

  return (
    <SkeletonTheme baseColor='#343a40' highlightColor='#212428'>
      <Component {...pageProps} />
    </SkeletonTheme>
  )
}
