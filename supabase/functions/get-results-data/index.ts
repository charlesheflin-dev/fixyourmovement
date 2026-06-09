import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, display_name, current_phase, current_week, start_date, starting_pain_score, token_tier")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch assessment responses keyed to email
    const { data: assessment } = await supabase
      .from("assessment_responses")
      .select("archetype, faam_score, faam_band, hook_answers, created_at")
      .eq("email", profile.email.toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // Fetch daily logs — last 30 submitted logs
    const { data: logs } = await supabase
      .from("daily_logs")
      .select("log_date, pain_score, morning_pain_score, capacity_score, phase")
      .eq("user_id", userId)
      .not("submitted_at", "is", null)
      .order("log_date", { ascending: true })
      .limit(30);

    // Compute pain trend summary
    const submittedLogs = logs ?? [];
    const painScores = submittedLogs
      .map((l) => l.morning_pain_score ?? l.pain_score)
      .filter((s) => s !== null && s !== undefined) as number[];

    const startingPain = profile.starting_pain_score ?? (painScores[0] ?? null);
    const latestPain = painScores.length > 0 ? painScores[painScores.length - 1] : null;
    const painDrop = startingPain !== null && latestPain !== null
      ? Math.round((startingPain - latestPain) * 10) / 10
      : null;

    // Sanitized payload — no PII beyond what the page needs
    const payload = {
      userId: profile.id,
      displayName: profile.display_name,
      currentPhase: profile.current_phase,
      currentWeek: profile.current_week,
      daysLogged: submittedLogs.length,
      startingPain,
      latestPain,
      painDrop,
      archetype: assessment?.archetype ?? null,
      faamScore: assessment?.faam_score ?? null,
      faamBand: assessment?.faam_band ?? null,
      painTimeline: submittedLogs.map((l) => ({
        date: l.log_date,
        pain: l.morning_pain_score ?? l.pain_score,
        capacity: l.capacity_score !== null && l.capacity_score !== undefined
          ? Math.round((l.capacity_score / 10) * 10) / 10
          : null,
      })),
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});