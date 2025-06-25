import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import DesktopNavLinks from "./desktop-nav-links";

export function Header() {
  return (
    <header className="flex  w-full justify-between p-4 mt-14 bg-transparent gap-10 text-white mx-auto xl:w-[70%]  font-exo ">
      <div className="flex items-center">
        <Image src="/logo.jpg" alt="Logo" width={56} height={56} />
      </div>

      <DesktopNavLinks />

      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/krsticzoran"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded-xl p-2 border border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center"
        >
          <IconBrandGithub size={24} className="text-white" />
        </Link>

        <Link
          href="https://www.linkedin.com/in/zorankrstic/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="rounded-xl p-2 border border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center"
        >
          <IconBrandLinkedin size={24} className="text-white" />
        </Link>
      </div>
    </header>
  );
}
