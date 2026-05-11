const path = require("path");
const { pathToFileURL } = require("url");

const globalScss = path.resolve(__dirname, "src/sass/global.scss");
const mixinsScss = path.resolve(__dirname, "src/sass/abstracts/_mixins.scss");
const variablesScss = path.resolve(__dirname, "src/sass/abstracts/_variables.scss");

const fontGoogle =
  '@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap");';

function fileImport(absPath) {
  return `@import "${pathToFileURL(absPath).href}";`;
}

const skipAdditionalData = new Set(
  [globalScss, mixinsScss, variablesScss].map((p) => path.normalize(p))
);

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
    // Import mixins + variables by absolute file URL so they always resolve and
    // merge into the entry file scope (importing global.scss via file: URL can
    // leave variables undefined under sass-loader + resolve-url-loader).
    additionalData: (content, loaderContext) => {
      const resource = path.normalize(loaderContext.resourcePath);
      if (skipAdditionalData.has(resource)) {
        return content;
      }
      return `${fontGoogle}\n${fileImport(mixinsScss)}\n${fileImport(variablesScss)}\n${content}`;
    },
  },
};

module.exports = nextConfig;
