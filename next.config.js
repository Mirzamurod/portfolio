/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // Image optimization yoqilgan (default: true)
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '**' },
      { protocol: 'https', hostname: 'prgutxuaf0.ufs.sh', pathname: '**' },
    ],
  },
  // Compression yoqilgan (default: true)
  compress: true,
  // SCSS compilation optimization
  sassOptions: {
    // Production da minification va source maps optimization
    outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
    // Source maps faqat development da
    sourceMap: process.env.NODE_ENV === 'development',
  },
  // CSS optimization
  swcMinify: true, // SWC minifier ishlatish (tezroq)
  // Production optimizations
  productionBrowserSourceMaps: false, // Source maps production da o'chirilgan (performance)
  optimizeFonts: true, // Font optimization yoqilgan
  poweredByHeader: false, // X-Powered-By header o'chirilgan (security va performance)
  // Browser Caching - Performance optimization
  async headers() {
    return [
      {
        // Static images uchun long-term caching (1 yil)
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Static files uchun long-term caching (1 yil)
        source: '/:path*\\.(ico|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // PDF files uchun caching (1 oy)
        source: '/:path*\\.pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
