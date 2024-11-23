const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')]
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ];
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/be/api/:path*',
            destination: 'http://127.0.0.1:8002/be/api/:path*'
          }
        ]
      : [];
  }
}

module.exports = nextConfig;
