import Link from "next/link";

import { navLinks } from "@/data/nav-links";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

import { Button } from "../ui/button";

export default function DesktopNav() {
  // Extract section IDs by removing the '#' from href strings
  // This is needed because useActiveSection expects IDs without the '#' prefix
  const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

  // Get the currently active section ID (with '#' prefix) from the custom hook
  const activeHash = useActiveSection(sectionIds);

  const scrollToTop = useScrollToTop();

  return (
    <nav className="flex gap-6 items-center">
      {navLinks.map(({ href, label }) => {
        // Determine if this nav link corresponds to the currently active section
        const isActive = activeHash === href;

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (href === "#hero") {
            e.preventDefault(); // Prevent default behavior for the hero section link
            scrollToTop();
          }
        };

        return (
          <Button
            key={href}
            asChild
            variant="ghost"
            className={`font-medium text-lg rounded-full transition-colors ${
              isActive
                ? "bg-white text-black hover:bg-white hover:text-black"
                : "text-foreground hover:bg-zinc-800"
            }`}
          >
            {/* Link to section anchor */}
            <Link href={href} onClick={handleClick}>
              {label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
