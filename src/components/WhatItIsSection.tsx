import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WhatItIsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-100/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5 tracking-widest uppercase">
            A More Structured Way To Approach Recovery
          </h2>
          <p className="text-lg text-muted-foreground font-body mt-2">
            Designed to help people stop guessing and move forward with more confidence from home.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground font-body leading-relaxed">
          <p>
            The Foot Capacity System was created for people who are tired of bouncing between temporary fixes, inconsistent routines, and conflicting advice.
          </p>
          <p>
            Instead of trying to figure everything out alone, the system provides a more organized recovery experience designed to help people stay consistent over time.
          </p>
          <p>
            Inside the guided app experience, members can follow recovery sessions, track symptoms and activity, monitor progress over time, and navigate setbacks with more clarity and less panic.
          </p>
          <p>
            The focus is not just calming symptoms temporarily. It's helping people approach recovery in a way that finally feels manageable and sustainable long term.
          </p>
          <p>
            And when flare-ups happen, the system includes structured support designed to help people regain control and continue moving forward without feeling like all their progress disappeared overnight.
          </p>
          <div className="text-center mt-6">
            <Link to="/choose-your-plan" className="cta-button animate-pulse-glow text-xl">
              See The Full Guided Walkthrough
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
