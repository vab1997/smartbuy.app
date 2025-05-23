import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.clerk.com', 'http2.mlstatic.com'],
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
