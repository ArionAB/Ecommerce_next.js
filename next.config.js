/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
    ],
    domains: ['ik.imagekit.io'],
    // loader: "custom",
    // loaderFile: "./src/Utils/customImageLoader",
  },
  webpack: (config, { isServer }) => {
    // Enable tree shaking
    config.optimization.minimize = true;
    config.optimization.minimizer = [];

    // Exclude server-side Material-UI styles from the bundle
    if (!isServer) {
      config.resolve.alias['@emotion/react'] = '@emotion/react';
      config.resolve.alias['@emotion/styled'] = '@emotion/styled';
    }

    return config;
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);