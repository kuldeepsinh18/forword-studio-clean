/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
  outputFileTracingExcludes: {
    '*': ['public/**/*'],
  },
};

module.exports = nextConfig;
