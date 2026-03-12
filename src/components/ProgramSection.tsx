import { motion } from "framer-motion";

const phases = [
  {
    num: "1",
    title: "Assess Your Starting Point",
    desc: "You establish a clear baseline so you understand how your foot is currently handling load, what movements are contributing to your symptoms, and where the rebuilding process needs to begin.",
  },
  {
    num: "2",
    title: "Understand Pain and Load",
    desc: "You learn why pain keeps returning, how load actually works, and what to change right now so you stop guessing and start making decisions with confidence.",
  },
  {
    num: "3",
    title: "Restore Movement Control",
    desc: "You begin targeted daily movement work to calm irritation, improve control, and create a more stable foundation for strength.",
  },
  {
    num: "4",
    title: "Rebuild Strength and Capacity",
    desc: "You progressively strengthen the foot and ankle so the tissues can tolerate more load, more consistently, with less reactivity.",
  },
  {
    num: "5",
    title: "Return to Confident Movement",
    desc: "You integrate those gains into daily life so walking, standing, exercise, and activity begin to feel normal again — without the same fear of flare-ups.",
  },
];

const ProgramSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="trust-badge mb-4 inline-flex">Inside The Foot Capacity System</span>
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5 mt-4">
            You move through five progressive phases
          </h2>
        </motion.div>

        <div className="space-y-6">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="section-card p-6 md:p-8 flex items-start gap-6"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">
                  {phase.num}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl text-primary mb-2">{phase.title}</h3>
                <p className="text-muted-foreground font-body text-lg">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-lg italic">
            This is not random. Each phase builds on the previous one. The goal is to help your foot adapt the way the body actually adapts — progressively and intelligently.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramSection;
