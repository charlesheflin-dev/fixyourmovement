import type { ReactNode } from "react";
import logo from "@/assets/logo.png";
import {
  BenefitChecklist,
  CardDivider,
  FunnelHero,
  HsaFsaStrip,
  IconPlanHeader,
  PlanDisclosure,
  SectionEyebrow,
} from "@/components/checkout/OfferPieces";
import { RED_FLAG_INTRO } from "@/lib/redFlags";

// Public explainer + plans page (Charles 4, 2026-11-13): the homepage "Plans & pricing" link
// lands here. Non-members never see /checkout (Charles 5), so this page NEVER links to it —
// every CTA is a plain anchor to /lp/download with no ?source= (SourceCapture's write-once
// first-source cookie must not be muddied). Copy is reused from live site text; the
// equipment line and the Playbook-sourced "how it works" lines are deliberately left out
// pending Dr. Schutza. Head is set at the edge: functions/foot-capacity-system.js.

const CTA_HREF = "/lp/download";
const CTA_CLASS =
  "flex w-full min-h-[54px] items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-center text-white text-base sm:text-lg font-bold leading-snug transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";
const TRIAL_LINE = "Free for your first 7 check-ins, then choose a plan.";

const STEPS = [
  { num: "1", label: "Assess", body: "Answer a few quick questions to build your recovery plan." },
  { num: "2", label: "Follow Your Plan", body: "Get daily guidance based on how your foot feels." },
  { num: "3", label: "Track Progress", body: "See what's working and keep moving forward." },
];

const EVERY_PLAN = [
  "Complete 3-phase recovery program",
  "Daily guided exercises and video instruction",
  "Built-in guidance for flare-ups and tougher days",
  "Pain tracking and progress history",
  "Ask Dr. Jonathan AI for help with your program",
  "A plan that progresses with you",
];

const PLANS = [
  {
    title: "Recovery Plan",
    support: "The full FCS program with AI support.",
    price: "$47",
    period: "per month",
    lines: [
      "Bills monthly until cancelled.",
      "Cancel anytime, right inside the app.",
      "Does not include direct messaging with Dr. Jonathan.",
    ],
  },
  {
    title: "Ownership Plan",
    support: "$97/month × 6",
    price: "$97",
    period: "per month",
    lines: [
      "Total investment: $582",
      "Then lifetime FCS access, with no more monthly fees.",
      "Lifetime access requires all 6 monthly payments.",
      "Includes 6 months of direct messaging with Dr. Jonathan.",
    ],
  },
  {
    title: "Lifetime",
    support: "A complete recovery program yours for life.",
    price: "$297",
    period: "one time",
    lines: [
      "One payment. Secure checkout. No recurring fees.",
      "Includes Ask Dr. Jonathan AI, not direct personal communication with Dr. Jonathan.",
    ],
  },
  {
    title: "Premium Lifetime",
    support: "One payment. Yours for life.",
    price: "$497",
    period: "one time",
    lines: [
      "Lifetime FCS program access and future updates",
      "6 months of direct communication with Dr. Jonathan",
      "Ask Dr. Jonathan AI and your saved recovery history",
    ],
  },
];

