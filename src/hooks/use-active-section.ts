"use client";
import { useEffect, useRef, useState } from "react";

// Custom hook that tracks which section is currently active based on scroll position
export function useActiveSection(sectionIds: string[]) {
  // State to hold the ID of the currently active section (rendered by the nav)
  const [activeId, setActiveId] = useState<string>("");

  // Refs for values the observer callback reads. Unlike state, changing a ref doesn't
  // re-render or re-run effects, so the observer can be created once and still always
  // see the latest values (no stale closure).
  const scrollDirectionRef = useRef<"up" | "down">("down");
  const activeIdRef = useRef("");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      scrollDirectionRef.current = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to observe intersections of sections to determine which is active
  useEffect(() => {
    const handleObserve = (entries: IntersectionObserverEntry[]) => {
      let newActiveId = activeIdRef.current;
      let highestVisibleRatio = 0;

      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio; // How much of the element is visible
        const id = `#${entry.target.id}`; // Add '#' prefix for consistency with nav links

        // When scrolling down, use first intersecting element
        if (scrollDirectionRef.current === "down" && entry.isIntersecting) {
          newActiveId = id;
          return;
        }

        // When scrolling up, find the element with highest visibility
        if (scrollDirectionRef.current === "up" && ratio > highestVisibleRatio) {
          highestVisibleRatio = ratio;
          newActiveId = id;
        }
      });

      if (newActiveId !== activeIdRef.current) {
        activeIdRef.current = newActiveId;
        setActiveId(newActiveId);
      }
    };

    // Create IntersectionObserver to watch visibility of sections in viewport
    const observer = new IntersectionObserver(handleObserve, {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // adjust when intersection is triggered vertically
      threshold: 0.1, // trigger callback when 10% of the element is visible
    });

    // Observe each section by its ID
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
