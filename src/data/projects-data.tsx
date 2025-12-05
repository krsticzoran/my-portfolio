import { JSX } from "react";

import { StaticImageData } from "next/image";

import aiBuddyImage from "@/assets/ai-buddy.webp";
import basketballImage from "@/assets/basketball.webp";
import eStoreImage from "@/assets/e-store.webp";
import fakturify from "@/assets/fakturify.webp";
import infiniwave from "@/assets/infiniwave.webp";
import learnPlus from "@/assets/learnplus.webp";
import portage from "@/assets/portage.png";
import realEstateImage from "@/assets/real-estate.webp";
import rolloImage from "@/assets/rollo.webp";

export type Project = {
  type: "client" | "personal";
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
    type: "client",
    description: "Next.js, Tailwind CSS, Netlify",
    title: "Portage Creek Web Designs | Custom Websites Built for Speed - Client Project (Upwork)",
    src: portage,
    year: "2025",
    explore: "Explore",
    ctaText: "Live",
    github: "https://github.com/krsticzoran/Portage-Creek",
    ctaLink: "https://portagecreekwebdesigns.com/",
    content: () => {
      return (
        <>
          <p>
            <strong>Portage Creek Web Designs</strong> is a high-performance web studio specializing
            in hand-coded, lightning-fast websites built with Next.js 15 and Tailwind CSS 4,
            delivering consistent 98–100 PageSpeed scores.
          </p>
          <p>
            Designed for small businesses, professionals, and academics, each project features
            responsive layouts, optimized images, dark mode support, and a clean UI engineered for
            speed and reliability.
          </p>
        </>
      );
    },
  },
  {
    type: "client",
    description: "Nuxt 3, Vue, Tailwind CSS, Markdown Blog",
    title: "Fakturify – SaaS Marketing Site – Client Project",
    src: fakturify,
    year: "2025",
    explore: "Explore",
    ctaText: "Live",
    ctaLink: "https://www.fakturify.com/",
    content: () => {
      return (
        <>
          <p>
            Created a high-performance marketing website for <strong>Fakturify</strong>, an
            invoicing SaaS platform targeting Serbian freelancers. The site focuses on conversion
            optimization and clear product presentation with smooth entrance animations and polished
            UX.
          </p>
          <p>
            Implemented using <strong>Nuxt 3</strong> for SSR benefits,{" "}
            <strong>Tailwind CSS</strong>
            for rapid styling, and a custom markdown parsing system for the blog. Features include
            dynamic routing, contact form with spam protection, and fully responsive design
            optimized for all devices.
          </p>
        </>
      );
    },
  },
  {
    type: "client",
    description: "Next.js, TypeScript, Tailwind CSS, Strapi",
    title: "Learn Plus – NGO Website – Client Project (Upwork)",
    src: learnPlus,
    year: "2025",
    explore: "Explore",
    ctaText: "Live",
    github: "https://github.com/krsticzoran/learn-plus-ngo-next.js",
    ctaLink: "https://learn-plus.org/",
    content: () => {
      return (
        <>
          <p>
            Developed a professional and accessible website for <strong>Learn Plus</strong>, an NGO
            focused on education and personal development. The goal was to present their programs,
            activities, and mission in a clear and engaging way.
          </p>
          <p>
            Built with <strong>Next.js</strong> and <strong>Strapi</strong> for a fully headless
            architecture, providing fast performance, easy content management, and a responsive
            layout optimized for all devices.
          </p>
        </>
      );
    },
  },
  {
    type: "client",
    description: "Figma to HTML/CSS/JS",
    title: "Designer Portfolio Landing Page – Client Project (Upwork)",
    src: infiniwave,
    year: "2025",
    explore: "Explore",
    ctaText: "Live",
    github: "https://github.com/krsticzoran/Infiniwave",
    ctaLink: "https://infiniwave.be/",
    content: () => {
      return (
        <>
          <p>
            Client project from <strong>Upwork</strong>, focused on converting a detailed{" "}
            <strong>Figma design</strong> into a fully responsive and pixel-perfect{" "}
            <strong>landing page</strong> using <strong>HTML, CSS,</strong> and{" "}
            <strong>JavaScript</strong>.
          </p>
          <p>
            The goal was to deliver a clean, maintainable codebase with smooth animations and
            consistent layout across all devices, following best front-end development practices.
          </p>
        </>
      );
    },
  },
  {
    type: "personal",
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
    type: "client",
    description: "Next.js, SASS, Resend API",
    title: "Basketball Coach Portfolio – Client Project",
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
    type: "client",
    description: "SEO",
    title: "Rollo – PVC Joinery Website – Client Project",
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
    type: "personal",
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
    type: "personal",
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
