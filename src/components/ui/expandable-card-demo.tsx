"use client";

import React, { useEffect, useId, useRef, useState } from "react";

import { IconBrandGithub, IconPlayerPlay } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null!);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => {
    if (ref.current) {
      setActive(null);
    }
  });

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 flex justify-center mt-20 2xl:grid place-items-center  2xl:mt-0 z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] overflow-y-auto shadow-lg h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={800}
                  height={800}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-auto sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-xl font-semibold text-background tracking-tight"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-xs sm:text-sm text-zinc-500  mt-1 tracking-wide uppercase"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-6 mt-2 border-t border-zinc-200  relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base lg:text-base leading-relaxed h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
                <div className="flex gap-2 px-4 mb-5">
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm rounded-full font-bold cursor-pointer transition bg-background text-foreground hover:bg-zinc-800"
                  >
                    <IconPlayerPlay size={16} className="mr-2" />
                    Live
                  </motion.a>
                  {active.github ? (
                    <motion.a
                      layoutId={`github-${active.title}-${id}`}
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm rounded-full font-bold cursor-pointer bg-foreground text-background  border border-background hover:bg-zinc-200 transition"
                    >
                      <IconBrandGithub size={16} className="mr-2" />
                      GitHub
                    </motion.a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className=" mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.li
            layoutId={`card-${card.title}-${index}-${id}`}
            key={`card-${card.title}-${index}-${id}`}
            onClick={() => setActive(card)}
            className="my-6 px-6 py-4 flex flex-col md:flex-row justify-between items-center hover:bg-zinc-900/80 rounded-xl cursor-pointer transition-all duration-500"
          >
            <div className="flex gap-6 flex-col md:flex-row items-center">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                className="relative min-h-32 min-w-48 md:h-20 md:w-20"
              >
                <Image
                  fill
                  src={card.src}
                  alt={card.title}
                  className="rounded-lg object-cover object-center "
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-lg sm:text-2xl font-semibold text-foreground tracking-tight text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-2 tracking-wide text-center md:text-left"
                >
                  {card.description}
                </motion.p>
                <motion.p
                  layoutId={`year-${card.description}-${id}`}
                  className="text-sm text-zinc-400 mt-1 text-center md:text-left"
                >
                  {card.year}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-6 py-2 text-sm sm:text-base rounded-full font-semibold bg-foreground text-background hover:bg-zinc-700 transition-colors duration-300 mt-6 md:mt-0 capitalize"
            >
              {card.explore}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Next.js, Tailwind CSS, Framer Motion, WP as Headless CMS",
    title: "Tea Shop – E-commerce Website – Personal Project",
    src: "/e-store.webp",
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
    src: "/basketball.webp",
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
    src: "/rollo.webp",
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
    src: "/real-estate.webp",
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
    src: "/ai-buddy.webp",
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
