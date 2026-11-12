// functions/_data/experiments.js
// Landing-page A/B experiment registry — ASSIGNMENT CONFIG ONLY (no copy).
// Read by functions/_middleware.js (via functions/_lib/expCore.js lookup).
// The client never imports this file; it reads only window.__FCS_EXP__.
// Spec: app repo context/library/specs/SPEC-lp-ab-testing.md §3 B2 (W1).
//
// status: "off" | "running".
//   off     => no cookie, no injection, page renders the champion, no `exp` meta.
//   running => middleware assigns a sticky variant (cookie fcs_exp_<experiment>) and
//              injects window.__FCS_EXP__ into <head>.
// `experiment` MUST equal the lp_experiments.id row in the app DB. A new test gets a
// NEW experiment id (=> new cookie name => visitors re-randomize).
// Ids and variant names must match /^[a-z0-9-]{1,40}$/ (validated before use).
const DL = { experiment: "dl-hero-01", status: "running", variants: ["control", "b"], weights: [50, 50] };
const CS = { experiment: "cs-hero-01", status: "running", variants: ["control", "b"], weights: [50, 50] };

export const EXPERIMENTS_BY_PATH = {
  "/lp/download": DL, "/lp/take-assessment": DL, "/lp/newsletter": DL,   // aliases → DL (spec §2)
  "/lp/cold-start": CS,
};

export const EXPERIMENT_PREFIXES = [["/start/", DL]];                    // /start/* → DL
