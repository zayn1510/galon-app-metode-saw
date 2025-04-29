import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8022',
        pathname: '/api/v1/depot-user/preview/**',
      },
    ],
  },
};

export default nextConfig;
