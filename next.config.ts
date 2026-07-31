import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // drautoimmune.com serves every route with a trailing slash (WordPress/Rank Math
  // permalink style) — match that pattern exactly for SEO continuity.
  trailingSlash: true,
};

export default nextConfig;
