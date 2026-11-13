import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MemoryRouter } from "react-router-dom";
import FootCapacitySystem from "./FootCapacitySystem";

const html = renderToStaticMarkup(
  <MemoryRouter>
    <FootCapacitySystem />
  </MemoryRouter>,
);

describe("/foot-capacity-system explainer", () => {
  it.each(["$47", "$97", "$582", "$297", "$497", "About 15 minutes a day", "7 check-ins", "30-day",
           "Three phases, about 12 weeks.", "Every plan includes a 30-day money-back guarantee."])(
    "contains %s", (s) => { expect(html).toContain(s); });

  it.each(["$157", "$397", "$697", "Seven Check-Ins Down", 'href="/checkout', "equipment", "Walk Pain Free"])(
    "does not contain %s", (s) => { expect(html).not.toContain(s); });

  it("every CTA goes to /lp/download with no ?source=", () => {
    const ctas = [...html.matchAll(/<a[^>]*href="([^"]*)"[^>]*>Start My Free Recovery Plan/g)].map((m) => m[1]);
    expect(ctas.length).toBe(2);
    for (const href of ctas) expect(href).toBe("/lp/download");
    expect(html).not.toContain("?source=");
  });

  it.each(["/when-to-get-seen-in-person", "/refund-policy", "/hsa-fsa", "/dr-jonathan-schutza"])(
    "links to %s", (p) => { expect(html).toContain(`href="${p}"`); });
});

describe("site links to the new pages", () => {
  const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");

  it("homepage links Plans & pricing to /foot-capacity-system (top-right and footer)", () => {
    expect(read("src/pages/NewIndex.tsx").split('href="/foot-capacity-system"').length - 1).toBe(2);
  });

  it.each(["src/pages/NewIndex.tsx", "src/pages/HsaFsa.tsx", "src/pages/DrJonathanSchutza.tsx",
           "src/pages/Results.tsx", "src/pages/FootCapacitySystem.tsx"])(
    "%s footer links the red-flag page", (f) => {
      expect(read(f)).toContain('href="/when-to-get-seen-in-person"');
    });

  it("shared Footer links the red-flag page", () => {
    expect(read("src/components/Footer.tsx")).toContain('to="/when-to-get-seen-in-person"');
  });

  it.each(["src/pages/ColdStart.tsx", "src/pages/DownloadApp.tsx"])("%s is left alone (A/B test)", (f) => {
    expect(read(f)).not.toContain("/when-to-get-seen-in-person");
  });

  it("sitemap lists both pages", () => {
    const xml = read("public/sitemap.xml");
    expect(xml).toContain("<loc>https://fixyourmovement.com/foot-capacity-system</loc>");
    expect(xml).toContain("<loc>https://fixyourmovement.com/when-to-get-seen-in-person</loc>");
  });
});
