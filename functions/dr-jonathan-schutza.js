// functions/dr-jonathan-schutza.js
// Edge head-rewriter for the Dr. Jonathan Schutza identity page.
// Cloudflare Pages Function scoped to the single route /dr-jonathan-schutza.
// Runs after functions/_middleware.js. Pulls the normal SPA index.html via
// context.next(), then rewrites ONLY the <head> for this path: self-canonical,
// Dr. Schutza title/description/OG/Twitter, and swaps the static Product
// JSON-LD for the Person entity. Body/#root/scripts are untouched, so the SPA
// still boots on top of the corrected head.
// Safety: any response that is not 200 text/html is returned untouched — this
// Function cannot regress the route.
import { HEAD, PERSON_SCHEMA } from "./_data/dr-schutza.js";

export async function onRequest(context) {
  const response = await context.next();

  const contentType = response.headers.get("content-type") || "";
  if (response.status !== 200 || !contentType.includes("text/html")) {
    return response;
  }

  const personJson = JSON.stringify(PERSON_SCHEMA);

  return new HTMLRewriter()
    .on("title", { element(el) { el.setInnerContent(HEAD.title); } })
    .on('link[rel="canonical"]', { element(el) { el.setAttribute("href", HEAD.canonical); } })
    .on('meta[name="title"]', { element(el) { el.setAttribute("content", HEAD.title); } })
    .on('meta[name="description"]', { element(el) { el.setAttribute("content", HEAD.description); } })
    .on('meta[property="og:url"]', { element(el) { el.setAttribute("content", HEAD.canonical); } })
    .on('meta[property="og:title"]', { element(el) { el.setAttribute("content", HEAD.title); } })
    .on('meta[property="og:description"]', { element(el) { el.setAttribute("content", HEAD.description); } })
    .on('meta[name="twitter:url"]', { element(el) { el.setAttribute("content", HEAD.canonical); } })
    .on('meta[name="twitter:title"]', { element(el) { el.setAttribute("content", HEAD.title); } })
    .on('meta[name="twitter:description"]', { element(el) { el.setAttribute("content", HEAD.description); } })
    .on('script[type="application/ld+json"]', { element(el) { el.setInnerContent(personJson, { html: true }); } })
    .transform(response);
}
