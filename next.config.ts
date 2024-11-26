import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /* config options here */
  output: 'standalone',
  env: {
    BASE_URL: process.env.BASE_URL || 'http://127.0.0.1:8000',
  }
};

export default nextConfig;
