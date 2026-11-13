// Two-tier red-flag classifier for the public Ask Dr. Jonathan assistant (Dr. Schutza Q3 = A,
// 2026-11-13). The edge module has no Deno imports, so it runs under vitest directly.
import { describe, it, expect } from "vitest";
import {
  classifyRedFlag,
  RED_FLAG_HANDOFF_REPLY,
  RED_FLAG_URGENT_REPLY,
  RED_FLAG_URGENT_PAGE_PATH,
  RED_FLAG_HANDOFF_PAGE_PATH,
} from "../../supabase/functions/ask-dr-jonathan/redFlags.ts";

describe("classifyRedFlag", () => {
  it.each([
    ["number 5", null],
    ["is this a popular program?", null],
    ["I have a faint ache in my heel", null],
    ["", null],
    ["I get chest pain when I walk", "urgent"],
    ["my foot turned blue", "urgent"],
    ["I can’t breathe well", "urgent"],
    ["I have a burning heel", "handoff"],
    ["numbness in my toes", "handoff"],
    ["My heel is swollen", "handoff"],
  ])("%j -> %s", (text, tier) => {
    expect(classifyRedFlag(text)).toBe(tier);
  });

  it("checks urgent before handoff", () => {
    expect(classifyRedFlag("swollen foot and chest pain")).toBe("urgent");
  });
});

describe("red-flag replies", () => {
  it("calm hand-off has no emergency line", () => {
    expect(RED_FLAG_HANDOFF_REPLY).toBe(
      "Thanks for telling me. That's worth getting checked in person before starting a program.",
    );
    expect(RED_FLAG_HANDOFF_REPLY).not.toMatch(/emergency/i);
  });

  it("urgent reply carries the emergency line with the cold/blue clause", () => {
    expect(RED_FLAG_URGENT_REPLY).toContain("call your local emergency number now.");
    expect(RED_FLAG_URGENT_REPLY).toContain("your foot or leg has turned cold or blue");
  });

  it("keeps the historical urgent sentinel and adds a distinct handoff one", () => {
    expect(RED_FLAG_URGENT_PAGE_PATH).toBe("ask-dr-jonathan-redflag");
    expect(RED_FLAG_HANDOFF_PAGE_PATH).toBe("ask-dr-jonathan-handoff");
  });
});
