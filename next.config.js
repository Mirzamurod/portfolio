/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '**' },
      { protocol: 'https', hostname: 'prgutxuaf0.ufs.sh', pathname: '**' },
    ],
  },
}

module.exports = nextConfig
