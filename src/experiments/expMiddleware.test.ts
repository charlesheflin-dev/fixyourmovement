// (Runs in the default jsdom env; Request/Response/ReadableStream are Node globals.)
// Behavioural tests for the edge pieces (functions/_middleware.js + functions/_lib/
// experiments.js) with a stubbed Pages `context` and a stubbed HTMLRewriter (a Workers
// global, absent in Node). The stub appends the injected HTML right after <head>.
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { onRequest } from "../../functions/_middleware.js";
import { handleExperiment } from "../../functions/_lib/experiments.js";

const SHELL = "<!doctype html><html><head><title>x</title></head><body><div id=\"root\"></div></body></html>";
const BROWSER_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 300.0";
const RUNNING = { experiment: "dl-hero-01", status: "running", variants: ["control", "b"], weights: [50, 50] };

class StubRewriter {
  private html = "";
  on(selector: string, handlers: { element(el: { append(s: string): void }): void }) {
    if (selector === "head") handlers.element({ append: (s: string) => { this.html += s; } });
    return this;
  }
  transform(res: Response) {
    const injected = this.html;
    const body = res.text().then((t) => t.replace("<head>", "<head>" + injected));
    const stream = new ReadableStream({
      async start(c) { c.enqueue(new TextEncoder().encode(await body)); c.close(); },
    });
    return new Response(stream, { status: res.status, headers: res.headers });
  }
}

beforeAll(() => { (globalThis as Record<string, unknown>).HTMLRewriter = StubRewriter; });
afterAll(() => { delete (globalThis as Record<string, unknown>).HTMLRewriter; });

function shellResponse(status = 200, type = "text/html; charset=utf-8") {
  return new Response(status === 304 ? null : SHELL, { status, headers: { "content-type": type, etag: "\"abc\"" } });
}

function makeContext(path: string, headers: Record<string, string> = {}, method = "GET", next?: (req?: Request) => Promise<Response>) {
  const request = new Request("https://fixyourmovement.com" + path, {
    method,
    headers: { accept: "text/html,application/xhtml+xml", "user-agent": BROWSER_UA, ...headers },
  });
  const seen: (Request | undefined)[] = [];
  const nextFn = vi.fn(async (req?: Request) => {
    seen.push(req);
    return next ? next(req) : shellResponse();
  });
  return { context: { request, next: nextFn }, nextFn, seen };
}

describe("_middleware.js with the REAL registry (both experiments running)", () => {
  it.each([
    ["/lp/download", "dl-hero-01"],
    ["/lp/take-assessment", "dl-hero-01"],
    ["/lp/newsletter", "dl-hero-01"],
    ["/start/x", "dl-hero-01"],
    ["/lp/cold-start", "cs-hero-01"],
  ])("%s: assigns %s — injects script, sets cookie, private no-store", async (path, id) => {
    const { context } = makeContext(path);
    const res = await onRequest(context);
    const html = await res.text();
    const m = html.match(new RegExp(`window\\.__FCS_EXP__=\\{"e":"${id}","v":"(control|b)"\\}`));
    expect(m).not.toBeNull();
    expect(res.headers.get("set-cookie")).toMatch(new RegExp(`^fcs_exp_${id}=${m![1]};`));
    expect(res.headers.get("cache-control")).toBe("private, no-store");
  });

  it.each(["/", "/checkout", "/hsa-fsa"])(
    "%s (not in registry): passes straight through — same response object, no cookie, no script, no new headers",
    async (path) => {
      const upstream = shellResponse();
      const { context, nextFn } = makeContext(path, { "if-none-match": "\"abc\"" }, "GET", async () => upstream);
      const res = await onRequest(context);
      expect(res).toBe(upstream);
      expect(nextFn).toHaveBeenCalledTimes(1);
      expect(nextFn).toHaveBeenCalledWith(); // no rewritten request (conditional headers untouched)
      expect(res.headers.get("set-cookie")).toBeNull();
      expect(res.headers.get("cache-control")).toBeNull();
      expect(await res.text()).toBe(SHELL);
    },
  );

  it("trailing-slash 301 still runs first", async () => {
    const { context, nextFn } = makeContext("/lp/download/");
    const res = await onRequest(context);
    expect(res.status).toBe(301);
    expect(nextFn).not.toHaveBeenCalled();
  });
});

