"use client";

import Link from "next/link";

import { navLinks } from "@/data/nav-links";
import { useActiveSection } from "@/hooks/use-active-section";

import { Button } from "../ui/button";

// Section IDs without the '#' prefix (useActiveSection expects plain IDs).
// Computed once at module level so the array keeps the same reference between renders.
const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export default function DesktopNav() {
  // Get the currently active section ID (with '#' prefix) from the custom hook
  const activeHash = useActiveSection(sectionIds);

  return (
    <nav className="flex gap-6 items-center">
      {navLinks.map(({ href, label }) => {
        // Determine if this nav link corresponds to the currently active section
        const isActive = activeHash === href;

        return (
          <Button
            key={href}
            asChild
            variant="ghost"
            className={`font-medium text-lg transition-colors ${
              isActive
                ? "bg-white text-black hover:bg-white hover:text-black"
                : "text-foreground hover:bg-zinc-800"
            }`}
          >
            {/* Link to section anchor */}
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
