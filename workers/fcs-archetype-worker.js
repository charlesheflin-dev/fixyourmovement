// FCS Archetype Worker
// Receives assessment answers from /assessment page
// Determines archetype, applies AWeber tag to subscriber
// All credentials stored as Cloudflare environment secrets

const AWEBER_TOKEN_URL = "https://auth.aweber.com/oauth2/token";
const ALLOWED_ORIGINS = [
  "https://fixyourmovement.com",
  "https://preview.fixyourmovement.com",
];
function getAllowedOrigin(request) {
  const origin = request.headers.get("Origin") || "";
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}
const AWEBER_API_BASE = "https://api.aweber.com/1.0";

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
    throw new Error(`Subscriber lookup failed: ${response.status} — ${responseText}`);
  }

  const data = JSON.parse(responseText);
  return data.entries && data.entries.length > 0 ? data.entries[0] : null;
}

async function applyTag(accessToken, subscriberUrl, archetype) {
  const fullUrl = subscriberUrl.startsWith("http") ? subscriberUrl : `https://api.aweber.com${subscriberUrl}`;
  const getResponse = await fetch(fullUrl, {
    headers: { "Authorization": `Bearer ${accessToken}` },
  });

  if (!getResponse.ok) {
    throw new Error(`Failed to get subscriber: ${getResponse.status}`);
  }

  const formBody = new URLSearchParams();
  formBody.append("tags", JSON.stringify({ add: [archetype], remove: [] }));

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
    throw new Error(`Failed to apply tag: ${updateResponse.status} — ${updateResponseText}`);
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
          "Access-Control-Allow-Headers": "Content-Type",
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

      const VALID_CHECKOUT_TAGS = ["checkout_visited", "trial_accepted"];
      if (body.checkout_tag && VALID_CHECKOUT_TAGS.includes(body.checkout_tag)) {
        const accessToken = await refreshAccessToken(env);
        const accountId = await getAccountId(accessToken);
        const listId = env.AWEBER_LIST_ID.replace("awlist", "");
        const subscriber = await findSubscriber(accessToken, accountId, listId, email);
        if (subscriber) {
          await applyTag(accessToken, subscriber.self_link, body.checkout_tag);
        }
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getAllowedOrigin(request),
          },
        });
      }

      // ── FAAM tag branch ──────────────────────────────────────────────────────
      // When the assessment page sends faam_tag (after FAAM completion),
      // we apply the score band tag to the subscriber.
      // Valid tags: faam_low | faam_moderate | faam_high
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

        // Remove other FAAM band tags, apply the new one
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

      // ── Archetype tag branch (original flow) ────────────────────────────────
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
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getAllowedOrigin(request),
        },
      });
    }
  },
};