"use client";

import { useState } from "react";

import Container from "../layout/container";
import ExpandableCardDemo from "../ui/expandable-card-demo";
import ToggleBtn from "../ui/toggle-btn";

type FilterType = "client" | "personal" | "all";

export default function Projects() {
  const [filter, setFilter] = useState<FilterType>("client");
  return (
    <Container
      as="section"
      id="projects"
      className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36 scroll-mt-30 lg:scroll-mt-40"
    >
      <ToggleBtn onFilterChange={setFilter} />
      <ExpandableCardDemo type={filter} />
    </Container>
  );
}
