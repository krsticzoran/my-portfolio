"use client";

import { useEffect } from "react";

import { motion } from "motion/react";
import Link from "next/link";

import { logError } from "@/lib/logger";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Record the error; the visitor only sees a generic message and the error ID
  useEffect(() => {
    logError(error);
  }, [error]);

  return (
    <main
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center text-foreground bg-background h-screen w-full absolute z-50 top-0 overflow-hidden px-4"
    >
      <h1
        aria-label="Unexpected Error"
        className="text-6xl sm:text-8xl xl:text-9xl font-bold flex items-center justify-center gap-4"
      >
        {[..."Error"].map((char, index) => (
          <span key={index} className="relative">
            <span className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-600 rounded-full blur-2xl" />

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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 text-lg text-zinc-400 text-center max-w-xl"
      >
        <p>Something went wrong. Please try again.</p>
        {/* digest is a short ID Next.js adds for server errors; it matches the entry in the hosting logs */}
        {error.digest && (
          <p className="mt-4 text-sm text-zinc-500">
            Error ID: <code>{error.digest}</code>
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="mt-8 flex gap-4"
      >
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 text-sm rounded-full font-bold cursor-pointer transition bg-background text-foreground hover:bg-zinc-800 border border-foreground"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm rounded-full font-bold cursor-pointer bg-foreground text-background  border border-background hover:bg-zinc-200 transition"
        >
          Go to homepage
        </Link>
      </motion.div>
    </main>
  );
}
