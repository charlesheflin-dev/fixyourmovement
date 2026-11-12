// FCS Archetype Worker
// Receives assessment answers from /assessment page
// Determines archetype, applies AWeber tag to subscriber
// All credentials stored as Cloudflare environment secrets

const AWEBER_TOKEN_URL = "https://auth.aweber.com/oauth2/token";
const ALLOWED_ORIGINS = [
  "https://fixyourmovement.com",
  "https://preview.fixyourmovement.com",
  "https://app.fixyourmovement.com",
];
function getAllowedOrigin(request) {
  const origin = request.headers.get("Origin") || "";
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}
const AWEBER_API_BASE = "https://api.aweber.com/1.0";

// ── Caller gate ───────────────────────────────────────────────────────────────
// Server-only tags may be applied only by callers presenting X-FCS-Worker-Key.
// Browser tags / FAAM / archetype calls are allowed from their known origins.
// Enforcement is OFF unless the enforce env flag is "1" (observe-only: log).
const SERVER_ONLY_TAGS = ["customer", "trial_pass_97", "techissue_07032026", "trial_reoffer_nolog", "trial_reoffer_lapsed"];
const BROWSER_TAG_ORIGINS = {
  checkout_visited: ["https://fixyourmovement.com", "https://preview.fixyourmovement.com"],
  trial_accepted: ["https://app.fixyourmovement.com"],
};
const SITE_ORIGINS = ["https://fixyourmovement.com", "https://preview.fixyourmovement.com"];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VALID_CHECKOUT_TAGS = [...SERVER_ONLY_TAGS, ...Object.keys(BROWSER_TAG_ORIGINS)];

// "ok" = correct key, "bad" = header present but wrong, "none" = header absent.
async function authState(request, env) {
  const provided = request.headers.get("X-FCS-Worker-Key");
  if (provided === null) return "none";
  const expected = env.FCS_WORKER_KEY;
  if (!expected) return "bad";
  const enc = new TextEncoder();
  const a = enc.encode(provided);
  const b = enc.encode(expected);
  if (a.byteLength !== b.byteLength) return "bad";
  return crypto.subtle.timingSafeEqual(a, b) ? "ok" : "bad";
}

function determineArchetype(answers) {
  const { q1, q2, q3, q4, q5 } = answers;

  if (
    (q1 === "few_weeks" || q1 === "few_months") &&
    (q2.includes("nothing") || q2.length === 0) &&
    (q4 === "new_to_this" || q5 === "get_ahead")
  ) {
    return "Archetype_Newly_Concerned";
  }

  if (q3 === "staying_active" || q4 === "keep_active" || q5 === "back_to_sport") {
    return "Archetype_Active_Person";
  }

  if (
    (q1 === "more_than_6_months" || q1 === "more_than_1_year") &&
    (q3 === "everything_confidence" || q4 === "wondering_if_normal" || q5 === "trust_body")
  ) {
    return "Archetype_Discouraged_Chronic";
  }

  if (q2.length >= 2 || q4 === "tried_so_much") {
    return "Archetype_Frustrated_Fix_Seeker";
  }

  return "Archetype_Frustrated_Fix_Seeker";
}

async function refreshAccessToken(env) {
  const credentials = btoa(`${env.AWEBER_CLIENT_ID}:${env.AWEBER_CLIENT_SECRET}`);

  const response = await fetch(AWEBER_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${credentials}`,
    },
    body: `grant_type=refresh_token&refresh_token=${env.AWEBER_REFRESH_TOKEN}`,
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status} — ${responseText}`);
  }

  const data = JSON.parse(responseText);
  return data.access_token;
}

async function getAccountId(accessToken) {
  const response = await fetch(`${AWEBER_API_BASE}/accounts`, {
    headers: { "Authorization": `Bearer ${accessToken}` },
  });
  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Account lookup failed: ${response.status} — ${responseText}`);
  }
  const data = JSON.parse(responseText);
  if (!data.entries || data.entries.length === 0) {
    throw new Error("No AWeber accounts found");
  }
  return data.entries[0].id;
}

async function findSubscriber(accessToken, accountId, listId, email) {
  const url = `${AWEBER_API_BASE}/accounts/${accountId}/lists/${listId}/subscribers?ws.op=find&email=${encodeURIComponent(email)}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Subscriber lookup failed: ${response.status}`);
  }

  const data = JSON.parse(responseText);
  return data.entries && data.entries.length > 0 ? data.entries[0] : null;
}

async function applyTag(accessToken, subscriberUrl, tag) {
  const fullUrl = subscriberUrl.startsWith("http") ? subscriberUrl : `https://api.aweber.com${subscriberUrl}`;
  const getResponse = await fetch(fullUrl, {
    headers: { "Authorization": `Bearer ${accessToken}` },
  });

  if (!getResponse.ok) {
    throw new Error(`Failed to get subscriber: ${getResponse.status}`);
  }

  const formBody = new URLSearchParams();
  formBody.append("tags", JSON.stringify({ add: [tag], remove: [] }));

  const updateResponse = await fetch(fullUrl, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(),
  });

  const updateResponseText = await updateResponse.text();
  if (!updateResponse.ok) {
    throw new Error(`Failed to apply tag: ${updateResponse.status}`);
  }

  return true;
}

