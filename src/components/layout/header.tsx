"use client";

import Image from "next/image";

import Logo from "@/../public/logo.jpg";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useScrolled } from "@/hooks/use-scrolled";

import Container from "./container";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import SocialIcons from "../ui/social-icons";

export function Header() {
  // Use custom hook to track if the page has been scrolled more than 10 pixels vertically
  const scrolled = useScrolled(10);

  // Custom hook to scroll to the top of the page
  const scrollToTop = useScrollToTop();

  return (
    <Container
      as="header"
      id="header"
      className={`sticky top-0 z-50 flex items-center justify-between font-exo  transition-colors duration-300 ${
        scrolled
          ? "bg-background lg:bg-zinc-900/80 backdrop-blur-md py-2 lg:py-4 rounded-lg shadow-lg"
          : "bg-transparent pt-8 lg:pt-12"
      }`}
    >
      {/* Logo wrapped in a Link to scroll to #hero section */}
      <div className="flex items-center">
        <button
          onClick={scrollToTop}
          className="flex items-center cursor-pointer"
          aria-label="Scroll to top"
          type="button"
        >
          <Image src={Logo} alt="Zoran Krstić logo" width={56} height={56} priority />
        </button>
      </div>

      {/* Desktop navigation - visible only on large screens (lg and above) */}
      <div className="hidden lg:block">
        <DesktopNav />
      </div>

      {/* Section containing social icons and mobile navigation menu */}
      <div className="flex items-center gap-4">
        {/* Social icons, visible on small screens and larger */}
        <div className="hidden sm:block">
          <SocialIcons limit={2} />
        </div>

        {/* Mobile navigation menu, visible only on smaller screens */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </Container>
  );
}
