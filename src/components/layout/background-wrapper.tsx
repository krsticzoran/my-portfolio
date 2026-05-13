import type { ReactNode } from "react";

export function BackgroundWrapper({ children }: { children: ReactNode }) {
  // Temporarily converted to a server component for testing.
  // Mouse-tracking and framer-motion logic are commented out.

  const baseDots =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' opacity='0.4' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' cx='10' cy='10' r='0.8' /%3E%3C/svg%3E\")";

  return (
    <div className="relative w-full min-h-screen group">
      {/* Base dots */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: baseDots }}
      />

      {/*
        Spotlight (interactive) is commented out while testing. Re-enable to
        restore the spotlight that follows the mouse.

        Example of the interactive block to re-enable:

        // import { useMotionValue, useMotionTemplate, motion } from 'framer-motion'
        // const mouseX = useMotionValue(0)
        // const mouseY = useMotionValue(0)
        // <motion.div style={{ WebkitMaskImage: useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)` }} />
      */}

      {/* Content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
