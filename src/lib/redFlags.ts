// Public red-flag lists for /when-to-get-seen-in-person (Dr. Schutza Q14 = yes, 2026-11-13:
// publish the lists word for word).
//
// KEEP IN SYNC with the APP repo's src/constants/redFlags.ts (foot-capacity-tracker-app), which
// renders Playbook §6 "When to get seen in person" from the same wording
// (context/library/playbook-draft-2026-10-27.md:147-167). The two repos cannot share a module,
// so this is a governed copy: if §6 changes in the app, change it here too. Do NOT reword.
// src/lib/redFlags.test.ts pins every string.

export const RED_FLAG_SECTION_HEADING = "When to get seen in person";

export const RED_FLAG_INTRO =
  "This program is for activity-related foot pain. If your symptoms stop behaving like that, pause the program and get checked.";

export const RED_FLAG_URGENT_HEADING = "Stop and get urgent care if you have";
export const RED_FLAG_CONTACT_SOON_HEADING = "Contact your doctor soon if you have";

export const RED_FLAG_URGENT_CARE: readonly string[] = [
  "Chest pain, shortness of breath or fainting",
  "One leg much more swollen, red or warm than the other",
  "A foot or leg that turns pale, blue, cool or numb",
  "Sudden foot drop, or you can't control the foot",
  "A pop or crack, then severe pain, and you can't put weight on it",
  "Pain far worse than expected, with extreme swelling",
  "Signs of infection: fever, red streaks, pus or a foul smell",
];

export const RED_FLAG_CONTACT_SOON: readonly string[] = [
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
];

// Dr-J A-1 emergency line (approved 2026-10-28; placement under the urgent list approved
// 2026-11-13).
export const RED_FLAG_EMERGENCY_LINE =
  "If you have chest pain, trouble breathing, or you've fainted, call your local emergency number now.";
