// src/lib/installTracking.ts
// Appends the Tier-1 anon id + an install-source marker to an install URL, so a
// cross-origin wall event on app.fixyourmovement.com can be joined back to the
// funnel_events row on fixyourmovement.com. Pure: no React, no cookie reads, no
// side effects. Caller passes the fcs_anon value in. No-op when anon is absent
// (older/absent cookie) — returns the base URL unchanged so nothing breaks.

export type InstallSrc = "session" | "email_new" | "email_resend";

export function installUrlWithTracking(
  baseUrl: string,
  opts: { anon?: string | null; src: InstallSrc; otl?: string | null }
): string {
  const { anon, src, otl } = opts;
  let url = baseUrl;
  if (anon) {
    const sep = url.includes("?") ? "&" : "?";
    url = `${url}${sep}fcs_anon=${encodeURIComponent(anon)}&install_src=${encodeURIComponent(src)}`;
  }
  // fcs_otl = one-time magic-link token_hash for the post-registration auto-login
  // handoff (consumed at /install by Landing.tsx). Absent -> URL unchanged.
  if (otl) {
    const sep = url.includes("?") ? "&" : "?";
    url = `${url}${sep}fcs_otl=${encodeURIComponent(otl)}`;
  }
  return url;
}
