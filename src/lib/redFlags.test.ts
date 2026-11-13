// Pins the public red-flag lists to Dr. Schutza's Playbook §6 wording. KEEP IN SYNC with the
// APP repo's src/constants/redFlags.ts (another repo, not testable from here) and
// context/library/playbook-draft-2026-10-27.md:147-167.
import { describe, it, expect } from "vitest";
import {
  RED_FLAG_CONTACT_SOON,
  RED_FLAG_CONTACT_SOON_HEADING,
  RED_FLAG_EMERGENCY_LINE,
  RED_FLAG_INTRO,
  RED_FLAG_SECTION_HEADING,
  RED_FLAG_URGENT_CARE,
  RED_FLAG_URGENT_HEADING,
} from "./redFlags";

describe("public red-flag lists (verbatim §6)", () => {
  it("headings and intro", () => {
    expect(RED_FLAG_SECTION_HEADING).toBe("When to get seen in person");
    expect(RED_FLAG_INTRO).toBe(
      "This program is for activity-related foot pain. If your symptoms stop behaving like that, pause the program and get checked.",
    );
    expect(RED_FLAG_URGENT_HEADING).toBe("Stop and get urgent care if you have");
    expect(RED_FLAG_CONTACT_SOON_HEADING).toBe("Contact your doctor soon if you have");
  });

  it("urgent-care list (7)", () => {
    expect(RED_FLAG_URGENT_CARE).toEqual([
      "Chest pain, shortness of breath or fainting",
      "One leg much more swollen, red or warm than the other",
      "A foot or leg that turns pale, blue, cool or numb",
      "Sudden foot drop, or you can't control the foot",
      "A pop or crack, then severe pain, and you can't put weight on it",
      "Pain far worse than expected, with extreme swelling",
      "Signs of infection: fever, red streaks, pus or a foul smell",
    ]);
  });

  it("contact-soon list (10)", () => {
    expect(RED_FLAG_CONTACT_SOON).toEqual([
      "Night pain that keeps waking you up",
      "Unexplained fever or weight loss",
      "Pain getting steadily worse for no clear reason",
      "Constant pain at rest, not tied to activity",
      "Numbness, tingling, burning or shooting pain that doesn't go away",
      "A wound or sore that isn't healing",
      "Diabetes, poor circulation, neuropathy or recent surgery",
      "A history of cancer",
      "Severe symptoms in both feet",
      "Symptoms that don't fit typical plantar fasciitis",
    ]);
  });

  it("A-1 emergency line", () => {
    expect(RED_FLAG_EMERGENCY_LINE).toBe(
      "If you have chest pain, trouble breathing, or you've fainted, call your local emergency number now.",
    );
  });
});
