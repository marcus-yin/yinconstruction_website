import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deployed via AWS Amplify's Next.js hosting integration (build output
  // directory: .next). All pages are statically generated at build time.
  //
  // To deploy to S3 + CloudFront instead, add `output: "export"` here and
  // deploy the ./out directory.

  // The placeholder images are SVGs, which Next's image optimizer rejects
  // by default. Once real JPG/WebP photos replace them, remove this to
  // enable Amplify's image optimization.
  images: {
    unoptimized: true,
  },

  // Serve pages at trailing-slash URLs, matching internal links.
  trailingSlash: true,
};

export default nextConfig;
