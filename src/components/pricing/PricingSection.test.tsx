import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import PricingSection from "./PricingSection";
import { PRICING_FAQ_A, PRICING_FAQ_Q } from "./PricingFaq";

// 2026-11-19: shared price section (pricing page + landing-page FAQ modal) and the FAQ item.
const html = renderToStaticMarkup(<PricingSection />);
const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");

describe("PricingSection", () => {
  it.each(["$47", "$97", "$582", "$297", "$497", "Recovery Plan", "Ownership Plan", "Premium Lifetime",
           "Here Are Our Prices. But First, Give Us a Try.", "HSA/FSA funds may be eligible"])(
    "contains %s", (s) => { expect(html).toContain(s); });

  it("has no buy links or buttons", () => {
    expect(html.toLowerCase()).not.toContain("checkout");
    expect(html.toLowerCase()).not.toContain("whop");
    expect(html).not.toContain("<button");
    expect([...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1])).toEqual(["/hsa-fsa"]);
  });
});

describe("pricing FAQ on the landing pages", () => {
  it("answer quotes prices that exist in the price cards", () => {
    expect(PRICING_FAQ_A).toContain("$47");
    expect(PRICING_FAQ_A).toContain("$297");
    expect(PRICING_FAQ_A).toContain("7 free check-ins");
  });

  it.each(["src/pages/ColdStart.tsx", "src/pages/DownloadApp.tsx"])("%s carries the FAQ item and mounts the modal", (f) => {
    const src = read(f);
    expect(src).toContain("{ q: PRICING_FAQ_Q, a: PRICING_FAQ_A, pricing: true }");
    expect(src).toContain("<PricingFaqLink");
    expect(src).toContain("{pricing.modal}");
  });

  it("question text is stable", () => {
    expect(PRICING_FAQ_Q).toBe("How much does it cost after the free check-ins?");
  });

  it("pricing page uses the shared section", () => {
    expect(read("src/pages/FootCapacitySystem.tsx")).toContain("<PricingSection />");
  });
});
