import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

   if (!userId || !UUID_RE.test(userId)) {
     return new Response(JSON.stringify({ error: "userId is required" }), {
       status: 400,
       headers: { ...corsHeaders, "Content-Type": "application/json" },
     });
   }

   const supabase = createClient(
     Deno.env.get("SUPABASE_URL") ?? "",
     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
   );

   // Fetch profile by id only (Release 2c-A)
   const { data: profile, error: profileError } = await supabase
     .from("profiles")
     .select("id, current_phase, current_week, start_date, starting_pain_score, trial_started_at, current_streak")
     .eq("id", userId)
     .single();

   if (profileError || !profile) {
     return new Response(JSON.stringify({ error: "User not found" }), {
       status: 404,
       headers: { ...corsHeaders, "Content-Type": "application/json" },
     });
   }

    // Fetch in-app FAAM scores (faam_scores, keyed by user_id): onboarding
    // baseline + the Phase-1 Promotion milestone (phase2_start). The results
    // page shows a measured before/after. One row per type per user in practice;
    // order newest-first and pick one defensively. adl_score is numeric —
    // coerce with Number() so the client comparison is numeric, not string.
    let faamBaseline: number | null = null;
    let faamPhase2Start: number | null = null;
    const { data: faamRows } = await supabase
      .from("faam_scores")
      .select("type, adl_score, completed_at")
      .eq("user_id", profile.id)
      .in("type", ["baseline", "phase2_start"])
      .order("completed_at", { ascending: false });
    if (faamRows && faamRows.length > 0) {
      const baselineRow = faamRows.find((r) => r.type === "baseline");
      const phase2Row = faamRows.find((r) => r.type === "phase2_start");
      faamBaseline = baselineRow?.adl_score != null ? Number(baselineRow.adl_score) : null;
      faamPhase2Start = phase2Row?.adl_score != null ? Number(phase2Row.adl_score) : null;
    }

    // Fetch daily logs — last 30 submitted logs
    const { data: logs } = await supabase
      .from("daily_logs")
      .select("log_date, pain_score, morning_pain_score, capacity_score, phase")
      .eq("user_id", profile.id)
      .not("submitted_at", "is", null)
      .order("log_date", { ascending: true })
      .limit(30);

    // Fetch trial-window logs with exercise_volume for rep counting
    const trialStartedAt = profile.trial_started_at ?? profile.start_date ?? null;
    let trialLogs: any[] = [];
    if (trialStartedAt) {
      const { data: tLogs } = await supabase
        .from("daily_logs")
        .select("log_date, exercise_volume, calf_raise_count")
        .eq("user_id", profile.id)
        .not("submitted_at", "is", null)
        .gte("log_date", trialStartedAt.slice(0, 10))
        .order("log_date", { ascending: true });
      trialLogs = tLogs ?? [];
    }

    // Compute trial sessions completed
    const trialSessionsCompleted = trialLogs.length;

    // Compute total reps from exercise_volume across trial logs
    let totalReps = 0;
    for (const log of trialLogs) {
      const vol = log.exercise_volume as Record<string, any> | null;
      if (vol && typeof vol === "object") {
        for (const entry of Object.values(vol)) {
          if (entry.is_extra) continue;
          const sets = entry.actual_sets ?? entry.prescribed_sets ?? 0;
          const reps = entry.actual_reps ?? entry.prescribed_reps ?? 0;
          if (entry.unit !== "seconds") {
            totalReps += sets * reps;
          }
        }
      }
      if (log.calf_raise_count && log.calf_raise_count > 0) {
        totalReps += log.calf_raise_count;
      }
    }

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
      currentPhase: profile.current_phase,
      currentWeek: profile.current_week,
      daysLogged: submittedLogs.length,
      startingPain,
      latestPain,
      painDrop,
      faamBaseline,
      faamPhase2Start,
      currentStreak: profile.current_streak ?? 0,
      trialSessionsCompleted,
      totalReps,
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