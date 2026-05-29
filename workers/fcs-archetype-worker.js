// FCS Archetype Worker
// Receives assessment answers from /assessment page
// Determines archetype, applies AWeber tag to subscriber
// All credentials stored as Cloudflare environment secrets

const AWEBER_TOKEN_URL = "https://auth.aweber.com/oauth2/token";
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

async function applyTag(accessToken, listId, subscriberUrl, archetype) {
  const getResponse = await fetch(subscriberUrl, {
    headers: { "Authorization": `Bearer ${accessToken}` },
  });

  if (!getResponse.ok) {
    throw new Error(`Failed to get subscriber: ${getResponse.status}`);
  }

  const subscriber = await getResponse.json();
  const existingTags = subscriber.tags || [];

  if (!existingTags.includes(archetype)) {
    existingTags.push(archetype);
  }

  const updateResponse = await fetch(subscriberUrl, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags: existingTags }),
  });

  if (!updateResponse.ok) {
    throw new Error(`Failed to apply tag: ${updateResponse.status}`);
  }

  return true;
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://fixyourmovement.com",
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
          "Access-Control-Allow-Origin": "https://fixyourmovement.com",
        },
      });
    }

    try {
      const body = await request.json();
      const { email, answers } = body;

      if (!email || !answers) {
        return new Response(JSON.stringify({ error: "Missing email or answers" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://fixyourmovement.com",
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
              "Access-Control-Allow-Origin": "https://fixyourmovement.com",
            },
          }
        );
      }

      await applyTag(accessToken, subscriber.self_link, archetype);

      return new Response(JSON.stringify({ success: true, archetype }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://fixyourmovement.com",
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://fixyourmovement.com",
        },
      });
    }
  },
};