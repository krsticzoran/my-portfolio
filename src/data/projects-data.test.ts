import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { projectsData } from "./projects-data";

describe("projectsData", () => {
  it("has a unique title for every project", () => {
    const titles = projectsData.map((project) => project.title);
    const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);

    expect(duplicates).toEqual([]);
  });

  it("uses https for every project link", () => {
    const links = projectsData
      .flatMap((project) => [project.ctaLink, project.github])
      .filter((link) => link !== undefined);
    const insecure = links.filter((link) => !link.startsWith("https://"));

    expect(insecure).toEqual([]);
  });

  it("has a non-empty title and description for every project", () => {
    // Identify projects by position in the list, since the title itself may be the empty field
    const incomplete = projectsData
      .map((project, index) => ({ position: index + 1, project }))
      .filter(({ project }) => project.title.trim() === "" || project.description.trim() === "")
      .map(({ position, project }) => `#${position} ${project.title}`);

    expect(incomplete).toEqual([]);
  });

  it("has readable text in the modal content of every project", () => {
    const withoutText = projectsData
      .filter((project) => {
        // content() returns JSX: render it to an HTML string, then strip the tags to get plain text
        const html = renderToStaticMarkup(project.content());
        const text = html.replace(/<[^>]*>/g, "");
        return text.trim() === "";
      })
      .map((project) => project.title);

    expect(withoutText).toEqual([]);
  });
});
