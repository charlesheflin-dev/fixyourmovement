import { motion } from "framer-motion";

const TransformationSection = () => {
  return (
    <section className="py-16 md:py-24 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            What This Can Change
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>The goal here is not just "less pain."</p>
          <p className="text-foreground font-medium text-xl">The goal is that your life starts to open back up.</p>
          <p>
            You wake up and those first steps are not a battle. You walk without bracing for what your heel might feel like later. You stand longer without constantly thinking about your foot. You move through the day with more trust in your body and less fear that everything will flare up again.
          </p>
          <p>That is what strength and capacity actually give you.</p>
          <p>Not just symptom control.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-card p-8 md:p-10 mt-10 text-center border-t-4 border-sage"
        >
          <h3 className="font-display text-3xl md:text-4xl text-primary font-bold">
            Freedom.
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;
