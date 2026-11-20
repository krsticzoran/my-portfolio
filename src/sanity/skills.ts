import { z } from "zod";

import { client } from "./client";

const SKILLS_QUERY = `*[_id == "skills"][0].items`;

// Content from the CMS is outside input, so its shape is checked like form input
const skillsSchema = z.array(z.string()).min(1);

// No fallback on purpose: if Sanity fails during a build, the deploy fails and the previous one
// stays live; if it fails during revalidation, Next keeps serving the last good page.
export async function getSkills(): Promise<string[]> {
  const skills = await client.fetch(
    SKILLS_QUERY,
    {},
    {
      // fetch isn't cached by default since Next 15; the tag lets a webhook revalidate it later
      cache: "force-cache",
      next: { tags: ["skills"] },
    }
  );

  return skillsSchema.parse(skills);
}
