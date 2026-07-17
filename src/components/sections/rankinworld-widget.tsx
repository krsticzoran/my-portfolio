import Container from "../layout/container";

// Temporary section for testing the RankinWorld embed widget — remove later.
export default function RankinWorldWidget() {
  return (
    <Container
      as="section"
      id="rankinworld-widget"
      className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36 flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-center"
    >
      <div className="lg:w-1/2 w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Live Widget Demo
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          This is a live, embeddable comparison widget from{" "}
          <strong>RankinWorld</strong> — a country statistics platform I&apos;m
          currently working on. The table on the right is served directly from
          the production site through a single iframe snippet: anyone can
          configure a comparison, copy the embed code and drop it into their
          own page, just like this one.
        </p>
      </div>

      <div className="lg:w-1/2 w-full">
        <iframe
          src="https://rankinworld.com/embed/romania-vs-serbia?indicators=NY.GDP.MKTP.KD.ZG,SP.DYN.LE00.IN&year=2023"
          width="100%"
          height="480"
          style={{ border: 0 }}
          title="Romania vs Serbia Comparison, 2023"
        />
        <p style={{ fontSize: "13px", marginTop: "6px" }}>
          <a
            href="https://rankinworld.com/comparison/romania-vs-serbia?indicators=NY.GDP.MKTP.KD.ZG,SP.DYN.LE00.IN&year=2023"
            target="_blank"
            rel="noopener noreferrer"
          >
            Romania vs Serbia comparison
          </a>{" "}
          by RankinWorld
        </p>
      </div>
    </Container>
  );
}
