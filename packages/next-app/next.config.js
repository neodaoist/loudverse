/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["h7.alamy.com", "infura-ipfs.io"], // change to whatever we actually use
  },
};

module.exports = nextConfig;
