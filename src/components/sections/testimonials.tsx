"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

import { testimonials } from "@/data/testimonials";

import Container from "../layout/container";

const AnimatedTestimonials = dynamic(() => import("../ui/animated-testimonials"), {
  ssr: false,
  // Placeholder is the smallest real height (mobile 608px, md+ 480px), so loading never shrinks the section
  loading: () => <div className="w-full h-[608px] md:h-[480px]" />,
});

export default function Testimonials() {
  // Use Intersection Observer to lazy-load testimonials when visible
  const { ref, inView } = useInView({
    triggerOnce: true, // Only load once
    threshold: 0.1, // Trigger when 10% visible
  });

  return (
    <Container
      as="section"
      id="testimonials"
      aria-labelledby="testimonial-heading"
      className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36 scroll-mt-30 lg:scroll-mt-40"
    >
      <div ref={ref} className="h-full">
        <h2 id="testimonial-heading" className="sr-only">
          Testimonials
        </h2>
        {/* Render AnimatedTestimonials only when in viewport */}
        {inView ? (
          <AnimatedTestimonials testimonials={testimonials} />
        ) : (
          <div className="h-[608px] md:h-[480px]" />
        )}
      </div>
    </Container>
  );
}
