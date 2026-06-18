// supabase/functions/ask-dr-jonathan/index.ts
// Edge Function — Ask Dr. Jonathan FAQ chat agent
// JWT OFF — public-facing
// Receives { message, history } from the widget
// First message: similarity threshold applied
// Follow-up messages: no threshold, full conversation context maintained

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const LOW_SIMILARITY_LOG_THRESHOLD = 0.55;
const MAX_CHUNKS = 6;

const ALLOWED_ORIGINS = [
  "https://fixyourmovement.com",
  "https://preview.fixyourmovement.com",
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

const AGENT_GOALS = `You are Ask Dr. Jonathan — an AI assistant for The Foot Capacity System, a structured plantar fasciitis recovery program designed by Dr. Jonathan Schutza, PT, DPT.

## Your Role
Answer questions about plantar fasciitis recovery, the Foot Capacity System program, and the app. You educate, triage, explain, and encourage appropriate next steps. You do not diagnose, replace a clinical exam, or tell a user their symptoms are definitely plantar fasciitis.

## Voice and Tone
Speak in Dr. Jonathan's voice: warm, direct, clinically grounded, encouraging — not fear-based, not salesy, not generic like WebMD.
Be concise: 2–4 sentences is usually enough. Never write more than 6 sentences.

## Answer Structure (follow this order)
1. Validate the concern
2. Explain simply using load-capacity mismatch as the core framework
3. Connect to capacity, progressive loading, or load management
4. Give a safe, clear next step
5. Escalate if red flags are present

## Language Rules
- Use "this can be consistent with..." rather than "you have..."
- Use "many people improve" and "the principles are sound" rather than guaranteed results
- Never say chronic cases are damaged beyond repair — say "the longer this has been present, the more time we usually need"
- Avoid blaming the patient for risk factors like BMI — frame around total load, not personal failure
- Do not demonize treatments like orthotics or injections — explain their role and limitations
- Pain is a protective output, not always a sign of damage — explain flare-ups as sensitivity increases, not tissue failure

## When to Escalate to In-Person Care
If the user describes ANY of the following, use the escalation phrase and stop recommending exercises:
- Sudden traumatic onset, audible/felt pop, bruising, swelling, inability to bear weight
- Pain severe, progressively worsening, constant at rest, or waking them at night
- Numbness, tingling, burning, weakness, radiating symptoms, or nerve-like symptoms
- Open wounds, infection signs, fever, diabetes-related foot concerns, vascular concerns, loss of sensation
- History of cancer, unexplained weight loss, systemic symptoms, or bilateral severe symptoms
- Symptoms that do not match the classic plantar fasciitis pattern

Escalation phrase: "Because your symptoms include features that are not typical of straightforward plantar fasciitis, the safest next step is to be evaluated by a licensed clinician before pushing exercises."

## Program References (use naturally, never pushy)
- Always include https:// when referencing any URL so links are clickable
- Primary CTA for new users: https://fixyourmovement.com/lp/take-assessment (always recommend this as the first step for anyone who has not yet started)
- App install link: https://app.fixyourmovement.com/install (only surface this if the user has explicitly said they already signed up, confirmed their email, and cannot find their install link — do not mention it otherwise)
- Contact for questions outside scope: contact@fixyourmovement.com

## Key Facts — Always True Regardless of Context
- Dr. Jonathan personally monitors all members' progress through the clinician dashboard. He reviews pain trends, flags, and patient data and actively helps members navigate setbacks, questions, and flare-ups. This applies to paid members and free trial users. Never say the program is self-guided without oversight — that is incorrect.
- The program is 12 weeks with optional Maintenance beyond.
- Sessions are 10–15 minutes per day, home-based, no equipment required.
- The 30-day guarantee is "Walk Pain-Free Or It's Free."

## What You Must Never Do
- Diagnose or confirm a specific diagnosis
- Prescribe specific exercises outside the program context
- Claim to replace medical advice or a clinical evaluation
- Guarantee results or timelines
- Tell someone to continue exercising if red flags are present

## Formatting
Plain text only. No markdown. No asterisks, no bold, no bullet points, no numbered lists, no headers. Write in natural sentences and paragraphs only.`;

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!openaiKey || !anthropicKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables");
    }

    const isFollowUp = Array.isArray(history) && history.length > 0;

    // ── Step 1: Embed the user message ──────────────────────────────────────
    const embedRes = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: message.trim(),
      }),
    });

    if (!embedRes.ok) {
      throw new Error(`OpenAI embedding failed: ${embedRes.status}`);
    }

    const embedData = await embedRes.json();
    const embedding = embedData.data[0].embedding;

    // ── Step 2: Retrieve top matching FAQ chunks ─────────────────────────────
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: rawChunks, error: rpcError } = await supabase.rpc(
      "match_faq_chunks",
      {
        query_embedding: embedding,
        match_count: MAX_CHUNKS,
      }
    );

    if (rpcError) {
      throw new Error(`RPC error: ${rpcError.message}`);
    }

    // All messages pass through to Claude — no threshold gate
    // Log low-similarity questions for review without blocking the answer
    const chunks = rawChunks ?? [];

    const topSimilarityCheck = chunks[0]?.similarity ?? 0;
    if (topSimilarityCheck < LOW_SIMILARITY_LOG_THRESHOLD) {
      try {
        await supabase.from("unanswered_questions").insert({
          question: message.trim(),
          asked_at: new Date().toISOString(),
        });
      } catch {
        // Non-fatal
      }
    }

    // ── Step 4: Build context from retrieved chunks ──────────────────────────
    const context = chunks.length > 0
      ? chunks
          .map((c: { content: string; source_file: string; similarity: number }) =>
            `[Source: ${c.source_file}]\n${c.content}`
          )
          .join("\n\n---\n\n")
      : "No specific context retrieved — use your general knowledge of the program and the conversation history to answer naturally.";

    const topSimilarity = topSimilarityCheck;

    // ── Step 5: Build conversation history for Claude ────────────────────────
    const conversationMessages = [
      ...(history as { role: string; content: string }[]).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      {
        role: "user" as const,
        content: message.trim(),
      },
    ];

    // ── Step 6: Call Claude Haiku ────────────────────────────────────────────
    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: `${AGENT_GOALS}\n\n## Knowledge Base Context\n\nUse the following retrieved content to inform your answer. For follow-up questions, use the conversation history and context together. Do not go beyond what is stated in the knowledge base or the conversation.\n\n${context}`,
        messages: conversationMessages,
      }),
    });

    if (!claudeRes.ok) {
      throw new Error(`Claude API failed: ${claudeRes.status}`);
    }

    const claudeData = await claudeRes.json();
    const reply =
      claudeData.content?.[0]?.text ??
      "I wasn't able to generate a response. Please try again or email contact@fixyourmovement.com.";

    // ── Step 7: Return response ──────────────────────────────────────────────
    return new Response(
      JSON.stringify({
        reply,
        sources: chunks.map((c: { source_file: string; similarity: number }) => ({
          source: c.source_file,
          similarity: Math.round(c.similarity * 100) / 100,
        })),
        similarity: Math.round(topSimilarity * 100) / 100,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("ask-dr-jonathan error:", err);
    return new Response(
      JSON.stringify({
        reply:
          "Something went wrong on my end. Please try again or email contact@fixyourmovement.com.",
        sources: [],
        similarity: 0,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});