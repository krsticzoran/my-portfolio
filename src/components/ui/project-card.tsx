import { motion } from "framer-motion";
import Image from "next/image";

import type { Project } from "@/data/projects-data";

interface Props {
  card: Project;
  index: number;
  id: string;
  // eslint-disable-next-line no-unused-vars
  setActive: (card: Project) => void;
}

export default function ProjectCard({ card, index, id, setActive }: Props) {
  return (
    <motion.li
      layoutId={`card-${card.title}-${index}-${id}`}
      onClick={() => setActive(card)}
      className="my-8 sm:my-6 px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center hover:bg-zinc-900/80 rounded-xl cursor-pointer transition-all duration-500"
    >
      <div className="flex gap-4 lg:gap-6 items-center w-full  flex-col-reverse sm:flex-row">
        <motion.div
          layoutId={`image-${card.title}-${id}`}
          className="relative w-full h-40   sm:w-36 sm:h-24  lg:min-h-32 lg:min-w-48"
        >
          <Image
            fill
            src={card.src}
            alt={card.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 36vw, 48vw"
            className="rounded-lg object-cover object-top"
            loading="lazy"
          />
        </motion.div>
        <div className="flex flex-col md:flex-row md:justify-between items-center w-full">
          <div>
            <motion.h3
              layoutId={`title-${card.title}-${id}`}
              className="text-base text-pretty sm:text-xl lg:text-2xl font-semibold text-foreground tracking-tight text-center md:text-left leading-tight"
            >
              {card.title}
            </motion.h3>
            <motion.p
              layoutId={`description-${card.description}-${id}`}
              className=" hidden sm:block text-sm lg:text-base text-zinc-500 dark:text-zinc-400 mt-1 lg:mt-2 tracking-wide text-center md:text-left"
            >
              {card.description}
            </motion.p>
            <motion.p
              layoutId={`year-${card.description}-${id}`}
              className="hidden sm:block text-sm text-zinc-400 lg:mt-1 text-center md:text-left"
            >
              {card.year}
            </motion.p>
          </div>
          <motion.button
            layoutId={`button-${card.title}-${id}`}
            className="hidden md:block px-6 py-2 text-sm lg:text-base rounded-full font-semibold bg-foreground text-background hover:bg-zinc-700 transition-colors duration-300 mt-6 md:mt-0 capitalize cursor-pointer"
          >
            {card.explore}
          </motion.button>
        </div>
      </div>
    </motion.li>
  );
}
