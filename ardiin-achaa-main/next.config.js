const path = require("path");
const { pathToFileURL } = require("url");

const globalScss = path.resolve(__dirname, "src/sass/global.scss");
const globalImportLine = `@import "${pathToFileURL(globalScss).href}";`;

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
    // Production builds often run sass through resolve-url-loader, which can drop
    // includePaths for nested compilations. Prepending a file: URL import always resolves.
    additionalData: (content, loaderContext) => {
      const resource = path.normalize(loaderContext.resourcePath);
      if (resource === path.normalize(globalScss)) {
        return content;
      }
      return `${globalImportLine}\n${content}`;
    },
  },
};

module.exports = nextConfig;
