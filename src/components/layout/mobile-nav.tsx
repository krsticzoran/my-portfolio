"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/../public/logo.jpg";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { navLinks } from "@/data/nav-links";
import { socialLinks } from "@/data/social-links";

import SocialIcons from "../common/social-icons";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-xl w-10 h-10 border border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center"
        >
          <Menu className="!w-6 !h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-background w-full h-full [&>button:last-child]:hidden "
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="flex p-4 items-center justify-between mt-6 ">
          <div className="flex items-center">
            <Image src={Logo} alt="Zoran Krstić logo" width={56} height={56} />
            <h2 className="font-semibold">zkrstic.com</h2>
          </div>
          <SheetClose asChild>
            <button
              className="rounded-xl w-10 h-10 border border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800  transition-colors duration-300 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </SheetClose>
        </div>
        <div className="flex flex-col gap-4 p-4">
          {navLinks.map(({ href, label }) => (
            <SheetClose asChild key={href}>
              <Link
                href={href}
                className={
                  "text-lg font-medium px-2 py-1 rounded-md transition-colors duration-300"
                }
              >
                {label}
              </Link>
            </SheetClose>
          ))}
        </div>
        <div className="px-4">
          <SocialIcons links={socialLinks} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
