import Container from "@/components/layout/container";

import ContactForm from "./contact-form";
import GlobeComponent from "../ui/globe-component";

export default function Contact() {
  return (
    <Container
      as="section"
      className="py-24 md:py-28 lg:py-32 2xl:py-36 flex flex-col-reverse lg:flex-row gap-16 h-full"
    >
      <div className="w-full sm:w-4/5 lg:w-1/2">
        <h2
          id="contact"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight scroll-mt-32 lg:scroll-mt-40"
        >
          Get in Touch
        </h2>
        <ContactForm />
      </div>

      <GlobeComponent />
    </Container>
  );
}
