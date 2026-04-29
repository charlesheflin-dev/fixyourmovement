import { motion } from "framer-motion";

const SolutionSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            There Is a Different Way to Fix This — and It Starts With Building, Not Protecting
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>
            The reason structured, progressive strengthening works when everything else has failed is simple: it
            is the only approach that actually changes what your tissue is capable of. Not temporarily.
            Structurally. You are not managing the pain. You are removing the condition that causes it.
          </p>
          <p>
            The Foot Capacity System is built on one core principle — tissues heal and grow stronger when exposed
            to the right amount of load, applied in the right sequence, at the right time. That is not a theory.
            That is how the body works. When you follow a system designed around that principle, something shifts.
            The flare-ups become less frequent. Then less intense. Then they stop being the thing you plan your
            entire week around.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-card p-8 md:p-10 mt-10 border-l-4 border-sage"
        >
          <p className="text-xl md:text-2xl font-display text-primary leading-relaxed">
            Picture waking up and not thinking about your foot before you get out of bed. Signing up for a 10K
            without a week of anxiety leading up to it. Saying yes to the hiking trip, the family walk, the
            morning run — without negotiating with your pain first.
          </p>
          <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">
            That is not a fantasy version of recovery. That is what happens when the tissue is actually strong
            enough to handle your life again. That is what this system is designed to give you.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