describe("handleExperiment() — running entry", () => {
  it("assigns a new visitor: injects script, sets cookie, private no-store, strips conditionals", async () => {
    const { context, seen } = makeContext("/lp/download", { "if-none-match": "\"abc\"", "if-modified-since": "Mon, 01 Jan 2024 00:00:00 GMT" });
    const res = await handleExperiment(context, RUNNING);
    const html = await res.text();
    const m = html.match(/<script id="fcs-exp">window\.__FCS_EXP__=\{"e":"dl-hero-01","v":"(control|b)"\}<\/script>/);
    expect(m).not.toBeNull();
    expect(res.headers.get("set-cookie")).toBe(`fcs_exp_dl-hero-01=${m![1]}; Path=/; Max-Age=7776000; SameSite=Lax; Secure`);
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expect(seen[0]).toBeInstanceOf(Request);
    expect(seen[0]!.headers.get("if-none-match")).toBeNull();
    expect(seen[0]!.headers.get("if-modified-since")).toBeNull();
  });

  it("reuses a valid cookie: same variant, no new Set-Cookie", async () => {
    const { context } = makeContext("/lp/download", { cookie: "fcs_anon=z; fcs_exp_dl-hero-01=b" });
    const res = await handleExperiment(context, RUNNING);
    expect(await res.text()).toContain('window.__FCS_EXP__={"e":"dl-hero-01","v":"b"}');
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(res.headers.get("cache-control")).toBe("private, no-store");
  });

  it("discards a tampered cookie and reassigns (never echoes it)", async () => {
    const { context } = makeContext("/lp/download", { cookie: "fcs_exp_dl-hero-01=%3Cscript%3E" });
    const res = await handleExperiment(context, RUNNING);
    const html = await res.text();
    expect(html).not.toContain('"v":"<script>"');
    expect(html).toMatch(/"v":"(control|b)"/);
    expect(res.headers.get("set-cookie")).toMatch(/^fcs_exp_dl-hero-01=(control|b);/);
  });

  it.each([
    ["facebookexternalhit", { "user-agent": "facebookexternalhit/1.1" }, "GET"],
    ["non-HTML accept", { accept: "application/json" }, "GET"],
    ["HEAD", {}, "HEAD"],
    ["POST", {}, "POST"],
  ])("%s: untouched champion, no cookie", async (_l, headers, method) => {
    const upstream = shellResponse();
    const { context, nextFn } = makeContext("/lp/download", headers as Record<string, string>, method, async () => upstream);
    const res = await handleExperiment(context, RUNNING);
    expect(res).toBe(upstream);
    expect(nextFn).toHaveBeenCalledWith();
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("non-200 / non-HTML upstream is returned unchanged", async () => {
    const r404 = shellResponse(404);
    const a = makeContext("/lp/download", {}, "GET", async () => r404);
    expect(await handleExperiment(a.context, RUNNING)).toBe(r404);
    const js = shellResponse(200, "application/javascript");
    const b = makeContext("/lp/download", {}, "GET", async () => js);
    expect(await handleExperiment(b.context, RUNNING)).toBe(js);
  });

  it("fails open to the champion when the rewriter throws", async () => {
    const saved = (globalThis as Record<string, unknown>).HTMLRewriter;
    (globalThis as Record<string, unknown>).HTMLRewriter = class { on() { throw new Error("boom"); } };
    try {
      const upstream = shellResponse();
      const { context } = makeContext("/lp/download", {}, "GET", async () => upstream);
      const res = await handleExperiment(context, RUNNING);
      expect(res).toBe(upstream);
      expect(res.status).toBe(200);
    } finally {
      (globalThis as Record<string, unknown>).HTMLRewriter = saved;
    }
  });

  it("invalid registry entry → champion via plain next()", async () => {
    const { context, nextFn } = makeContext("/lp/download");
    await handleExperiment(context, { ...RUNNING, experiment: "Bad Id" });
    expect(nextFn).toHaveBeenCalledWith();
  });
});
