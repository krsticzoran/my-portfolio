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
          <div className="fixed inset-0  grid place-items-center z-[100]">
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
              className="w-full max-w-[600px] overflow-y-auto shadow-lg  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
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
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className=" mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${index}-${id}`}
            key={`card-${card.title}-${index}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-zinc-900/80 rounded-xl cursor-pointer transition-all duration-500"
          >
            <div className="flex gap-4 flex-col md:flex-row items-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={64}
                  height={64}
                  src={card.src}
                  alt={card.title}
                  className="rounded-lg object-cover object-center h-16 w-16 md:h-20 md:w-20"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-base sm:text-lg font-semibold text-foreground tracking-tight text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wide text-center md:text-left"
                >
                  {card.description}
                </motion.p>
                <motion.p
                  layoutId={`year-${card.description}-${id}`}
                  className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 text-center md:text-left"
                >
                  {card.year}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-xs sm:text-sm rounded-full font-semibold bg-foreground text-background hover:bg-zinc-700 transition-colors duration-300 mt-4 md:mt-0 whitespace-nowrap capitalize cursor-pointer"
            >
              {card.explore}
            </motion.button>
          </motion.div>
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
            I built this website for basketball coach <strong>Siniša Savović</strong>, known as the
            first coach of NBA MVP Nikola Jokić. The goal was to create a fast, elegant, and
            functional portfolio that showcases his coaching legacy and allows players or parents to
            easily get in touch.
          </p>

          <p className="mt-2">
            The site is built with <strong>Next.js</strong> for performance and SEO, styled with{" "}
            <strong>SASS</strong> for full design control, and features a contact form using the{" "}
            <strong>Resend API</strong> to handle inquiries.
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
            I worked on improving and maintaining the website for a PVC joinery company based in
            Pula, Croatia. The site was built with <strong>WordPress and Elementor</strong>, and I
            handled tasks such as adding new pages, cleaning up legacy code, and{" "}
            <strong>optimizing plugin usage</strong> by reducing their number by seven.
          </p>

          <p>
            Additionally, I <strong>boosted the mobile performance score</strong> from 40 to 75 on
            Google PageSpeed Insights, configured lead-generating contact forms, and implemented
            on-page SEO improvements. A targeted <strong>link-building strategy</strong> helped
            raise keyword rankings (e.g. “pvc stolarija Pula”) from page 2 to{" "}
            <strong>top positions on page 1</strong>.
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
            I developed a dynamic real estate platform as a personal project to demonstrate{" "}
            <strong>frontend expertise</strong> and gain hands-on fullstack experience. The frontend
            is built with <strong>React and TypeScript</strong>, styled using{" "}
            <strong>Bootstrap</strong> for responsiveness, and enhanced with{" "}
            <strong>Framer Motion</strong> for smooth animations.
          </p>

          <p>
            On the backend, I used <strong>Express.js and MongoDB</strong> to create a custom admin
            dashboard for managing property listings. Core features include property filtering,
            search, and a <strong>login-protected admin panel</strong>. The app uses{" "}
            <strong>GraphQL</strong> for efficient data fetching and demonstrates a clean fullstack
            architecture.
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
            I built a voice-enabled ChatGPT interface called <strong>AI Buddy</strong> to enhance
            user interaction and explore real-world AI integration in frontend development. The app
            was developed using <strong>React and Bootstrap</strong>, applying advanced techniques
            like <strong>useRef, useContext, useCallback</strong>, and <strong>React.memo</strong>{" "}
            for performance optimization.
          </p>

          <p>
            It features <strong>voice-to-text interaction</strong> using react-speech-kit,
            integrated with the <strong>OpenAI API</strong> for conversational AI responses. I
            implemented <strong>Redux Toolkit</strong> for global state management, added{" "}
            <strong>Firebase Authentication</strong> for secure login, and wrote tests using{" "}
            <strong>Jest</strong> and <strong>React Testing Library</strong> to ensure stability and
            correctness.
          </p>
        </>
      );
    },
  },
];
