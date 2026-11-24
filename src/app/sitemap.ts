import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zkrstic.dev";

  return [
    // No lastModified: new Date() would claim a change on every regeneration, and Google ignores
    // lastmod values that aren't accurate. Real dates can come from Sanity's _updatedAt later.
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
