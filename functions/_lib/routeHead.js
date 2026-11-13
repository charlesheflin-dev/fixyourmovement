// functions/_lib/routeHead.js
// Shared edge head-rewriter for public SPA routes listed in functions/_data/routeHeads.js.
// Same safety contract as functions/dr-jonathan-schutza.js: non-200 / non-HTML responses are
// returned untouched, and any rewriter error serves the response untouched.
import { ROUTE_HEADS } from "../_data/routeHeads.js";
const SITE = "https://fixyourmovement.com";

export async function rewriteRouteHead(context, path) {
  const response = await context.next();
  const head = ROUTE_HEADS[path];
  const contentType = response.headers.get("content-type") || "";
  if (!head || response.status !== 200 || !contentType.includes("text/html")) return response;
  try {
    const canonical = SITE + path;
    const attr = (name, value) => ({ element(el) { el.setAttribute(name, value); } });
    let rw = new HTMLRewriter()
      .on("title", { element(el) { el.setInnerContent(head.title); } })
      .on('link[rel="canonical"]', attr("href", canonical))
      .on('meta[name="title"]', attr("content", head.title))
      .on('meta[name="description"]', attr("content", head.description))
      .on('meta[property="og:url"]', attr("content", canonical))
      .on('meta[property="og:title"]', attr("content", head.title))
      .on('meta[property="og:description"]', attr("content", head.description))
      .on('meta[name="twitter:url"]', attr("content", canonical))
      .on('meta[name="twitter:title"]', attr("content", head.title))
      .on('meta[name="twitter:description"]', attr("content", head.description));
    if (head.dropSchema) rw = rw.on('script[type="application/ld+json"]', { element(el) { el.remove(); } });
    return rw.transform(response);
  } catch {
    return response;
  }
}
