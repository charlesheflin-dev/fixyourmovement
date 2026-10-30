import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

// /checkout — 3-step upsell wizard (SPEC-checkout-upsell-funnel-and-comms §6).
//   offer ($47/mo) -> upsell97 (add Dr-J messaging?) -> lifetime (own it for life?) -> Whop.
// Plans: $47/mo + $297 lifetime = NO doctor messaging; $97/mo + $497 lifetime = messaging.
// ALL COPY BELOW IS TEMP COPY [team to replace; Dr-J approves before public launch].

const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";

const PLAN_URLS = {
  "47mo": "https://whop.com/checkout/plan_89RParoVzvYz8",
  "97mo": "https://whop.com/checkout/plan_myAABQ8dqq8W3",
  "297life": "https://whop.com/checkout/plan_oJj9EDt0XArGD",
  "497life": "https://whop.com/checkout/plan_QSKUiZJdvkf1E",
} as const;

type PlanKey = keyof typeof PLAN_URLS;
type Step = "offer" | "upsell97" | "lifetime";
type Monthly = "base47" | "plus97";

// Analytics can NEVER block navigation: any gtag failure is swallowed.
function track(event: string, label?: string) {
  try {
    window.gtag?.("event", event, {
      event_category: "conversion",
      ...(label ? { event_label: label } : {}),
    });
  } catch {
    /* GA4 failure must not stop the checkout redirect */
  }
}

export default function Checkout() {
  const [step, setStep] = useState<Step>("offer");
  // The $97 answer. null = not yet chosen (start, or after Back from the lifetime step).
  // The lifetime offer is DERIVED from this on every render — never stored.
  const [monthly, setMonthly] = useState<Monthly | null>(null);

  useEffect(() => {
    try {
      const match = document.cookie.split("; ").find((c) => c.startsWith("fcs_email="));
      if (!match) return;
      const email = decodeURIComponent(match.split("=")[1]);
      if (!email) return;
      fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, checkout_tag: "checkout_visited" }),
      }).catch(() => {});
    } catch {}
  }, []);

  // Final redirect: keep the checkout_click event (label checkout_bridge_<plan>).
  function goToWhop(plan: PlanKey) {
    track("checkout_click", `checkout_bridge_${plan}`);
    window.location.assign(PLAN_URLS[plan]);
  }

  // Back navigation — emits NO GA4 events (only forward choices are tracked).
  function goBack() {
    if (step === "upsell97") {
      setStep("offer");
    } else if (step === "lifetime") {
      // Clear the $97 answer so the member must re-choose; the lifetime offer is then
      // recomputed from the NEW answer on the next forward step.
      setMonthly(null);
      setStep("upsell97");
    }
  }

  function chooseUpsell97(yes: boolean) {
    track(yes ? "upsell_97_yes" : "upsell_97_no");
    setMonthly(yes ? "plus97" : "base47");
    setStep("lifetime");
  }

  const lifetime = monthly === "plus97"
    ? { plan: "497life" as PlanKey, price: "$497", body: "One payment. Keeps direct doctor messaging." }
    : { plan: "297life" as PlanKey, price: "$297", body: "One payment." };

  function chooseLifetime(yes: boolean) {
    if (monthly === null) {
      // Defensive: the lifetime step needs a $97 answer — send them back to choose.
      setStep("upsell97");
      return;
    }
    track(yes ? "lifetime_yes" : "lifetime_no");
    if (yes) {
      goToWhop(lifetime.plan);
    } else {
      goToWhop(monthly === "plus97" ? "97mo" : "47mo");
    }
  }

  const stepNumber = step === "offer" ? 1 : step === "upsell97" ? 2 : 3;

  const primaryBtn =
    "block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl text-center transition-colors";
  const secondaryBtn =
    "block w-full bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-600 font-semibold text-base py-3 rounded-xl text-center transition-colors";

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-xl mx-auto px-5 py-12">

        {/* Back — steps 2 and 3 only (never step 1). No analytics. */}
        {step !== "offer" && (
          <button
            type="button"
            onClick={goBack}
            className="text-slate-500 hover:text-slate-700 text-sm font-semibold mb-4"
          >
            ← Back
          </button>
        )}

        {/* Step indicator */}
        <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3 text-center">
          Step {stepNumber} of 3
        </p>

        {/* Step card — TEMP COPY [team to replace; Dr-J approves before public launch] */}
        <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-6 mb-6">
          {step === "offer" && (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3 text-center">
                Continue your recovery — $47/mo
              </h1>
              <p className="text-slate-600 text-base leading-relaxed mb-6 text-center">
                Full program + Ask DJ AI. Cancel anytime.
              </p>
              <button type="button" className={primaryBtn} onClick={() => setStep("upsell97")}>
                Continue →
              </button>
            </>
          )}

          {step === "upsell97" && (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3 text-center">
                Optional: upgrade to $97/mo
              </h1>
              <p className="text-slate-600 text-base leading-relaxed mb-6 text-center">
                Adds the ability to message Dr. Schutza directly.
              </p>
              <div className="space-y-3">
                <button type="button" className={primaryBtn} onClick={() => chooseUpsell97(true)}>
                  Yes, add messaging
                </button>
                <button type="button" className={secondaryBtn} onClick={() => chooseUpsell97(false)}>
                  No thanks, continue at $47
                </button>
              </div>
            </>
          )}

          {step === "lifetime" && (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3 text-center">
                Own it for life — {lifetime.price}
              </h1>
              <p className="text-slate-600 text-base leading-relaxed mb-6 text-center">
                {lifetime.body}
              </p>
              <div className="space-y-3">
                <button type="button" className={primaryBtn} onClick={() => chooseLifetime(true)}>
                  Yes, make it lifetime
                </button>
                <button type="button" className={secondaryBtn} onClick={() => chooseLifetime(false)}>
                  No thanks
                </button>
              </div>
            </>
          )}
        </div>

        {/* HSA/FSA Callout */}
        <div className="flex flex-col items-center text-center bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
          <p className="text-slate-800 text-sm font-semibold">✅ HSA/FSA funds may be eligible*</p>
          <p className="text-slate-500 text-xs leading-relaxed">Check with your plan administrator to determine your eligibility.</p>
        </div>

        {/* Trust strip */}
        <div className="flex justify-center gap-5 text-xs text-slate-400 mb-8">
          <span>🛡️ 30-Day Guarantee</span>
          <span>🔒 Secure Checkout</span>
          <span>↩️ Cancel Monthly Anytime</span>
        </div>

        {/* Guarantee box */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-5">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-slate-900 font-bold text-base leading-snug">Walk Pain Free, Or It's Free</p>
              <p className="text-blue-600 font-semibold text-sm">30-Day Money-Back Guarantee</p>
            </div>
            <div className="shrink-0 hidden sm:block">
              <img src={logo} alt="FCS" className="h-10 w-auto" />
            </div>
          </div>
          <div className="border-t border-slate-100 px-6 py-4">
            <p className="text-slate-600 text-sm leading-relaxed text-center">
              Try the Foot Capacity System for 30 days. If it's not the right fit, simply email us within 30 days and we'll refund your investment. No complicated forms. No hoops to jump through.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
