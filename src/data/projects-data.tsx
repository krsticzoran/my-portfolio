import { JSX } from "react";

import { StaticImageData } from "next/image";

import aiBuddyImage from "@/assets/ai-buddy.webp";
import basketballImage from "@/assets/basketball.webp";
import eStoreImage from "@/assets/e-store.webp";
import realEstateImage from "@/assets/real-estate.webp";
import rolloImage from "@/assets/rollo.webp";

export type Project = {
  description: string;
  title: string;
  src: string | StaticImageData;
  year: string;
  explore: string;
  ctaText: string;
  ctaLink: string;
  github?: string;
  content: () => JSX.Element;
};

export const projectsData: Project[] = [
  {
    description: "Next.js, Tailwind CSS, Framer Motion, WP as Headless CMS",
    title: "Tea Shop – E-commerce Website – Personal Project",
    src: eStoreImage,
    year: "2025",
    explore: "Explore",
    ctaText: "Live",
    github: "https://github.com/krsticzoran/e-store",
    ctaLink: "https://e-store.zkrstic.com/",
    content: () => {
      return (
        <>
          <p>
            Developed a modern, fast, and user-friendly e-commerce website for a tea shop,
            leveraging a <strong>headless setup</strong> with <strong>WordPress</strong> and{" "}
            <strong>Next.js</strong>.
          </p>
          <p>
            The site features dynamic product pages, secure authentication, and a seamless shopping
            experience. Focus was on performance, smooth animations, and full responsiveness across
            devices.
          </p>
        </>
      );
    },
  },
  {
    description: "Next.js, SASS, Resend API",
    title: "Basketball Coach Website – Freelance Project ",
    src: basketballImage,
    explore: "explore",
    year: "2024",
    ctaText: "Live",
    ctaLink: "https://probasketballcoach.com/",
    github: "https://github.com/krsticzoran/basketball-coach",
    content: () => {
      return (
        <>
          <p>
            I built this website for basketball coach <strong>Siniša Savović</strong>, the first
            coach of NBA MVP Nikola Jokić. The goal was to create a fast, elegant portfolio
            showcasing his legacy and enabling easy contact for players and parents.
          </p>

          <p className="mt-2">
            The site uses <strong>Next.js</strong> for performance and SEO, styled with{" "}
            <strong>SASS</strong> for full design control, and includes a contact form powered by
            the <strong>Resend API</strong>.
          </p>
        </>
      );
    },
  },

  {
    description: "SEO",
    title: "Rollo Website – Freelance Project ",
    src: rolloImage,
    explore: "explore",
    year: "2024 - Present",
    ctaText: "Live",
    ctaLink: "https://rollo.hr/",
    content: () => {
      return (
        <>
          <p>
            I improved and maintained the website for a PVC joinery company in Pula, Croatia. Built
            with <strong>WordPress and Elementor</strong>, I added pages, cleaned legacy code, and{" "}
            <strong>reduced plugins by seven</strong>.
          </p>

          <p>
            I also <strong>boosted mobile performance</strong> from 40 to 75 on Google PageSpeed,
            set up lead-generating forms, and improved on-page SEO. A focused{" "}
            <strong>link-building strategy</strong> raised key rankings (e.g. “pvc stolarija Pula”)
            from page 2 to <strong>top of page 1</strong>.
          </p>
        </>
      );
    },
  },
  {
    description: "React, TypeScript, GraphQL, Express.js, MongoDB",
    title: "Real Estate Agency Website – Personal Project ",
    src: realEstateImage,
    explore: "explore",
    year: "2023 - 2024",
    ctaText: "Live",
    ctaLink: "https://real.estate.zkrstic.com/",
    github: "https://github.com/krsticzoran/real-estate-agency",
    content: () => {
      return (
        <>
          <p>
            Developed a real estate platform to showcase <strong>frontend skills</strong> and
            fullstack experience. Frontend built with <strong>React, TypeScript</strong>,{" "}
            <strong>Bootstrap</strong>, and <strong>Framer Motion</strong>.
          </p>

          <p>
            Backend uses <strong>Express.js, MongoDB</strong> with a custom admin dashboard for
            listings management, including filtering, search, and{" "}
            <strong>login-protected admin panel</strong>. Uses <strong>GraphQL</strong> for data
            fetching.
          </p>
        </>
      );
    },
  },
  {
    description: "React, Bootstrap, Redux Toolkit, Firebase",
    title: "AI Buddy – Personal Project ",
    src: aiBuddyImage,
    explore: "explore",
    year: "2023",
    ctaText: "Live",
    ctaLink: "https://ai-buddy.netlify.app/",
    github: "https://github.com/krsticzoran/ai-buddy",
    content: () => {
      return (
        <>
          <p>
            Developed <strong>AI Buddy</strong>, a voice-enabled ChatGPT interface using{" "}
            <strong>React</strong> and <strong>Bootstrap</strong> with advanced hooks for better
            performance.
          </p>

          <p>
            Features <strong>voice-to-text</strong>, integrates <strong>OpenAI API</strong>, uses{" "}
            <strong>Redux Toolkit</strong> for state, <strong>Firebase Authentication</strong>, and
            tested with <strong>Jest</strong> and <strong>React Testing Library</strong>.
          </p>
        </>
      );
    },
  },
];
