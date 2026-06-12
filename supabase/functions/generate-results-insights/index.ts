import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.27.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const {
      daysLogged,
      startingPain,
      latestPain,
      painDrop,
      trialSessionsCompleted,
      totalReps,
      currentStreak,
      currentPhase,
      currentWeek,
      painTimeline,
    } = body;

    // Compute capacity trend
    const capacityValues = (painTimeline ?? [])
      .map((p: any) => p.capacity)
      .filter((v: any) => v !== null && v !== undefined) as number[];

    const uniqueCapacity = new Set(capacityValues);
    const isCapacityFlat = uniqueCapacity.size <= 2;

    let capacityTrend = "unavailable";
    if (!isCapacityFlat && capacityValues.length >= 2) {
      const first = capacityValues.slice(0, 3).reduce((a: number, b: number) => a + b, 0) / Math.min(3, capacityValues.length);
      const last = capacityValues.slice(-3).reduce((a: number, b: number) => a + b, 0) / Math.min(3, capacityValues.length);
      capacityTrend = last > first + 0.5 ? "improving" : last < first - 0.5 ? "declining" : "stable";
    }

    const phaseLabel = currentPhase === -1 ? "Calm Mode" : `Phase ${currentPhase}`;
    const painDirection = painDrop !== null && painDrop > 0 ? "down" : painDrop !== null && painDrop < 0 ? "up" : "flat";

    const client = new Anthropic({
      apiKey: Deno.env.get("ANTHROPIC_API_KEY") ?? "",
    });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `You are writing short, honest, encouraging copy for a foot recovery app results page. The user has completed their trial period. Write copy that reflects their actual data — do not exaggerate, do not mention "Recovery Week" (it doesn't exist in the app), and do not use generic platitudes.

User data:
- Days logged: ${daysLogged}
- Starting pain: ${startingPain ?? "unknown"}/10
- Latest pain: ${latestPain ?? "unknown"}/10
- Pain change: ${painDrop !== null ? (painDrop > 0 ? `down ${painDrop} points` : painDrop < 0 ? `up ${Math.abs(painDrop)} points` : "unchanged") : "unknown"}
- Sessions completed: ${trialSessionsCompleted}
- Total exercise reps: ${totalReps > 0 ? totalReps : "not tracked"}
- Current streak: ${currentStreak} days
- Current phase: ${phaseLabel}, Week ${currentWeek}
- Capacity trend: ${capacityTrend}
- Pain direction: ${painDirection}

Write copy for exactly these 4 fields. Return ONLY valid JSON, no markdown, no explanation:

{
  "heroSubhead": "One sentence (max 20 words) summarizing what they actually accomplished. If pain went up, focus on consistency and capacity instead. Never mention Recovery Week.",
  "trendInsight": "Two sentences max. If pain dropped, celebrate it with the specific numbers. If pain went up but capacity improved, lead with capacity. If both went up, focus on the consistency of showing up and what that builds over time. Be specific to their data.",
  "accomplishmentsCopy": "One sentence (max 15 words) framing their consistency as the most important thing they built.",
  "finalCtoCopy": ["Line 1: what they completed (specific)", "Line 2: what they established", "Line 3: what they built", "Line 4: where they are headed"]
}`,
        },
      ],
    });

    const raw =