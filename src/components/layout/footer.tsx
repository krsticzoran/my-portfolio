import { cacheLife } from "next/cache";

// The year is computed when the page is generated, so it's cached on purpose: "weeks" regenerates
// the page in the background at most weekly, and the year is at most a week late after New Year.
export async function Footer() {
  "use cache";
  cacheLife("weeks");

  const year = new Date().getFullYear();

  return (
    <footer
      className="
    border-t border-border 
    py-6 
   flex
    items-center
    justify-center
    text-foreground 
    text-sm 
    font-medium 
    select-none
  "
    >
      <p>© 2025-{year} Zoran Krstic. All rights reserved.</p>
    </footer>
  );
}
