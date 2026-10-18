import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inline the (small) global CSS into the HTML so it doesn't block the first render
    // with an extra request. Fine for a one-page site where per-file CSS caching matters little.
    inlineCss: true,
  },
  // Security headers for every route. HSTS is left out: Vercel already sends it,
  // and the whole .dev TLD is on the browsers' HSTS preload list.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Don't allow the site inside an iframe on other sites (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Trust the declared Content-Type, don't let the browser guess (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send only the origin, not the full URL, when linking to other sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Block browser features the site never uses. Doesn't affect the country lookup,
          // which comes from Vercel's x-vercel-ip-country header on the server.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
