type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const testimonials: Testimonial[] = [
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
];
