import { useState, useEffect } from "react";
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
  IconPlanHeader,
  IconInsetPanel,
  PriceComparison,
  CenteredNote,
  FeaturePanel,
  InsetNote,
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

  // ── Step 3, $297 branch (declined $97) — approved mockup + approved copy (2026-10-30). ──
  // Branch = the existing derived `lifetime` selector (unchanged). Restyle + relabel only:
  // CTA -> chooseLifetime(true), decline link -> chooseLifetime(false) (both TERMINAL Whop
  // redirects, unchanged), ← Back -> goBack() (Step 2 + clears the $97 answer). The $497
  // branch still renders the temp view below. No bottom disclosure here (pending owner OK).
  if (step === "lifetime" && lifetime.plan === "297life") {
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
            eyebrow="YOUR LIFETIME OPTION"
            title={<TwoLines first="Take the Pressure Off" second="Your Recovery." />}
            body="Recovery takes time. You shouldn't feel rushed to make the most of your program before another monthly payment comes due. For $297, FCS is yours for life."
          />
          <OfferCardFrame ribbon="YOUR PATH TO LIFETIME ACCESS">
            <IconPlanHeader
              title="Your Lifetime FCS Plan"
              support="A complete recovery program yours for life."
              price="$297"
              period="one time"
            />
            <div className="mt-5 mb-6">
              <IconInsetPanel
                heading={<TwoLines first="No Rush." second="No Renewals." />}
                body="Follow your recovery program at the pace it was designed for. Keep building strength when you're feeling better. And if heel pain returns, your FCS program is ready whenever you are."
              />
            </div>
            <SectionEyebrow>YOURS FOR THE LONG HAUL</SectionEyebrow>
            <BenefitChecklist
              items={[
                "Complete FCS plantar fasciitis recovery program",
                "Exercises for recovery, strength, and ongoing maintenance",
                "Pain tracking, progress history, and Ask Dr. Jonathan AI",
                "Lifetime access with no recurring payments",
              ]}
            />
            <CardDivider />
            <SectionEyebrow>BY MONTH 7, LIFETIME COSTS LESS.</SectionEyebrow>
            <PriceComparison
              left={{ label: "$47 Monthly", amount: "$329", note: "7 monthly payments" }}
              right={{ label: "$297 Lifetime", amount: "$297", note: "One payment" }}
              footnote="And your lifetime access continues without another subscription charge."
            />
            <CenteredNote>
              As FCS expands, our pricing will increase. Secure lifetime access to the current plantar fasciitis program at today's $297 price.
            </CenteredNote>
            <PrimaryCta label="Choose My $297 Lifetime Plan" onClick={() => chooseLifetime(true)} />
            <ReassuranceLines
              lock={false}
              lines={[
                "One payment. Secure checkout. No recurring fees.",
                "Includes Ask Dr. Jonathan AI, not direct personal communication with Dr. Jonathan.",
              ]}
            />
            <DeclineLink label="No thanks, I'll keep my $47/month plan." onClick={() => chooseLifetime(false)} />
          </OfferCardFrame>
          <HsaFsaStrip />
          <GuaranteeCard />
        </FunnelShell>
      </div>
    );
  }

  // ── Step 3, $497 branch (accepted $97) — approved mockup + approved copy (2026-10-30). ──
  // Every earlier view returned above, so this is step "lifetime" with lifetime.plan
  // "497life" (the existing derived selector, unchanged). Restyle + relabel only:
  // CTA -> chooseLifetime(true) (lifetime_yes, $497 Whop), decline link -> chooseLifetime(false)
  // (lifetime_no, $97/mo Whop — keeps $97, not $47); both TERMINAL, unchanged.
  // ← Back -> goBack() (Step 2 + clears the $97 answer).
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
          eyebrow="BEFORE YOU FINALIZE YOUR PLAN"
          title={<TwoLines first="You've Chosen Lifetime." second="Now Make It Even Better." />}
          body="You've already committed to your long-term recovery. Now you can enjoy the same 6 months of personal communication with Dr. Jonathan, save $85, and become part of what's next for FCS."
        />
        <OfferCardFrame ribbon="SAVE $85 ON YOUR OWNERSHIP PLAN">
          <IconPlanHeader
            title="Premium Lifetime"
            support="One payment. Yours for life."
            price="$497"
            period="one time"
          />
          <div className="mt-5 mb-6">
            <PriceComparison
              heading="Same Benefits. Lower Total Cost."
              left={{ label: "$97 × 6", amount: "$582", note: "Ownership plan" }}
              right={{ label: "Pay once", amount: "$497", note: "Premium Lifetime" }}
              savings="You Save $85"
            />
          </div>
          <SectionEyebrow>EVERYTHING YOU CHOSE IS INCLUDED</SectionEyebrow>
          <BenefitChecklist
            items={[
              "Lifetime FCS program access and future updates",
              "6 months of direct communication with Dr. Jonathan",
              "Ask Dr. Jonathan AI and your saved recovery history",
            ]}
          />
          <CardDivider />
          <FeaturePanel
            eyebrow="AN EARLY-ADOPTER BENEFIT"
            heading="Help Shape What's Next."
            paragraphs={[
              "Your FCS program focuses on plantar fasciitis recovery. Our upcoming Foot Resilience Library will take you beyond Phase 3, with resources designed to maintain strength, build resilience, and help you stay active doing the things you love.",
              "You'll be among the first invited to explore it, share your experiences, and help shape what we build. Your lifetime access to the new library is included at no additional charge.",
            ]}
            checks={[
              "Early previews and opportunities to share your ideas",
              "Grandfathered Foot Resilience Library access at no additional charge",
            ]}
          />
          <InsetNote>
            Premium Lifetime pricing will start at $697 when the Foot Resilience Library launches. As an early member, your $497 purchase includes the library at no additional charge.
          </InsetNote>
          <PrimaryCta label="Choose My $497 Premium Lifetime Plan" onClick={() => chooseLifetime(true)} />
          <ReassuranceLines
            lock={false}
            lines={[
              "One secure payment. No monthly fees.",
              "Direct communication with Dr. Jonathan lasts 6 months.",
            ]}
          />
          <DeclineLink label="No thanks, I'll keep my $97/month ownership plan." onClick={() => chooseLifetime(false)} />
        </OfferCardFrame>
        <HsaFsaStrip />
        <GuaranteeCard />
        <PlanDisclosure>
          Includes the full FCS program, Ask Dr. Jonathan AI, and 6 months of direct personal communication with Dr. Jonathan.
        </PlanDisclosure>
      </FunnelShell>
    </div>
  );
}
