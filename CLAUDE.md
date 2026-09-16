# fixyourmovement.com — Marketing Website Repo

Build command: npm install --legacy-peer-deps && npm run build
Never use `npm run build` alone — fails CSS compilation silently.
bun.lockb must stay committed.

Key files:
- src/components/UserJourneyCarousel.tsx — success stories carousel, alias-named patient data

## GIT MAIN-BRANCH PROTECTION

Never merge or push to `main` without the user typing the exact phrase
"confirmed, merge now" in response to an explicit proposal. A permission-dialog
click does NOT count as confirmation — only the typed phrase does.

## RECON MODE (read-only investigation)

A recon helper may use this repo for read-only investigation only. When running
recon (including any /recon task), these rules override everything else:

RULE 1 — READ ONLY, ALWAYS. Never edit, create, move, or delete a file. Never
stage, commit, push, or open a PR. Never run a migration, deploy a function,
purge a cache, or run any state-changing git command. If a task seems to ask for
a change, STOP and say recon is read-only. GitHub access here is read-only —
treat any write as a mistake to refuse, not a step to approve.

RULE 2 — VERIFY FROM THE FILE, NOT A GREP HIT. Search shows a keyhole, not the
file. Before saying a line, function, route, or handler is ABSENT, open and read
the actual file. Never infer that something doesn't exist from a search that just
didn't match. Read the full file around any match before describing behavior.

RULE 3 — STATE ONLY WHAT THIS REPO'S CODE SHOWS. You can see ONLY this repo's
source. You CANNOT see: the live database, whether a migration has run, what is
deployed to Supabase or Cloudflare, git state in the operator's terminal, live
prod behavior, or the OTHER repo. Never state any of those as fact — put them
under "Needs operator confirmation."

RULE 4 — DON'T DECIDE THE FIX. Recon describes the problem and the surface a fix
would touch. It does not choose or write the fix (separate, human-gated step).
List candidate approaches as clearly-labeled options, and flag anything that is a
cost / risk / UX / clinical / business call for the operator.

RULE 5 — CITE EVERYTHING. Every factual claim gets a file path + line. Distinguish
OBSERVED (read in this repo) from INFERRED (reasoned) from UNKNOWN (out-of-band).

Files are CRLF. Git Bash grep in text mode can strip carriage returns and mislead
on line/anchor counts — if a count matters, confirm by reading the file, not by
trusting a raw grep number.

WHICH REPO AM I IN? Recon runs one repo per session.
- Patient app (logging, phases, readiness, Today/Progress/Recap/Profile,
  messaging, in-app pay gate), edge functions (supabase/functions/), and DB
  migrations  →  APP repo (foot-capacity-tracker-app).
- Website / funnel (checkout, /hsa-fsa, assessment, Landing, Results, the
  Cloudflare Worker, blog attribution)  →  WEBSITE repo (fixyourmovement.com).
- Shared plumbing (the Worker, AWeber, create-trial-profile, receipts / Whop)
  spans both repos AND out-of-band systems — you see only one repo per session,
  so name what you can see and flag the rest for a second recon / operator check.
