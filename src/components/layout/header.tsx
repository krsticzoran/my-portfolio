import Image from "next/image";

import Logo from "@/../public/logo.jpg";

import Container from "./container";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import SocialIcons from "../common/social-icons";

export function Header() {
  return (
    <Container
      as="header"
      className="flex items-center justify-between font-exo bg-transparent mt-14"
    >
      <div className="flex items-center">
        <Image src={Logo} alt="Zoran Krstić logo" width={56} height={56} priority />
      </div>
      <div className="hidden lg:block">
        <DesktopNav />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <SocialIcons limit={2} />
        </div>
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </Container>
  );
}
