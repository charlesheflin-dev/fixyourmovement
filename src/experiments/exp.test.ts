import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getExperiment,
  variantFor,
  experimentMeta,
  withExperimentMeta,
  __resetExperimentCacheForTests,
} from "./exp";

function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

describe("exp.ts — getExperiment()", () => {
  beforeEach(() => {
    delete window.__FCS_EXP__;
    __resetExperimentCacheForTests();
  });
  afterEach(() => {
    delete window.__FCS_EXP__;
    __resetExperimentCacheForTests();
    clearCookie("fcs_last_source");
  });

  it("returns null when nothing was injected (experiments off)", () => {
    expect(getExperiment()).toBeNull();
    expect(variantFor("dl-hero-01")).toBeNull();
    expect(experimentMeta()).toEqual({});
  });

  it.each([
    ["a string", "dl-hero-01"],
    ["null", null],
    ["missing v", { e: "dl-hero-01" }],
    ["non-string v", { e: "dl-hero-01", v: 1 }],
    ["uppercase", { e: "DL-HERO-01", v: "b" }],
    ["markup", { e: "dl-hero-01", v: "<script>" }],
    ["too long", { e: "a".repeat(41), v: "b" }],
    ["empty", { e: "", v: "b" }],
  ])("rejects an invalid injected value (%s)", (_label, value) => {
    window.__FCS_EXP__ = value;
    expect(getExperiment()).toBeNull();
    expect(experimentMeta()).toEqual({});
  });

  it("accepts a valid injected value and reads it once", () => {
    window.__FCS_EXP__ = { e: "dl-hero-01", v: "b" };
    expect(getExperiment()).toEqual({ e: "dl-hero-01", v: "b" });
    // Cached: a later change to the global is ignored for this page load.
    window.__FCS_EXP__ = { e: "cs-hero-01", v: "control" };
    expect(getExperiment()).toEqual({ e: "dl-hero-01", v: "b" });
  });

  it("variantFor() only answers for the matching experiment id", () => {
    window.__FCS_EXP__ = { e: "dl-hero-01", v: "b" };
    expect(variantFor("dl-hero-01")).toBe("b");
    expect(variantFor("cs-hero-01")).toBeNull();
  });

  it("experimentMeta() carries exp/v/src, src from fcs_last_source or (none)", () => {
    window.__FCS_EXP__ = { e: "cs-hero-01", v: "control" };
    expect(experimentMeta()).toEqual({ exp: "cs-hero-01", v: "control", src: "(none)" });
    document.cookie = "fcs_last_source=ig_reel_42; path=/";
    expect(experimentMeta()).toEqual({ exp: "cs-hero-01", v: "control", src: "ig_reel_42" });
    document.cookie = "fcs_last_source=" + encodeURIComponent("bad value!") + "; path=/";
    expect(experimentMeta().src).toBe("(none)");
  });
});

describe("exp.ts — withExperimentMeta() (logFunnelEvent body)", () => {
  const base = { anon_id: "anon-1", funnel: "download_cold", event: "account_created" };

  beforeEach(() => {
    delete window.__FCS_EXP__;
    __resetExperimentCacheForTests();
  });
  afterEach(() => {
    delete window.__FCS_EXP__;
    __resetExperimentCacheForTests();
  });

  it("experiments OFF: body is byte-identical to the pre-change payload", () => {
    // DownloadApp-style calls (no extra.meta) — no `meta` key is added.
    expect(JSON.stringify(withExperimentMeta({ anon_id: "a", funnel: "download", event: "landing_reached" })))
      .toBe(JSON.stringify({ anon_id: "a", funnel: "download", event: "landing_reached" }));
    const acct = { email: "x@example.com" };
    expect(JSON.stringify(withExperimentMeta({ anon_id: "a", funnel: "download", event: "account_created" }, acct)))
      .toBe(JSON.stringify({ anon_id: "a", funnel: "download", event: "account_created", ...acct }));
    // ColdStart-style calls with form_position meta — unchanged.
    const extra = { email: "x@example.com", meta: { form_position: "form_top" } };
    expect(JSON.stringify(withExperimentMeta(base, extra))).toBe(JSON.stringify({ ...base, ...extra }));
    // provision_failed (no extra) — unchanged.
    expect(JSON.stringify(withExperimentMeta({ ...base, event: "provision_failed" })))
      .toBe(JSON.stringify({ ...base, event: "provision_failed" }));
  });

  it("experiment RUNNING: merges exp meta with form_position and keeps email top-level", () => {
    window.__FCS_EXP__ = { e: "cs-hero-01", v: "b" };
    const body = withExperimentMeta(base, { email: "x@example.com", meta: { form_position: "form_bottom" } });
    expect(body).toEqual({
      anon_id: "anon-1",
      funnel: "download_cold",
      event: "account_created",
      email: "x@example.com",
      meta: { exp: "cs-hero-01", v: "b", src: "(none)", form_position: "form_bottom" },
    });
  });

  it("experiment RUNNING: adds meta to an event that had none", () => {
    window.__FCS_EXP__ = { e: "dl-hero-01", v: "control" };
    expect(withExperimentMeta({ anon_id: "a", funnel: "download", event: "landing_reached" })).toEqual({
      anon_id: "a",
      funnel: "download",
      event: "landing_reached",
      meta: { exp: "dl-hero-01", v: "control", src: "(none)" },
    });
  });
});
