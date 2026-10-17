import type { Project } from "@/data/projects-data";
import type { FilterType } from "@/lib/types";

// Projects shown for the selected filter tab. "all" or no filter shows everything.
// Generic over anything with a `type`, so tests can pass small plain objects.
export function filterProjects<T extends Pick<Project, "type">>(
  projects: T[],
  filter?: FilterType
): T[] {
  if (!filter || filter === "all") return projects;
  return projects.filter((project) => project.type === filter);
}
