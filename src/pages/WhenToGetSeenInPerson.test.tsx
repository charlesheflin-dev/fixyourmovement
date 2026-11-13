import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import WhenToGetSeenInPerson from "./WhenToGetSeenInPerson";
import { RED_FLAG_CONTACT_SOON, RED_FLAG_URGENT_CARE, RED_FLAG_EMERGENCY_LINE } from "@/lib/redFlags";
import { isSensitivePath } from "@/lib/metaPixel";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");
const html = renderToStaticMarkup(
  <MemoryRouter>
    <WhenToGetSeenInPerson />
  </MemoryRouter>,
);
const count = (needle: string) => html.split(needle).length - 1;

describe("/when-to-get-seen-in-person", () => {
  it("H1 and both headings are verbatim", () => {
    expect(html).toMatch(/<h1[^>]*>When to get seen in person<\/h1>/);
    expect(html).toMatch(/<h2[^>]*>Stop and get urgent care if you have<\/h2>/);
    expect(html).toMatch(/<h2[^>]*>Contact your doctor soon if you have<\/h2>/);
  });

  it("every list item appears exactly once", () => {
    for (const item of [...RED_FLAG_URGENT_CARE, ...RED_FLAG_CONTACT_SOON]) {
      expect(count(`<li>${esc(item)}</li>`), item).toBe(1);
    }
  });

  it("carries the A-1 emergency line", () => {
    expect(html).toContain(esc(RED_FLAG_EMERGENCY_LINE));
  });

  it("has no sales CTA, no checkout link, no emoji, and no members framing line", () => {
    expect(html).not.toContain("/checkout");
    expect(html).not.toContain("/lp/download");
    expect(html).not.toMatch(/\p{Emoji_Presentation}/u);
    expect(html).not.toContain("same two lists");
  });

  it("is a Meta Pixel sensitive path", () => {
    expect(isSensitivePath("/when-to-get-seen-in-person")).toBe(true);
  });
});
