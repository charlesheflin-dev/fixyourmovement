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
   const emailParam = url.searchParams.get("email");

   if (!userId && !emailParam) {
     return new Response(JSON.stringify({ error: "userId or email is required" }), {
       status: 400,
       headers: { ...corsHeaders, "Content-Type": "application/json" },
     });
   }

   const supabase = createClient(
     Deno.env.get("SUPABASE_URL") ?? "",
     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
   );

   // Fetch profile — by userId or by email
   let profile: any = null;
   let profileError: any = null;

if (userId) {
      const result = await supabase
        .from("profiles")
        .select("id, email, display_name, current_phase, current_week, start_date, starting_pain_score, token_tier, is_trial, trial_started_at, current_streak")
        .eq("id", userId)
        .single();
      profile = result.data;
      profileError = result.error;
    } else {
      const normalizedEmail = emailParam!.replace(/ /g, "+").toLowerCase();
      const result = await supabase
        .from("profiles")
        .select("id, email, display_name, current_phase, current_week, start_date, starting_pain_score, token_tier, is_trial, trial_started_at, current_streak")
        .eq("email", normalizedEmail)
        .single();
      profile = result.data;
      profileError = result.error;
    }

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

    // Fetch the latest post-trial survey branch for this user, if any.
    // The survey response may have been written keyed by user_id OR by email
    // (save-survey-response allows either), so match on both. Newest wins.
    // No survey row is the normal case (anyone reaching /results without taking
    // the survey) — leave surveyBranch null and the page keeps its default behavior.
    let surveyBranch: string | null = null;
    const { data: surveyRows } = await supabase
      .from("survey_responses")
      .select("branch, completed_at")
      .or(`user_id.eq.${profile.id},email.eq.${profile.email.toLowerCase()}`)
      .order("completed_at", { ascending: false })
      .limit(1);
    if (surveyRows && surveyRows.length > 0) {
      surveyBranch = surveyRows[0].branch ?? null;
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
      isTrial: profile.is_trial ?? false,
      trialStartedAt: profile.trial_started_at ?? null,
      currentStreak: profile.current_streak ?? 0,
      surveyBranch,
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