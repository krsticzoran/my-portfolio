import Link from "next/link";

import { socialLinks, type SocialLink } from "@/data/social-links";

interface SocialIconsProps {
  links?: SocialLink[];
  limit?: number;
  className?: string;
  size?: number;
}

export default function SocialIcons({
  links = socialLinks,
  limit,
  className,
  size = 24,
}: SocialIconsProps) {
  const displayedLinks = limit ? links.slice(0, limit) : links;
  return (
    <div className={`flex items-center gap-4 ${className || ""}`}>
      {displayedLinks.map(({ href, label, icon: Icon, isEmail }) => {
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
            className="rounded-xl w-10 h-10 border border-zinc-800 hover:border-zinc-800 hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center"
          >
            <Icon size={size} />
          </Link>
        );
      })}
    </div>
  );
}
