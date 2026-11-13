// Per-route <head> map + shared edge rewriter (W2, Charles 2026-11-13; plus the two new public
// pages). HTMLRewriter is a Workers global, absent in Node, so it is stubbed and records calls.
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROUTE_HEADS } from "../../functions/_data/routeHeads.js";
import { rewriteRouteHead } from "../../functions/_lib/routeHead.js";
import { isKnownPath } from "../../functions/_lib/notFound.js";

type Head = { title: string; description: string; dropSchema: boolean };
const HEADS = ROUTE_HEADS as Record<string, Head>;

// The red-flag page title was specified at 75 characters (approved as drafted); every other
// route keeps W2's 70-character bound.
const TITLE_MAX: Record<string, number> = { "/when-to-get-seen-in-person": 75 };
// The approved W2 /checkout description is 209 characters; every other route keeps 200.
const DESCRIPTION_MAX: Record<string, number> = { "/checkout": 210 };

describe("ROUTE_HEADS", () => {
  it("includes the W2 routes and both new public pages", () => {
    for (const p of ["/checkout", "/hsa-fsa", "/contact", "/refund-policy", "/privacy-policy",
                     "/terms-of-service", "/eula", "/foot-capacity-system", "/when-to-get-seen-in-person"]) {
      expect(HEADS[p], p).toBeDefined();
    }
  });

  it.each(Object.keys(ROUTE_HEADS))("%s: known path, bounded title/description, own route file", (p) => {
    const h = HEADS[p];
    expect(isKnownPath(p)).toBe(true);
    expect(p).not.toBe("/");
    expect(p).not.toBe("/dr-jonathan-schutza");
    expect(h.title.length).toBeLessThanOrEqual(TITLE_MAX[p] ?? 70);
    expect(h.description.length).toBeLessThanOrEqual(DESCRIPTION_MAX[p] ?? 200);
    const file = join(process.cwd(), "functions", p.slice(1) + ".js");
    expect(existsSync(file), file).toBe(true);
    expect(readFileSync(file, "utf8")).toContain(`rewriteRouteHead(context, "${p}")`);
  });

  it("the red-flag page drops the Product JSON-LD; the explainer keeps it", () => {
    expect(HEADS["/when-to-get-seen-in-person"].dropSchema).toBe(true);
    expect(HEADS["/foot-capacity-system"].dropSchema).toBe(false);
  });
});

type Op = { selector: string; op: string; args: unknown[] };
let ops: Op[] = [];
class StubRewriter {
  on(selector: string, handlers: { element(el: unknown): void }) {
    handlers.element({
      setAttribute: (...args: unknown[]) => ops.push({ selector, op: "setAttribute", args }),
      setInnerContent: (...args: unknown[]) => ops.push({ selector, op: "setInnerContent", args }),
      remove: () => ops.push({ selector, op: "remove", args: [] }),
    });
    return this;
  }
  transform(res: Response) {
    return new Response("rewritten", { status: res.status, headers: res.headers });
  }
}
beforeAll(() => { (globalThis as Record<string, unknown>).HTMLRewriter = StubRewriter; });
afterAll(() => { delete (globalThis as Record<string, unknown>).HTMLRewriter; });

const htmlRes = (status = 200, type = "text/html; charset=utf-8") =>
  new Response("<html></html>", { status, headers: { "content-type": type } });
const ctx = (res: Response) => ({ next: vi.fn(async () => res) });

describe("rewriteRouteHead()", () => {
  it.each(["/when-to-get-seen-in-person", "/foot-capacity-system"])(
    "%s: self-canonical title/description/OG/Twitter", async (p) => {
      ops = [];
      const res = await rewriteRouteHead(ctx(htmlRes()), p);
      expect(await res.text()).toBe("rewritten");
      const h = HEADS[p];
      const canonical = "https://fixyourmovement.com" + p;
      const find = (sel: string) => ops.find((o) => o.selector === sel);
      expect(find("title")?.args[0]).toBe(h.title);
      expect(find('link[rel="canonical"]')?.args).toEqual(["href", canonical]);
      expect(find('meta[property="og:url"]')?.args).toEqual(["content", canonical]);
      expect(find('meta[name="twitter:url"]')?.args).toEqual(["content", canonical]);
      expect(find('meta[name="description"]')?.args).toEqual(["content", h.description]);
      expect(find('meta[property="og:title"]')?.args).toEqual(["content", h.title]);
      expect(Boolean(find('script[type="application/ld+json"]'))).toBe(h.dropSchema);
    });

  it("non-200 and non-HTML responses pass through untouched", async () => {
    const notFound = htmlRes(404);
    expect(await rewriteRouteHead(ctx(notFound), "/foot-capacity-system")).toBe(notFound);
    const json = htmlRes(200, "application/json");
    expect(await rewriteRouteHead(ctx(json), "/foot-capacity-system")).toBe(json);
  });

  it("an unmapped path passes through untouched", async () => {
    const up = htmlRes();
    expect(await rewriteRouteHead(ctx(up), "/not-mapped")).toBe(up);
  });
});
