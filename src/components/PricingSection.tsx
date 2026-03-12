import { motion } from "framer-motion";
import { Check } from "lucide-react";

const included = [
  "Complete 5-phase structured program",
  "Simple video instruction for every exercise",
  "Foot Recovery Tracking Toolkit",
  "Flare Recovery Playbook",
  "Movement Re-Patterning Toolkit",
  "Lifetime access — no recurring fees",
  "Future programs added at no extra cost",
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-primary/[0.03]">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            A fraction of the cost of traditional care
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One physical therapy visit alone can cost $150–$250. Most treatment plans 
            involve multiple sessions costing thousands over time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-card p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg mb-2 font-body line-through">
              Comparable to $1,500+ in clinic visits
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-display text-5xl md:text-6xl font-bold text-primary">$247</span>
              <span className="text-muted-foreground text-lg">one-time</span>
            </div>
            <p className="text-sage font-medium mt-2 text-lg">Lifetime access included</p>
          </div>

          <div className="space-y-4 mb-10 max-w-md mx-auto">
            {included.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-light flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-sage" />
                </span>
                <span className="text-foreground font-body text-lg">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#" className="cta-button animate-pulse-glow text-xl">
              Get Started Today — $247
            </a>
            <p className="mt-4 text-muted-foreground text-base">
              Secure checkout · Instant access · No subscription
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
