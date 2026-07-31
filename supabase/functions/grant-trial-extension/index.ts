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

function normEmail(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim().toLowerCase() : null;
}

// Free-week grant: how many extra trial days a first-time extension awards.
const GRANT_DAYS = 7;

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

    const userId = typeof body.userId === "string" && body.userId ? body.userId : null;
    const email = normEmail(body.email);
    const source = typeof body.source === "string" && body.source ? body.source : null;

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

    // Resolve the profile by userId or email (mirrors get-results-data). We need
    // the real profiles.id for the trial_extensions FK, and is_trial to guard.
    let query = supabase.from("profiles").select("id, is_trial");
    query = userId ? query.eq("id", userId) : query.eq("email", email!);
    const { data: profile, error: profileErr } = await query.single();

    if (profileErr || !profile) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Never extend a non-trial (paid/converted) user.
    if (profile.is_trial !== true) {
      return new Response(JSON.stringify({ ok: true, granted: false, reason: "not_trial" }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // The grant IS the enforcement: user_id is the primary key, so a second
    // attempt raises a unique violation (23505) rather than a second week. A
    // plain insert (not upsert) is deliberate so the conflict surfaces as the
    // "already extended -> route to the $47 offer" signal.
    const { error: insertErr } = await supabase.from("trial_extensions").insert({
      user_id: profile.id,
      extension_days: GRANT_DAYS,
      source,
    });

    if (insertErr) {
      if (insertErr.code === "23505") {
        return new Response(
          JSON.stringify({ ok: true, granted: false, alreadyExtended: true, offer: "save50" }),
          { status: 200, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }
      console.error("trial_extensions insert error:", insertErr);
      return new Response(JSON.stringify({ error: "Failed to grant extension" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, granted: true, extensionDays: GRANT_DAYS }),
      { status: 200, headers: { ...cors, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
