// functions/csp-report.js
// Collector for Content-Security-Policy-Report-Only violation reports (public/_headers,
// `report-uri /csp-report`). Logs a minimal record to the Pages Functions log and
// returns 204. Runs after functions/_middleware.js.
// PRIVACY: logs only the violated directive, the ORIGIN of the blocked resource (or a
// CSP keyword such as "inline"), and the PATHNAME of the page. Never the query string
// (pages like /results, /survey and /assessment-results can carry ?email=), never the
// full blocked URL, never the request IP or headers.
// Safety: any malformed or oversized body is ignored; this always returns 204.

const MAX_BODY = 8192;

function originOf(value) {
  if (typeof value !== "string" || !value) return "";
  try {
    return new URL(value).origin;
  } catch {
    // CSP keywords ("inline", "eval", "data", ...) are not URLs.
    return value.slice(0, 40);
  }
}

function pathOf(value) {
  if (typeof value !== "string" || !value) return "";
  try {
    return new URL(value).pathname.slice(0, 200);
  } catch {
    return "";
  }
}

function summarize(report) {
  if (!report || typeof report !== "object") return null;
  return {
    directive: String(report["effective-directive"] || report["violated-directive"] || report.effectiveDirective || "").slice(0, 60),
    blocked: originOf(report["blocked-uri"] || report.blockedURL),
    path: pathOf(report["document-uri"] || report.documentURL),
  };
}

export async function onRequestPost(context) {
  try {
    const text = await context.request.text();
    if (text.length > 0 && text.length <= MAX_BODY) {
      const body = JSON.parse(text);
      // report-uri format: { "csp-report": {...} }. Reporting API format: [{ body: {...} }, ...].
      const reports = Array.isArray(body)
        ? body.slice(0, 10).map((r) => r && r.body)
        : [body && body["csp-report"]];
      for (const r of reports) {
        const s = summarize(r);
        if (s) console.log("csp-report-only", JSON.stringify(s));
      }
    }
  } catch {
    // Ignore malformed reports.
  }
  return new Response(null, { status: 204 });
}
