export function Footer() {
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
      <p>All rights reserved. by Zoran Krstic</p>© {year}
    </footer>
  );
}
