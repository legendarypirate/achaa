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
    includePaths: [path.resolve(__dirname, "src")],
    // Quieter builds until @use migration (Dart Sass 3 will drop @import)
    silenceDeprecations: ["import", "global-builtin"],
  },
};

module.exports = nextConfig;
