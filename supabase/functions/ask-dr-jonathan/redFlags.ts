// ASK-DR-JONATHAN (website) — redFlags.ts — deterministic red-flag hard stop for the public
// pre-sale assistant (Dr-J go-live check #3, 2026-10-28). On a keyword hit the visitor gets the
// FIXED in-person-care reply (Dr-J A-1 VERBATIM, incl. the emergency-number line) and the model
// is NEVER called. Pre-sale / anonymous context ⇒ NO clinician alert and NO messages/inbox (there
// is no patient relationship); the hit MAY be logged to chat_questions flagged via RED_FLAG_PAGE_PATH.
//
// Matching is a deterministic keyword/phrase scan (NOT an LLM classifier), deliberately
// OVER-INCLUSIVE: a false positive only shows a "see a clinician" message (low harm); a false
// negative misses a red flag. Err toward false positives.
//
// ⚠️ GOVERNED DUPLICATE / KEEP IN SYNC with the APP repo's
// supabase/functions/coach-outreach/redFlags.ts (foot-capacity-tracker-app). RED_FLAG_REPLY is
// byte-identical to the app's, and RED_FLAG_URGENT_CARE / RED_FLAG_CONTACT_SOON / the keyword set
// mirror Dr-J's §6 wording verbatim. Edge fns across the two repos cannot share a module — if the
// §6 list, the reply, or the keyword set changes in the app, change it here too. Do NOT reword.

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

// Dr-J A-1 VERBATIM (2026-10-28 Approval Packet) — byte-identical to the app's RED_FLAG_REPLY,
// including the added emergency-number line.
export const RED_FLAG_REPLY =
  "Some of what you described isn't typical for plantar fasciitis, so the program can't guide you on it. Please pause the program and see a clinician in person to get it checked. If it's urgent, seek urgent care now. If you have chest pain, trouble breathing, or you've fainted, call your local emergency number now.";

// page_path sentinel used to FLAG a website red-flag row in chat_questions (no schema change).
// Distinct from the app's "coach-redflag-msg" so website pre-sale hits are filterable.
export const RED_FLAG_PAGE_PATH = "ask-dr-jonathan-redflag";

// Over-inclusive keyword/phrase set derived from §6. Lowercased-substring match over the
// visitor's normalized text. NOT visitor-facing copy — a detection heuristic, false-positive
// biased by design. Keep roughly in step with §6 (and the app copy) when the list changes.
const RED_FLAG_KEYWORDS: readonly string[] = [
  // Urgent tier
  "chest pain", "shortness of breath", "short of breath", "can't breathe", "cant breathe",
  "trouble breathing", "difficulty breathing", "hard to breathe",
  "faint", "fainted", "passed out", "pass out", "blacked out",
  "swollen", "swelling", "pale", "turning blue", "blue foot", "cold foot", "foot is cold",
  "cool foot", "numb",
  "foot drop", "can't control", "cant control", "can't move my foot",
  "pop", "popped", "crack", "snap",
  "can't put weight", "cant put weight", "can't bear weight", "cant bear weight",
  "can't stand on it", "can't walk on it",
  "infection", "infected", "pus", "fever", "red streak", "foul smell", "foul odor",
  // Contact-soon tier
  "night pain", "wakes me", "waking me", "wake me up", "wakes me up",
  "weight loss", "losing weight", "lost weight",
  "pain at rest", "constant pain", "rest pain",
  "numbness", "tingling", "burning", "shooting pain", "pins and needles",
  "wound", "ulcer", "not healing", "won't heal", "wont heal", "sore that won't",
  "diabetes", "diabetic", "circulation", "neuropathy", "recent surgery",
  "cancer", "tumor", "tumour", "both feet", "both my feet", "both heels",
];

// True if the visitor's free text contains any red-flag keyword/phrase. Deliberately broad.
export function scanForRedFlag(text: string): boolean {
  if (!text) return false;
  const t = text.toLowerCase().replace(/[‘’]/g, "'");
  return RED_FLAG_KEYWORDS.some((k) => t.includes(k));
}
