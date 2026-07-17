import PageFadeIn from "@/components/layout/page-fade-in";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import RankinWorldWidget from "@/components/sections/rankinworld-widget";
import Testimonials from "@/components/sections/testimonials";

export default function Home() {
  return (
    <PageFadeIn>
      <main>
        <Hero />
        <About />
        <Projects />
        <RankinWorldWidget />
        <Testimonials />
        <Contact />
      </main>
    </PageFadeIn>
  );
}
