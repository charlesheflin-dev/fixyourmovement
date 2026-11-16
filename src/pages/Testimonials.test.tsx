import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Testimonials from "./Testimonials";
import { PERMISSION_LINE, TESTIMONIALS } from "@/data/testimonials";

const html = renderToStaticMarkup(
  <MemoryRouter>
    <Testimonials />
  </MemoryRouter>,
);
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");

// The live pages the quotes are copied from, with JSX tags stripped and whitespace collapsed so a
// quote split by an emphasis <span> still matches as one string.
const SOURCES = ["NewIndex.tsx", "ColdStart.tsx", "DrJonathanSchutza.tsx", "Results.tsx"]
  .map((f) => readFileSync(join(process.cwd(), "src", "pages", f), "utf8"))
  .join("\n")
  .replace(/\\n/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ");
const norm = (s: string) => s.replace(/\s+/g, " ").trim();

describe("/testimonials", () => {
  it("has the H1 and the permission / results-vary line", () => {
    expect(html).toMatch(/<h1[^>]*>What Members Shared After Following The System<\/h1>/);
    expect(PERMISSION_LINE).toBe("Selected examples shared with permission; individual results vary.");
    expect(html).toContain(esc(PERMISSION_LINE));
  });

  it("renders every testimonial name with a source label", () => {
    expect(html).toContain("Dee Bell");
    expect(html).toContain("Lorenzo Luongo");
    for (const t of TESTIMONIALS) expect(html, t.name).toContain(esc(t.name));
    expect(html.split("App member").length - 1).toBe(TESTIMONIALS.length);
  });

  it("every quote is copied verbatim from text the site already publishes", () => {
    for (const t of TESTIMONIALS) {
      for (const para of t.quote.split("\n\n")) expect(SOURCES, t.id).toContain(norm(para));
      if (t.emphasis) expect(t.quote, t.id).toContain(t.emphasis);
      if (t.closing) expect(SOURCES, t.id).toContain(norm(t.closing));
      if (t.meta) expect(SOURCES.replace(/ /g, ""), t.id).toContain(t.meta.replace(/\s+/g, ""));
    }
  });

  it("excludes the aliased progress stories and never links to checkout", () => {
    expect(html).not.toContain("Jamie B.");
    expect(html).not.toContain("Julie D.");
    expect(html).not.toContain("/checkout");
    expect(html).toContain('href="/lp/download"');
  });
});
