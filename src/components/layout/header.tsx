import Image from "next/image";

import DesktopNavLinks from "./desktop-nav-links";
import SocialIcons from "../common/social-icons";

export function Header() {
  return (
    <header className="flex items-center w-full justify-between p-4 mt-14 bg-transparent gap-10 mx-auto xl:w-[70%]  font-exo ">
      <div className="flex items-center">
        <Image src="/logo.jpg" alt="Logo" width={56} height={56} />
      </div>
      <div className="hidden md:block">
        <DesktopNavLinks />
      </div>

      <SocialIcons limit={2} />
    </header>
  );
}
