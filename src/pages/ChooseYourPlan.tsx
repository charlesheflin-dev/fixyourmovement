import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tiers = [
  {
    id: "t1",
    name: "The Foot Capacity Blueprint",
    price: "$247",
    badge: null,
    badgeStyle: null,
    checkoutUrl: "https://whop.com/checkout/plan_Kb2UZ3Iqj7Vn9",
    ctaLabel: "Start With the Blueprint →",
    image: "/images/T1.jpg",
    highlight: false,
    features: [
      "Complete 12-week Foot Capacity System",
      "Full video library — every exercise demonstrated",
      "Weekly progression templates",
      "Load management frameworks",
      "Private web-based training portal with lifetime access",
      "Walk Pain-Free or It's Free — 90-Day Guarantee",
    ],
  },
  {
    id: "t2",
    name: "The Guided Recovery System",
    price: "$397",
    badge: "MOST POPULAR",
    badgeStyle: "amber",
    checkoutUrl: "https://whop.com/checkout/plan_f7hnKFT1vq0zb",
    ctaLabel: "Get the Guided System →",
    image: "/images/T2.jpg",
    highlight: true,
    features: [
      "Everything in the Blueprint, plus:",
      "Full access to the Foot Capacity app",
      "Signal-based progression — advance when your body is ready",
      "Daily pain and activity tracking",
      "Visual progress dashboard",
      "Ongoing system refinements from Dr. Jonathan",
      "Walk Pain-Free or It's Free — 90-Day Guarantee",
    ],
  },
  {
    id: "t3",
    name: "Private Recovery Access",
    price: "$697",
    badge: "LIMITED TO 10 SPOTS",
    badgeStyle: "navy",
    checkoutUrl: "https://whop.com/checkout/plan_g6WVNs6annwO6",
    ctaLabel: "Apply for Private Access →",
    image: "/images/T3.jpg",
    highlight: false,
    features: [
      "Everything in the Guided Recovery System, plus:",
      "Six private 30-minute sessions with Dr. Jonathan",
      "Two additional sessions post-program",
      "Active case monitoring — issues flagged before they become setbacks",
      "Case-specific modifications based on your diagnosis and history",
      "Direct access to the expert who built the system",
      "Walk Pain-Free or It's Free — 90-Day Guarantee",
    ],
  },
];

const trustBadges = [
  {
    emoji: "🛡",
    label: "90-Day Guarantee",
    sub: "Follow it or get a full refund.",
  },
  {
    emoji: "✓",
    label: "Evidence-Based Progression",
    sub: "Built on science. Designed for real results.",
  },
  {
    emoji: "👟",
    label: "Built for Real-World Movement",
    sub: "Stronger feet. Lasting change.",
  },
];

const TierCard = ({
  tier,
  orderClass,
}: {
  tier: (typeof tiers)[number];
  orderClass: string;
}) => {
  const isHighlight = tier.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: isHighlight ? 0.05 : tier.id === "t1" ? 0.15 : 0.25 }}
      className={`flex flex-col ${orderClass} ${
        isHighlight ? "md:scale-105 md:z-10" : ""
      }`}
    >
      <div
        className={`section-card overflow-hidden flex flex-col flex-1 ${
          isHighlight
            ? "border-2 border-amber-400 shadow-2xl"
            : tier.badgeStyle === "navy"
            ? "border border-border"
            : "border border-border"
        }`}
      >
        {/* Badge */}
        {tier.badge && (
          <div
            className={`w-full text-center font-body font-bold text-xs tracking-widest uppercase py-2.5 px-4 ${
              tier.badgeStyle === "amber"
                ? "bg-amber-500 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {tier.badge}
          </div>
        )}

        {/* Tier Image */}
        <img
          src={tier.image}
          alt={tier.name}
          className="w-full object-cover aspect-video"
        />

        {/* Content */}
        <div className="p-6 md:p-7 flex flex-col flex-1">
          {/* Name & Price */}
          <h2
            className={`font-display font-bold text-xl mb-1 ${
              isHighlight ? "text-primary" : "text-foreground"
            }`}
          >
            {tier.name}
          </h2>
          <div
            className={`font-display text-4xl font-bold mb-5 ${
              isHighlight ? "text-coral-deep" : "text-primary"
            }`}
          >
            {tier.price}
          </div>

          {/* Feature List */}
          <ul className="space-y-3 mb-7 flex-1">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-sage-light flex items-center justify-center">
                  <Check className="w-3 h-3 text-sage" />
                </span>
                <span className="font-body text-sm text-muted-foreground leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          {isHighlight ? (
            <a
              href={tier.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-glow block w-full text-center font-display font-semibold text-base rounded-2xl py-4 px-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--coral)), hsl(var(--coral-deep)))",
                color: "hsl(var(--ivory-warm))",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              {tier.ctaLabel}
            </a>
          ) : (
            <a
              href={tier.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center font-display font-semibold text-base py-4 px-6 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              {tier.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ChooseYourPlan = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Page Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="font-display text-3xl md:text-5xl text-primary mb-4 leading-tight">
              Choose Your Path to Stronger,{" "}
              <span className="whitespace-nowrap">Pain-Free Movement</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
              Every tier rebuilds foot capacity. The difference is how guided,
              personalized, and accelerated your recovery becomes.
            </p>
          </motion.div>

          {/* Tier Cards — mobile: T2, T1, T3 / desktop: T1, T2, T3 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-5 py-6 md:items-stretch">
            <TierCard tier={tiers[0]} orderClass="order-2 md:order-1 flex-1" />
            <TierCard tier={tiers[1]} orderClass="order-1 md:order-2 flex-1" />
            <TierCard tier={tiers[2]} orderClass="order-3 md:order-3 flex-1" />
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-14 md:mt-20"
          >
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="section-card p-6 flex items-start gap-4"
              >
                <span
                  className="text-2xl flex-shrink-0 w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center"
                  aria-hidden="true"
                >
                  {badge.emoji}
                </span>
                <div>
                  <p className="font-display font-bold text-primary text-base mb-1">
                    {badge.label}
                  </p>
                  <p className="text-muted-foreground font-body text-sm">
                    {badge.sub}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChooseYourPlan;
