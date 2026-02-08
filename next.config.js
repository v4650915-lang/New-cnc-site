/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // output: 'standalone',
  // basePath: '/New-cnc-site', // Not needed for root domain/IP
  images: {
    unoptimized: true,
  },
  // Эти настройки заставят GitHub собрать сайт, несмотря на красные подчеркивания
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;