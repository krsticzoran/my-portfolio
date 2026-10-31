// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ExpandableCardDemo from "./expandable-card-demo";

const openRankinWorld = () => {
  fireEvent.click(screen.getByRole("button", { name: /Open project details: RankinWorld/ }));
};

describe("ExpandableCardDemo scroll lock", () => {
  afterEach(() => {
    cleanup();
    // body is shared by every test: never let one test leave the page locked for the next
    document.body.style.overflow = "";
  });

  it("unlocks the page when the list unmounts with the modal open", () => {
    const { unmount } = render(<ExpandableCardDemo />);
    openRankinWorld();
    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("restores the overflow value it found, not a fixed one", () => {
    document.body.style.overflow = "scroll";
    const { unmount } = render(<ExpandableCardDemo />);
    openRankinWorld();
    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("scroll");
  });
});
