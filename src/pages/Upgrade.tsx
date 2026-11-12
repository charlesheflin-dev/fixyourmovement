import { useState, useEffect } from "react";
import { FunnelShell, FunnelHero, TwoLines } from "@/components/checkout/OfferPieces";
import { Ownership97Offer, Premium497Offer } from "@/components/checkout/OfferCompositions";

// /upgrade — 2-step upgrade funnel ($97 ownership -> $497 premium lifetime).
// Reached from the app's Messages "Send Dr. Jonathan a Question" button when the member's
// plan does not include doctor messaging (profiles.can_message_doctor = false, e.g. $47/mo).
// Self-contained: its own step state and its own upgrade_* GA4 events, separate from the
// /checkout wizard. The card bodies are the shared OfferCompositions also used by /checkout's
// $97 and $497 views, so the approved copy lives in one place.

const APP_URL = "https://app.fixyourmovement.com/";

const PLAN_URLS = {
  "97mo": "https://whop.com/checkout/plan_myAABQ8dqq8W3",
  "497life": "https://whop.com/checkout/plan_QSKUiZJdvkf1E",
} as const;

type PlanKey = keyof typeof PLAN_URLS;
type Step = "ownership97" | "premium497";

// Analytics can NEVER block navigation: any gtag failure is swallowed.
function track(event: string, label?: string) {
  try {
    window.gtag?.("event", event, {
      event_category: "conversion",
      ...(label ? { event_label: label } : {}),
    });
  } catch {
    /* GA4 failure must not stop the redirect */
  }
}

export default function Upgrade() {
  const [step, setStep] = useState<Step>("ownership97");

  // Steps swap content within one route, so reset scroll on every step change.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    track("upgrade_visited");
  }, []);

  // Final redirect (label upgrade_bridge_<plan>, distinct from /checkout's checkout_bridge_*).
  function goToWhop(plan: PlanKey) {
    track("checkout_click", `upgrade_bridge_${plan}`);
    window.location.assign(PLAN_URLS[plan]);
  }

  function continueTo497() {
    track("upgrade_97_continue");
    setStep("premium497");
  }

  function choose497(yes: boolean) {
    track(yes ? "upgrade_497_yes" : "upgrade_497_no");
    goToWhop(yes ? "497life" : "97mo");
  }

  // ── Step 1: $97 ownership offer (Dr-J hero). CTA advances to Step 2 — no Whop, no charge. ──
  if (step === "ownership97") {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
        <FunnelShell>
          <FunnelHero
            eyebrow="TALK TO DR. JONATHAN DIRECTLY"
            title={<TwoLines first="Get Dr. Jonathan" second="In Your Corner." />}
            body="Direct messaging with Dr. Jonathan is part of the Ownership Plan. Upgrade to ask him your questions personally — and lock in lifetime FCS access along the way."
          />
          <Ownership97Offer
            ctaLabel="Unlock Messaging with Dr. Jonathan"
            onCta={continueTo497}
            reassurance={[
              "No charge yet. You'll see one more option before secure checkout.",
              "Lifetime access requires all 6 monthly payments.",
            ]}
            declineLabel="Not now — back to the app"
            onDecline={() => window.location.assign(APP_URL)}
          />
        </FunnelShell>
      </div>
    );
  }

  // ── Step 2: $497 premium lifetime offer. CTA + decline are TERMINAL Whop redirects. ──
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <FunnelShell>
        <button
          type="button"
          onClick={() => setStep("ownership97")}
          className="-mb-3 self-start min-h-[44px] -ml-1 px-1 text-slate-500 hover:text-slate-700 text-sm font-semibold rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          ← Back
        </button>
        <Premium497Offer onChoose={() => choose497(true)} onDecline={() => choose497(false)} />
      </FunnelShell>
    </div>
  );
}