function StartCta() {
  return (
    <div className="mt-6">
      <a href={CTA_HREF} className={CTA_CLASS}>
        Start My Free Recovery Plan →
      </a>
      <p className="mt-3 text-center text-slate-600 text-sm leading-snug">{TRIAL_LINE}</p>
      <p className="mt-1 text-center text-slate-500 text-sm leading-snug">No password to set up. No credit card.</p>
    </div>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <section className="rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-6">{children}</section>;
}

export default function FootCapacitySystem() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <div className="mx-auto w-full max-w-[600px] px-4 pt-7 sm:px-6 sm:pt-12">
        <div className="flex items-center gap-3.5">
          <a href="/" className="flex items-center gap-3.5">
            <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
            <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
          </a>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[600px] px-4 max-[359px]:px-3 pt-8 pb-12 sm:px-6 flex flex-col gap-5">
        {/* 1. Hero */}
        <div>
          <FunnelHero
            eyebrow="PLANS & PRICING"
            title="How The Foot Capacity System Works"
            body="A guided home recovery program for plantar fasciitis and heel pain, created by Dr. Jonathan Schutza, PT, DPT. Three phases over about 12 weeks, with daily guided exercises, pain tracking, flare-up guidance, and Ask Dr. Jonathan AI in the Foot Capacity System app."
          />
          <StartCta />
        </div>

        {/* 2. Start free */}
        <Panel>
          <SectionEyebrow>START FREE</SectionEyebrow>
          <div className="grid grid-cols-3 gap-4 text-center">
            {STEPS.map((step) => (
              <div key={step.num}>
                <div className="mx-auto mb-2 w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">{step.num}</div>
                <p className="text-slate-900 text-sm font-bold leading-snug">{step.label}</p>
                <p className="mt-1 text-slate-500 text-[13px] leading-snug">{step.body}</p>
              </div>
            ))}
          </div>
          <CardDivider />
          <p className="text-slate-900 text-[15px] font-bold leading-snug">Your progress is saved.</p>
          <p className="mt-1 text-slate-600 text-[15px] leading-snug">
            Every exercise, pain score, and check-in you've logged is saved and ready when you are.
          </p>
        </Panel>

        {/* 3. Every plan includes */}
        <Panel>
          <SectionEyebrow>EVERY PLAN INCLUDES</SectionEyebrow>
          <BenefitChecklist items={EVERY_PLAN} />
          <p className="mt-4 text-slate-700 text-[15px] font-semibold leading-snug">About 15 minutes a day.</p>
        </Panel>

        {/* 4. Choose your plan */}
        <div>
          <h2 className="text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-center mt-4 mb-1">
            Choose your plan
          </h2>
          <p className="text-center text-slate-600 text-[15px] leading-snug">
            You choose your plan inside the app after your 7 free check-ins.
          </p>
        </div>
        {PLANS.map((plan) => (
          <Panel key={plan.title}>
            <IconPlanHeader title={plan.title} support={plan.support} price={plan.price} period={plan.period} />
            <CardDivider />
            <BenefitChecklist items={plan.lines} />
          </Panel>
        ))}
        <PlanDisclosure>
          Direct communication with Dr. Jonathan is available for the first 6 months and is limited to program-related guidance.
        </PlanDisclosure>
        <HsaFsaStrip />
        <p className="text-center text-sm">
          <a href="/hsa-fsa" className="text-blue-600 font-semibold hover:underline">Paying with an HSA or FSA →</a>
        </p>

        {/* 5. How it works */}
        <Panel>
          <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
          <p className="text-slate-900 text-[15px] font-bold leading-snug">Three phases, about 12 weeks.</p>
          <p className="mt-3 text-slate-900 text-[15px] font-bold leading-snug">What if I have a flare-up?</p>
          <p className="mt-1 text-slate-600 text-[15px] leading-snug">
            Flare-ups are expected. The app doesn't punish them — it adjusts. There's a built-in Calm Mode that reduces load temporarily without losing your progress. You keep moving forward even on hard days.
          </p>
        </Panel>

        {/* 6. Guarantee */}
        <Panel>
          <p className="text-slate-900 text-[15px] font-semibold leading-snug">
            Every plan includes a 30-day money-back guarantee.
          </p>
          <p className="mt-2 text-sm">
            <a href="/refund-policy" className="text-blue-600 font-semibold hover:underline">Read the refund policy →</a>
          </p>
        </Panel>

        {/* 7. Who built it */}
        <Panel>
          <SectionEyebrow>WHO BUILT IT</SectionEyebrow>
          <p className="text-slate-700 text-[15px] leading-snug">
            Created by Dr. Jonathan Schutza, PT, DPT, a licensed physical therapist.
          </p>
          <p className="mt-2 text-sm">
            <a href="/dr-jonathan-schutza" className="text-blue-600 font-semibold hover:underline">View credentials and license details →</a>
          </p>
        </Panel>

        {/* 8. Safety */}
        <Panel>
          <SectionEyebrow>SAFETY</SectionEyebrow>
          <p className="text-slate-700 text-[15px] leading-snug">{RED_FLAG_INTRO}</p>
          <p className="mt-2 text-sm">
            <a href="/when-to-get-seen-in-person" className="text-blue-600 font-semibold hover:underline">See when to get seen in person →</a>
          </p>
        </Panel>

        {/* 9. Final CTA */}
        <div className="mt-4">
          <h2 className="text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-center">
            Ready to Start? Get Your Free Recovery Plan
          </h2>
          <StartCta />
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">
            © {new Date().getFullYear()} The Foot Capacity System. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 justify-center md:justify-end">
            <a href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-slate-600 transition-colors">Refund Policy</a>
            <a href="/eula" className="hover:text-slate-600 transition-colors">EULA</a>
            <a href="/dr-jonathan-schutza" className="hover:text-slate-600 transition-colors">About Dr. Schutza</a>
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
        <p className="max-w-5xl mx-auto px-6 mt-4 text-slate-400 text-xs text-center md:text-left">
          This program is for educational purposes and is not a substitute for personalized medical advice. Consult your healthcare provider before beginning any exercise program.
        </p>
        <p className="max-w-5xl mx-auto px-6 mt-2 text-slate-400 text-xs text-center md:text-left">
          <a href="/when-to-get-seen-in-person" className="underline hover:text-slate-600 transition-colors">When to get seen in person</a>
        </p>
      </footer>
    </div>
  );
}
