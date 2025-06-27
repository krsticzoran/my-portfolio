"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/data/nav-links";

import { Button } from "../ui/button";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 items-center">
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Button
            key={href}
            asChild
            variant="ghost"
            className={`font-medium text-lg rounded-full transition-colors ${
              isActive
                ? "bg-white text-black hover:bg-white hover:text-black "
                : "text-foreground hover:bg-zinc-800"
            }`}
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
