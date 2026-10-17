import { describe, expect, it } from "vitest";

import { filterProjects } from "./filter-projects";

// Small made-up list: the test checks the filtering logic, not the real portfolio content
const projects = [
  { title: "A", type: "client" as const },
  { title: "B", type: "personal" as const },
  { title: "C", type: "client" as const },
];

const titles = (list: { title: string }[]) => list.map((project) => project.title);

describe("filterProjects", () => {
  it("keeps only client projects for the client filter", () => {
    expect(titles(filterProjects(projects, "client"))).toEqual(["A", "C"]);
  });

  it("keeps only personal projects for the personal filter", () => {
    expect(titles(filterProjects(projects, "personal"))).toEqual(["B"]);
  });

  it("returns every project for the all filter", () => {
    expect(titles(filterProjects(projects, "all"))).toEqual(["A", "B", "C"]);
  });

  it("returns every project when no filter is given", () => {
    expect(titles(filterProjects(projects))).toEqual(["A", "B", "C"]);
  });
});
