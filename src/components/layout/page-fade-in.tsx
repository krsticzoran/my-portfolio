import { ReactNode } from "react";

// Fades the page in with a CSS animation (see `.animate-page-fade-in` in globals.css).
// It used to be a motion component, which kept the whole page invisible until JavaScript loaded.
export default function PageFadeIn({ children }: { children: ReactNode }) {
  return <div className="animate-page-fade-in">{children}</div>;
}
