/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["h7.alamy.com", "infura-ipfs.io"], // change to whatever we actually use
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
