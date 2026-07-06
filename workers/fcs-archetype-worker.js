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
    throw new Error(`Failed to apply tag: ${updateResponse.status} — ${updateResponseText}`);
  }

  return true;
}

async function migrateToMainList(accessToken, accountId, downloadListId, mainListId, email) {
  // Find the subscriber on the download/holding list (awlist6961315)
  const subscriber = await findSubscriber(accessToken, accountId, downloadListId, email);

  if (!subscriber) {
    throw new Error(`Subscriber not found on download list for migration: ${email}`);
  }

  // Use the AWeber Move endpoint — moves subscriber without sending a new verification message,
  // preserving their confirmed status on the destination list.
  const subscriberUrl = subscriber.self_link.startsWith("http")
    ? subscriber.self_link
    : `https://api.aweber.com${subscriber.self_link}`;

  const mainListLink = `${AWEBER_API_BASE}/accounts/${accountId}/lists/${mainListId}`;

  const formBody = new URLSearchParams();
  formBody.append("ws.op", "move");
  formBody.append("list_link", mainListLink);

  const response = await fetch(subscriberUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(),
  });

  const responseText = await response.text();

  // 201 = moved successfully
  if (!response.ok) {
    throw new Error(`Failed to move subscriber to main list: ${response.status} — ${responseText}`);
  }

  return { status: response.status, body: responseText };
}

async function confirmSubscriber(accessToken, accountId, mainListId, email) {
  const subscriber = await findSubscriber(accessToken, accountId, mainListId, email);

  if (!subscriber) {
    throw new Error(`Subscriber not found: ${email}`);
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
    throw new Error(`Failed to confirm subscriber: ${patchResponse.status} — ${errText}`);
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

      // ── migrate_to_main_list branch ─────────────────────────────────────────
      // Called from DownloadApp.tsx on ?access=true after email confirmation.
      // Adds the confirmed subscriber directly to awlist6958674 (main list)
      // with status=subscribed, bypassing double opt-in since they already confirmed.
      // AWeber automation then removes them from awlist6961315 (download list).
      if (body.action === "migrate_to_main_list") {
        const accessToken = await refreshAccessToken(env);
        const accountId = await getAccountId(accessToken);
        const downloadListId = env.AWEBER_DOWNLOAD_LIST_ID.replace("awlist", "");
        const mainListId = env.AWEBER_LIST_ID.replace("awlist", "");
        await migrateToMainList(accessToken, accountId, downloadListId, mainListId, email);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getAllowedOrigin(request),
          },
        });
      }

      // ── confirm_all_unconfirmed branch ─────────────────────────────────────
      // ONE-TIME BACKFILL: confirms all unconfirmed subscribers on awlist6958674.
      // Run once via backfill-confirm-subscribers.js then remove this branch.
      if (body.action === "confirm_subscriber") {
        const accessToken = await refreshAccessToken(env);
        const accountId = await getAccountId(accessToken);
        const mainListId = env.AWEBER_LIST_ID.replace("awlist", "");
        await confirmSubscriber(accessToken, accountId, mainListId, email);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getAllowedOrigin(request),
          },
        });
      }

      // ── get_unconfirmed branch ──────────────────────────────────────────────
      // ONE-TIME BACKFILL: returns all unconfirmed emails on awlist6958674.
      // Called by backfill-confirm-subscribers.js then remove this branch.
      if (body.action === "get_unconfirmed") {
        const accessToken = await refreshAccessToken(env);
        const accountId = await getAccountId(accessToken);
        const mainListId = env.AWEBER_LIST_ID.replace("awlist", "");
        const emails = [];
        let start = 0;
        const size = 100;
        while (true) {
          const url = `${AWEBER_API_BASE}/accounts/${accountId}/lists/${mainListId}/subscribers?ws.op=find&status=unconfirmed&ws.start=${start}&ws.size=${size}`;
          const res = await fetch(url, { headers: { "Authorization": `Bearer ${accessToken}` } });
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Failed to fetch unconfirmed: ${res.status} — ${text}`);
          }
          const data = JSON.parse(await res.text());
          const entries = data.entries || [];
          entries.forEach(s => emails.push(s.email));
          if (entries.length < size) break;
          start += size;
        }
        return new Response(JSON.stringify({ success: true, emails }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": getAllowedOrigin(request),
          },
        });
      }

      // ── checkout_tag branch ─────────────────────────────────────────────────
      const VALID_CHECKOUT_TAGS = ["checkout_visited", "trial_accepted", "customer", "trial_pass_97", "techissue_07032026"];
      if (body.checkout_tag && VALID_CHECKOUT_TAGS.includes(body.checkout_tag)) {
        const accessToken = await refreshAccessToken(env);
        const accountId = await getAccountId(accessToken);
        const listId = env.AWEBER_LIST_ID.replace("awlist", "");
        const subscriber = await findSubscriber(accessToken, accountId, listId, email);
        if (subscriber && (body.checkout_tag !== "trial_accepted" || subscriber.status === "subscribed")) {
          await applyTag(accessToken, subscriber.self_link, body.checkout_tag);
        } else if (subscriber) {
          console.log(`[Worker] Skipped tag "${body.checkout_tag}" for ${email} — subscriber status is "${subscriber.status}", not "subscribed".`);
        }
        return new Response(JSON.stringify({ success: true }), {
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