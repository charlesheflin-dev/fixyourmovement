import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const previewTiers = [
  {
    name: "The Foot Capacity Blueprint",
    price: "$247",
    badge: null,
    highlight: false,
  },
  {
    name: "The Guided Recovery System",
    price: "$397",
    badge: "Most Popular",
    highlight: true,
  },
  {
    name: "Private Recovery Access",
    price: "$997",
    badge: null,
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-12 md:py-20 bg-primary/[0.03]">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-4">
            Choose Your Path to Stronger, Pain-Free Movement
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Every tier rebuilds foot capacity. The difference is how guided, personalized, and accelerated your
            recovery becomes.
          </p>
        </motion.div>

        {/* Preview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 md:gap-5 md:items-center"
        >
          {previewTiers.map((tier, i) => (
            <div
              key={i}
              className={`section-card p-8 flex flex-col items-center text-center ${
                tier.highlight
                  ? "border-2 border-primary md:scale-105 md:z-10 shadow-xl"
                  : "border border-border"
              }`}
            >
              {tier.badge && (
                <span className="bg-amber-500 text-white font-body font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
                  {tier.badge}
                </span>
              )}
              <h3
                className={`font-display font-bold text-xl mb-2 ${
                  tier.highlight ? "text-primary" : "text-foreground"
                }`}
              >
                {tier.name}
              </h3>
              <div
                className={`font-display text-4xl font-bold mb-7 ${
                  tier.highlight ? "text-blue" : "text-primary"
                }`}
              >
                {tier.price}
              </div>
              <Link
                to="/choose-your-plan"
                className={`block w-full font-display font-semibold text-base py-3.5 px-6 rounded-xl transition-all duration-200 ${
                  tier.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                See What's Included →
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-muted-foreground font-body text-sm mt-8"
        >
          Every tier includes the 60-Day Walk Pain-Free Guarantee.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
