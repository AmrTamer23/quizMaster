/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      },
      {
        hostname: 'ui-avatars.com'
      }
    ]
  },
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard'
      }
    ]
  }
}

module.exports = nextConfig
