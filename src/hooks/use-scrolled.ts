import { useEffect, useState } from "react";

// Custom hook to track if page is scrolled more than given threshold (default 10px)
export function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
