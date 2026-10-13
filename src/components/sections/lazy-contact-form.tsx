"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// Load the form (and Zod + react-hook-form with it) only when the contact section
// gets close to the viewport, instead of on first page load. Same pattern as the globe.
const ContactForm = dynamic(() => import("./contact-form"), {
  ssr: false,
});

export default function LazyContactForm() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Load once, never unload
    rootMargin: "300px 0px", // Start loading 300px before the form scrolls into view
  });

  // min-h matches the rendered form height, so the page doesn't shift when it appears
  return (
    <div ref={ref} className="min-h-[322px]">
      {inView && <ContactForm />}
    </div>
  );
}
