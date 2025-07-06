import Image from "next/image";

import zk from "@/../public/zk.webp";
import Container from "@/components/layout/container";
import { Lens } from "@/components/magicui/lens";
import { MagicCard } from "@/components/magicui/magic-card";
import SocialIcons from "@/components/ui/social-icons";

export default function About() {
  return (
    <Container
      as="section"
      id="about"
      className="mt-24  md:mt-28 lg:mt-32 2xl:mt-36 flex flex-col lg:flex-row gap-16 scroll-mt-30 lg:scroll-mt-40"
    >
      {/* Left side: Image with lens zoom effect */}
      <div className="lg:w-1/2 w-full  relative aspect-square rounded-lg shadow-lg overflow-hidden ">
        <Lens>
          <Image
            src={zk}
            alt="Zoran Krstić"
            width={1024}
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority={false}
            className="rounded-lg shadow-lg"
          />
        </Lens>
      </div>

      {/* Right side: Text content and links */}
      <div className="lg:w-1/2 w-full  lg:min-h-full lg:h-full mt-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4 mb-6 tracking-tight leading-tight">
          Beyond the Code
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed px-4 text-pretty">
          I&apos;m not just passionate about writing{" "}
          <span className="italic">clean, scalable front-end code</span> — I&apos;m also a{" "}
          <span className="italic">dedicated runner</span>. Whether I&apos;m pushing pixels or
          pushing my limits on the track, <span className="italic">discipline and focus</span> drive
          everything I do.
        </p>

        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-3 px-4 text-pretty">
          This unique combination of <span className="italic">creativity and endurance</span> shapes
          how I approach every project: with{" "}
          <span className="italic">clarity, energy, and commitment</span>.
        </p>

        <div className="flex items-start w-full mt-8 sm:mt-10 md:mt-12 px-4">
          <SocialIcons size={32} />
        </div>

        {/* Downloadable resume button inside animated card */}
        <MagicCard className="mt-4 sm:mt-6 md:mt-8 rounded-lg shadow-lg border bg-zinc-800/50">
          <div className=" w-full  flex items-center justify-center ">
            <a
              href="/CV.pdf"
              download="Zoran_Krstic_CV.pdf"
              className="flex flex-col gap-1 text-center w-full h-full py-2 lg:py-10"
              aria-label="Download my CV (lightweight PDF)"
            >
              <span>Resume</span>
              <span className="text-zinc-400 text-bas ">(Click to download)</span>
            </a>
          </div>
        </MagicCard>
      </div>
    </Container>
  );
}
