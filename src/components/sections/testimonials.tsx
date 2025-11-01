"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import { testimonials } from "@/data/testimonials";

import Container from "../layout/container";

const AnimatedTestimonials = dynamic(() => import("../ui/animated-testimonials"), {
  ssr: false,
});

export default function Testimonials() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(() => setIsReady(true), { timeout: 2000 });
    } else {
      timeoutId = setTimeout(() => setIsReady(true), 1000);
    }

    return () => {
      if (idleId !== undefined) cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Container
      as="section"
      id="testimonials"
      aria-labelledby="testimonial-heading"
      className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36 scroll-mt-30 lg:scroll-mt-40"
    >
      <h2 id="testimonial-heading" className="sr-only">
        Testimonials
      </h2>
      {isReady && <AnimatedTestimonials testimonials={testimonials} />}
    </Container>
  );
}
