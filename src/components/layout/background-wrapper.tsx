"use client";

import React from "react";

import { useMotionValue, useMotionTemplate, motion } from "motion/react";

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const baseDots =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23404040' fill-opacity='0.4' /%3E%3C/svg%3E\")";
  const hoverDots =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23818181' fill-opacity='0.6' /%3E%3C/svg%3E\")";

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-black group"
      onMouseMove={handleMouseMove}
    >
      {/* Base dots */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: baseDots,
        }}
      />

      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage: hoverDots,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10   min-h-screen">{children}</div>
    </div>
  );
}
