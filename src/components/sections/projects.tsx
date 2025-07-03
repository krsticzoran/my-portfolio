// import { iconSlugs } from "@/data/icon-skill-slugs";

import Container from "../layout/container";
// import { IconCloud } from "../magicui/icon-cloud";
import ExpandableCardDemo from "../ui/expandable-card-demo";

export default function Projects() {
  /* const icons = iconSlugs.map((slug) => {
    return `https://cdn.simpleicons.org/${slug}`;
  }); */

  return (
    <Container
      as="section"
      id="projects"
      className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36  gap-16 pb-[500px]"
    >
      <ExpandableCardDemo />
      {/* <IconCloud icons={icons} /> */}
    </Container>
  );
}
