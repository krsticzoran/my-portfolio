import Image from "next/image";

import zk from "@/../public/zk.webp";
import Container from "@/components/layout/container";
import { Lens } from "@/components/magicui/lens";
import { MagicCard } from "@/components/magicui/magic-card";
import Hero from "@/components/sections/hero";
import SocialIcons from "@/components/ui/social-icons";

export default function Home() {
  return (
    <>
      <Hero />
      <Container
        as="section"
        id="about"
        className="mt-24  md:mt-28 lg:mt-32 2xl:mt-36 flex flex-col lg:flex-row gap-16  "
      >
        <div className="lg:w-1/2 w-full relative aspect-square rounded-lg shadow-lg overflow-hidden ">
          <Lens>
            <Image
              src={zk}
              alt="Zoran Krstić"
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority={false}
              className="rounded-lg shadow-lg"
            />
          </Lens>
        </div>

        <div className="lg:w-1/2 w-full rounded-lg shadow-lg lg:min-h-full lg:h-full mt-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4  mb-6 mt-8 sm:mt-12 md:mt-16">
            Beyond the Code
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed px-4 text-pretty">
            I&apos;m not just passionate about writing clean, scalable front-end code—I&apos;m also
            a dedicated runner. Whether I&apos;m pushing pixels or pushing my limits on the track,
            discipline and focus drive everything I do.
          </p>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-3 px-4 text-pretty">
            This unique combination of creativity and endurance shapes how I approach every project:
            with clarity, energy, and commitment.
          </p>
          <div className="flex items-start w-full mt-8 sm:mt-10 md:mt-12 px-4">
            <SocialIcons size={32} />
          </div>
          <MagicCard className="mt-4 sm:mt-6 md:mt-8 rounded-lg shadow-lg border bg-zinc-800/50">
            <div className=" w-full  flex items-center justify-center ">
              <a
                href="/CV.pdf"
                download
                className="flex flex-col gap-1 text-center w-full h-full py-2 lg:py-10"
                aria-label="Download my CV"
              >
                <span>Resume</span>
                <span className="text-zinc-400 text-bas ">(Click to download)</span>
              </a>
            </div>
          </MagicCard>
        </div>
      </Container>
      <div className="min-h-screen"></div>
    </>
  );
}
