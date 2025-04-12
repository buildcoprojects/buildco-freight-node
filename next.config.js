/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static site generation
  distDir: 'out',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.same-assets.com',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint checks during build
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript checks during build
  },
  compiler: {
    // Enables tree-shaking and efficient production builds
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
