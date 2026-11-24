import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TESTIMONIALS } from "@/data/testimonials";
import { previewTestimonials } from "@/components/MemberStoriesPreview";

// 2026-11-19 (Charles): no member story may appear twice on /lp/cold-start.
// 2026-11-23 (Matt's hero spec): Jana D. is the hero card; the preview skips the hero + carousel stories.
const src = readFileSync(join(process.cwd(), "src/pages/ColdStart.tsx"), "utf8");
const carousel = JSON.parse(src.match(/const CAROUSEL_IDS = (\[[^\]]*\]);/)![1]) as string[];
const heroId = src.match(/const HERO_PROOF_ID = "([^"]+)";/)![1];
const coldPreviewIds = previewTestimonials([heroId, ...carousel]).map((t) => t.id);

describe("/lp/cold-start testimonials are not repeated", () => {
  it("carousel ids exist in the testimonial data", () => {
    for (const id of carousel) expect(TESTIMONIALS.some((t) => t.id === id)).toBe(true);
    expect(TESTIMONIALS.some((t) => t.id === heroId)).toBe(true);
  });

  it("carousel, preview and hero card share no story", () => {
    const all = [...carousel, ...coldPreviewIds, heroId];
    expect(new Set(all).size).toBe(all.length);
    expect(coldPreviewIds).toHaveLength(3);
  });

  it("the page's preview skips the hero and carousel stories and is led by Sandee F. (2026-11-24)", () => {
    expect(heroId).toBe("jana-d");
    expect(src).toContain("const PREVIEW_EXCLUDE_IDS = [HERO_PROOF_ID, ...CAROUSEL_IDS];");
    expect(src).toContain('<MemberStoriesPreview moreTargetId="member-stories" excludeIds={PREVIEW_EXCLUDE_IDS} />');
    expect(coldPreviewIds[0]).toBe("sandee-f");
  });

  it("full Member Stories list hides the preview, carousel and hero stories", () => {
    expect(src).toContain("const COLD_PREVIEW_IDS = previewTestimonials(PREVIEW_EXCLUDE_IDS).map((t) => t.id);");
    expect(src).toContain("const STORIES_EXCLUDE_IDS = [...COLD_PREVIEW_IDS, HERO_PROOF_ID, ...CAROUSEL_IDS];");
    expect(src).toContain("excludeIds={STORIES_EXCLUDE_IDS}");
  });

  it("hero card shows the hero story's name", () => {
    const name = TESTIMONIALS.find((t) => t.id === heroId)!.name;
    expect(src).toContain(`>${name}</figcaption>`);
  });
});
