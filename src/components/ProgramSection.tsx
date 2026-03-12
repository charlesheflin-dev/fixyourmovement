import { motion } from "framer-motion";

const phases = [
  {
    num: "1",
    title: "Baseline Assessment",
    desc: "Establish your starting point and identify the movement patterns contributing to your symptoms.",
  },
  {
    num: "2",
    title: "Pain Triggers and Load Management",
    desc: "Understand what triggers your pain and learn simple ways to manage load day-to-day.",
  },
  {
    num: "3",
    title: "Daily Movement Foundation",
    desc: "Introduce targeted daily movement to calm irritation and improve control.",
  },
  {
    num: "4",
    title: "Progressive Strength and Mobility",
    desc: "Systematically rebuild strength and mobility through guided exercises.",
  },
  {
    num: "5",
    title: "Long-Term Resilience",
    desc: "Integrate your gains so your foot stays strong and resilient long term.",
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
          className="text-center mb-14"
        >
          <span className="trust-badge mb-4 inline-flex">Structured 5-Phase System</span>
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5 mt-4">
            A clear path from pain to strength
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This isn't a collection of random exercises. Each phase builds on the last, 
            so your foot adapts gradually and safely.
          </p>
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
          <p className="text-muted-foreground text-lg mb-2">
            Follow at home · On your schedule · Simple video instruction
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramSection;
