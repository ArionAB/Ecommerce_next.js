/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    target: "serverless",
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
            },
        ],
        // loader: "custom",
        // loaderFile: "./src/Utils/customImageLoader",
    },
};


const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig);
