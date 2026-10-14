// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useActiveSection } from "./use-active-section";

type Entry = { target: Element; isIntersecting: boolean; intersectionRatio: number };

// Every observer the hook creates, so tests can trigger them and count them
let observers: FakeIntersectionObserver[] = [];

// jsdom has no IntersectionObserver, so we provide one that we control from the test
class FakeIntersectionObserver {
  callback: (_entries: Entry[]) => void;
  disconnected = false;

  constructor(callback: (_entries: Entry[]) => void) {
    this.callback = callback;
    observers.push(this);
  }
  observe() {}
  unobserve() {}
  disconnect() {
    this.disconnected = true;
  }
  takeRecords() {
    return [];
  }
}

// Defined once, outside the hook call, so the array keeps the same reference between renders
const SECTION_IDS = ["about", "projects", "contact"];

function section(id: string) {
  return document.getElementById(id)!;
}

// Fake a scroll: set scrollY and fire the scroll event the hook listens to
function scrollTo(y: number) {
  act(() => {
    Object.defineProperty(window, "scrollY", { value: y, configurable: true });
    window.dispatchEvent(new Event("scroll"));
  });
}

// Make the latest observer report these entries, as if sections entered the viewport
function intersect(entries: Entry[]) {
  act(() => observers.at(-1)!.callback(entries));
}

describe("useActiveSection", () => {
  beforeEach(() => {
    observers = [];
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    document.body.innerHTML = SECTION_IDS.map((id) => `<section id="${id}"></section>`).join("");
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("starts with no active section", () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    expect(result.current).toBe("");
  });

  it("activates the section that comes into view when scrolling down", () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    scrollTo(100);
    intersect([{ target: section("projects"), isIntersecting: true, intersectionRatio: 0.5 }]);

    expect(result.current).toBe("#projects");
  });

  it("activates the most visible section when scrolling up", () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    scrollTo(500);
    scrollTo(200);
    intersect([
      { target: section("about"), isIntersecting: true, intersectionRatio: 0.2 },
      { target: section("projects"), isIntersecting: true, intersectionRatio: 0.7 },
    ]);

    expect(result.current).toBe("#projects");
  });

  it("disconnects the observer when the component unmounts", () => {
    const { unmount } = renderHook(() => useActiveSection(SECTION_IDS));

    unmount();

    expect(observers.every((o) => o.disconnected)).toBe(true);
  });

  it("creates the observer only once", () => {
    renderHook(() => useActiveSection(SECTION_IDS));
    scrollTo(500);
    scrollTo(200);

    intersect([{ target: section("projects"), isIntersecting: true, intersectionRatio: 0.7 }]);

    expect(observers).toHaveLength(1);
  });
});
