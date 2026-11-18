import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MemoryRouter } from "react-router-dom";
import ProgramsCompared from "./ProgramsCompared";

const html = renderToStaticMarkup(
  <MemoryRouter>
    <ProgramsCompared />
  </MemoryRouter>,
);
const PATH = "/best-at-home-plantar-fasciitis-programs";

describe(PATH, () => {
  it.each(["Disclosure:", "we make the Foot Capacity System", "E3 Rehab", "$99.99", "16 weeks", "Vivobarefoot", "$124",
           "Rina Harris", "physical therapy", "night splints", "$47", "$297", "$497", "about 12 weeks",
           "30-day money-back guarantee", "10.2519/jospt.2023.0303"])(
    "contains %s", (s) => { expect(html).toContain(s); });

  it.each(["$157", "$397", 'href="/checkout', "Walk Pain", "4.9", "best program", "guaranteed"])(
    "does not contain %s", (s) => { expect(html).not.toContain(s); });

  it.each(["/foot-capacity-system", "/when-to-get-seen-in-person", "https://e3rehab.com/programs/rehab/plantar-fasciitis/",
           "https://www.vivobarefoot.com/us/plantar-fasciitis-rehab-programme"])(
    "links to %s", (p) => { expect(html).toContain(`href="${p}"`); });

  it("is wired into routing, prerender, sitemap and llms.txt", () => {
    const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");
    expect(read("src/App.tsx")).toContain(`path="${PATH}"`);
    expect(read("scripts/prerender.mjs")).toContain(`"${PATH}"`);
    expect(read("public/sitemap.xml")).toContain(`<loc>https://fixyourmovement.com${PATH}</loc>`);
    expect(read("public/llms.txt")).toContain(`https://fixyourmovement.com${PATH}`);
  });
});
