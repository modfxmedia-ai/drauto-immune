import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // drautoimmune.com serves every route with a trailing slash (WordPress/Rank Math
  // permalink style) — match that pattern exactly for SEO continuity.
  trailingSlash: true,

  async redirects() {
    return [
      {
        // Renamed from /free-discovery-call/ to /discovery-call/. This was a
        // live, indexed route — permanently redirect it to preserve SEO/backlinks.
        source: "/free-discovery-call/",
        destination: "/discovery-call/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
