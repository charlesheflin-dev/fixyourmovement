import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-6 leading-tight">
            You just want to walk, move, and live your day without that constant reminder of pain
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Stop chasing temporary relief. Start rebuilding the strength and capacity your 
            feet actually need. Follow the program from home, on your own schedule.
          </p>
          <a href="#pricing" className="cta-button animate-pulse-glow text-xl">
            Start Your Recovery Today
          </a>
          <p className="mt-6 text-muted-foreground italic font-display text-lg">
            "I look forward to helping you take the first step toward stronger, healthier movement."
            <br />
            <span className="not-italic font-body text-base">— Dr. Jonathan, DPT</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
