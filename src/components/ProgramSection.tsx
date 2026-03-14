import { motion } from "framer-motion";

const phases = [
  {
    num: "1",
    title: "Phase 1: Calm the Tissue & Restore Motion (Weeks 1–3)",
    desc: "The first step is creating the right environment for recovery. In this phase you reduce symptom irritability, restore joint mobility in the foot and ankle, and begin gentle loading of the foot. Many people with plantar heel pain have mobility restrictions that alter how force moves through the foot. Restoring motion improves how the body distributes load during walking and activity.",
  },
  {
    num: "2",
    title: "Phase 2: Rebuild Foot Capacity (Weeks 4–8)",
    desc: "Once movement improves, the focus shifts to strength. This phase targets the muscles that support the arch and control loading through the foot. Training focuses on strengthening intrinsic and extrinsic muscles of the foot as well as beginning to introduce strengthening of the entire leg. As strength improves, the foot becomes more capable of tolerating everyday activity without recurring irritation.",
  },
  {
    num: "3",
    title: "Phase 3: Restore Whole-Leg Resilience (Weeks 9–12)",
    desc: "Foot pain rarely exists in isolation. Poor control and decreased strength in the hips, knees, or lower leg can change how forces moves through the foot. This final phase integrates the entire lower limb so the body functions as a coordinated system. Training includes single-leg strength patterns, dynamic balance work, progressive load tolerance, and walking and activity progression. By the end of this phase, your body is prepared for real-world demands again.",
  },
];

const ProgramSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            How the System Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Inside The Foot Capacity System, you follow a structured 12-week rehabilitation progression designed to rebuild strength and restore load tolerance safely.
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mt-4">
            Each phase builds on the previous one.
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


      </div>
    </section>
  );
};

export default ProgramSection;
