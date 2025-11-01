"use client";

import dynamic from "next/dynamic";

import Container from "../layout/container";

const AnimatedTestimonials = dynamic(() => import("../ui/animated-testimonials"), {
  ssr: false,
});

export default function Testimonials() {
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
      <AnimatedTestimonials
        testimonials={[
          {
            quote: "Zoran fixed a tricky deployment bug fast and kept everything running smoothly.",
            name: "Shea Onstott - USA",
            designation: "Startup Founder",
            src: "/shea.webp",
          },
          {
            quote:
              "The work was done properly, communication was clear and smooth. Nothing to complain about. I definitely recommend!",
            name: "Siham Ouanguich - Belgium",
            designation: "Designer",
            src: "/siham.jpeg",
          },
          {
            quote:
              "Zoran designed and built my website exactly as I wanted. Professional, reliable, and easy to work with.",
            name: "Siniša Savović - Serbia",
            designation: "Basketball Coach",
            src: "/sinisa.jpg",
          },
          {
            quote:
              "Great guy, responsive and with a strong understanding of his assignments. Will definitely hire again.",
            name: "Muthasim Abrar - Australia",
            designation: "Full Stack Developer at MAYVK",
            src: "/muthasim.jpeg",
          },
          {
            quote:
              "Zoran was great from start to finish, very professional, responsive, and delivered a fully functional, attractive website. Highly recommended!",
            name: "Krunoslav Vukelić - Croatia",
            designation: "Professor",
            src: "/kruno.webp",
          },
        ]}
      />
    </Container>
  );
}
