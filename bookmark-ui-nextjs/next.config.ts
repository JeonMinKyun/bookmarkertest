import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // 개발모드에서 검수를 도와주는 것
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bookmarks',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;