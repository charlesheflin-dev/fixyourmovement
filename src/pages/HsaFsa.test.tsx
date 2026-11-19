import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import HsaFsa from "./HsaFsa";

// Matt's spec hsa-fsa-page-try-it-first.md (2026-11-19): no buy links; trial CTAs -> /lp/cold-start.
const html = renderToStaticMarkup(
  <MemoryRouter>
    <HsaFsa />
  </MemoryRouter>,
);
const hrefsFor = (text: string) =>
  [...html.matchAll(new RegExp(`<a[^>]*href="([^"]*)"[^>]*>${text}`, "g"))].map((m) => m[1]);

describe("/hsa-fsa try-it-first", () => {
  it("has no checkout, Whop or payment links", () => {
    expect(html.toLowerCase()).not.toContain("checkout");
    expect(html.toLowerCase()).not.toContain("whop");
  });

  it("both trial buttons go to /lp/cold-start with no ?source=", () => {
    const ctas = hrefsFor("Start My Free Recovery Plan");
    expect(ctas).toEqual(["/lp/cold-start", "/lp/cold-start"]);
    expect(html).not.toContain("?source=");
  });

  it("See Plans & Pricing links (top and closing) go to /foot-capacity-system", () => {
    expect(hrefsFor("See Plans &amp; Pricing")).toEqual(["/foot-capacity-system", "/foot-capacity-system"]);
  });

  it("returning-user line appears under both trial buttons and links to app /install", () => {
    expect(html.split("Already finished your free check-ins?").length - 1).toBe(2);
    expect(hrefsFor("Open the Foot Capacity System app")).toEqual([
      "https://app.fixyourmovement.com/install", "https://app.fixyourmovement.com/install"]);
    expect(html).not.toContain("get-access");
  });

  it.each(["Your first 7 check-ins are free.", "Want to see the prices?", "Try it free, then choose a plan",
           "$497 Premium Lifetime plan", "Try It First", "7 free check-ins before you choose a plan",
           "Lifetime updates with lifetime plans", "Monthly and lifetime plans available",
           "No credit card. No password. No countdown clock.", "Want to compare plans first?",
           "Questions before you purchase? We&#x27;re happy to help."])("contains %s", (s) => {
    expect(html).toContain(s);
  });

  it.each(["Lifetime Access", "Lifetime Membership", "View Membership Options", "Get Lifetime Access",
           "Choose My Membership", "Invest in Your Recovery", "Already know what you need?"])(
    "no longer contains %s", (s) => { expect(html).not.toContain(s); });
});
