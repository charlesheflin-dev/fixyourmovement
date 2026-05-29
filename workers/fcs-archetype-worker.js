// FCS Archetype Worker
// Receives assessment answers from /assessment page
// Determines archetype, applies AWeber tag to subscriber
// All credentials stored as Cloudflare environment secrets

const AWEBER_TOKEN_URL = "https://auth.aweber.com/oauth2/token";
const AWEBER_API_BASE = "https://api.aweber.com/1.0";

// Archetype routing logic based on question answers
function determineArchetype(answers) {
  const { q1, q2, q3, q4, q5 } = answers;

  // Newly Concerned — early stage, hasn't tried much, still figuring it out
  if (
    (q1 === "few_weeks" || q1 === "few_months") &&
    (q2.includes("nothing") || q2.length === 0) &&
    (q4 === "new_to_this" || q5 === "get_ahead")
  ) {
    return "Archetype_Newly_Concerned";
  }

  // Active Person — activity-focused, wants to keep moving
  if (
    q3 === "staying_active" ||
    q4 === "keep_active" ||
    q5 === "back_to_sport"
  ) {
    return "Archetype_Active_Person";
  }

  // Discouraged Chronic Sufferer — long duration, losing confidence
  if (
    (q1 === "more_than_6_months" || q1 === "more_than_1_year") &&
    (q3 === "everything_confidence" ||
      q4 === "wondering_if_normal" ||
      q5 === "trust_body")
  ) {
    return "Archetype_Discouraged_Chronic";
  }

  // Frustrated Fix-Seeker — tried many things, skeptical, exhausted
  if (
    q2.length >= 2 ||
    q4 === "tried_so_much"
  ) {
    return "Archetype_Frustrated_Fix_Seeker";
  }

  // Default fallback — Frustrated Fix-Seeker catches most remaining cases
  return "Archetype_Frustrated_Fix_Seeker";
}

// Refresh the access token using the refresh token
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

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Find subscriber in AWeber list by email
async function findSubscriber(accessToken, listId, email) {
  const url = `${AWEBER_API_BASE}/accounts/1/lists/${listId}/subscribers?ws.op=find&email=${encodeURIComponent(email)}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Subscriber lookup failed: ${response.status}`);
  }

  const data = await response.json();
  return data.entries && data.entries.length > 0 ? data.entries[0] : null;
}

// Apply archetype tag to subscriber
async function applyTag(accessToken, listId, subscriberUrl, archetype) {
  // Get current tags first
  const getResponse = await fetch(subscriberUrl, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!getResponse.ok) {
    throw new Error(`Failed to get subscriber: ${getResponse.status}`);
  }

  const subscriber = await getResponse.json();
  const existingTags = subscriber.tags || [];

  // Add archetype tag if not already present
  if (!existingTags.includes(archetype)) {
    existingTags.push(archetype);
  }

  // Update subscriber with new tags
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
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://fixyourmovement.com",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only accept POST requests
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
      // Parse request body
      const body = await request.json();
      const { email, answers } = body;

      if (!email || !answers) {
        return new Response(
          JSON.stringify({ error: "Missing email or answers" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://fixyourmovement.com",
            },
          }
        );
      }

      // Determine archetype from answers
      const archetype = determineArchetype(answers);

      // Get fresh access token
      const accessToken = await refreshAccessToken(env);

      // Find subscriber in AWeber
      const listId = env.AWEBER_LIST_ID.replace("awlist", "");
      const subscriber = await findSubscriber(accessToken, listId, email);

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

      // Apply archetype tag
      await applyTag(accessToken, listId, subscriber.self_link, archetype);

      // Return success with archetype
      return new Response(
        JSON.stringify({
          success: true,
          archetype,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://fixyourmovement.com",
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://fixyourmovement.com",
          },
        }
      );
    }
  },
};