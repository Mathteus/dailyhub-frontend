import type { NextConfig } from "next";

const nextconfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ]
  }
};

export default nextconfig;
