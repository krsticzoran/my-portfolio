import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { testimonials } from "./testimonials";

describe("testimonials", () => {
  it("points every testimonial photo to a file in public/", () => {
    // Testimonials use plain string paths (e.g. "/miriam.jpeg"), which nothing else checks
    const publicDir = path.join(process.cwd(), "public");

    const missingPhotos = testimonials
      .filter((testimonial) => !existsSync(path.join(publicDir, testimonial.src)))
      .map((testimonial) => `${testimonial.name}: ${testimonial.src}`);

    expect(missingPhotos).toEqual([]);
  });
});
