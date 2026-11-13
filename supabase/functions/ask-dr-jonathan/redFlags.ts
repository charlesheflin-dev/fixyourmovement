// ASK-DR-JONATHAN (website) — redFlags.ts — deterministic red-flag hard stop for the public
// pre-sale assistant.
//
// Dr. Schutza decision 2026-11-13 (Q3 = A): concerning symptoms get a CALM in-person hand-off;
// the emergency line is kept ONLY for truly urgent words (chest pain, trouble breathing,
// fainting, a cold or blue foot or leg). Two tiers, two fixed replies.
//
// On any hit the model is NEVER called. Pre-sale / anonymous context => NO clinician alert and
// NO messages/inbox (there is no patient relationship); the hit MAY be logged to chat_questions,
// flagged by tier via the page_path sentinels below.
//
// Matching is a deterministic WHOLE-WORD / WHOLE-PHRASE scan (NOT an LLM classifier), so "numb"
// no longer matches "number", "pop" no longer matches "popular", etc. Still deliberately broad:
// a false positive only shows a calm "get it checked in person" message.
//
// This is the ONLY copy of this logic. The app repo's src/constants/redFlags.ts holds the §6
// DISPLAY lists only and is not mirrored here (the app's coach-outreach copy was removed).

// Calm hand-off (Dr. Schutza's approved example wording, 2026-11-13).
export const RED_FLAG_HANDOFF_REPLY =
  "Thanks for telling me. That's worth getting checked in person before starting a program.";

// Urgent tier: the hand-off plus the Dr-J A-1 emergency line, with the cold/blue clause
// (approved by Dr. Schutza 2026-11-13).
export const RED_FLAG_URGENT_REPLY =
  "That's worth getting checked in person before starting a program. If you have chest pain, trouble breathing, or you've fainted, or your foot or leg has turned cold or blue, call your local emergency number now.";

// page_path sentinels used to FLAG website red-flag rows in chat_questions (no schema change).
// The urgent sentinel keeps the historical value so existing history continues; note that any
// saved query counting it now counts URGENT hits only.
export const RED_FLAG_URGENT_PAGE_PATH = "ask-dr-jonathan-redflag";
export const RED_FLAG_HANDOFF_PAGE_PATH = "ask-dr-jonathan-handoff";

// Urgent phrases. Bare "faint" is deliberately excluded ("a faint ache" is not an emergency),
// as is plural "cold feet" (an everyday complaint and an idiom).
export const RED_FLAG_URGENT_PHRASES: readonly string[] = [
  "chest pain", "chest pains",
  "short of breath", "shortness of breath",
  "can't breathe", "cant breathe", "cannot breathe",
  "trouble breathing", "difficulty breathing", "hard to breathe",
  "fainted", "fainting", "feel faint", "felt faint",
  "passed out", "pass out", "blacked out",
  "cold foot", "foot is cold", "foot feels cold", "foot went cold", "foot turned cold",
  "blue foot", "foot is blue", "foot turned blue", "foot is turning blue",
  "toes are blue", "toes turned blue", "turning blue", "turned blue",
];

// Calm hand-off phrases (derived from §6). NOT visitor-facing copy — a detection heuristic.
export const RED_FLAG_HANDOFF_PHRASES: readonly string[] = [
  "swollen", "swelling", "pale", "cool foot", "numb",
  "foot drop", "can't control", "cant control", "can't move my foot",
  "pop", "popped", "crack", "snap",
  "can't put weight", "cant put weight", "can't bear weight", "cant bear weight",
  "can't stand on it", "can't walk on it",
  "infection", "infected", "pus", "fever", "red streak", "foul smell", "foul odor",
  "night pain", "wakes me", "waking me", "wake me up", "wakes me up",
  "weight loss", "losing weight", "lost weight",
  "pain at rest", "constant pain", "rest pain",
  "numbness", "tingling", "burning", "shooting pain", "pins and needles",
  "wound", "ulcer", "not healing", "won't heal", "wont heal", "sore that won't",
  "diabetes", "diabetic", "circulation", "neuropathy", "recent surgery",
  "cancer", "tumor", "tumour", "both feet", "both my feet", "both heels",
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildMatcher(phrases: readonly string[]): RegExp {
  return new RegExp("\\b(?:" + phrases.map(escapeRegExp).join("|") + ")\\b");
}

const URGENT_RE = buildMatcher(RED_FLAG_URGENT_PHRASES);
const HANDOFF_RE = buildMatcher(RED_FLAG_HANDOFF_PHRASES);

export type RedFlagTier = "urgent" | "handoff";

// Classify the visitor's free text. Urgent is checked first. null = no red flag.
export function classifyRedFlag(text: string): RedFlagTier | null {
  if (!text) return null;
  const t = text.toLowerCase().replace(/[‘’]/g, "'");
  if (URGENT_RE.test(t)) return "urgent";
  if (HANDOFF_RE.test(t)) return "handoff";
  return null;
}
