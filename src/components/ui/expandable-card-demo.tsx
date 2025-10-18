"use client";

import React, { useEffect, useId, useRef, useState } from "react";

import { IconBrandGithub, IconPlayerPlay } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { CloseIcon } from "@/components/ui/close-icon";
import { projectsData } from "@/data/projects-data";
import { useOutsideClick } from "@/hooks/use-outside-click";

import ProjectCard from "./project-card";

export default function ExpandableCardDemo({ type }: { type?: "all" | "personal" | "client" }) {
  const cards =
    type && type !== "all" ? projectsData.filter((project) => project.type === type) : projectsData;
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
            initial={{ opacity: 0, zIndex: 10 }}
            animate={{ opacity: 1, zIndex: 50 }}
            exit={{ opacity: 0, zIndex: 10 }}
            className="fixed inset-0 bg-background/95 h-full w-full"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 flex justify-center items-start sm:items-center z-[100]">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="relative w-full max-w-[600px] overflow-y-auto shadow-lg h-[100dvh] sm:h-fit md:max-h-[90%]  flex flex-col  bg-white sm:rounded-3xl overflow-hidden "
            >
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
                    duration: 0,
                  },
                }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={800}
                  height={800}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-auto sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start p-4 ">
                  <div>
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
                    className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base lg:text-base leading-relaxed h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
                <div className="flex  px-4 mb-5 flex-grow">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex mt-auto gap-2"
                  >
                    <motion.a
                      href={active.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm rounded-md font-bold cursor-pointer transition bg-background text-foreground hover:bg-zinc-800"
                    >
                      <IconPlayerPlay size={16} className="mr-2" />
                      Open Site
                    </motion.a>
                    {active.github ? (
                      <motion.a
                        href={active.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm rounded-md font-bold cursor-pointer bg-foreground text-background  border border-background hover:bg-zinc-200 transition"
                      >
                        <IconBrandGithub size={16} className="mr-2" />
                        GitHub
                      </motion.a>
                    ) : null}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className=" mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <ProjectCard
            key={`card-${card.title}-${index}-${id}`}
            card={card}
            index={index}
            id={id}
            setActive={(card) => setActive(card)}
          />
        ))}
      </ul>
    </>
  );
}
