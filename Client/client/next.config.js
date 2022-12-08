/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
    ],
    loader: "custom",
    // loaderFile: "./src/Utils/customImageLoader",
  },
};

module.exports = nextConfig;
