// ─── Landing-page hero copy, keyed by A/B variant ────────────────────────────────
// Spec: app repo context/library/specs/SPEC-lp-ab-testing.md §3 B2 (W5), §0 D3, §5.
// Only the INNER content of the hero lives here; the pages keep their own <h1>/<p>
// wrappers and classes. `control` reproduces today's hero byte-for-byte:
//   download   = src/pages/DownloadApp.tsx H1 + subhead <p> (both <br>s, incl. the
//                `hidden sm:block` one)
//   cold-start = src/pages/ColdStart.tsx two-line H1 <span>s AND the body <p>
// Unknown / absent variant → control.
import type { ReactNode } from "react";

// Must equal the registry ids in functions/_data/experiments.js and lp_experiments.id.
export const DL_HERO_EXPERIMENT = "dl-hero-01";
export const CS_HERO_EXPERIMENT = "cs-hero-01";

export type HeroCopy = { headline: ReactNode; subhead: ReactNode };

const DOWNLOAD_CONTROL: HeroCopy = {
  headline: <>Recovery Shouldn't<br />Require A Waiting Room.</>,
  subhead: <>Just a daily recovery plan from Dr. Jonathan<br className="hidden sm:block" /> delivered directly to your phone.</>,
};

const COLD_START_CONTROL: HeroCopy = {
  headline: (
    <>
      <span className="block text-slate-900">Stop Guessing Your Way Through Plantar Fasciitis.</span>
      <span className="block text-blue-600">Follow a Plan That Adjusts to Your Foot.</span>
    </>
  ),
  subhead: <>Exercise videos show you what to do. Assigned sets and reps tell you how much. Your daily check-ins help guide what comes next.</>,
};

// Variant "b" challenger copy (spec §5.3). Approved by Dr. Schutza 2026-11-12 — verbatim;
// do not edit wording without his sign-off.
const DOWNLOAD_B: HeroCopy = {
  headline: <>Get the Recovery Plan Dr. Jonathan Uses — Free, on Your Phone.</>,
  subhead: <>The same daily plan he uses with his patients, adjusted to how your foot feels each day.</>,
};

// Approved by Dr. Schutza 2026-11-12. Same span structure/classes as control; body <p>
// copy is unchanged from control.
const COLD_START_B: HeroCopy = {
  headline: (
    <>
      <span className="block text-slate-900">Get Back to Walking Without Thinking About Your Heel.</span>
      <span className="block text-blue-600">Follow a Daily Plan That Adjusts to Your Foot.</span>
    </>
  ),
  subhead: COLD_START_CONTROL.subhead,
};

const DOWNLOAD_HERO: Record<string, HeroCopy> = {
  control: DOWNLOAD_CONTROL,
  b: DOWNLOAD_B,
};

const COLD_START_HERO: Record<string, HeroCopy> = {
  control: COLD_START_CONTROL,
  b: COLD_START_B,
};

function pick(table: Record<string, HeroCopy>, variant: string | null | undefined): HeroCopy {
  return variant && Object.prototype.hasOwnProperty.call(table, variant) ? table[variant] : table.control;
}

export function downloadHero(variant: string | null | undefined): HeroCopy {
  return pick(DOWNLOAD_HERO, variant);
}

export function coldStartHero(variant: string | null | undefined): HeroCopy {
  return pick(COLD_START_HERO, variant);
}
