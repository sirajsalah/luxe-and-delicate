import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type errors are caught in VS Code — don't block production builds
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
