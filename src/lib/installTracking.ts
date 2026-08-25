// src/lib/installTracking.ts
// Appends the Tier-1 anon id + an install-source marker to an install URL, so a
// cross-origin wall event on app.fixyourmovement.com can be joined back to the
// funnel_events row on fixyourmovement.com. Pure: no React, no cookie reads, no
// side effects. Caller passes the fcs_anon value in. No-op when anon is absent
// (older/absent cookie) — returns the base URL unchanged so nothing breaks.

export type InstallSrc = "session" | "email_new" | "email_resend";

export function installUrlWithTracking(
  baseUrl: string,
  opts: { anon?: string | null; src: InstallSrc }
): string {
  const { anon, src } = opts;
  if (!anon) return baseUrl;
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}fcs_anon=${encodeURIComponent(anon)}&install_src=${encodeURIComponent(src)}`;
}
