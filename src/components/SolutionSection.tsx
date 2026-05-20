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
        >
          <img
            src="/images/problem-section.png"
            alt="Most people don't need more random advice. They need more clarity."
            className="w-full rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
