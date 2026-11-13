// functions/_data/spaRoutes.js
// Every path the SPA (src/App.tsx) serves, plus non-SPA paths Cloudflare Pages serves as real
// HTML (Pretty-URL static files, the blog). Read by functions/_lib/notFound.js.
// KEEP IN SYNC with src/App.tsx — src/experiments/notFound.test.ts fails if an App.tsx route or
// a public/**/*.html file is missing here. Lower-case: React Router matches case-insensitively.
export const SPA_EXACT = [
  "/", "/privacy-policy", "/terms-of-service", "/contact", "/thank-you", "/refund-policy",
  "/eula", "/hsa-fsa", "/dr-jonathan-schutza", "/email-confirmation", "/lp/newsletter",
  "/lp/take-assessment", "/lp/download", "/lp/cold-start", "/assessment", "/assessment-results",
  "/unsubscribed", "/checkout", "/upgrade", "/survey", "/results", "/ask",
  "/guide/morning", "/guide/tough-day", "/guide/next",
];
export const SPA_PREFIXES = ["/start/", "/survey/", "/results/"];
// Real static HTML (Pretty URLs: /support = support.html, /bonuses/*) and the blog: exact or below.
export const PASS_THROUGH = ["/bonuses", "/blog", "/support", "/.well-known"];
