// ─── Landing-page hero copy, keyed by A/B variant ────────────────────────────────
// Spec: app repo context/library/specs/SPEC-lp-ab-testing.md §3 B2 (W5), §0 D3, §5.
// Only the INNER content of the hero lives here; the pages keep their own <h1>/<p>
// wrappers and classes. `control` = the control WORDS:
//   download   = src/pages/DownloadApp.tsx H1 + subhead <p> (both <br>s, incl. the
//                `hidden sm:block` one), byte-for-byte as before B2
//   cold-start = src/pages/ColdStart.tsx two-line H1 <span>s AND the body <p>. Since
//                2026-11-23 (Matt's cold-start hero spec) line 2 carries smaller size classes and
//                the subhead is new; the headline words of both arms are unchanged.
// Unknown / absent variant → control.
import type { ReactNode } from "react";

// Must equal the registry ids in functions/_data/experiments.js and lp_experiments.id.
export const DL_HERO_EXPERIMENT = "dl-hero-01";
// cs-hero-01 keeps running through the 2026-11-23 page change (Charles): both arms get the same new
// page, so the headline comparison stays fair; per-arm rates may step on launch day.
export const CS_HERO_EXPERIMENT = "cs-hero-01";

export type HeroCopy = { headline: ReactNode; subhead: ReactNode };

const DOWNLOAD_CONTROL: HeroCopy = {
  headline: <>Recovery Shouldn't<br />Require A Waiting Room.</>,
  subhead: <>Just a daily recovery plan from Dr. Jonathan<br className="hidden sm:block" /> delivered directly to your phone.</>,
};

// Cold-start headline line 2 (both arms): smaller than line 1, which takes the page's H1 size.
export const CS_LINE2 = "block text-blue-600 text-[20px] leading-[1.22] mt-1 md:text-[30px] md:leading-[1.2] md:mt-2.5";

const COLD_START_CONTROL: HeroCopy = {
  headline: (
    <>
      <span className="block text-slate-900">Stop Guessing Your Way Through Plantar Fasciitis.</span>
      <span className={CS_LINE2}>Follow a Plan That Adjusts to Your Foot.</span>
    </>
  ),
  // Subhead approved by Matt 2026-11-23 (cold-start hero spec §1c); shared by both arms.
  subhead: <><strong className="font-bold text-slate-900">15 minutes a day at home.</strong> Exercise videos show you what to do. Sets and reps tell you how much. Your daily check-ins guide what comes next.</>,
};

// Variant "b" challenger copy (spec §5.3). Approved by Dr. Schutza 2026-11-12 — verbatim;
// do not edit wording without his sign-off.
const DOWNLOAD_B: HeroCopy = {
  headline: <>Get the Recovery Plan Dr. Jonathan Uses — Free, on Your Phone.</>,
  subhead: <>The same daily plan he uses with his patients, adjusted to how your foot feels each day.</>,
};

// Headline approved by Dr. Schutza 2026-11-12. Same span structure/classes as control; the
// subhead is control's (Matt 2026-11-23).
const COLD_START_B: HeroCopy = {
  headline: (
    <>
      <span className="block text-slate-900">Get Back to Walking Without Thinking About Your Heel.</span>
      <span className={CS_LINE2}>Follow a Daily Plan That Adjusts to Your Foot.</span>
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
