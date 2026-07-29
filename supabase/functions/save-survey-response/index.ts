import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://fixyourmovement.com",
  "https://preview.fixyourmovement.com",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Q1 is the router: 8-10 high, 5-7 medium, 1-4 low. Derived server-side so thresholds can
// change without a client redeploy. Q2 never moves the branch (it personalizes copy only).
function branchForScore(score: number): "high" | "medium" | "low" {
  if (score >= 8) return "high";
  if (score >= 5) return "medium";
  return "low";
}

function normEmail(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim().toLowerCase() : null;
}

function toIntOrNull(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? Math.trunc(v) : null;
}

Deno.serve(async (req) => {
  const cors = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const event = body.event === "started" ? "started" : "completed";

    const userId = typeof body.userId === "string" && body.userId ? body.userId : null;
    const email = normEmail(body.email);

    // Every event must be attributable to someone.
    if (!userId && !email) {
      return new Response(JSON.stringify({ error: "Missing identifier (userId or email)" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // ── survey_started: funnel event only, no answers yet ──
    if (event === "started") {
      const { error } = await supabase.from("survey_events").insert({
        user_id: userId,
        email,
        event_type: "survey_started",
      });
      if (error) {
        console.error("survey_started insert error:", error);
        return new Response(JSON.stringify({ error: "Failed to log start" }), {
          status: 500,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // ── survey_completed: validate answers, derive branch, write response + event ──
    const q1 = toIntOrNull(body.q1Score);
    const q2 = typeof body.q2Value === "string" ? body.q2Value : "";

    if (q1 === null || q1 < 1 || q1 > 10) {
      return new Response(JSON.stringify({ error: "Invalid q1Score (must be 1-10)" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    if (!q2) {
      return new Response(JSON.stringify({ error: "Missing q2Value" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const branch = branchForScore(q1);
    const q3 = typeof body.q3Value === "string" && body.q3Value ? body.q3Value : null;
    const completedAt =
      typeof body.completedAt === "string" && body.completedAt ? body.completedAt : null;

    const responseRow: Record<string, unknown> = {
      user_id: userId,
      email,
      q1_score: q1,
      q2_value: q2,
      q3_value: q3,
      branch,
      days_completed: toIntOrNull(body.daysCompleted),
      starting_pain: toIntOrNull(body.startingPain),
      latest_pain: toIntOrNull(body.latestPain),
      pain_drop: toIntOrNull(body.painDrop),
      recovery_sessions: toIntOrNull(body.recoverySessions),
    };
    if (completedAt) responseRow.completed_at = completedAt;

    // Data of record first — fatal if this fails.
    const { error: respErr } = await supabase.from("survey_responses").insert(responseRow);
    if (respErr) {
      console.error("survey_responses insert error:", respErr);
      return new Response(JSON.stringify({ error: "Failed to save response" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Funnel event — best-effort; a failure here must NOT fail the saved response.
    const { error: evtErr } = await supabase.from("survey_events").insert({
      user_id: userId,
      email,
      event_type: "survey_completed",
      branch,
    });
    if (evtErr) {
      console.error("survey_completed event insert error (non-fatal):", evtErr);
    }

    return new Response(JSON.stringify({ ok: true, branch }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
