import Container from "@/components/layout/container";
import CodeBlock from "@/components/ui/code-block";

export default function Home() {
  return (
    <>
      <Container
        as="section"
        className="mt-16 lg:mt-24 py-12 lg:py-16  flex flex-col lg:flex-row items-center gap-16"
      >
        <div className="relative lg:w-1/2">
          <div className="px-3 py-2 hidden sm:block absolute top-8 left-16 sm:left-32 bg-purple-500/20 rounded-[6px] w-max font-medium text-purple-300 border border-purple-500/20 animate-gentle-up-down ">
            UI Magic
          </div>
          <div className="px-3 py-2 hidden sm:block absolute top-24 right-4 sm:right-10 bg-blue-500/20 rounded-[6px] w-max font-medium text-blue-300 border border-blue-500/20 animate-gentle-up-down ">
            Clean Code
          </div>
          <div
            className="text-xs bg-gray-800/50 w-max rounded-full px-3 py-1.5 flex items-center gap-2"
            role="status"
            aria-live="polite"
          >
            <span className="rounded-full size-2 bg-indigo-700 animate-pulse" aria-hidden="true" />
            <span className="sr-only">Currently available</span>
            <span aria-hidden="true">Let’s build something together</span>
          </div>

          <h1 className="text-zinc-300 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight  leading-tight ">
            <span className="block my-4 md:my-8">Hello</span>
            <span className="block my-4 md:my-8">I&apos;m Zoran Krstić</span>
          </h1>
        </div>
        <CodeBlock />
      </Container>
      <Container as="section" className="mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-6">some text</h2>
        <p className="text-lg mb-4">
          some text but not too long, just enough to fill the space and make it look like a real
          paragraph.
        </p>
      </Container>
    </>
  );
}
