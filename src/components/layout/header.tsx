import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex  w-full justify-between p-4 mt-14 bg-transparent gap-10 text-white mx-auto xl:w-[70%]  font-exo ">
      <div className="flex items-center">
        <Image src="/logo.jpg" alt="Logo" width={56} height={56} />
      </div>

      <nav className="flex gap-6 items-center">
        <Button
          asChild
          variant="ghost"
          className="text-white font-medium text-lg hover:text-white hover:bg-zinc-800 rounded-full"
        >
          <Link href="#home" className="">
            Home
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="text-white font-medium text-lg hover:text-white hover:bg-zinc-800 rounded-full"
        >
          <Link href="#projects">Projects</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="text-white font-medium text-lg hover:text-white hover:bg-zinc-800 rounded-full"
        >
          <Link href="#contacts">Contacts</Link>
        </Button>
      </nav>

      <div className="flex w-24 items-center">akdas</div>
    </header>
  );
}
