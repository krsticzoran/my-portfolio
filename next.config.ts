import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inline the (small) global CSS into the HTML so it doesn't block the first render
    // with an extra request. Fine for a one-page site where per-file CSS caching matters little.
    inlineCss: true,
  },
};

export default nextConfig;
