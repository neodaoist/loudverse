/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["loudverse.vercel.app", "infura-ipfs.io"], // change to whatever we actually use
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  fallback: {
    fs: false,
  },
};

module.exports = nextConfig;
