import { createClient } from "@sanity/client";

import { env } from "./env";

export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  // Pins the API behavior to this date, so later changes on Sanity's side can't alter our results
  apiVersion: "2026-11-20",
  // Only published content, never drafts saved in the Studio
  perspective: "published",
  // Next caches the result and only refetches on revalidation, so requests are rare. Skipping
  // Sanity's CDN means a refetch right after publishing never gets a stale copy.
  useCdn: false,
});
