import { motion } from "framer-motion";

const SolutionSection = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Most People Don't Need More Random Advice. They Need More Clarity.
          </h2>
          <p className="text-lg text-muted-foreground font-body mt-2">
            The hardest part of recovery is often not effort. It's uncertainty.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>
            One of the biggest reasons people stay stuck in recurring foot and ankle pain is because recovery feels unpredictable.
          </p>
          <p>
            On good days, people often do too much too quickly. On bad days, they panic, shut everything down, and feel like they're right back at the beginning again.
          </p>
          <p>
            Most people are constantly asking themselves:
          </p>
          <ul className="list-disc list-inside">
            <li>Should I push through this?</li>
            <li>Am I making things worse?</li>
            <li>Why does it flare up every time I start improving?</li>
            <li>Am I actually progressing correctly?</li>
          </ul>
          <p>
            That uncertainty creates inconsistency. And inconsistency makes long-term recovery extremely difficult.
          </p>
          <p>
            Most people end up piecing together random exercises, conflicting advice, and temporary symptom-management strategies while trying to figure recovery out entirely on their own. Eventually, the whole process starts feeling overwhelming.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-card p-8 md:p-10 mt-10 border-l-4 border-slate-200"
        >
          <p className="text-xl md:text-2xl font-display text-primary leading-relaxed">
            The Foot Capacity System was built to help remove that guesswork and create a clearer path forward.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
