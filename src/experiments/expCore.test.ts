// Tests for the edge middleware's pure helpers. functions/ is outside vitest's include
// pattern, so this test lives under src/ and imports by relative path (vitest config
// unchanged).
import { describe, it, expect } from "vitest";
import {
  isBot,
  cookieName,
  parseCookie,
  isValidVariant,
  isValidConfig,
  pickVariant,
  findRunningExperiment,
  injectionScript,
  setCookieHeader,
} from "../../functions/_lib/expCore.js";
import { EXPERIMENTS_BY_PATH, EXPERIMENT_PREFIXES } from "../../functions/_data/experiments.js";

describe("registry (functions/_data/experiments.js) — both experiments RUNNING", () => {
  it.each([
    ["/lp/download", "dl-hero-01"],
    ["/lp/take-assessment", "dl-hero-01"],
    ["/lp/newsletter", "dl-hero-01"],
    ["/start/x", "dl-hero-01"],
    ["/start/frustrated", "dl-hero-01"],
    ["/lp/cold-start", "cs-hero-01"],
  ])("real registry: %s → running experiment %s", (path, id) => {
    const e = findRunningExperiment(path, EXPERIMENTS_BY_PATH, EXPERIMENT_PREFIXES);
    expect(e).not.toBeNull();
    expect(e!.experiment).toBe(id);
  });

  it("every entry is running and structurally valid", () => {
    const entries = [...Object.values(EXPERIMENTS_BY_PATH), ...EXPERIMENT_PREFIXES.map((p) => p[1])];
    for (const e of entries) {
      expect(e.status).toBe("running");
      expect(isValidConfig(e)).toBe(true);
    }
  });

  it("aliases map to the download experiment; cold-start to its own", () => {
    expect(EXPERIMENTS_BY_PATH["/lp/download"].experiment).toBe("dl-hero-01");
    expect(EXPERIMENTS_BY_PATH["/lp/take-assessment"]).toBe(EXPERIMENTS_BY_PATH["/lp/download"]);
    expect(EXPERIMENTS_BY_PATH["/lp/newsletter"]).toBe(EXPERIMENTS_BY_PATH["/lp/download"]);
    expect(EXPERIMENT_PREFIXES[0][1]).toBe(EXPERIMENTS_BY_PATH["/lp/download"]);
    expect(EXPERIMENTS_BY_PATH["/lp/cold-start"].experiment).toBe("cs-hero-01");
  });
});

describe("findRunningExperiment()", () => {
  const DL = { experiment: "dl-hero-01", status: "running", variants: ["control", "b"], weights: [50, 50] };
  const CS = { experiment: "cs-hero-01", status: "off", variants: ["control", "b"], weights: [50, 50] };
  const byPath = { "/lp/download": DL, "/lp/take-assessment": DL, "/lp/cold-start": CS };
  const prefixes = [["/start/", DL]];

  it("returns a running entry by exact path and by prefix", () => {
    expect(findRunningExperiment("/lp/download", byPath, prefixes)).toBe(DL);
    expect(findRunningExperiment("/lp/take-assessment", byPath, prefixes)).toBe(DL);
    expect(findRunningExperiment("/start/chronic", byPath, prefixes)).toBe(DL);
  });

  it("returns null for off entries and unrelated paths", () => {
    expect(findRunningExperiment("/lp/cold-start", byPath, prefixes)).toBeNull();
    expect(findRunningExperiment("/", byPath, prefixes)).toBeNull();
    expect(findRunningExperiment("/lp/download/extra", byPath, prefixes)).toBeNull();
    expect(findRunningExperiment("/start", byPath, prefixes)).toBeNull();
    expect(findRunningExperiment("/toString", byPath, prefixes)).toBeNull();
  });
});

