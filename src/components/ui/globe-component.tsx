"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// Dynamically import Globe component without SSR (server-side rendering)
// This avoids loading the Globe on the server and improves initial load performance
const Globe = dynamic(() => import("../magicui/globe").then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className="w-full h-full" />, // Placeholder while loading
});

export default function GlobeComponent() {
  // Use Intersection Observer to detect when the Globe container is in the viewport
  // This allows us to lazy-load Globe only when it becomes visible on screen
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once, no repeated loads
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  return (
    <>
      {/* Attach the ref for inView detection */}
      <div ref={ref} className="relative h-full min-h-[250px]">
        {/* Render Globe component only when it’s in the viewport */}
        {inView && <Globe />}
      </div>
    </>
  );
}
