import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Testimonials from "./Testimonials";
import { PERMISSION_LINE, TESTIMONIALS, VIDEO_TESTIMONIALS, STREAM_CUSTOMER } from "@/data/testimonials";

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
    const count = (label: string) => html.split(`>${label}</p>`).length - 1;
    const appVideos = VIDEO_TESTIMONIALS.filter((v) => v.source === "app_member").length;
    expect(count("App member")).toBe(TESTIMONIALS.filter((t) => t.source === "app_member").length + appVideos);
    expect(count("Clinic patient")).toBe(TESTIMONIALS.filter((t) => t.source === "clinic_patient").length);
    expect(count("Content follower")).toBe(TESTIMONIALS.filter((t) => t.source === "content_follower").length);
  });

  it("labels each entry by its verified source (2026-11-16 relabel)", () => {
    const src = (id: string) => TESTIMONIALS.find((t) => t.id === id)?.source;
    for (const id of ["lory-tubbs", "wendy-peterman", "debbie-wisenor"]) expect(src(id), id).toBe("clinic_patient");
    for (const id of ["dee-bell", "lorenzo-luongo", "bogiegrl", "youngcarol", "vicbre415", "zaiden-peterson"])
      expect(src(id), id).toBe("content_follower");
    for (const id of ["jana-d", "jocelyn-lavoie", "brittany", "sara-lozano-arcas", "michelle-shabason", "lisa-padgett",
      "karen-stone", "carol-anne", "karen", "tucker-family-farms", "rae", "michelle-triepels", "meghan-goughan"])
      expect(src(id), id).toBe("app_member");
    // Wall order: every app member, then clinic patients, then content followers.
    const rank = { app_member: 0, clinic_patient: 1, content_follower: 2 } as const;
    const ranks = TESTIMONIALS.map((t) => rank[t.source]);
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
    expect(TESTIMONIALS[0].id).toBe("jana-d");
    expect(new Set(TESTIMONIALS.map((t) => t.id)).size).toBe(TESTIMONIALS.length);
  });

  it("submitted entries (no live source page) are non-empty, trimmed and app members", () => {
    const submitted = TESTIMONIALS.filter((t) => t.origin === "submitted");
    expect(submitted.map((t) => t.id).sort()).toEqual(
      ["jana-d", "lisa-padgett", "meghan-goughan", "michelle-triepels", "rae", "sara-lozano-arcas", "tucker-family-farms"],
    );
    for (const t of submitted) {
      expect(t.name.trim(), t.id).not.toBe("");
      expect(t.quote.trim().length, t.id).toBeGreaterThan(20);
      for (const para of t.quote.split("\n\n")) expect(para, t.id).toBe(para.trim());
      expect(html, t.id).toContain(esc(t.quote.split("\n\n")[0]));
    }
  });

  it("renders both video testimonials as tap-to-load posters (no iframe in the prerender)", () => {
    for (const v of VIDEO_TESTIMONIALS) {
      expect(html, v.id).toContain(`${STREAM_CUSTOMER}/${v.streamId}/thumbnails/thumbnail.jpg`);
      expect(html, v.id).toContain(esc(v.name));
    }
    expect(html).not.toContain("<iframe");
    expect(html).not.toContain("Show more stories");
  });

  it("every quote is copied verbatim from text the site already publishes", () => {
    for (const t of TESTIMONIALS) {
      if (t.origin === "submitted") continue; // transcribed from supplied screenshots; checked above
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
