Run a READ-ONLY recon investigation for this question:

$ARGUMENTS

Follow RECON MODE in CLAUDE.md (read-only; verify from files not grep hits; state
only what this repo's code shows; don't decide the fix; cite file:line).

Steps:
1. Identify the files, routes, components, functions, hooks, and DB columns the
   question touches. Read the FULL relevant files, not just search matches.
2. Establish current behavior — how it actually works today — with file:line
   evidence for every claim.
3. Map the blast radius — find every caller/reference of anything a fix would
   likely touch, and read enough of each to confirm.
4. Note candidate fix approaches as OPTIONS only (do not choose or write one), and
   flag any cost / risk / UX / clinical / business tradeoff for the operator.
5. List what you could NOT verify from this repo (migration state, deploy state,
   live prod/DB behavior, the other repo) under "Needs operator confirmation."

Output the finished report as ONE fenced ```markdown block using the template
below, filled in, so the helper can copy it out whole. Do NOT save it to a file,
do NOT commit, do NOT push — print it in the chat only.

--- TEMPLATE (fill in and print) ---

# RECON — <short title>
Date: <YYYY-MM-DD> · Repo in scope: <app | website> · Run by: <name>

## Question asked
<the plain-English question, verbatim>

## Short answer
<2-4 sentences: what's true today and the crux>

## Surface (what's involved)
- Files: <path — one per line>
- Routes / components: <...>
- Functions / hooks: <...>
- DB columns / tables: <name only — DB STATE not verifiable here>

## Current behavior (OBSERVED)
<how it works today; every claim tagged file:line>

## Blast radius (callers / references a fix would touch)
<every reference, path:line; note which were read in full vs grep-only>

## Candidate approaches (OPTIONS — not a decision)
<0-3 options; for each: what it touches + main tradeoff>
Operator / Dr-S calls flagged: <cost / risk / UX / clinical / business, or "none">

## Needs operator confirmation (NOT visible from this repo)
- Migration / DB state: <...>
- Deploy state (Supabase edge fn / Cloudflare): <...>
- Live prod behavior: <...>
- Other repo / shared infra: <does this also need a recon in the other repo? which>

## Confidence & gaps
Confidence: <high / med / low>. Not checked: <...>
