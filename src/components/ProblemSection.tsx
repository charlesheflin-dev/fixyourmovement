import { motion } from "framer-motion";

const ProblemSection = () => {
  return (
    <section className="py-8 md:py-12 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Why Your Foot Pain Keeps Coming Back
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-card p-8 md:p-10 mb-10"
        >
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            If you have been dealing with plantar fasciitis or chronic foot pain for months, maybe even years, you already know how discouraging the cycle can feel. You stretch. You rest. You try new shoes, inserts, massage, taping, maybe even physical therapy. And sometimes it feels better for a little while. Then the pain comes back.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>
            Not because you are lazy. Not because your body is broken. And not because you are somehow doing recovery wrong.
          </p>
          <p>
            The real problem is that most treatments ONLY focus on calming symptoms instead of rebuilding the strength and capacity your foot actually needs to handle load.
          </p>
          <p>
            Every time you walk, stand, push off, climb stairs, or exercise, your feet absorb force. If the muscles, tendons, and connective tissue in your foot do not have the load capacity to tolerate that force repeatedly, symptoms return.
          </p>
          <p>That is why pain keeps cycling back.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="section-card p-8 md:p-10 mt-10 text-center border-l-4 border-coral"
        >
          <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
            It is not a mystery. It is not bad luck.
          </p>
          <p className="mt-4 text-xl md:text-2xl font-display text-coral-deep font-semibold">
            It is a capacity problem.
          </p>
          <p className="mt-4 text-muted-foreground font-body text-lg">
            And until that capacity is rebuilt in a structured way, the pain often keeps returning.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
