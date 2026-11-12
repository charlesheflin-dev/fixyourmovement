// functions/_lib/notFound.js
// Turns the SPA fallback's soft 404 (_redirects "/* /index.html 200") into a real 404 for paths
// the app does not serve. Body stays the SPA shell, so React still renders NotFound.
// Called only from functions/_middleware.js, after the experiment branch. Fail-open.
import { SPA_EXACT, SPA_PREFIXES, PASS_THROUGH } from "../_data/spaRoutes.js";

const EXACT = new Set(SPA_EXACT);

export function isKnownPath(pathname) {
  if (typeof pathname !== "string") return true;
  const p = pathname.toLowerCase();
  if (EXACT.has(p)) return true;
  if (SPA_PREFIXES.some((x) => p.startsWith(x))) return true;
  return PASS_THROUGH.some((x) => p === x || p.startsWith(x + "/"));
}

export function hardNotFound(request, url, res) {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") return res;
    if (res.status !== 200) return res;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return res;
    if (isKnownPath(url.pathname)) return res;
    const out = new Response(res.body, { status: 404, statusText: "Not Found", headers: res.headers });
    out.headers.set("X-Robots-Tag", "noindex");
    return out;
  } catch {
    return res;
  }
}
