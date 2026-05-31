import { useState } from "react";

const MONTHLY_URL = "https://whop.com/checkout/plan_gbAoZNeVlXmgH";
const ONETIME_URL = "https://whop.com/checkout/plan_f7hnKFT1vq0zb";

type Plan = "monthly" | "onetime";

export default function Checkout() {
  const [selected, setSelected] = useState<Plan>("monthly");

  const checkoutUrl = selected === "monthly" ? MONTHLY_URL : ONETIME_URL;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6">
        <a href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
          <span className="text-slate-900 font-semibold text-base">The Foot Capacity System</span>
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">Choose Your Plan</p>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
            Start Your Recovery Today
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Choose the payment option that works best for you. Both plans include full access to the complete Foot Capacity System.
          </p>
        </div>

        {/* Plan cards */}
        <div className="space-y-4 mb-8">

          {/* Monthly plan — default */}
          <button
            type="button"
            onClick={() => setSelected("monthly")}
            className={`w-full text-left rounded-2xl border-2 p-6 transition-all relative ${
              selected === "monthly"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            {/* Most Popular badge */}
            <div className="absolute -top-3 left-6">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 mt-1">
              <div className="flex items-start gap-3">
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  selected === "monthly" ? "border-blue-600" : "border-slate-300"
                }`}>
                  {selected === "monthly" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-base mb-1">Pay Monthly</p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    3 monthly payments. First charge today, then at 30 and 60 days.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-slate-900 font-bold text-2xl leading-none">$157</p>
                <p className="text-slate-500 text-xs mt-1">per month</p>
              </div>
            </div>
          </button>

          {/* One-time plan */}
          <button
            type="button"
            onClick={() => setSelected("onetime")}
            className={`w-full text-left rounded-2xl border-2 p-6 transition-all ${
              selected === "onetime"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  selected === "onetime" ? "border-blue-600" : "border-slate-300"
                }`}>
                  {selected === "onetime" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-base mb-1">
                    Pay In Full
                    <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      Save $74
                    </span>
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    One payment. Save $74 compared to the monthly plan.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-slate-900 font-bold text-2xl leading-none">$397</p>
                <p className="text-slate-500 text-xs mt-1">one time</p>
              </div>
            </div>
          </button>

        </div>

        {/* CTA Button */}
        <a
          href={checkoutUrl}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 rounded-xl text-center transition-colors mb-4"
          onClick={() => window.gtag?.('event', 'checkout_click', {
            event_category: 'conversion',
            event_label: `checkout_bridge_${selected}`,
          })}
        >
          {selected === "monthly"
            ? "Get Started — $157/month →"
            : "Get Started — $397 One Time →"}
        </a>

        {/* Trust row */}
        <div className="flex justify-center gap-5 text-xs text-slate-400 mb-10">
          <span>🛡️ 30-Day Guarantee</span>
          <span>🔒 Secure Checkout</span>
          <span>♾️ Lifetime Access</span>
        </div>

        {/* Secondary link */}
        <div className="text-center mt-8">
          <a href="/" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">
            Return to fixyourmovement.com
          </a>
        </div>

      </main>
    </div>
  );
}