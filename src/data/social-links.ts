import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconBrandInstagram,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

export type SocialLink = {
  href: string;
  label: string;
  icon: Icon;
  isEmail?: boolean; // Optional property to indicate if the link is an email
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/krsticzoran",
    label: "GitHub",
    icon: IconBrandGithub,
  },
  {
    href: "https://www.linkedin.com/in/zorankrstic/",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
  },
  {
    href: "contact@zkrstic.com",
    label: "Email",
    icon: IconMail,
    isEmail: true,
  },
  {
    href: "https://www.instagram.com/_zo.run_/",
    label: "Instagram",
    icon: IconBrandInstagram,
  },
];
