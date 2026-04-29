import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tiers = [
  {
    image: "/images/TIER1.jpg",
    alt: "Tier 1 — The Blueprint: complete 12-week self-guided foot capacity program",
    label: "Follow the Blueprint →",
    href: "https://whop.com/checkout/plan_Kb2UZ3Iqj7Vn9",
  },
  {
    image: "/images/TIER2.jpg",
    alt: "Tier 2 — The Guided Recovery System: app-guided daily progression with adaptive tracking",
    label: "Get the Guided System →",
    href: "https://whop.com/checkout/plan_f7hnKFT1vq0zb",
  },
  {
    image: "/images/TIER3.jpg",
    alt: "Tier 3 — Private Recovery Access: direct 1-on-1 oversight with Dr. Jonathan",
    label: "Get Direct Access to Dr. Jonathan →",
    href: "https://whop.com/checkout/plan_g6WVNs6annwO6",
  },
];

const trustBadges = [
  { emoji: "🛡", label: "90-Day Guarantee", sub: "Follow it or get a full refund." },
  { emoji: "✅", label: "Evidence-Based Progression", sub: "Built on science. Designed for real results." },
  { emoji: "👟", label: "Built for Real-World Movement", sub: "Stronger feet. Lasting change." },
];

const ChooseYourPlan2 = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* Page heading */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl text-primary mb-4 leading-tight">
              Choose Your Path to Stronger, Pain-Free Movement
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
              Every tier rebuilds foot capacity. The difference is how guided, personalized, and accelerated your
              recovery becomes.
            </p>
          </div>

          {/* Tier grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
            {tiers.map((tier, i) => (
              <div key={i}>
                <img
                  src={tier.image}
                  alt={tier.alt}
                  width="100%"
                  height="auto"
                  loading="lazy"
                  style={{ display: "block" }}
                />
                <a
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-800 hover:bg-teal-900 text-white text-lg font-bold w-full mt-4 flex items-center justify-center gap-2 transition-colors rounded-xl py-4 px-6 font-body"
                >
                  {tier.label}
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </a>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-start gap-3 text-center md:text-left justify-center md:justify-start">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{badge.emoji}</span>
                <div>
                  <p className="font-display font-bold text-primary text-base">{badge.label}</p>
                  <p className="text-muted-foreground font-body text-sm mt-0.5">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChooseYourPlan2;
