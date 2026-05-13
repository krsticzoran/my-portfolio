"use client";

import React from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";

export function SpotlightEffect() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    // Use client coordinates relative to the element
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const hoverDots =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' opacity='0.9' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' cx='10' cy='10' r='1.2' /%3E%3C/svg%3E\")";

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      onPointerMove={handlePointerMove}
      style={{
        backgroundImage: hoverDots,
        WebkitMaskImage: useMotionTemplate`
          radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        maskImage: useMotionTemplate`
          radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
      }}
    />
  );
}
