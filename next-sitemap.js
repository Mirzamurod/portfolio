let policy = {
  userAgent: "*"
}

if (process.env.ENVIRONMENT !== 'production') {
  policy.disallow = '/'
}

module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      policy
    ]
  },
  // outDir: './out'
}