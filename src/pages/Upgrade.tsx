import { useEffect } from "react";
import logo from "@/assets/logo.png";

// /upgrade — single-CTA $97/mo upgrade page (SPEC-checkout-upsell-funnel-and-comms §7).
// Reached from the app's Messages "Send Dr. Jonathan a Question" button when the member's
// plan does not include doctor messaging (profiles.can_message_doctor = false).
// ALL COPY BELOW IS TEMP COPY [team/Dr-J to replace before public launch].

const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";
const UPGRADE_URL = "https://whop.com/checkout/plan_myAABQ8dqq8W3";

export default function Upgrade() {
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

  function goToWhop() {
    window.gtag?.("event", "checkout_click", {
      event_category: "conversion",
      event_label: "checkout_bridge_97mo",
    });
    window.location.href = UPGRADE_URL;
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-xl mx-auto px-5 py-12">

        {/* TEMP COPY [team/Dr-J] */}
        <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3 text-center">
            Upgrade to message Dr. Schutza
          </h1>
          <p className="text-slate-600 text-base leading-relaxed mb-6 text-center">
            Your plan includes the Coach AI. Upgrade to $97/mo to message Dr. Schutza directly.
          </p>
          <button
            type="button"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl text-center transition-colors"
            onClick={goToWhop}
          >
            Upgrade to $97/mo →
          </button>
        </div>

        {/* Trust strip */}
        <div className="flex justify-center gap-5 text-xs text-slate-400 mb-8">
          <span>🛡️ 30-Day Guarantee</span>
          <span>🔒 Secure Checkout</span>
          <span>↩️ Cancel Monthly Anytime</span>
        </div>

        <div className="flex justify-center">
          <img src={logo} alt="FCS" className="h-10 w-auto" />
        </div>

      </main>
    </div>
  );
}
