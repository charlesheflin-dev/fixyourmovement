// supabase/functions/ask-dr-jonathan/index.ts
// Edge Function — Ask Dr. Jonathan FAQ chat agent
// JWT OFF — public-facing
// Receives { message, history } from the widget
// First message: similarity threshold applied
// Follow-up messages: no threshold, full conversation context maintained

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SIMILARITY_THRESHOLD = 0.65;
const MAX_CHUNKS = 4;

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

Your role:
- Answer questions about plantar fasciitis recovery, the Foot Capacity System program, and the app
- Speak in Dr. Jonathan's voice: warm, direct, clinically grounded, encouraging without being salesy
- Use only the knowledge provided in the context below — do not invent clinical claims
- Be concise: 2-4 sentences is usually enough. Never write more than 6 sentences.
- If the question is outside your knowledge base, say so honestly and direct them to contact@fixyourmovement.com
- Never diagnose, never prescribe, never claim to replace medical advice
- If someone seems to be in acute pain or crisis, direct them to seek in-person care immediately
- When appropriate, naturally mention the free assessment at fixyourmovement.com/lp/take-assessment or the free 7-day trial at app.fixyourmovement.com/install — but never be pushy about it

Tone: Like a knowledgeable PT who genuinely wants to help, not a chatbot trying to close a sale.`;

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

    // For first messages: apply similarity threshold to determine if in scope
    // For follow-ups: use all retrieved chunks regardless of similarity
    const chunks = rawChunks
      ? isFollowUp
        ? rawChunks // follow-up: no threshold, keep all retrieved chunks
        : rawChunks.filter((c: { similarity: number }) => c.similarity >= SIMILARITY_THRESHOLD)
      : [];

    const hasGoodMatch = chunks && chunks.length > 0;

    // ── Step 3: If first message with no good match, save and return fallback
    if (!hasGoodMatch && !isFollowUp) {
      try {
        await supabase.from("unanswered_questions").insert({
          question: message.trim(),
          asked_at: new Date().toISOString(),
        });
      } catch {
        // Non-fatal
      }

      return new Response(
        JSON.stringify({
          reply:
            "That's a great question — I want to make sure I give you an accurate answer rather than guess. Dr. Jonathan reviews questions like this personally. Send it to contact@fixyourmovement.com and you'll hear back directly.",
          sources: [],
          similarity: 0,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ── Step 4: Build context from retrieved chunks ──────────────────────────
    const context = chunks.length > 0
      ? chunks
          .map((c: { content: string; source_file: string; similarity: number }) =>
            `[Source: ${c.source_file}]\n${c.content}`
          )
          .join("\n\n---\n\n")
      : "No specific context retrieved — use your general knowledge of the program to answer naturally based on the conversation so far.";

    const topSimilarity = chunks[0]?.similarity ?? 0;

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
        system: `${AGENT_GOALS}\n\n## Knowledge Base Context\n\nUse the following retrieved content to inform your answer. For follow-up questions, use the conversation history and context together.\n\n${context}`,
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