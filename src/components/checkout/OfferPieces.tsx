import type { ReactNode } from "react";
import { Calendar, Check } from "lucide-react";
import logo from "@/assets/logo.png";

// Presentational building blocks for the /checkout wizard offer steps.
// Built for Step 1 ($47) to the approved mockup; Steps 2/3 can adopt them in a later pass.
// NO logic, routing, analytics or billing lives here — callers pass the handlers.
// Tokens: FCS blue #2563EB (blue-600 / tailwind `blue.DEFAULT`), navy #0F172A (slate-900,
// --foreground), muted #64748B (slate-500, --muted-foreground), panel #EFF6FF (blue-50 /
// `blue.light`). Font: Inter (site font). Sizes are explicit because the global body style
// sets 18px / line-height 1.7.

export function FunnelShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[600px] px-4 max-[359px]:px-3 pt-7 pb-10 sm:px-6 sm:pt-12 flex flex-col gap-5">
      {children}
    </main>
  );
}

export function FunnelHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="text-center">
      <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.12em] leading-snug mb-2.5">
        {eyebrow}
      </p>
      <h1 className="text-slate-900 text-[28px] sm:text-4xl font-extrabold tracking-tight leading-[1.15] mb-3">
        {title}
      </h1>
      <p className="text-slate-600 text-base sm:text-[17px] leading-normal max-w-md mx-auto">{body}</p>
    </header>
  );
}

function ProgressBarsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="text-blue-600">
      <rect x="3" y="13" width="4.5" height="8" rx="1.2" fill="currentColor" />
      <rect x="9.75" y="8.5" width="4.5" height="12.5" rx="1.2" fill="currentColor" />
      <rect x="16.5" y="3.5" width="4.5" height="17.5" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function SavedProgressPanel({ heading, body, closing }: { heading: string; body: string; closing: string }) {
  return (
    <section className="flex gap-4 rounded-2xl bg-blue-50 p-4 sm:p-5">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center">
        <ProgressBarsIcon />
      </div>
      <div className="min-w-0">
        <p className="text-slate-900 text-lg font-bold leading-tight mb-1">{heading}</p>
        <p className="text-slate-600 text-[15px] leading-snug mb-1.5">{body}</p>
        <p className="text-blue-600 text-[15px] font-bold leading-snug">{closing}</p>
      </div>
    </section>
  );
}

export function BenefitChecklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        // Grid keeps wrapped lines aligned under the text, not the icon.
        <li key={item} className="grid grid-cols-[22px_minmax(0,1fr)] gap-x-3 items-start">
          <span className="mt-px w-[22px] h-[22px] rounded-full bg-blue-600 flex items-center justify-center" aria-hidden="true">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.25} />
          </span>
          <span className="text-slate-800 text-[15px] leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function OfferCard({
  ribbon,
  title,
  support,
  price,
  period,
  benefits,
  ctaLabel,
  onCta,
  reassurance,
}: {
  ribbon: string;
  title: string;
  support: string;
  price: string;
  period: string;
  benefits: string[];
  ctaLabel: string;
  onCta: () => void;
  reassurance: string[];
}) {
  return (
    <section className="relative mt-3 rounded-[18px] border-2 border-blue-600 bg-white px-4 max-[359px]:px-3.5 pt-7 pb-5 sm:px-6">
      <span className="absolute -top-[13px] left-4 sm:left-5 rounded-full bg-blue-600 px-3 py-1 text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.08em] leading-none whitespace-nowrap">
        {ribbon}
      </span>

      <div className="flex items-start gap-3 max-[359px]:gap-2.5">
        <div className="w-11 h-11 max-[359px]:w-9 max-[359px]:h-9 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center" aria-hidden="true">
          <Calendar className="w-6 h-6 max-[359px]:w-5 max-[359px]:h-5 text-blue-600" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-slate-900 text-lg sm:text-xl font-bold leading-tight">{title}</h2>
          <p className="text-slate-500 text-sm leading-snug mt-1">{support}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-blue-600 text-[40px] max-[359px]:text-[34px] sm:text-[44px] font-extrabold leading-none tracking-tight">{price}</p>
          <p className="text-slate-500 text-sm leading-tight mt-1">{period}</p>
        </div>
      </div>

      <div className="my-4 h-px bg-slate-200" />

      <BenefitChecklist items={benefits} />

      <button
        type="button"
        onClick={onCta}
        className="mt-5 flex w-full min-h-[54px] items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-center text-white text-base sm:text-lg font-bold leading-snug transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
      >
        <span>
          {ctaLabel}
          <span aria-hidden="true">&nbsp;→</span>
        </span>
      </button>

      <div className="mt-3 text-center text-slate-500 text-[13px] max-[359px]:text-xs leading-snug space-y-0.5">
        {reassurance.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}

export function HsaFsaStrip() {
  return (
    <section className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-center">
      <p className="flex items-center justify-center gap-2 text-slate-900 text-sm font-bold leading-snug">
        <span className="w-5 h-5 shrink-0 rounded bg-green-500 flex items-center justify-center" aria-hidden="true">
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.25} />
        </span>
        HSA/FSA funds may be eligible*
      </p>
      <p className="mt-1 text-slate-500 text-[13px] leading-snug">
        Check with your plan administrator to determine your eligibility.
      </p>
    </section>
  );
}

export function GuaranteeCard() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 flex items-center justify-center" aria-hidden="true">
          {/* Same shield glyph as the existing checkout guarantee. */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-slate-900 text-base font-bold leading-snug">Walk Pain Free, Or It's Free</p>
          <p className="text-blue-600 text-sm font-semibold leading-snug">30-Day Money-Back Guarantee</p>
        </div>
        {/* Existing FCS logo asset, unchanged (src/assets/logo.png — same file the live checkout uses). */}
        <img src={logo} alt="FCS" className="h-10 w-auto shrink-0" />
      </div>
      <p className="mt-3 text-center text-slate-600 text-sm leading-relaxed">
        Try the Foot Capacity System for 30 days. If it's not the right fit, simply email us within 30 days and we'll refund your investment. No complicated forms. No hoops to jump through.
      </p>
    </section>
  );
}

export function PlanDisclosure({ children }: { children: ReactNode }) {
  return <p className="px-2 text-center text-slate-500 text-[13px] leading-snug">{children}</p>;
}
