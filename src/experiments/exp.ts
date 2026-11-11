// ─── Landing-page A/B experiment (client side) ───────────────────────────────────
// Spec: app repo context/library/specs/SPEC-lp-ab-testing.md §3 B2 (W4).
// The edge middleware (functions/_middleware.js → functions/_lib/experiments.js) injects
// window.__FCS_EXP__ = { e, v } into <head> ONLY when an experiment is "running".
// With every experiment off, nothing is injected: getExperiment() is null,
// experimentMeta() is {}, and withExperimentMeta() returns the exact payload callers
// sent before this module existed (no `meta` key added).

declare global {
  interface Window {
    __FCS_EXP__?: unknown;
  }
}

export type Experiment = { e: string; v: string };

const SLUG_RE = /^[a-z0-9-]{1,40}$/;

let cached: Experiment | null | undefined;

function readExperiment(): Experiment | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.__FCS_EXP__;
    if (!raw || typeof raw !== "object") return null;
    const { e, v } = raw as { e?: unknown; v?: unknown };
    if (typeof e !== "string" || typeof v !== "string") return null;
    if (!SLUG_RE.test(e) || !SLUG_RE.test(v)) return null;
    return { e, v };
  } catch {
    return null;
  }
}

// Reads window.__FCS_EXP__ once per page load (the value never changes after boot).
export function getExperiment(): Experiment | null {
  if (cached === undefined) cached = readExperiment();
  return cached;
}

// The assigned variant for THIS experiment id, or null when not in it (champion).
export function variantFor(experimentId: string): string | null {
  const exp = getExperiment();
  return exp && exp.e === experimentId ? exp.v : null;
}

function getCookie(name: string): string | null {
  try {
    const match = document.cookie.split("; ").find(row => row.startsWith(name + "="));
    return match ? decodeURIComponent(match.split("=")[1]) : null;
  } catch {
    return null;
  }
}

// Same gate as the pages' sourceFields() (fcs_last_source is written slug-only, <=200
// chars, by SourceCapture in App.tsx). Anything else => "(none)", so a malformed cookie
// can never push funnel_events.meta past its 2000-char cap (oversize => stored as {}).
function lastSource(): string {
  const v = getCookie("fcs_last_source");
  if (!v) return "(none)";
  const s = v.trim().slice(0, 200);
  return /^[A-Za-z0-9/_-]+$/.test(s) ? s : "(none)";
}

export function experimentMeta(): Record<string, string> {
  const exp = getExperiment();
  if (!exp) return {};
  return { exp: exp.e, v: exp.v, src: lastSource() };
}

// Builds a log-funnel-event body: { ...base, ...extra } plus a merged `meta`
// (experiment meta first, the caller's extra.meta wins on key clash — e.g. cold-start's
// form_position). `email` and every other extra key stay top-level. When there is no
// experiment and no extra.meta, no `meta` key is added.
export function withExperimentMeta(
  base: Record<string, unknown>,
  extra?: Record<string, unknown>,
): Record<string, unknown> {
  const extraMeta =
    extra && extra.meta && typeof extra.meta === "object" ? (extra.meta as Record<string, unknown>) : {};
  const meta = { ...experimentMeta(), ...extraMeta };
  return { ...base, ...extra, ...(Object.keys(meta).length ? { meta } : {}) };
}

// Test-only: forget the cached read so a test can set a new window.__FCS_EXP__.
export function __resetExperimentCacheForTests(): void {
  cached = undefined;
}
