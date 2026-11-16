import { describe, it, expect, vi, afterEach } from "vitest";
import { act, type ReactElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import MemberStories from "./MemberStories";
import { PERMISSION_LINE, TESTIMONIALS, VIDEO_TESTIMONIALS } from "@/data/testimonials";

// @testing-library/react's peer @testing-library/dom is not installed in this repo, so mount with
// react-dom/client + act directly.
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
});

const cards = (c: HTMLElement) => c.querySelectorAll("figure.break-inside-avoid").length;
const buttonByText = (c: HTMLElement, text: string) =>
  Array.from(c.querySelectorAll("button")).find((b) => b.textContent === text) ?? null;
const click = (el: Element) => act(() => (el as HTMLElement).click());

describe("MemberStories", () => {
  it("shows the first 6 cards by default and expands in place on click", () => {
    const c = mount(<MemberStories cta={{ label: "Go", href: "/checkout" }} />);
    expect(cards(c)).toBe(6);
    const more = buttonByText(c, `Show more stories (${TESTIMONIALS.length - 6})`);
    expect(more).not.toBeNull();
    const before = window.location.href;
    click(more!);
    expect(window.location.href).toBe(before);
    expect(cards(c)).toBe(TESTIMONIALS.length);
    expect(c.textContent).not.toContain("Show more stories");
    for (const t of TESTIMONIALS) expect(c.textContent).toContain(t.name);
  });

  it("respects initialCount and hides the button when everything is shown", () => {
    const c = mount(<MemberStories initialCount={TESTIMONIALS.length} cta={{ label: "Go", href: "/x" }} />);
    expect(cards(c)).toBe(TESTIMONIALS.length);
    expect(c.textContent).not.toContain("Show more stories");
  });

  it("renders eyebrow, heading, permission line and a link CTA", () => {
    const c = mount(<MemberStories heading="Hello" cta={{ label: "Continue My Recovery →", href: "/checkout" }} />);
    expect(c.textContent).toContain("Member Stories");
    expect(c.querySelector("h2#member-stories-heading")?.textContent).toBe("Hello");
    expect(c.textContent).toContain(PERMISSION_LINE);
    const link = Array.from(c.querySelectorAll("a")).find((a) => a.textContent === "Continue My Recovery →");
    expect(link?.getAttribute("href")).toBe("/checkout");
  });

  it("can hide the permission line; a button CTA calls onClick", () => {
    const onClick = vi.fn();
    const c = mount(<MemberStories showPermissionLine={false} cta={{ label: "Start →", onClick }} />);
    expect(c.textContent).not.toContain(PERMISSION_LINE);
    click(buttonByText(c, "Start →")!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("videos are posters until tapped, then load the Stream iframe with autoplay", () => {
    const c = mount(<MemberStories cta={{ label: "Go", href: "/x" }} />);
    expect(c.querySelector("iframe")).toBeNull();
    const jana = VIDEO_TESTIMONIALS[0];
    click(c.querySelector(`button[aria-label="Play the video story from ${jana.name}"]`)!);
    const iframe = c.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toBe(
      `https://customer-hene8ngxxo3eajlj.cloudflarestream.com/${jana.streamId}/iframe?autoplay=true`,
    );
    expect(iframe?.getAttribute("allow")).toBe("accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture");
    expect(iframe?.hasAttribute("allowfullscreen")).toBe(true);
    expect(iframe?.getAttribute("title")).toBe(`Video story from ${jana.name}`);
  });

  it("labels Jana's video App member and David Lopez's with no label", () => {
    const html = renderToStaticMarkup(<MemberStories cta={{ label: "Go", href: "/x" }} />);
    expect(VIDEO_TESTIMONIALS.find((v) => v.id === "jana-video")?.source).toBe("app_member");
    expect(VIDEO_TESTIMONIALS.find((v) => v.id === "david-lopez-video")?.source).toBeUndefined();
    const at = html.indexOf(">David Lopez</p>");
    expect(at).toBeGreaterThan(-1);
    expect(html.slice(at, html.indexOf("</figcaption>", at))).not.toMatch(/App member|Clinic patient|Content follower/);
  });
});
