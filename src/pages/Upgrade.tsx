import { useState, useEffect } from "react";
import {
  FunnelShell,
  FunnelHero,
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
  PriceComparison,
  FeaturePanel,
  InsetNote,
} from "@/components/checkout/OfferPieces";

// /upgrade — 2-step upgrade funnel ($97 ownership -> $497 premium lifetime).
// Reached from the app's Messages "Send Dr. Jonathan a Question" button when the member's
// plan does not include doctor messaging (profiles.can_message_doctor = false, e.g. $47/mo).
// Self-contained: its own step state and its own upgrade_* GA4 events, separate from the
// /checkout wizard. The card bodies use the same OfferPieces + approved copy as /checkout's
// $97 and $497 views (KEEP-IN-SYNC with Checkout.tsx if that copy changes).

const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";
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
            <PrimaryCta label="Unlock Messaging with Dr. Jonathan" onClick={continueTo497} />
            <ReassuranceLines
              lines={[
                "Secure checkout. Cancel anytime, right inside the app.",
                "Lifetime access requires all 6 monthly payments.",
              ]}
            />
            <DeclineLink label="Not now — back to the app" onClick={() => window.location.assign(APP_URL)} />
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
          <PrimaryCta label="Choose My $497 Premium Lifetime Plan" onClick={() => choose497(true)} />
          <ReassuranceLines
            lock={false}
            lines={[
              "One secure payment. No monthly fees.",
              "Direct communication with Dr. Jonathan lasts 6 months.",
            ]}
          />
          <DeclineLink label="No thanks, I'll keep my $97/month ownership plan." onClick={() => choose497(false)} />
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
