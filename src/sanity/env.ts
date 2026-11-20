import { z } from "zod";

// Fails fast with a clear message when a variable is missing (e.g. not set on Vercel or in CI),
// instead of the site quietly rendering without Sanity content.
const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
});

// Each variable is read by its full name: Next inlines NEXT_PUBLIC_ values into the browser
// bundle only for literal `process.env.NAME` reads, so passing `process.env` as a whole would
// leave them undefined on the client.
export const env = envSchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});
