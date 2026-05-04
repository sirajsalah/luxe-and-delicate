/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Type errors are caught in VS Code / CI — don't block production builds
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

module.exports = nextConfig;