import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import {
  FunnelShell,
  FunnelHero,
  SavedProgressPanel,
  OfferCard,
  HsaFsaStrip,
  GuaranteeCard,
  PlanDisclosure,
  TwoLines,
  OfferCardFrame,
  PlanHeader,
  CardDivider,
  SectionEyebrow,
  InsetPanel,
  FeatureIntro,
  FeatureRows,
  BenefitChecklist,
  PaymentSummary,
  PrimaryCta,
  ReassuranceLines,
  DeclineLink,
} from "@/components/checkout/OfferPieces";

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

  // Steps swap content within one route, so reset scroll on every step change
  // (forward and Back). Purely visual — no analytics, no flow changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

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

  // ── Step 1 ($47 offer) — approved mockup + approved copy (2026-10-30). ──
  // CTA keeps the existing step-advance handler: it moves to Step 2 and does NOT
  // redirect to Whop or charge anything. No analytics added (unchanged behavior).
  if (step === "offer") {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
        <FunnelShell>
          <FunnelHero
            eyebrow="YOUR RECOVERY ROADMAP CONTINUES"
            title="Seven Check-Ins Down. Your Recovery Is Just Getting Started."
            body="You've put in the work and seen your progress. Now keep building the strength and confidence to get back to the life you love."
          />
          <SavedProgressPanel
            heading="Your progress is saved."
            body="Every exercise, pain score, and check-in you've logged is saved and ready when you are."
            closing="No starting over. Pick up right where you left off."
          />
          <OfferCard
            ribbon="CONTINUE YOUR RECOVERY"
            title="Your Recovery Plan"
            support="The full FCS program with AI support."
            price="$47"
            period="per month"
            benefits={[
              "Complete 3-phase recovery program",
              "Daily guided exercises and video instruction",
              "Built-in guidance for flare-ups and tougher days",
              "Pain tracking and progress history",
              "Ask Dr. Jonathan AI for help with your program",
              "A plan that progresses with you",
            ]}
            ctaLabel="Continue My Recovery for $47/month"
            onCta={() => setStep("upsell97")}
            reassurance={[
              "No long-term commitment. Secure checkout.",
              "Cancel anytime, right inside the app.",
            ]}
          />
          <HsaFsaStrip />
          <GuaranteeCard />
          <PlanDisclosure>
            Includes the full FCS program and Ask Dr. Jonathan AI. Direct personal messaging with Dr. Jonathan is available through an upgraded plan.
          </PlanDisclosure>
        </FunnelShell>
      </div>
    );
  }

  // ── Step 2 ($97 ownership upsell) — approved mockup + approved copy (2026-10-30). ──
  // Restyle + relabel only. Accept -> chooseUpsell97(true) (upsell_97_yes, $497 next);
  // decline link -> chooseUpsell97(false) (upsell_97_no, $297 next) — a FORWARD choice;
  // ← Back -> goBack() (Step 1, no analytics). No Whop redirect or charge on this step.
  if (step === "upsell97") {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
        <FunnelShell>
          <button
            type="button"
            onClick={goBack}
            className="-mb-3 self-start min-h-[44px] -ml-1 px-1 text-slate-500 hover:text-slate-700 text-sm font-semibold rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            ← Back
          </button>
          <FunnelHero
            eyebrow="BEFORE YOU CONTINUE, ONE MORE OPTION..."
            title={<TwoLines first="Six Payments." second="Then It's Yours to Keep." />}
            body="Add 6 months of personal communication with Dr. Jonathan and secure lifetime access to your FCS Recovery Program for just $50 more per month."
          />
          <OfferCardFrame ribbon="YOUR PATH TO LIFETIME ACCESS">
            <PlanHeader title="Your Ownership Plan" price="$97" period="per month" />
            <div className="mt-5">
              <InsetPanel
                heading={<TwoLines first="Your Feet Change." second="FCS Responds." />}
                body="Heel pain can return, even after you're feeling better. If it does, simply log back in and record your pain. FCS responds with exercises based on your current symptoms, building on your saved recovery history."
              />
            </div>
            <CardDivider />
            <FeatureIntro
              eyebrow="PLUS, FOR YOUR FIRST 6 MONTHS"
              heading={<TwoLines first="Questions?" second="Ask the Person Who Built FCS." />}
              body="Wondering about an exercise, a recovery phase, or why the program works the way it does? Dr. Jonathan can explain the thinking behind FCS, helping you move forward with greater confidence."
            />
            <FeatureRows
              rows={[
                { icon: "message", label: "Two-way communication inside FCS" },
                { icon: "mic", label: "Personal voice replies from Dr. Jonathan" },
              ]}
            />
            <CardDivider />
            <SectionEyebrow>YOUR OWNERSHIP BENEFITS</SectionEyebrow>
            <BenefitChecklist
              items={[
                "Lifetime FCS access after 6 payments",
                "Pain-responsive exercises whenever you need them",
                "Ask Dr. Jonathan AI stays with you",
                "Future FCS program updates included",
              ]}
            />
            <PaymentSummary
              headline="$97/month × 6"
              total="Total investment: $582"
              note="Then lifetime FCS access, with no more monthly fees."
            />
            <PrimaryCta label="Choose My $97 Ownership Plan" onClick={() => chooseUpsell97(true)} />
            <ReassuranceLines
              lines={[
                "Secure checkout. Cancel anytime, right inside the app.",
                "Lifetime access requires all 6 monthly payments.",
              ]}
            />
            <DeclineLink label="No thanks, I'll keep my $47/month plan." onClick={() => chooseUpsell97(false)} />
          </OfferCardFrame>
          <HsaFsaStrip />
          <GuaranteeCard />
          <PlanDisclosure>
            Direct communication with Dr. Jonathan is available for the first 6 months and is limited to program-related guidance. Lifetime digital access begins after completing all 6 payments.
          </PlanDisclosure>
        </FunnelShell>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-xl mx-auto px-5 py-12">

        {/* Back — step 3 only (Steps 1 and 2 return their own views above). No analytics. */}
        <button
          type="button"
          onClick={goBack}
          className="text-slate-500 hover:text-slate-700 text-sm font-semibold mb-4"
        >
          ← Back
        </button>

        {/* Step indicator */}
        <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3 text-center">
          Step {stepNumber} of 3
        </p>

        {/* Step card — TEMP COPY [team to replace; Dr-J approves before public launch] */}
        <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-6 mb-6">
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
