import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH is "/<repo-name>" on GitHub project pages and empty everywhere else (set by the deploy workflow).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
