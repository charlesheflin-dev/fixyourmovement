// functions/_lib/expCore.js
// Pure helpers for the landing-page A/B middleware (no I/O, no Workers globals), so
// they can be unit-tested from vitest (src/experiments/expCore.test.ts imports this file
// by relative path). Spec: app repo SPEC-lp-ab-testing.md §3 B2 (W2/W7).

// Link-preview crawlers and bots are never assigned (champion, no cookie).
// facebookexternalhit = Meta's link-preview crawler.
export const BOT_UA_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|facebot|preview|whatsapp|telegram|discord|linkedin|embedly|headless/i;

// Experiment ids and variant names: short lowercase slugs only.
export const SLUG_RE = /^[a-z0-9-]{1,40}$/;

export const COOKIE_PREFIX = "fcs_exp_";
export const COOKIE_MAX_AGE = 7776000; // 90 days

export function isBot(ua) {
  return BOT_UA_RE.test(typeof ua === "string" ? ua : "");
}

export function cookieName(experimentId) {
  return COOKIE_PREFIX + experimentId;
}

// Read one cookie value from a Cookie request header. Returns null when absent.
export function parseCookie(header, name) {
  if (typeof header !== "string" || !header) return null;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() !== name) continue;
    const raw = part.slice(idx + 1).trim();
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  return null;
}

// The cookie value is untrusted input: only an exact registry variant is accepted.
export function isValidVariant(value, variants) {
  return typeof value === "string" && Array.isArray(variants) && variants.includes(value);
}

// A registry entry is usable only when every value that reaches HTML / a cookie is a slug
// and weights line up with variants. Anything else => the middleware serves the champion.
export function isValidConfig(cfg) {
  if (!cfg || typeof cfg !== "object") return false;
  if (typeof cfg.experiment !== "string" || !SLUG_RE.test(cfg.experiment)) return false;
  if (!Array.isArray(cfg.variants) || cfg.variants.length < 2) return false;
  if (!cfg.variants.every((v) => typeof v === "string" && SLUG_RE.test(v))) return false;
  if (!Array.isArray(cfg.weights) || cfg.weights.length !== cfg.variants.length) return false;
  if (!cfg.weights.every((w) => typeof w === "number" && Number.isFinite(w) && w >= 0)) return false;
  return cfg.weights.reduce((a, b) => a + b, 0) > 0;
}

// Weighted pick. `rand` is a uint32 (from crypto.getRandomValues), mapped to [0, total).
export function pickVariant(variants, weights, rand) {
  const total = weights.reduce((a, b) => a + b, 0);
  const x = (rand / 4294967296) * total;
  let acc = 0;
  for (let i = 0; i < variants.length; i++) {
    acc += weights[i];
    if (x < acc) return variants[i];
  }
  return variants[variants.length - 1];
}

// Registry lookup: exact path first, else the first matching prefix. Returns the entry
// ONLY when its status is "running"; otherwise null ("no experiment" => context.next()).
export function findRunningExperiment(pathname, byPath, prefixes) {
  if (typeof pathname !== "string") return null;
  let entry = null;
  if (byPath && Object.prototype.hasOwnProperty.call(byPath, pathname)) {
    entry = byPath[pathname];
  } else if (Array.isArray(prefixes)) {
    for (const pair of prefixes) {
      if (Array.isArray(pair) && typeof pair[0] === "string" && pathname.startsWith(pair[0])) {
        entry = pair[1];
        break;
      }
    }
  }
  return entry && entry.status === "running" ? entry : null;
}

// <head> injection. Values come from the registry only (never the raw cookie).
export function injectionScript(experimentId, variant) {
  return `<script id="fcs-exp">window.__FCS_EXP__=${JSON.stringify({ e: experimentId, v: variant })}</script>`;
}

export function setCookieHeader(experimentId, variant) {
  return `${cookieName(experimentId)}=${variant}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
}
