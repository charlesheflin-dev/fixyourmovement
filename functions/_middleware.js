export async function onRequest(context) {

const request = context.request
const url = new URL(request.url)
const ua = request.headers.get("user-agent") || ""

const canonicalHost = "fixyourmovement.com"

/*
FORCE CANONICAL DOMAIN

*/

if (url.hostname !== canonicalHost && url.hostname !== "localhost") {
url.hostname = canonicalHost
return Response.redirect(url.toString(), 301)
}

/*
REMOVE TRAILING SLASH (except root)

*/

if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
url.pathname = url.pathname.slice(0, -1)
return Response.redirect(url.toString(), 301)
}

/*
BLOCK OBVIOUS BAD BOTS

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
LOG LLM CRAWLERS

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
console.log("AI crawler detected:", bot, url.pathname)
}
}

/*
CONTINUE NORMAL REQUEST

*/

return context.next()

}
