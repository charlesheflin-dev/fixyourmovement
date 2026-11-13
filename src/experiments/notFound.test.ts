// Real-404 middleware + route-list drift guards against src/App.tsx and public/**/*.html.
import { describe, it, expect, vi } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { onRequest } from "../../functions/_middleware.js";
import { isKnownPath, hardNotFound } from "../../functions/_lib/notFound.js";

const SHELL = '<!doctype html><html><head><title>x</title></head><body><div id="root"></div></body></html>';
const html = () => new Response(SHELL, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
const ctx = (path: string, method = "GET", upstream: Response = html()) => ({
  request: new Request("https://fixyourmovement.com" + path, { method, headers: { accept: "text/html", "user-agent": "Mozilla/5.0" } }),
  next: vi.fn(async () => upstream),
});

describe("real 404 for unknown paths", () => {
  it.each(["/does-not-exist", "/foot-capacity", "/lp/other", "/checkout/extra", "/dr-jonathan-schutza.html"])(
    "%s -> 404, shell body kept, noindex", async (p) => {
      const res = await onRequest(ctx(p));
      expect(res.status).toBe(404);
      expect(res.headers.get("x-robots-tag")).toBe("noindex");
      expect(await res.text()).toBe(SHELL);
    });
  it.each(["/", "/checkout", "/Checkout", "/hsa-fsa", "/results/abc-123", "/survey/abc", "/guide/next",
           "/bonuses", "/bonuses/daily-habit-builder", "/support", "/blog/some-article",
           "/foot-capacity-system", "/when-to-get-seen-in-person"])(
    "%s -> upstream unchanged", async (p) => {
      const upstream = html();
      expect(await onRequest(ctx(p, "GET", upstream))).toBe(upstream);
    });
  it("POST to an unknown path is untouched", async () => {
    const upstream = html();
    expect(await onRequest(ctx("/csp-report", "POST", upstream))).toBe(upstream);
  });
  it("non-HTML and non-200 upstreams are untouched", () => {
    const req = new Request("https://fixyourmovement.com/nope");
    const img = new Response("x", { status: 200, headers: { "content-type": "image/png" } });
    const moved = new Response(null, { status: 301, headers: { location: "/" } });
    expect(hardNotFound(req, new URL(req.url), img)).toBe(img);
    expect(hardNotFound(req, new URL(req.url), moved)).toBe(moved);
  });
});

describe("route list drift guards", () => {
  it("every <Route path> in src/App.tsx is known", () => {
    const app = readFileSync(join(process.cwd(), "src/App.tsx"), "utf8");
    const paths = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== "*");
    expect(paths.length).toBeGreaterThan(10);
    for (const p of paths) expect(isKnownPath(p.replace(/\/\*$/, "/x").replace(/:[^/]+/g, "x")), p).toBe(true);
  });
  it("every public/**/*.html (Pretty URL) is known", () => {
    const root = join(process.cwd(), "public");
    const walk = (d: string): string[] =>
      readdirSync(d).flatMap((n) => { const f = join(d, n); return statSync(f).isDirectory() ? walk(f) : [f]; });
    for (const f of walk(root).filter((x) => x.endsWith(".html"))) {
      const rel = "/" + relative(root, f).replace(/\\/g, "/").replace(/\/?index\.html$/, "").replace(/\.html$/, "");
      expect(isKnownPath(rel), rel).toBe(true);
    }
  });
});
