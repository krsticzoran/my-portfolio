"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center text-foreground bg-background h-screen w-full absolute z-50 top-0 overflow-hidden px-4"
    >
      <h1
        aria-label="Error 404: Page not found"
        className="text-7xl sm:text-9xl xl:text-[200px] font-bold flex items-center justify-center gap-4"
      >
        {[..."404"].map((char, index) => (
          <span key={index} className="relative">
            <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-blue-600 via-violet-500 to-pink-400 rounded-full blur-2xl" />

            {/* Animated number */}
            <motion.span
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative block"
            >
              {char}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 text-lg text-zinc-400"
      >
        This page doesn&apos;t exist.{" "}
        <Link href="/" aria-label="Return to home page" className="text-violet-400 hover:underline">
          Go back home.
        </Link>
      </motion.p>
    </main>
  );
}
