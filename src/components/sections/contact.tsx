import Container from "@/components/layout/container";

import ContactForm from "./contact-form";
import GlobeComponent from "../ui/globe-component";

export default function Contact() {
  return (
    <Container
      as="section"
      id="contact"
      className="py-24 md:py-28 lg:py-32 2xl:py-36 flex flex-col-reverse lg:flex-row gap-16 h-full scroll-mt-20 lg:scroll-mt-30"
    >
      <div className="w-full sm:w-4/5 lg:w-1/2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
          Get in Touch
        </h2>
        <ContactForm />
      </div>

      <GlobeComponent />
    </Container>
  );
}
