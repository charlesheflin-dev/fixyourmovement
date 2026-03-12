import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";

const included = [
  "Complete 5-phase structured program",
  "Guided video instruction from Dr. Jonathan",
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
            The Investment
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg max-w-xl mx-auto font-body leading-relaxed">
            <p>
              Traditional physical therapy often means repeated appointments, repeated scheduling, repeated travel, and repeated bills.
            </p>
            <p>
              One visit alone can easily cost $150 to $250 or more. And many treatment plans involve multiple sessions.
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
              Structured, doctor-led guidance from home
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-display text-5xl md:text-6xl font-bold text-primary">$247</span>
              <span className="text-muted-foreground text-lg">one-time</span>
            </div>
            <div className="mt-4 space-y-1 text-muted-foreground font-body">
              <p>No recurring clinic bills.</p>
              <p>No monthly fee.</p>
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
            <a href="#" className="cta-button animate-pulse-glow text-xl">
              Get Instant Access to The Foot Capacity System
            </a>
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
              If you follow the system and give it an honest effort, and you do not see measurable progress in your strength or symptoms within the first 30 days, you get a full refund.
            </p>
            <p className="text-foreground font-medium">Simple.</p>
            <p>The point is not to add risk to your life.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
