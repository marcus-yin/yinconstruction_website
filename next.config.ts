import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully static site into ./out,
  // ready for AWS Amplify, S3 + CloudFront, or any static host.
  output: "export",

  // Required for static export (no image optimization server).
  // Images are served as-is; use appropriately sized source files.
  images: {
    unoptimized: true,
  },

  // Emit folder/index.html pages so S3/CloudFront resolve clean URLs.
  trailingSlash: true,
};

export default nextConfig;
