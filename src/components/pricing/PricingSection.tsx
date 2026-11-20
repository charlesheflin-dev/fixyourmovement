import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { BenefitChecklist, CardDivider, IconPlanHeader, PlanDisclosure } from "@/components/checkout/OfferPieces";

// Prices section of /foot-capacity-system (info box, lifetime line, 4 price cards, messaging footnote,
// HSA/FSA box). Extracted 2026-11-19 so the /lp/download + /lp/cold-start FAQ "How much does it cost"
// modal shows exactly what the pricing page shows. NO buy buttons, ever: the only purchase path is the
// in-app pay gate after 7 check-ins. Prices/terms must match the /checkout wizard + pay gate
// ($47; $97 x 6 = $582; $297; $497; messaging on $97/$497). Renders a fragment: the parent supplies the
// vertical gap (flex-col gap-5).

const LINK_CLASS = "text-blue-600 font-semibold hover:underline";

function Panel({ children }: { children: ReactNode }) {
  return <section className="rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-6">{children}</section>;
}

const YOURS = "Yours to come back to, anytime your feet need it.";

const PLANS = [
  {
    title: "Recovery Plan",
    support: "The full program with the AI Coach.",
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
    lines: ["One payment. No recurring fees.", "Includes the AI Coach, not direct messaging with Dr. Jonathan."],
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
      "The AI Coach and your saved recovery history.",
    ],
  },
];

export default function PricingSection() {
  return (
    <>
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
    </>
  );
}
