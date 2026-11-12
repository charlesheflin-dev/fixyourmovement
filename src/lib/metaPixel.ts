// src/lib/metaPixel.ts
// ============================================================
// Meta Pixel loader — Foot Capacity System funnel.
//
// POSTURE (Charles 2026-11-10): load UNGATED, consistent with the existing GA4 +
// Microsoft Clarity tags, from VITE_META_PIXEL_ID. If that env var is empty/unset,
// the pixel NEVER initializes (no fbq init with an empty id).
//
// HEALTH-DATA HYGIENE (this is a health-adjacent funnel — binds under any posture):
//   - autoConfig OFF: no automatic advanced matching, no automatic button-click /
//     page-metadata ("microdata") event scraping.
//   - disablePushState ON + we do NOT fire the base snippet's trailing PageView:
//     no automatic PageView on SPA history changes.
//   - PageView is fired MANUALLY per route (see trackPageView) and is SKIPPED entirely
//     on /results/:userId and /survey/:userId (a user UUID in the path). Nothing ever
//     fires from those routes.
//   - On /thank-you, PageView is SKIPPED whenever the URL has any query string
//     (defensive: the Whop post-checkout redirect target/params are out-of-band; never
//     let an appended identifier reach Meta via the pixel's dl=location.href). No URL
//     mutation — replaceState would wipe React Router's history state.
//   - No advanced matching in init (no em/ph). Matching is the server CAPI's job
//     (hashed email + fbc). Events are neutral; custom_data limited to value/currency.
//
// ⚠️ VERIFICATION NOTE (2026-11-10): Meta's official tag_spa + get-started docs do NOT
// document `autoConfig`, and show NO call syntax for `disablePushState` (only that it
// exists and is "not recommended"). So the two `set` calls below are BEST-EFFORT —
// fbq harmlessly queues/ignores an unknown set directive. The BINDING guarantee is the
// B3 Meta Events Manager Test Events check: confirm NO event fires on /results or
// /survey before any ad spend. If one does, replace these with the confirmed mechanism.
// ============================================================

const PIXEL_ID = ((import.meta.env.VITE_META_PIXEL_ID as string | undefined) ?? "").trim();

let initialized = false;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// Routes whose URL could carry a health-adjacent identifier (the :userId param).
// Never fire ANY pixel event while on these.
export function isSensitivePath(pathname: string): boolean {
  return /^\/results(\/|$)/.test(pathname) || /^\/survey(\/|$)/.test(pathname);
}

// True when the CURRENT url carries an `email` query param (any case). Any URL still
// carrying ?email= (e.g. an old email link that has not been stripped yet) would send the
// address to Meta via dl=location.href if a pixel fired there. (The retired assessment
// funnel's /assessment and /assessment-results, which read ?email=, now redirect to
// /lp/download.)
// Guards init + every event, on top of the path skip above.
function urlHasEmailParam(): boolean {
  if (typeof window === "undefined" || !window.location || !window.location.search) return false;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of params.keys()) {
      if (key.toLowerCase() === "email") return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function initMetaPixel(): void {
  if (initialized || !PIXEL_ID || typeof window === "undefined") return;
  // Guard (reviewer 2026-11-10): if the session's FIRST page is a sensitive route
  // (a patient arriving from an email link straight to /results or /survey), never
  // load fbevents.js at all — so the unproven auto-suppression flags can't matter for
  // them. Closes the risk in code, not only via the Test Events check.
  if (isSensitivePath(window.location.pathname) || urlHasEmailParam()) return;

  // Standard Meta base code, but WITHOUT the trailing fbq('track','PageView') —
  // we fire PageView manually (see trackPageView) so it can be route-gated.
  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  const fbq = window.fbq!;
  // Best-effort automatic-behaviour suppression (see VERIFICATION NOTE). Harmless no-ops
  // if unrecognized; the Test Events check is the real guarantee. disablePushState is set
  // both as a property (the widely-used form) and via set() since Meta documents neither.
  (fbq as unknown as { disablePushState?: boolean }).disablePushState = true;
  fbq("set", "autoConfig", false, PIXEL_ID);
  fbq("set", "disablePushState", true);
  // Init WITHOUT an advanced-matching object — matching is the server CAPI's job.
  fbq("init", PIXEL_ID);
  initialized = true;
}

// Fire a manual PageView for the given route. No-op if the pixel never initialized
// (empty VITE_META_PIXEL_ID). Skipped entirely on sensitive routes; query stripped on
// /thank-you so a Whop-appended identifier can't reach Meta via location.href.
export function trackPageView(pathname: string): void {
  if (!initialized || !window.fbq) return;
  if (isSensitivePath(pathname) || urlHasEmailParam()) return;
  // /thank-you can carry Whop-appended identifiers in its query — skip rather than mutate
  // the URL (replaceState would wipe React Router's history state/idx and break Back).
  if (pathname === "/thank-you" && typeof window.location !== "undefined" && window.location.search) return;
  window.fbq("track", "PageView");
}

// Neutral standard events only (e.g. Lead, InitiateCheckout). custom_data limited to
// value/currency — never health data, never PII. Skipped on sensitive routes.
export function trackMetaEvent(
  name: string,
  data?: { value?: number; currency?: string },
): void {
  if (!initialized || !window.fbq) return;
  if ((typeof window.location !== "undefined" && isSensitivePath(window.location.pathname)) || urlHasEmailParam()) return;
  window.fbq("track", name, data ?? {});
}
