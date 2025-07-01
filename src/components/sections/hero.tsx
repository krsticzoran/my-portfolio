import Container from "@/components/layout/container";
import CodeBlock from "@/components/ui/code-block";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function Hero() {
  return (
    <Container
      as="section"
      id="hero"
      className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36 flex flex-col lg:flex-row items-center gap-16"
      isHero={true}
    >
      {/* Left column containing text content */}
      <div className="relative max-w-[500px] lg:max-w-1/2 lg:w-1/2">
        {/* Decorative floating tag - "UI Magic" */}
        <div className="px-3 py-2 hidden sm:block absolute top-8 left-16 sm:left-32 bg-purple-500/20 rounded-[6px] w-max font-medium text-purple-300 border border-purple-500/20 animate-gentle-up-down ">
          UI Magic
        </div>

        {/* Decorative floating tag - "Clean Code" */}
        <div className="px-3 py-2 hidden sm:block absolute top-24 right-4 sm:right-10 bg-blue-500/20 rounded-[6px] w-max font-medium text-blue-300 border border-blue-500/20 animate-gentle-up-down ">
          Clean Code
        </div>

        {/* Availability indicator badge */}
        <div
          className="text-xs bg-gray-800/50 w-max rounded-full px-3  flex items-center gap-2"
          role="status"
          aria-live="polite"
        >
          <span className="rounded-full size-2 bg-indigo-700 animate-pulse" aria-hidden="true" />
          <span className="sr-only">Currently available</span>
          <span aria-hidden="true">Let’s build something together</span>
        </div>

        {/* Main headline */}
        <h1 className="text-zinc-300  mt-2 sm:mt-4  md:mt-8 font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight  leading-tight ">
          <span className="block">Hello</span>

          <span className="block mt-2 sm:mt-4">I&apos;m Zoran Krstić</span>
        </h1>

        {/* Animated text flipping component */}
        <ContainerTextFlip />

        {/* Subheading with professional description */}
        <div className="text-lg text-zinc-400 mt-8 sm:mt-10 md:mt-12 font-bold flex flex-col">
          <span>React Enthusiast ⚛️ | Next.js Lover 🚀</span>
          <span className="font-normal italic mt-2 text-pretty">
            Creating high-performance web apps with clean, well-structured code to provide seamless
            and modern user experiences
          </span>
        </div>
      </div>

      {/* Right column containing the code block component */}
      <CodeBlock />
    </Container>
  );
}
