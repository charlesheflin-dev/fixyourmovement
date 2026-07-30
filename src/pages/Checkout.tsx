import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";
const MONTHLY_URL = "https://whop.com/checkout/plan_myAABQ8dqq8W3";
const ONETIME_URL = "https://whop.com/checkout/plan_f7hnKFT1vq0zb";

type Plan = "monthly" | "onetime";

export default function Checkout() {
  const isSave50 = new URLSearchParams(window.location.search).get("offer") === "save50";
  const [selected, setSelected] = useState<Plan>(isSave50 ? "monthly" : "onetime");
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText("RECOVER50").then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {}
    );
  };

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

  const checkoutUrl = selected === "monthly" ? MONTHLY_URL : ONETIME_URL;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-xl mx-auto px-5 py-12">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">ONE SYSTEM. TWO WAYS TO JOIN.</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            Start Building Stronger Feet Today
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Choose the option that fits your recovery journey.
          </p>
          <p className="text-slate-500 text-base leading-relaxed mt-3">
            Both options include the complete Foot Capacity System. Simply choose whether you'd rather pay monthly or own it for life.
          </p>
        </div>

        {/* HSA/FSA information card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
          <span className="inline-block bg-green-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mb-4">
            ✓ HSA / FSA ELIGIBLE*
          </span>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 hidden sm:flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3a1 1 0 0 1 1-1z" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="9" y1="16" x2="13" y2="16" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 font-extrabold text-xl leading-snug mb-2">HSA or FSA? Start here.</p>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                Many people don't realize they may be able to use HSA or FSA funds for the Foot Capacity System. Learn how reimbursement typically works, what documentation you'll receive, and what to expect before you purchase.
              </p>
              <a
                href="https://fixyourmovement.com/hsa-fsa"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'hsa_fsa_click', { event_category: 'engagement', event_label: 'checkout_hsa_card' })}
                className="inline-flex items-center gap-1 text-blue-600 font-semibold text-base hover:text-blue-700 transition-colors"
              >
                Learn How HSA/FSA Works →
              </a>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-5 pt-4">
            <p className="text-slate-500 text-xs leading-relaxed">
              *Eligibility and reimbursement are determined by your individual plan and benefits administrator.
            </p>
          </div>
        </div>

        {/* Plan cards */}
        <div className="space-y-4 mb-6">

          {/* Lifetime Access */}
          <button
            type="button"
            aria-pressed={selected === "onetime"}
            onClick={() => setSelected("onetime")}
            className={`w-full text-left rounded-2xl border-2 p-6 transition-all relative ${
              selected === "onetime"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            {/* Our Recommendation badge */}
            <div className="absolute -top-3 left-5">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                ⭐ OUR RECOMMENDATION
              </span>
            </div>

            <div className="flex items-start gap-4 mt-1">
              {/* Radio */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                selected === "onetime" ? "border-blue-600" : "border-slate-300"
              }`}>
                {selected === "onetime" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                selected === "onetime" ? "bg-blue-100" : "bg-slate-100"
              }`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={selected === "onetime" ? "#2563EB" : "#94A3B8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-slate-900 font-extrabold text-lg leading-snug">Lifetime Access</p>
                  <div className="text-right shrink-0">
                    <p className={`font-extrabold text-3xl leading-none ${selected === "onetime" ? "text-blue-600" : "text-slate-900"}`}>$397</p>
                    <p className={`text-xs font-semibold mt-0.5 ${selected === "onetime" ? "text-blue-500" : "text-slate-500"}`}>one time</p>
                  </div>
                </div>
                <p className="text-slate-800 text-sm font-semibold leading-relaxed mt-2">
                  One payment. Lifetime access. Every future update included.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  Return whenever you need it, revisit any phase, and keep the Foot Capacity System for life.
                </p>
              </div>
            </div>
          </button>

          {/* Monthly Recovery Plan */}
          <button
            type="button"
            aria-pressed={selected === "monthly"}
            onClick={() => setSelected("monthly")}
            className={`w-full text-left rounded-2xl border-2 p-6 transition-all relative ${
              selected === "monthly"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            {/* Most Flexible badge */}
            <div className="absolute -top-3 left-5">
              <span className="bg-slate-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Flexible
              </span>
            </div>

            <div className="flex items-start gap-4 mt-1">
              {/* Radio */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                selected === "monthly" ? "border-blue-600" : "border-slate-300"
              }`}>
                {selected === "monthly" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                selected === "monthly" ? "bg-blue-100" : "bg-slate-100"
              }`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={selected === "monthly" ? "#2563EB" : "#94A3B8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-slate-900 font-extrabold text-lg leading-snug">Monthly Recovery Plan</p>
                  <div className="text-right shrink-0">
                    <p className={`font-extrabold text-3xl leading-none ${selected === "monthly" ? "text-blue-600" : "text-slate-900"}`}>$97</p>
                    <p className={`text-xs font-semibold mt-0.5 ${selected === "monthly" ? "text-blue-500" : "text-slate-500"}`}>per month</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mt-2">
                  Begin your recovery today with the flexibility to continue month by month.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-2 mb-4">
                  Cancel anytime, or continue until you've reached your goals.
                </p>
                <div className={`border-t pt-4 ${selected === "monthly" ? "border-blue-200" : "border-slate-100"}`}>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="text-slate-600 text-sm leading-relaxed">
                      <p className="font-semibold text-slate-800 mb-1">Unlike most subscriptions, yours won't continue forever.</p>
                      <p className="italic">If your recovery journey takes six months, you'll keep the Foot Capacity System without an ongoing monthly plan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

        </div>

        {/* $50-off code card (medium offer, monthly only) */}
        {isSave50 && selected === "monthly" && (
          <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-5 mb-6">
            <p className="text-blue-900 font-bold text-sm uppercase tracking-wide mb-2">Your $50-Off Code</p>
            <div className="flex items-center gap-3 mb-3">
              <code className="flex-1 bg-white border border-blue-200 rounded-lg px-4 py-3 text-blue-900 font-mono font-bold text-lg tracking-wider">RECOVER50</code>
              <button
                type="button"
                onClick={copyCode}
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-blue-800 text-sm leading-relaxed">
              Paste this on the checkout page to take $50 off your first month — your first 30 days for <span className="font-bold">$47</span>, then $97/mo until you recover, cancel anytime with a single click in the app.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={checkoutUrl}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl text-center transition-colors mb-4"
          onClick={() => window.gtag?.('event', 'checkout_click', {
            event_category: 'conversion',
            event_label: `checkout_bridge_${selected}`,
          })}
        >
          {selected === "monthly"
            ? "Continue Monthly — $97/month →"
            : "Unlock Lifetime Access — $397 →"}
        </a>

        {isSave50 && selected === "monthly" && (
          <p className="text-center text-blue-700 text-sm font-semibold mb-4">
            Don't forget to paste RECOVER50 on the checkout page.
          </p>
        )}

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