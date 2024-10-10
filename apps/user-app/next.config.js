/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ['images.unsplash.com'],
  },
  // ... any other existing configurations
};

module.exports = nextConfig;