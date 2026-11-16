// supabase/functions/ask-dr-jonathan/index.ts
// Edge Function — Ask Dr. Jonathan FAQ chat agent
// JWT OFF — public-facing
// Receives { message, history } from the widget
// No similarity threshold gate — every message is answered.
// LOW_SIMILARITY_LOG_THRESHOLD is used only to set the was_answered log flag.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { classifyRedFlag, RED_FLAG_HANDOFF_PAGE_PATH, RED_FLAG_HANDOFF_REPLY, RED_FLAG_URGENT_PAGE_PATH, RED_FLAG_URGENT_REPLY } from "./redFlags.ts";

const LOW_SIMILARITY_LOG_THRESHOLD = 0.55;
const MAX_CHUNKS = 6;
const MAX_BODY_CHARS = 32_000;
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_ITEMS = 6;
const MAX_HISTORY_CONTENT_CHARS = 3000;
const MAX_PAGE_PATH_CHARS = 200;

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

## General Questions vs. Personal Coaching
Answer general, educational, and pre-sale questions fully and warmly: what plantar fasciitis is, how the Foot Capacity System program and the app work, what to expect, pricing, HSA/FSA eligibility, and the guarantee. These are exactly what you are here for.
But you do NOT coach a person on their own case. If a question is personal or clinical — the person's own symptoms, their own exercises, their own pain specifics, whether they should change or do a specific thing for their own foot, or any guidance about their own recovery — do not answer it as personalized advice and do not prescribe. Instead, warmly explain that personalized guidance lives inside the app, and direct them to open https://app.fixyourmovement.com and ask Coach there, where their daily logs and the program's structure provide the context needed to answer their specific situation. If they are already in the program, that is exactly where to ask, so it becomes part of their recovery record.
Keep this redirect generic. The website is anonymous — never assume who the person is, and never reference their identity, their logs, or their history as if you can see it.
This does not override the escalation rule below: if the person describes any of the symptoms listed below, use the in-person hand-off instead of the app redirect.

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
If the user describes ANY of the following, stop recommending exercises or the program and reply calmly with the hand-off phrase. Do not alarm them:
- Sudden traumatic onset, audible/felt pop, bruising, swelling, inability to bear weight
- Pain severe, progressively worsening, constant at rest, or waking them at night
- Numbness, tingling, burning, weakness, radiating symptoms, or nerve-like symptoms
- Open wounds, infection signs, fever, diabetes-related foot concerns, vascular concerns, loss of sensation
- History of cancer, unexplained weight loss, systemic symptoms, or bilateral severe symptoms
- Symptoms that do not match the classic plantar fasciitis pattern

Hand-off phrase (secondary layer — a deterministic code-level check runs BEFORE you; this is the fallback if something slips past it): "Thanks for telling me. That's worth getting checked in person before starting a program." Mention emergency services ONLY if they describe chest pain, trouble breathing, fainting, or a foot or leg that has turned cold or blue; then add: "If you have chest pain, trouble breathing, or you've fainted, or your foot or leg has turned cold or blue, call your local emergency number now."

## Program References (use naturally, never pushy)
- Always include https:// when referencing any URL so links are clickable
- Free trial link: https://fixyourmovement.com/lp/download — offer it when someone asks how to get started or wants to try the program. There is no longer a separate free foot assessment or quiz; never offer one or ask whether they have taken it.
- App install link: https://app.fixyourmovement.com/install (only surface this if the user has explicitly said they already signed up, confirmed their email, and cannot find their install link — do not mention it otherwise)
- Contact for questions outside scope: contact@fixyourmovement.com

