"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// Dynamically import Globe component without SSR (server-side rendering)
// This avoids loading the Globe on the server and improves initial load performance
const Globe = dynamic(() => import("../magicui/globe").then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className="w-full h-full" />, // Placeholder while loading
});

export default function GlobeComponent() {
  const [capital, setCapital] = useState("Tokyo");

  useEffect(() => {
    fetch("/api/capital")
      .then((res) => res.json())
      .then((data) => {
        if (data.capital) setCapital(data.capital);
      })
      .catch((err) => console.error("API error", err));
  }, []);

  // Use Intersection Observer to detect when the Globe container is in the viewport
  // This allows us to lazy-load Globe only when it becomes visible on screen
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once, no repeated loads
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-start">
      <div className="mb-8 px-4 w-full sm:w-4/5 lg:w-full">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 tracking-tight leading-tight">
          Based in Serbia, Available Worldwide
        </h3>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed text-pretty">
          Whether you&apos;re in Berlin, New York, or{" "}
          {capital === "Berlin" || capital === "New York" ? "Tokyo" : capital}, I&apos;m ready to{" "}
          <span className="italic">collaborate remotely</span> and bring your ideas to life.{" "}
          <span className="italic">Let&apos;s build something great together.</span>
        </p>
      </div>
      {/* Attach the ref for inView detection */}
      <div ref={ref} className="relative h-full min-h-[250px]">
        {/* Render Globe component only when it’s in the viewport */}
        {inView && <Globe />}
      </div>
    </div>
  );
}
