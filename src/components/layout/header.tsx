import Image from "next/image";

import Container from "./container";
import DesktopNavLinks from "./desktop-nav-links";
import SocialIcons from "../common/social-icons";

export function Header() {
  return (
    <Container
      as="header"
      className="flex items-center justify-between font-exo bg-transparent mt-14"
    >
      <div className="flex items-center">
        <Image src="/logo.jpg" alt="Logo" width={56} height={56} />
      </div>
      <div className="hidden md:block">
        <DesktopNavLinks />
      </div>

      <SocialIcons limit={2} />
    </Container>
  );
}
