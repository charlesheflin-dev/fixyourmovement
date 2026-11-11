import { EXPERIMENTS_BY_PATH, EXPERIMENT_PREFIXES } from "./_data/experiments.js"
import { findRunningExperiment } from "./_lib/expCore.js"
import { handleExperiment } from "./_lib/experiments.js"

export async function onRequest(context) {

const request = context.request
const url = new URL(request.url)
const ua = request.headers.get("user-agent") || ""

/*
REMOVE TRAILING SLASH

*/

// Skip trailing slash removal for bonus subdirectory pages
// (Cloudflare Pages requires trailing slash to serve directory index.html)
const isSubdirPage = url.pathname.startsWith("/bonuses/")

if (!isSubdirPage && url.pathname.length > 1 && url.pathname.endsWith("/")) {
  url.pathname = url.pathname.slice(0, -1)
  return Response.redirect(url.toString(), 301)
}

/*
BLOCK OBVIOUS BAD SEO BOTS

*/

const blockedBots = [
"AhrefsBot",
"MJ12bot",
"DotBot",
"SemrushBot",
"BLEXBot"
]

for (const bot of blockedBots) {
if (ua.includes(bot)) {
return new Response("Forbidden", { status: 403 })
}
}

/*
LOG AI CRAWLERS

*/

const aiBots = [
"GPTBot",
"ChatGPT-User",
"ClaudeBot",
"anthropic-ai",
"PerplexityBot",
"Google-Extended"
]

for (const bot of aiBots) {
if (ua.includes(bot)) {
console.log("AI crawler detected:", bot, url.hostname, url.pathname)
}
}

/*
LANDING-PAGE A/B EXPERIMENTS (spec SPEC-lp-ab-testing.md §3 B2 W3)
Only an exact registry path (or /start/* prefix) whose entry is status "running" is
handed to the assignment helper; everything else falls through exactly as before.
*/

const experiment = findRunningExperiment(url.pathname, EXPERIMENTS_BY_PATH, EXPERIMENT_PREFIXES)
if (experiment) {
return handleExperiment(context, experiment)
}

return context.next()

}