## Key Facts — Always True Regardless of Context
- The Foot Capacity System is an app-guided program. Dr. Jonathan Schutza, PT, DPT designed its structure and the recovery rules the program follows. Do not claim that he personally monitors, reviews, or individually manages members' progress.
- The program runs in three phases — Reset, Restore, and Perform — over about 12 weeks, with optional Maintenance beyond. Never present 12 weeks as a fixed or guaranteed length.
- Sessions take about 15 minutes per day, home-based, no equipment required.
- The free trial ends when the user completes 7 days of logging (7 daily check-ins), not after a set number of calendar days — no credit card required. Someone who checks in every day finishes in about a week; someone who logs less often simply takes longer (a generous outer time limit acts as a backstop). Once they've completed their 7 logged days they see their results and decide whether to purchase. Never describe the trial as a fixed "7-day" or "30-day" period or say "30-day trial" — the trial is measured in logged days, not calendar days.
- The 30-day guarantee is separate from the trial. It is a money-back guarantee for paying customers — "Walk Pain-Free Or It's Free." These are two different things and must never be combined or confused.
- Pricing: the plans page (https://fixyourmovement.com/foot-capacity-system) explains the four plans; the free trial starts at https://fixyourmovement.com/lp/download. Every plan includes the full program and Ask Dr. Jonathan AI, the AI assistant. Direct personal messaging with Dr. Jonathan is a different thing and is included only on some plans. Recovery Plan — $47/month: billed monthly, no direct personal messaging with Dr. Jonathan. It is not a path to lifetime access, so never tell someone on it that billing stops or that they will own it. Ownership Plan — $97/month for 6 months, then lifetime access: includes 6 months of direct messaging with Dr. Jonathan; after the 6th payment billing stops on its own and they keep access for life; lifetime access requires completing all 6 payments. Lifetime — $297 one-time: the full program for life, no recurring charges, no direct personal messaging with Dr. Jonathan. Premium Lifetime — $497 one-time: everything in Lifetime plus 6 months of direct messaging with Dr. Jonathan and early access to the upcoming Foot Resilience Library. Where included, direct messaging lasts the first 6 months and is limited to program-related guidance. Never mention $157, $397, or a 3-payment plan — those do not exist for new members. Do not volunteer a combined total for the $97 plan, and never quote any total for the $47 plan.
- After any purchase a Receipt & Provider Information PDF is emailed automatically, with the purchase details and Dr. Jonathan Schutza, PT, DPT's provider credentials, for anyone submitting an HSA or FSA claim. Eligibility is always decided by their plan administrator, never by you. Never estimate or imply how many plans cover this program, and never say or suggest that many, most, or some plans cover it — you have no data on plan coverage. You may say that many HSA and FSA plans reimburse qualified healthcare expenses in general, which is what the /hsa-fsa page says, but never extend that to this program specifically. Say only that it may be eligible and is worth checking. Full details at https://fixyourmovement.com/hsa-fsa.

## What You Must Never Do
- Diagnose or confirm a specific diagnosis
- Prescribe specific exercises outside the program context
- Claim to replace medical advice or a clinical evaluation
- Guarantee results or timelines
- Tell someone to continue exercising if red flags are present

## Formatting
Plain text only. No markdown. No asterisks, no bold, no bullet points, no numbered lists, no headers. Write in natural sentences and paragraphs only. Always respond in the same language the user wrote in.`;

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
    // ── Input caps (misc-sec-2): public LLM endpoint — bound body, message, history,
    //    page_path, and coerce types before anything reaches OpenAI/Anthropic/the DB.
    //    Caps sit above every real usage: longest logged question 1,069 chars (n=3,504),
    //    longest reply 2,294; the widget sends the last 4 history turns.
    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_CHARS) {
      return new Response(JSON.stringify({ error: "Request too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const parsed = JSON.parse(rawBody) ?? {};
    const message = typeof parsed.message === "string" ? parsed.message : "";
    const page_path = typeof parsed.page_path === "string" ? parsed.page_path.slice(0, MAX_PAGE_PATH_CHARS) : null;
    const historyIn: unknown[] = Array.isArray(parsed.history) ? parsed.history.slice(-MAX_HISTORY_ITEMS) : [];
    const history: { role: "user" | "assistant"; content: string }[] = [];
    for (const m of historyIn) {
      const role = (m as { role?: unknown })?.role;
      const content = (m as { content?: unknown })?.content;
      if ((role === "user" || role === "assistant") && typeof content === "string" && content.trim().length > 0) {
        history.push({ role, content: content.slice(0, MAX_HISTORY_CONTENT_CHARS) });
      }
    }
    // The conversation must open with a user turn.
    while (history.length > 0 && history[0].role === "assistant") history.shift();

    if (message.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (message.trim().length > MAX_MESSAGE_CHARS) {
      return new Response(JSON.stringify({ error: "Message is too long" }), {
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

    // ── Red-flag hard stop (Dr. Schutza Q3 = A, 2026-11-13): deterministic whole-word scan of
    //    the visitor's message BEFORE the model is called. Two tiers: "urgent" (chest pain,
    //    trouble breathing, fainting, a cold or blue foot/leg) gets the in-person hand-off plus
    //    the emergency-number line; "handoff" (every other §6-derived symptom) gets the calm
    //    in-person hand-off only. The model is skipped on either. Pre-sale / anonymous ⇒ NO
    //    clinician alert, NO inbox; the hit is logged to chat_questions with a per-tier
    //    page_path sentinel (non-fatal) so website red-flag hits stay visible. ──
    const tier = classifyRedFlag(message);
    if (tier) {
      const reply = tier === "urgent" ? RED_FLAG_URGENT_REPLY : RED_FLAG_HANDOFF_REPLY;
      const pagePath = tier === "urgent" ? RED_FLAG_URGENT_PAGE_PATH : RED_FLAG_HANDOFF_PAGE_PATH;
      try {
        const sb = createClient(supabaseUrl, supabaseServiceKey);
        await sb.from("chat_questions").insert({
          question: message.trim(),
          reply,
          was_answered: false,
          similarity_score: 0,
          page_path: pagePath,
          asked_at: new Date().toISOString(),
        });
      } catch {
        // Non-fatal — logging the flag must never block the safety reply.
      }
      return new Response(
        JSON.stringify({ reply, sources: [], similarity: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

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
      ...history,
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

    // ── Step 7: Log question to chat_questions ───────────────────────────────
    try {
      await supabase.from("chat_questions").insert({
        question: message.trim(),
        reply,
        was_answered: topSimilarity >= LOW_SIMILARITY_LOG_THRESHOLD,
        similarity_score: Math.round(topSimilarity * 100) / 100,
        page_path: page_path ?? null,
        asked_at: new Date().toISOString(),
      });
    } catch {
      // Non-fatal
    }

    // ── Step 8: Return response ──────────────────────────────────────────────
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