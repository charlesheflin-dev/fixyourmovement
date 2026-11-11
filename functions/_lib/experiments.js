// functions/_lib/experiments.js
// Edge assignment for the landing-page A/B experiments. Called ONLY from
// functions/_middleware.js, and only for a registry entry with status "running".
// Spec: app repo SPEC-lp-ab-testing.md §3 B2 (W2).
//
// Safety: fail-open. Any thrown error serves the champion (the untouched shell, or a
// plain context.next()) — this helper must never 500 a landing page under paid traffic.
import {
  isBot,
  isValidConfig,
  isValidVariant,
  cookieName,
  parseCookie,
  pickVariant,
  injectionScript,
  setCookieHeader,
} from "./expCore.js";

export async function handleExperiment(context, cfg) {
  let res = null;
  try {
    const request = context.request;

    // Only full-page HTML GETs are assigned.
    if (request.method !== "GET") return context.next();
    const accept = request.headers.get("Accept") || "";
    if (!accept.includes("text/html")) return context.next();

    // Bots / link-preview crawlers: champion, untouched, no cookie.
    if (isBot(request.headers.get("User-Agent") || "")) return context.next();

    if (!isValidConfig(cfg)) return context.next();

    // Sticky assignment: reuse a VALID cookie value, otherwise (absent or tampered) assign.
    const existing = parseCookie(request.headers.get("Cookie"), cookieName(cfg.experiment));
    let variant = isValidVariant(existing, cfg.variants) ? existing : null;
    const newlyAssigned = variant === null;
    if (newlyAssigned) {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      variant = pickVariant(cfg.variants, cfg.weights, buf[0]);
    }

    // Strip conditional headers so a browser holding a cached champion shell gets a full
    // 200 (and is injected/assigned) instead of a 304.
    const req = new Request(request);
    req.headers.delete("If-None-Match");
    req.headers.delete("If-Modified-Since");
    res = await context.next(req);

    const contentType = res.headers.get("content-type") || "";
    if (res.status !== 200 || !contentType.includes("text/html")) return res;

    const script = injectionScript(cfg.experiment, variant);
    const out = new HTMLRewriter()
      .on("head", { element(el) { el.append(script, { html: true }); } })
      .transform(res);

    // Headers from context.next() may be immutable — set them on a NEW Response.
    const r = new Response(out.body, out);
    if (newlyAssigned) r.headers.append("Set-Cookie", setCookieHeader(cfg.experiment, variant));
    // A variant-specific page must never be served from a shared cache to someone else.
    r.headers.set("Cache-Control", "private, no-store");
    return r;
  } catch {
    return res ?? context.next();
  }
}
