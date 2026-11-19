import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TESTIMONIALS } from "@/data/testimonials";
import { PREVIEW_TESTIMONIAL_IDS } from "@/components/MemberStoriesPreview";

// 2026-11-19 (Charles): no member story may appear twice on /lp/cold-start.
const src = readFileSync(join(process.cwd(), "src/pages/ColdStart.tsx"), "utf8");
const carousel = JSON.parse(src.match(/const CAROUSEL_IDS = (\[[^\]]*\]);/)![1]) as string[];
const heroId = src.match(/const HERO_PROOF_ID = "([^"]+)";/)![1];

describe("/lp/cold-start testimonials are not repeated", () => {
  it("carousel ids exist in the testimonial data", () => {
    for (const id of carousel) expect(TESTIMONIALS.some((t) => t.id === id)).toBe(true);
    expect(TESTIMONIALS.some((t) => t.id === heroId)).toBe(true);
  });

  it("carousel, preview and hero card share no story", () => {
    const all = [...carousel, ...PREVIEW_TESTIMONIAL_IDS, heroId];
    expect(new Set(all).size).toBe(all.length);
  });

  it("full Member Stories list hides the preview, carousel and hero stories", () => {
    expect(src).toContain("const STORIES_EXCLUDE_IDS = [...PREVIEW_TESTIMONIAL_IDS, HERO_PROOF_ID, ...CAROUSEL_IDS];");
    expect(src).toContain("excludeIds={STORIES_EXCLUDE_IDS}");
  });

  it("hero card shows the hero story's name", () => {
    const name = TESTIMONIALS.find((t) => t.id === heroId)!.name;
    expect(src).toContain(`>${name}</figcaption>`);
  });
});
