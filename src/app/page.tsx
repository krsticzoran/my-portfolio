import Container from "@/components/layout/container";

export default function Home() {
  return (
    <>
      <Container as="section" className="mt-16 lg:mt-24 py-12 lg:py-16">
        <h1>some heading</h1>
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