describe("isBot()", () => {
  it.each([
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Facebot",
    "WhatsApp/2.23.20.0",
    "TelegramBot (like TwitterBot)",
    "Mozilla/5.0 (compatible; Discordbot/2.0)",
    "LinkedInBot/1.0",
    "Mozilla/5.0 HeadlessChrome/120.0",
    "Slurp",
    "Embedly",
  ])("bot: %s", (ua) => expect(isBot(ua)).toBe(true));

  it.each([
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 300.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "",
  ])("human: %s", (ua) => expect(isBot(ua)).toBe(false));

  it("tolerates a non-string UA", () => expect(isBot(undefined)).toBe(false));
});

describe("cookie helpers", () => {
  it("names one cookie per experiment id", () => {
    expect(cookieName("dl-hero-01")).toBe("fcs_exp_dl-hero-01");
  });

  it("parses the right cookie out of a header", () => {
    const h = "fcs_anon=abc; fcs_exp_dl-hero-01=b; fcs_exp_cs-hero-01=control";
    expect(parseCookie(h, "fcs_exp_dl-hero-01")).toBe("b");
    expect(parseCookie(h, "fcs_exp_cs-hero-01")).toBe("control");
    expect(parseCookie(h, "fcs_exp_other")).toBeNull();
    expect(parseCookie(null, "x")).toBeNull();
    expect(parseCookie("", "x")).toBeNull();
    expect(parseCookie("x=%E0%A4%A", "x")).toBe("%E0%A4%A");
  });

  it("only accepts a registry variant (cookie is untrusted)", () => {
    const variants = ["control", "b"];
    expect(isValidVariant("b", variants)).toBe(true);
    expect(isValidVariant("control", variants)).toBe(true);
    expect(isValidVariant("c", variants)).toBe(false);
    expect(isValidVariant("B", variants)).toBe(false);
    expect(isValidVariant("<script>", variants)).toBe(false);
    expect(isValidVariant(null, variants)).toBe(false);
  });

  it("builds the Set-Cookie value per spec (90 days, Lax, Secure)", () => {
    expect(setCookieHeader("dl-hero-01", "b")).toBe(
      "fcs_exp_dl-hero-01=b; Path=/; Max-Age=7776000; SameSite=Lax; Secure",
    );
  });
});

describe("isValidConfig()", () => {
  const ok = { experiment: "dl-hero-01", status: "running", variants: ["control", "b"], weights: [50, 50] };
  it("accepts a well-formed entry", () => expect(isValidConfig(ok)).toBe(true));
  it.each([
    ["bad id", { ...ok, experiment: "DL hero" }],
    ["bad variant", { ...ok, variants: ["control", "<b>"] }],
    ["one variant", { ...ok, variants: ["control"], weights: [100] }],
    ["weight mismatch", { ...ok, weights: [50] }],
    ["negative weight", { ...ok, weights: [-1, 50] }],
    ["zero total", { ...ok, weights: [0, 0] }],
    ["null", null],
  ])("rejects %s", (_l, cfg) => expect(isValidConfig(cfg)).toBe(false));
});

describe("pickVariant()", () => {
  const v = ["control", "b"];
  it("splits 50/50 at the midpoint of the uint32 range", () => {
    expect(pickVariant(v, [50, 50], 0)).toBe("control");
    expect(pickVariant(v, [50, 50], 2 ** 31 - 1)).toBe("control");
    expect(pickVariant(v, [50, 50], 2 ** 31)).toBe("b");
    expect(pickVariant(v, [50, 50], 2 ** 32 - 1)).toBe("b");
  });

  it("honours weights", () => {
    expect(pickVariant(v, [100, 0], 2 ** 32 - 1)).toBe("control");
    expect(pickVariant(v, [0, 100], 0)).toBe("b");
  });

  it("is roughly balanced over a uniform sweep", () => {
    let b = 0;
    const N = 10000;
    for (let i = 0; i < N; i++) if (pickVariant(v, [50, 50], Math.floor((i / N) * 2 ** 32)) === "b") b++;
    expect(b).toBe(N / 2);
  });
});

describe("injectionScript()", () => {
  it("emits the exact non-ld+json script tag", () => {
    expect(injectionScript("dl-hero-01", "b")).toBe(
      '<script id="fcs-exp">window.__FCS_EXP__={"e":"dl-hero-01","v":"b"}</script>',
    );
  });
});
