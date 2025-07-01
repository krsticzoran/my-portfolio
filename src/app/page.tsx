import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <div className="min-h-screen"></div>
    </>
  );
}
