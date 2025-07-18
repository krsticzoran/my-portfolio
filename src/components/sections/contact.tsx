"use client";

import { useEffect, useState } from "react";

import Container from "@/components/layout/container";

import ContactForm from "./contact-form";
import GlobeComponent from "../ui/globe-component";

export default function Contact() {
  const [capital, setCapital] = useState("Tokyo");

  useEffect(() => {
    fetch("/api/capital")
      .then((res) => res.json())
      .then((data) => {
        if (data.capital) setCapital(data.capital);
      })
      .catch((err) => console.error("API error", err));
  }, []);

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
      <div className="w-full lg:w-1/2 flex flex-col justify-start">
        <div className="mb-8 px-4 w-full sm:w-4/5 lg:w-full">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 tracking-tight leading-tight">
            Based in Serbia, Available Worldwide
          </h3>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed text-pretty">
            Whether you&apos;re in Berlin, New York, or {capital} — I&apos;m ready to{" "}
            <span className="italic">collaborate remotely</span> and bring your ideas to life.{" "}
            <span className="italic">Let&apos;s build something great together.</span>
          </p>
        </div>
        <GlobeComponent />
      </div>
    </Container>
  );
}
