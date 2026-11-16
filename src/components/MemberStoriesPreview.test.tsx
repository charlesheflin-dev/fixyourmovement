import { describe, it, expect, vi, afterEach } from "vitest";
import { act, type ReactElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import MemberStoriesPreview, { PREVIEW_TESTIMONIALS } from "./MemberStoriesPreview";
import { TESTIMONIALS } from "@/data/testimonials";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | null = null;
let host: HTMLDivElement | null = null;

function mount(el: ReactElement): HTMLDivElement {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root!.render(el));
  return host;
}

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = null;
  host = null;
  document.getElementById("stories-target")?.remove();
});

const MORE = "Read more member stories ↓";

describe("MemberStoriesPreview", () => {
  it("renders the first 3 app_member testimonials in data order", () => {
    const expected = TESTIMONIALS.filter((t) => t.source === "app_member").slice(0, 3);
    expect(PREVIEW_TESTIMONIALS.map((t) => t.id)).toEqual(expected.map((t) => t.id));
    const c = mount(<MemberStoriesPreview />);
    const figs = c.querySelectorAll("figure");
    expect(figs.length).toBe(3);
    expected.forEach((t, i) => expect(figs[i].textContent).toContain(t.name));
    expect(c.textContent).not.toContain(MORE);
    expect(c.querySelector("iframe, a")).toBeNull();
  });

  it("'Read more' scrolls the target element into view", () => {
    const target = document.createElement("section");
    target.id = "stories-target";
    const spy = vi.fn();
    target.scrollIntoView = spy;
    document.body.appendChild(target);
    const c = mount(<MemberStoriesPreview moreTargetId="stories-target" />);
    const btn = Array.from(c.querySelectorAll("button")).find((b) => b.textContent === MORE);
    expect(btn).toBeDefined();
    act(() => btn!.click());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toMatchObject({ block: "start" });
  });

  it("server-renders without touching window", () => {
    const html = renderToStaticMarkup(<MemberStoriesPreview moreTargetId="member-stories" />);
    expect(html).toContain(PREVIEW_TESTIMONIALS[0].name);
    expect(html).toContain(MORE);
  });
});
