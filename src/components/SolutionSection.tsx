import { motion } from "framer-motion";

const SolutionSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            A Different Way to Recover
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>Most people with chronic foot pain have never been given a real progression.</p>
          <p>They have been given pieces.</p>

          <div className="section-card p-6 md:p-8">
            <ul className="space-y-3">
              {[
                "A stretch here.",
                "A shoe recommendation there.",
                "A few exercises.",
                "A rest period.",
                "A temporary reduction in pain.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-coral mt-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-foreground font-medium text-xl">
            But relief is not the same as recovery.
          </p>

          <p>
            Recovery happens when the body becomes more capable. When tissue can tolerate more load. When strength improves. When movement becomes more efficient. When fear begins to fade because your foot is finally becoming more resilient instead of more protected.
          </p>

          <div className="section-card p-8 md:p-10 border-l-4 border-sage mt-6">
            <p className="text-foreground font-body text-lg italic mb-4">
              Instead of asking, "How do I calm this down today?"
            </p>
            <p className="text-primary font-display text-xl font-semibold">
              You begin asking, "How do I rebuild the kind of foot that can carry me through everyday life again?"
            </p>
          </div>

          <p className="mt-6">That is the shift this system is built around.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
