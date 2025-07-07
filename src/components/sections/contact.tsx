"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

import Container from "@/components/layout/container";

import ContactForm from "./contact-form";

// Dynamically import Globe component without SSR (server-side rendering)
// This avoids loading the Globe on the server and improves initial load performance
const Globe = dynamic(() => import("../magicui/globe").then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className="w-full h-full" />, // Placeholder while loading
});

export default function Contact() {
  // Use Intersection Observer to detect when the Globe container is in the viewport
  // This allows us to lazy-load Globe only when it becomes visible on screen
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once, no repeated loads
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  return (
    <Container
      as="section"
      id="contact"
      className="py-24 md:py-28 lg:py-32 2xl:py-36 flex flex-col-reverse lg:flex-row gap-16 h-full scroll-mt-20 lg:scroll-mt-30"
    >
      <div className="w-full sm:w-4/5 lg:w-1/2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
          Get in Touch
        </h2>
        <ContactForm />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-start">
        <div className="mb-8 px-4 w-full sm:w-4/5 lg:w-full">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 tracking-tight leading-tight">
            Based in Serbia, Available Worldwide
          </h3>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed text-pretty">
            Whether you’re in Berlin, New York, or Tokyo — I’m ready to{" "}
            <span className="italic">collaborate remotely</span> and bring your ideas to life.{" "}
            <span className="italic">Let’s build something great together.</span>
          </p>
        </div>
        {/* Attach the ref for inView detection */}
        <div ref={ref} className="relative h-full min-h-[250px]">
          {/* Render Globe component only when it’s in the viewport */}
          {inView && <Globe />}
        </div>
      </div>
    </Container>
  );
}
