import type { ReactNode } from "react";
import { Activity, ClipboardCheck, HeartPulse, Info, ShieldCheck, Stethoscope, TrendingUp, type LucideIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import { BenefitChecklist, CardDivider, IconPlanHeader, PlanDisclosure, SectionEyebrow } from "@/components/checkout/OfferPieces";
import { RED_FLAG_INTRO } from "@/lib/redFlags";

// Public explainer + plans page. 2026-11-19 rewrite to Matt's approved spec "Don't Buy It Yet. Try It
// First." (Downloads/pricing-page-try-it-first.md): the page shows prices but NEVER a buy link — the
// only purchase path is the in-app pay gate after 7 check-ins. Non-members never see /checkout
// (Charles 5), so this page never links to it. Every CTA is a plain anchor to /lp/download with no
// ?source= (SourceCapture's write-once first-source cookie must not be muddied) — unchanged.
// Prices/terms match the /checkout wizard ($47, $97 x 6 = $582, $297, $497; messaging on $97/$497).
// Safety text is RED_FLAG_INTRO, word for word. No equipment line (pending Dr. Schutza).
// Head is set at the edge: functions/foot-capacity-system.js (title unchanged).

const CTA_HREF = "/lp/download";
const CTA_CLASS =
  "flex w-full min-h-[54px] items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-center text-white text-base sm:text-lg font-bold leading-snug transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";
const LINK_CLASS = "text-blue-600 font-semibold hover:underline";
// Returning-user line (Matt's addendum A, 2026-11-19, revised): links to the app's own "Get Your
// Sign-In Link" page (/get-access), which emails a fresh sign-in link and offers "Open the App"; once
// signed in, the pay gate offers the plans. NOT a buy link — never /checkout or Whop.
const APP_URL = "https://app.fixyourmovement.com/get-access";

const HERO_POINTS: [string, string][] = [
  ["Start free.", "Your first 7 check-ins are on us."],
  ["Go at your own pace.", "Your check-ins don't have to be on consecutive days."],
  ["Then decide.", "See the prices below, then choose a plan inside the app if it's working for you."],
];

const STEPS: { icon: LucideIcon; label: string; body: string }[] = [
  { icon: ClipboardCheck, label: "Assess", body: "Answer a few quick questions to build your recovery plan." },
  { icon: Activity, label: "Follow Your Plan", body: "Get daily guidance based on how your foot feels. About 15 minutes a day." },
  {
    icon: TrendingUp,
    label: "Track Progress",
    body: "See what's working and keep moving forward. Everything you log during your free check-ins carries over when you choose a plan.",
  },
];

const TRY_FREE = [
  "The complete 3-phase recovery program, at your own pace",
  "Daily guided exercises with video instruction",
  "Built-in guidance for flare-ups and tougher days",
  "Pain tracking and your full progress history",
  "Ask Dr. Jonathan AI for help with your program",
  "A plan that progresses as your foot gets stronger",
];

const YOURS = "Yours to come back to, anytime your feet need it.";

const PLANS = [
  {
    title: "Recovery Plan",
    support: "The full program with Ask Dr. Jonathan AI.",
    price: "$47",
    period: "per month",
    lead: null,
    lines: ["Billed monthly. Cancel anytime, right inside the app.", "Does not include direct messaging with Dr. Jonathan."],
  },
  {
    title: "Ownership Plan",
    support: "Pay over 6 months, then it's yours for life.",
    price: "$97",
    period: "per month",
    lead: YOURS,
    lines: [
      "$582 total over 6 payments, then no more monthly fees.",
      "Lifetime access requires all 6 monthly payments.",
      "Includes 6 months of direct messaging with Dr. Jonathan.",
    ],
  },
  {
    title: "Lifetime",
    support: "The complete program, yours for life.",
    price: "$297",
    period: "one time",
    lead: YOURS,
    lines: ["One payment. No recurring fees.", "Includes Ask Dr. Jonathan AI, not direct messaging with Dr. Jonathan."],
  },
  {
    title: "Premium Lifetime",
    support: "Lifetime access, plus 6 months with Dr. Jonathan.",
    price: "$497",
    period: "one time",
    lead: YOURS,
    lines: [
      "Lifetime program access and future updates.",
      "6 months of direct messaging with Dr. Jonathan.",
      "Ask Dr. Jonathan AI and your saved recovery history.",
    ],
  },
];

function StartCta() {
  return (
    <a href={CTA_HREF} className={CTA_CLASS}>
      Start My Free Recovery Plan →
    </a>
  );
}

function ReturningUserLine() {
  return (
    <p className="mt-2 text-center text-slate-400 text-[13px] italic leading-snug">
      Already finished your free check-ins?{" "}
      <a href={APP_URL} className="underline hover:text-slate-600">Open the Foot Capacity System app</a> to choose your plan. Your progress is saved and waiting.
    </p>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <section className="rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-6">{children}</section>;
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center" aria-hidden="true">
      <Icon className="w-6 h-6 text-blue-600" strokeWidth={2} />
    </div>
  );
}

function TrustCard({ icon, eyebrow, body, href, link }: { icon: LucideIcon; eyebrow: string; body: string; href: string; link: string }) {
  return (
    <Panel>
      <div className="flex items-start gap-3">
        <IconTile icon={icon} />
        <div className="min-w-0">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <p className="text-slate-700 text-[15px] leading-snug">{body}</p>
          <p className="mt-2 text-sm">
            <a href={href} className={LINK_CLASS}>{link}</a>
          </p>
        </div>
      </div>
    </Panel>
  );
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

      <main className="mx-auto w-full max-w-[600px] px-4 max-[359px]:px-3 pt-6 pb-12 sm:px-6 sm:pt-8 flex flex-col gap-5">
        {/* 1. Hero */}
        <header>
          <p className="text-center text-blue-600 text-xs font-bold uppercase tracking-[0.12em] leading-snug mb-2.5">PLANS &amp; PRICING</p>
          <h1 className="text-center text-slate-900 text-[30px] sm:text-4xl font-extrabold tracking-tight leading-[1.12] mb-3">
            Don't Buy It Yet.
            <br />
            <span className="text-blue-600">Try It First.</span>
          </h1>
          <p className="text-center text-slate-600 text-base sm:text-[17px] leading-normal">
            There's no buy button on this page, and that's on purpose. We're confident in the Foot Capacity System, Dr. Jonathan Schutza's guided home program for plantar fasciitis and heel pain, and we'd rather you experience it before you spend a dollar.
          </p>
          <ul className="mt-4 space-y-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-5">
            {HERO_POINTS.map(([lead, rest]) => (
              <li key={lead} className="grid grid-cols-[22px_minmax(0,1fr)] gap-x-3 items-start">
                <span className="mt-px w-[22px] h-[22px] rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center" aria-hidden="true">✓</span>
                <span className="text-slate-800 text-[15px] leading-snug">
                  <strong>{lead}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <StartCta />
            <p className="mt-3 text-center text-slate-500 text-sm leading-snug">No credit card. No password. No countdown clock.</p>
            <ReturningUserLine />
          </div>
        </header>

        {/* 2. How it works */}
        <section className="mt-4">
          <h2 className="text-center text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-4">How It Works</h2>
          <div className="flex flex-col gap-3">
            {STEPS.map((step) => (
              <div key={step.label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-5">
                <IconTile icon={step.icon} />
                <div className="min-w-0">
                  <p className="text-slate-900 text-[15px] font-bold leading-snug">{step.label}</p>
                  <p className="mt-0.5 text-slate-600 text-[15px] leading-snug">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Try everything free */}
        <Panel>
          <SectionEyebrow>TRY EVERYTHING FREE</SectionEyebrow>
          <p className="text-slate-900 text-[15px] font-bold leading-snug mb-3">Your 7 free check-ins unlock the full system.</p>
          <BenefitChecklist items={TRY_FREE} />
          <p className="mt-4 text-slate-600 text-[15px] italic leading-snug">Every plan includes all of the above.</p>
        </Panel>

        {/* 4a. Info box */}
        <section className="mt-4 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
          <Info className="w-6 h-6 shrink-0 text-blue-600 mt-0.5" strokeWidth={2} aria-hidden="true" />
          <div className="min-w-0">
            <h2 className="text-slate-900 text-lg font-bold leading-tight">Here Are Our Prices. But First, Give Us a Try.</h2>
            <p className="mt-2 text-slate-700 text-[15px] leading-snug">
              We believe you should experience the program before deciding whether it's worth your money. Start with your 7 free check-ins, explore the exercises, and track your progress at your own pace. After your seventh check-in, you'll choose a plan inside the app.
            </p>
            <p className="mt-2 text-slate-900 text-[15px] font-bold leading-snug">
              See the prices now. Experience the program first. Decide afterward.
            </p>
          </div>
        </section>

        {/* 4b. Lifetime line */}
        <p className="text-slate-700 text-[15px] leading-snug px-1">
          <strong className="text-slate-900">Keep Dr. Jonathan's program in your pocket.</strong> This isn't a course you finish and lose. With an ownership or lifetime plan, it stays on your phone, ready whenever your feet need it: after a flare-up, before a new activity, or years from now.
        </p>

        {/* 4c. Price cards — no buttons */}
        {PLANS.map((plan) => (
          <Panel key={plan.title}>
            <IconPlanHeader title={plan.title} support={plan.support} price={plan.price} period={plan.period} />
            <CardDivider />
            {plan.lead && (
              <div className="mb-2.5 grid grid-cols-[22px_minmax(0,1fr)] gap-x-3 items-start">
                <span className="mt-px w-[22px] h-[22px] rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center" aria-hidden="true">✓</span>
                <span className="text-slate-900 text-[15px] font-bold leading-snug">{plan.lead}</span>
              </div>
            )}
            <BenefitChecklist items={plan.lines} />
          </Panel>
        ))}
        <PlanDisclosure>
          Direct messaging with Dr. Jonathan is available for the first 6 months and is limited to program-related guidance.
        </PlanDisclosure>

        {/* 5. HSA/FSA */}
        <section className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-center">
          <p className="flex items-center justify-center gap-2 text-slate-900 text-sm font-bold leading-snug">
            <span className="w-5 h-5 shrink-0 rounded bg-green-500 flex items-center justify-center text-white text-xs" aria-hidden="true">✓</span>
            HSA/FSA funds may be eligible*
          </p>
          <p className="mt-1 text-slate-600 text-[13px] leading-snug">
            When you choose a plan after your free check-ins, you'll receive a receipt with provider information to help with reimbursement. Check with your plan administrator to confirm eligibility.
          </p>
          <p className="mt-2 text-sm">
            <a href="/hsa-fsa" className={LINK_CLASS}>How HSA/FSA reimbursement works →</a>
          </p>
        </section>

        {/* 6. What to expect */}
        <Panel>
          <SectionEyebrow>WHAT TO EXPECT</SectionEyebrow>
          <p className="text-slate-900 text-[15px] font-bold leading-snug">Three phases, at your own pace.</p>
          <p className="mt-1 text-slate-600 text-[15px] leading-snug">
            The three phases are designed to take about 12 weeks. That's a starting point, not a finish line.
          </p>
          <p className="mt-3 text-slate-900 text-[15px] font-bold leading-snug">What if I have a flare-up?</p>
          <p className="mt-1 text-slate-600 text-[15px] leading-snug">
            Flare-ups are expected. The app doesn't punish them, it adjusts. A built-in Calm Mode temporarily reduces the load without losing your progress, so you keep moving forward even on hard days.
          </p>
        </Panel>

        {/* 7. Trust cards */}
        <TrustCard
          icon={ShieldCheck}
          eyebrow="30-DAY MONEY-BACK GUARANTEE"
          body="Try it free first. If you decide to buy, you're still covered by a 30-day money-back guarantee."
          href="/refund-policy"
          link="Read the refund policy →"
        />
        <TrustCard
          icon={Stethoscope}
          eyebrow="WHO BUILT IT"
          body="Created by Dr. Jonathan Schutza, PT, DPT, a licensed physical therapist who specializes in foot and ankle rehabilitation."
          href="/dr-jonathan-schutza"
          link="View credentials and license details →"
        />
        <TrustCard
          icon={HeartPulse}
          eyebrow="SAFETY"
          body={RED_FLAG_INTRO}
          href="/when-to-get-seen-in-person"
          link="See when to get seen in person →"
        />

        {/* 8. Closing */}
        <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-8 sm:px-8 text-center">
          <h2 className="text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            You've Seen the Prices.
            <br />
            <span className="text-blue-600">Now See the Program.</span>
          </h2>
          <p className="mt-3 text-slate-900 text-[15px] font-semibold leading-snug">No insurance approval. No copays. No clinic visits.</p>
          <p className="mt-1 text-slate-600 text-[15px] leading-snug">
            Start with 7 free check-ins, explore the guided exercises, and see whether this at-home approach fits your life.
          </p>
          <div className="mt-5">
            <StartCta />
          </div>
          <p className="mt-3 text-slate-900 text-[15px] font-bold leading-snug">Nothing to buy today. Just your first step.</p>
          <ReturningUserLine />
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
