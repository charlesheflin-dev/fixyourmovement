import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";

const included = [
  "Complete 3-phase structured program",
  "Guided video instruction from Dr. Jonathan",
  "The Foot Recovery Tracking Toolkit",
  "The Flare Recovery Playbook",
  "The Movement Re-Patterning Toolkit",
  "Lifetime access — no recurring fees",
  "Future programs added at no extra cost",
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-8 md:py-12 bg-primary/[0.03]">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            The Investment
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg max-w-xl mx-auto font-body leading-relaxed">
            <p>
              Traditional physical therapy often means repeated appointments, travel time, and repeated bills.
            </p>
            <p>
              One visit alone can cost $150 to $250 or more. And many treatment plans require multiple visits.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-card p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-lg mb-2 font-body">
              The Foot Capacity System gives you structured, doctor-guided rehabilitation from home for a one-time investment of
            </p>
            <div className="flex items-baseline justify-center gap-2 mt-4">
              <span className="font-display text-5xl md:text-6xl font-bold text-primary">$247</span>
            </div>
            <div className="mt-6 space-y-1 text-muted-foreground font-body">
              <p>No recurring fees.</p>
              <p>No clinic bills.</p>
              <p>No paying again every time you need support.</p>
            </div>
            <p className="text-sage font-medium mt-4 text-lg">
              Once you are inside, you keep the system for life.
            </p>
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
            <p className="text-foreground font-medium text-lg mb-6 max-w-lg mx-auto">
              Plantar fasciitis develops when the load on your foot exceeds the tissue's capacity.
            </p>
            {/* 
            <a
              href="https://whop.com/checkout/plan_Kb2UZ3Iqj7Vn9"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button animate-pulse-glow text-xl"
            >
              Get Instant Access to The Foot Capacity System Today
            </a>
            */}
            <button
              className="cta-button opacity-70 cursor-not-allowed text-xl"
              disabled
            >
              Registration Opening Soon
            </button>
            <p className="mt-4 text-muted-foreground text-base">
              Secure checkout · Instant access · No subscription
            </p>
          </div>
        </motion.div>

        {/* 30-Day Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="section-card p-8 md:p-10 mt-10 text-center border-t-4 border-sage"
        >
          <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-sage" />
          </div>
          <h3 className="font-display text-xl md:text-2xl text-primary mb-4">
            30-Day Progress Guarantee
          </h3>
          <div className="space-y-4 text-muted-foreground text-lg font-body leading-relaxed max-w-lg mx-auto">
            <p>This program is built around a real clinical process, not vague promises.</p>
            <p>
              If you follow the system and give it an honest effort, and you do not see measurable improvement within the first 30 days, you can request a full refund.
            </p>
            <p className="text-foreground font-medium">Simple.</p>
            <p>The goal is not to add risk to your life.</p>
            <p className="text-foreground font-medium text-xl mt-2">The goal is to remove it.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
