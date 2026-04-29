import { motion } from "framer-motion";
import { Check, Shield, Activity, Footprints } from "lucide-react";

const featureRows = [
  { label: "Access Type", t1: "Self-Guided", t2: "Guided System", t3: "Private Access" },
  { label: "Core Program", t1: true, t2: true, t3: true },
  { label: "Guidance Style", t1: "On-Demand Videos", t2: "Structured Step-by-Step", t3: "1:1 + Adaptive" },
  { label: "Daily Tracking", t1: false, t2: true, t3: true },
  { label: "Progression Logic", t1: "Foundational", t2: "Structured + Progressive", t3: "Fully Customized" },
  { label: "Real-Time Direction", t1: false, t2: false, t3: true },
  { label: "Dr. Jonathan Involvement", t1: false, t2: false, t3: true },
  { label: "Data Monitoring", t1: false, t2: "Basic", t3: "Advanced" },
  { label: "Intervention Support", t1: false, t2: true, t3: true },
  { label: "Private Sessions", t1: false, t2: false, t3: true },
  { label: "Personalization Level", t1: "Low", t2: "Moderate", t3: "High" },
  { label: "Long-Term Access", t1: true, t2: true, t3: true },
  { label: "Best For", t1: "Self-starters", t2: "Most people", t3: "Complex / stalled cases" },
  { label: "Availability", t1: "Open", t2: "Open", t3: "Limited (10 spots)" },
];

const tiers = [
  {
    name: "Blueprint",
    price: "$247",
    badge: null,
    cta: "Start With the Blueprint →",
    highlight: false,
    description: [
      "The complete 12-week Foot Capacity System, structured and ready to follow from day one.",
      "Full video library with every exercise clearly demonstrated.",
      "Weekly progression templates — you always know exactly what to do next.",
      "Load management frameworks to guide your decisions as you build.",
      "Private web-based training portal with lifetime access.",
      "The \u201cWalk Pain-Free or It\u2019s Free\u201d 90-Day Guarantee.",
    ],
  },
  {
    name: "Guided Recovery System",
    price: "$397",
    badge: "Most Popular",
    cta: "Get the Guided System →",
    highlight: true,
    description: [
      "Everything in the Blueprint, plus:",
      "Full access to the Foot Capacity app — your daily recovery environment.",
      "Signal-based progression: you advance when your body is ready, not when a calendar says so.",
      "Daily pain and activity tracking that turns your data into clear next steps.",
      "Visual progress dashboard so you can see your recovery building in real time.",
      "Ongoing system refinements from Dr. Jonathan based on real patient patterns.",
      "The \u201cWalk Pain-Free or It\u2019s Free\u201d 90-Day Guarantee.",
    ],
  },
  {
    name: "Private Recovery Access",
    price: "$697",
    badge: "Limited to 10",
    cta: "Apply for Private Access →",
    highlight: false,
    description: [
      "Everything in the Guided Recovery System, plus:",
      "Six private 30-minute one-on-one sessions with Dr. Jonathan during your 12 weeks.",
      "Two additional sessions after program completion — for when you return to full activity.",
      "Active case monitoring: Dr. Jonathan reviews your data and flags issues before they become setbacks.",
      "Case-specific modifications based on your diagnosis, history, and response to load.",
      "Direct access to the expert who built the system — not a generalized pathway.",
      "The \u201cWalk Pain-Free or It\u2019s Free\u201d 90-Day Guarantee.",
    ],
  },
];

const trustBadges = [
  {
    icon: Shield,
    label: "90-Day Satisfaction Guarantee",
    sub: "Follow it or get a full refund.",
  },
  {
    icon: Activity,
    label: "Structured, Evidence-Based Progression",
    sub: "Built on science. Designed for real results.",
  },
  {
    icon: Footprints,
    label: "Built for Real-World Movement",
    sub: "Stronger feet. Better movement. Lasting change.",
  },
];

const CellValue = ({ value }: { value: boolean | string }) => {
  if (value === true) {
    return (
      <span className="flex items-center justify-center">
        <Check className="w-5 h-5 text-sage" />
      </span>
    );
  }
  if (value === false) {
    return <span className="text-muted-foreground/40 text-xl font-body">—</span>;
  }
  return <span className="text-sm font-body text-foreground">{value as string}</span>;
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-12 md:py-20 bg-primary/[0.03]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-4">
            Choose Your Path to Stronger, Pain-Free Movement
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Every tier rebuilds foot capacity. The difference is how guided, personalized, and accelerated your
            recovery becomes.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {/* Feature label column header */}
                <th className="w-48 md:w-56 p-4 text-left" />
                {tiers.map((tier, i) => (
                  <th
                    key={i}
                    className={`p-4 text-center align-top ${
                      tier.highlight
                        ? "bg-primary text-primary-foreground rounded-t-2xl"
                        : "bg-card border border-border rounded-t-2xl"
                    }`}
                  >
                    {tier.badge && (
                      <div
                        className={`text-xs font-body font-bold tracking-widest uppercase mb-2 px-3 py-1 rounded-full inline-block ${
                          tier.highlight
                            ? "bg-coral text-ivory"
                            : "bg-coral/20 text-coral-deep"
                        }`}
                      >
                        {tier.badge}
                      </div>
                    )}
                    <div
                      className={`font-display font-bold text-lg mb-1 ${
                        tier.highlight ? "text-primary-foreground" : "text-primary"
                      }`}
                    >
                      {tier.name}
                    </div>
                    <div
                      className={`font-display text-3xl font-bold ${
                        tier.highlight ? "text-coral-warm" : "text-primary"
                      }`}
                    >
                      {tier.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={rowIdx % 2 === 0 ? "bg-muted/30" : "bg-transparent"}
                >
                  <td className="p-4 font-body text-sm font-semibold text-foreground">{row.label}</td>
                  {[
                    { value: row.t1, highlight: false },
                    { value: row.t2, highlight: true },
                    { value: row.t3, highlight: false },
                  ].map((cell, ci) => (
                    <td
                      key={ci}
                      className={`p-4 text-center ${
                        cell.highlight ? "bg-primary/5" : ""
                      }`}
                    >
                      <CellValue value={cell.value} />
                    </td>
                  ))}
                </tr>
              ))}
              {/* CTA row */}
              <tr>
                <td className="p-4" />
                {tiers.map((tier, i) => (
                  <td
                    key={i}
                    className={`p-4 text-center rounded-b-2xl ${tier.highlight ? "bg-primary/5" : ""}`}
                  >
                    <button
                      className={`w-full font-display font-semibold text-sm rounded-xl py-3 px-4 transition-all duration-200 opacity-70 cursor-not-allowed ${
                        tier.highlight
                          ? "cta-button"
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                      disabled
                      title="Registration Opening Soon"
                    >
                      {tier.cta}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-start gap-4 section-card p-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="font-display font-bold text-primary text-base mb-1">{badge.label}</p>
                <p className="text-muted-foreground font-body text-sm">{badge.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tier Detail Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mt-10"
        >
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`section-card p-6 ${
                tier.highlight ? "border-2 border-primary" : ""
              }`}
            >
              <h3
                className={`font-display font-bold text-lg mb-4 ${
                  tier.highlight ? "text-primary" : "text-foreground"
                }`}
              >
                {tier.name}
              </h3>
              <ul className="space-y-3">
                {tier.description.map((line, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-light flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-sage" />
                    </span>
                    <span className="text-muted-foreground font-body text-sm leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
