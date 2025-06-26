import type { Icon } from "@tabler/icons-react";
import Link from "next/link";

type SocialLink = {
  href: string;
  label: string;
  icon: Icon;
  isEmail?: boolean; // Optional property to indicate if the link is an email
};

type SocialIconsProps = {
  socialLinks: SocialLink[];
};

export default function SocialIcons({ socialLinks }: SocialIconsProps) {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map(({ href, label, icon: Icon, isEmail }) => {
        // If isEmail is true, use mailto: prefix
        const linkHref = isEmail ? `mailto:${href}` : href;

        return (
          <Link
            key={href}
            href={linkHref}
            // Only add target and rel attributes if it's not an email link
            {...(!isEmail && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            aria-label={label}
            className="rounded-xl p-2 border border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center"
          >
            <Icon size={24} className="text-white" />
          </Link>
        );
      })}
    </div>
  );
}
