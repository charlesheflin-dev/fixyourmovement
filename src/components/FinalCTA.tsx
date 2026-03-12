import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="py-8 md:py-12 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-6 leading-tight">
            The Real Question
          </h2>
          <div className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed max-w-xl mx-auto mb-10">
            <p>You already know what temporary relief feels like.</p>
            <p>
              You already know what it feels like to get your hopes up, only to have the pain return again.
            </p>
            <p>
              So the real question is not whether another stretch, another insert, or another short-term fix might buy you a little time.
            </p>
            <p className="text-foreground font-medium text-xl">
              The real question is whether you are ready to start rebuilding the strength and capacity your feet actually need.
            </p>
            <p>If you are, this is your next step.</p>
          </div>
          <a href="#pricing" className="cta-button animate-pulse-glow text-xl">
            Start Rebuilding Your Foot Capacity Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
