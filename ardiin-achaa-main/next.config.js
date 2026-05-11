const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    // So @import "sass/global" resolves to src/sass/global.scss on all platforms
    includePaths: [path.resolve(__dirname, "src")],
  },
};

module.exports = nextConfig;
