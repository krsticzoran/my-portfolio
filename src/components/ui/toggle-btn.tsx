"use client";

import { useState } from "react";

import { Button } from "../ui/button";

type FilterType = "client" | "personal" | "all";

export default function ToggleBtn({
  onFilterChange,
}: {
  onFilterChange?: (_filter: FilterType) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("client");

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  const filters = [
    { id: "client" as const, label: "Client Projects" },
    { id: "personal" as const, label: "Personal Projects" },
    { id: "all" as const, label: "All Projects" },
  ];

  return (
    <div className="flex items-center justify-center mb-10 lg:mb-16">
      <div className="inline-flex p-1 lg:p-2 bg-zinc-900/90 backdrop-blur-md rounded-lg gap-2 lg:gap-4">
        {filters.map(({ id, label }) => {
          return (
            <Button
              key={id}
              variant="ghost"
              onClick={() => handleFilterChange(id)}
              className={`font-medium lg:text-lg rounded-lg transition-all duration-300 cursor-pointer lg:py-5 lg:px-6  ${
                activeFilter === id
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background shadow-md"
                  : "text-zinc-300 hover:bg-zinc-700/50 hover:text-foreground"
              }
              ${id === "all" ? "hidden sm:inline-flex" : "inline-flex"}
              `}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