// Sets one AWeber custom field on an existing subscriber (JSON PATCH on self_link).
// Throws with the status only — never echoes the subscriber/email.
async function setCustomField(accessToken, selfLink, name, value) {
  const fullUrl = selfLink.startsWith("http") ? selfLink : `https://api.aweber.com${selfLink}`;
  const res = await fetch(fullUrl, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ custom_fields: { [name]: value } }),
  });
  if (!res.ok) {
    throw new Error(`Failed to set custom field: ${res.status}`);
  }
  return true;
}

async function confirmSubscriber(accessToken, accountId, mainListId, email) {
  const subscriber = await findSubscriber(accessToken, accountId, mainListId, email);

  if (!subscriber) {
    throw new Error("Subscriber not found");
  }

  const fullUrl = subscriber.self_link.startsWith("http")
    ? subscriber.self_link
    : `https://api.aweber.com${subscriber.self_link}`;

  const formBody = new URLSearchParams();
  formBody.append("status", "subscribed");

  const patchResponse = await fetch(fullUrl, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(),
  });

  if (!patchResponse.ok) {
    const errText = await patchResponse.text();
    throw new Error(`Failed to confirm subscriber: ${patchResponse.status}`);
  }

  return true;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": getAllowedOrigin(request),
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-FCS-Worker-Key",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getAllowedOrigin(request),
        },
      });
    }

    try {
      const body = await request.json();
      const { email, answers, faam_tag, faam_score } = body;

      if (!email) {
        return new Response(JSON.stringify({ error: "Missing email" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getAllowedOrigin(request),
          },
        });
      }

      // ── Caller gate (before any AWeber call) ────────────────────────────────
      // Mirrors the branch order below: valid checkout_tag, then faam_tag, then answers.
      // Logs the decision only — never the email.
      const auth = await authState(request, env);
      const origin = request.headers.get("Origin") || "";
      const ENFORCE = env.FCS_WORKER_ENFORCE === "1";
      let gateKind = null;
      let gateTag = null;
      let allowed = true;
      if (body.checkout_tag && VALID_CHECKOUT_TAGS.includes(body.checkout_tag)) {
        gateKind = "checkout_tag";
        gateTag = body.checkout_tag;
        if (SERVER_ONLY_TAGS.includes(gateTag)) {
          allowed = auth === "ok";
        } else {
          allowed = auth === "ok" || BROWSER_TAG_ORIGINS[gateTag].includes(origin);
        }
      } else if (faam_tag) {
        gateKind = "faam_tag";
        gateTag = faam_tag;
        allowed = auth === "ok" || SITE_ORIGINS.includes(origin);
      } else if (answers) {
        gateKind = "answers";
        allowed = auth === "ok" || SITE_ORIGINS.includes(origin);
      }
      if (gateKind) {
        console.log(JSON.stringify({ kind: gateKind, tag: gateTag, auth, origin, allowed }));
        if (!allowed && ENFORCE) {
          return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": getAllowedOrigin(request),
            },
          });
        }
      }

      // ── checkout_tag branch ─────────────────────────────────────────────────
      if (body.checkout_tag && VALID_CHECKOUT_TAGS.includes(body.checkout_tag)) {
        const accessToken = await refreshAccessToken(env);
        const accountId = await getAccountId(accessToken);
        const listId = env.AWEBER_LIST_ID.replace("awlist", "");
        const subscriber = await findSubscriber(accessToken, accountId, listId, email);

        // Guard rail (relocated to point-of-use): trial_accepted requires a subscribed
        // status. If the lead landed unconfirmed (opt-in-off add at submit), confirm here
        // at onboarding — where the subscriber reliably exists — so the gate below passes.
        // Does NOT relax the gate; it makes the subscriber actually subscribed. On confirm
        // failure we fall through to the prior graceful skip.
        if (subscriber && body.checkout_tag === "trial_accepted" && subscriber.status !== "subscribed") {
          try {
            await confirmSubscriber(accessToken, accountId, listId, email);
            subscriber.status = "subscribed";
          } catch (err) {
            console.log(`[Worker] confirm-then-tag failed: ${err.message}`);
          }
        }

        // Authenticated server callers may pass results_uid (profile id) — stored on the
        // subscriber as fcs_uid so email links can use /results/{fcs_uid}. Never blocks the tag.
        if (subscriber && auth === "ok" && typeof body.results_uid === "string" && UUID_RE.test(body.results_uid)) {
          try {
            await setCustomField(accessToken, subscriber.self_link, "fcs_uid", body.results_uid);
          } catch (err) {
            console.error(`fcs_uid set failed: ${err.message}`);
          }
        }

        let tagged = false;
        if (subscriber && (body.checkout_tag !== "trial_accepted" || subscriber.status === "subscribed")) {
          await applyTag(accessToken, subscriber.self_link, body.checkout_tag);
          tagged = true;
        } else if (subscriber) {
          console.log(`[Worker] Skipped tag "${body.checkout_tag}" — subscriber status is "${subscriber.status}", not "subscribed".`);
        }
        return new Response(JSON.stringify({ success: true, tagged, reason: tagged ? null : (subscriber ? "status_not_subscribed" : "not_found_on_main_list") }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getAllowedOrigin(request),
          },
        });
      }

      // ── FAAM tag branch ─────────────────────────────────────────────────────
      if (faam_tag) {
        const VALID_FAAM_TAGS = ["faam_low", "faam_moderate", "faam_high"];
        if (!VALID_FAAM_TAGS.includes(faam_tag)) {
          return new Response(JSON.stringify({ error: "Invalid faam_tag value" }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": getAllowedOrigin(request),
            },
          });
        }

        const accessToken = await refreshAccessToken(env);
        const accountId = await getAccountId(accessToken);
        const listId = env.AWEBER_LIST_ID.replace("awlist", "");
        const subscriber = await findSubscriber(accessToken, accountId, listId, email);

        if (!subscriber) {
          return new Response(
            JSON.stringify({ error: "Subscriber not found for FAAM tag application." }),
            {
              status: 404,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": getAllowedOrigin(request),
              },
            }
          );
        }

        const ALL_FAAM_TAGS = ["faam_low", "faam_moderate", "faam_high"];
        const tagsToRemove = ALL_FAAM_TAGS.filter(t => t !== faam_tag);
        const fullUrl = subscriber.self_link.startsWith("http")
          ? subscriber.self_link
          : `https://api.aweber.com${subscriber.self_link}`;
        const formBody = new URLSearchParams();
        formBody.append("tags", JSON.stringify({ add: [faam_tag], remove: tagsToRemove }));

        const updateResponse = await fetch(fullUrl, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        });

        if (!updateResponse.ok) {
          const text = await updateResponse.text();
          throw new Error(`Failed to apply FAAM tag: ${updateResponse.status} — ${text}`);
        }

        return new Response(
          JSON.stringify({ success: true, faam_tag, faam_score: faam_score ?? null }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": getAllowedOrigin(request),
            },
          }
        );
      }

      // ── Archetype tag branch ────────────────────────────────────────────────
      if (!answers) {
        return new Response(JSON.stringify({ error: "Missing email or answers" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getAllowedOrigin(request),
          },
        });
      }

      const archetype = determineArchetype(answers);
      const accessToken = await refreshAccessToken(env);
      const accountId = await getAccountId(accessToken);
      const listId = env.AWEBER_LIST_ID.replace("awlist", "");
      const subscriber = await findSubscriber(accessToken, accountId, listId, email);

      if (!subscriber) {
        return new Response(
          JSON.stringify({
            error: "Subscriber not found. Please ensure you have confirmed your email subscription first.",
            archetype,
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": getAllowedOrigin(request),
            },
          }
        );
      }

      await applyTag(accessToken, subscriber.self_link, archetype);

      return new Response(JSON.stringify({ success: true, archetype }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getAllowedOrigin(request),
        },
      });

    } catch (error) {
      console.error(error.message);
      return new Response(JSON.stringify({ error: "Upstream error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getAllowedOrigin(request),
        },
      });
    }
  },
};