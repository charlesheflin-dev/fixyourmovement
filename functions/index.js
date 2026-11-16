// functions/index.js — "/" only (SPEC-ai-discoverability-fixes item 7).
// Serves the build-time prerendered homepage (dist/home.html, written by scripts/prerender.mjs)
// so the first HTML response carries the homepage's real text. dist/index.html stays the plain
// SPA shell because it is also the fallback body for every other route.
// Fail-open: anything other than a 200/304 HTML answer falls back to the normal shell.
export async function onRequest(context) {
  try {
    const { request, env } = context;
    if (request.method === "GET" || request.method === "HEAD") {
      const res = await env.ASSETS.fetch(new Request(new URL("/home", request.url), request));
      const contentType = res.headers.get("content-type") || "";
      if (res.status === 304 || (res.status === 200 && contentType.includes("text/html"))) return res;
    }
  } catch {
    /* fall through to the shell */
  }
  return context.next();
}
