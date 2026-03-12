import { motion } from "framer-motion";
import { ClipboardList, Shield, Footprints } from "lucide-react";

const bonuses = [
  {
    icon: ClipboardList,
    title: "Foot Recovery Tracking Toolkit",
    desc: "Measure pain changes, track progress, and stay motivated with pain logs, progress tracking sheets, and recovery dashboards.",
  },
  {
    icon: Shield,
    title: "Flare Recovery Playbook",
    desc: "A clear step-by-step plan when symptoms spike. Quick action guides and flare management tools so you never feel stuck or panicked.",
  },
  {
    icon: Footprints,
    title: "Movement Re-Patterning Toolkit",
    desc: "Identify faulty walking mechanics and retrain your movement patterns at home with gait analysis tools and guided correction strategies.",
  },
];

const BonusSection = () => {
  return (
    <section className="py-16 md:py-24 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="trust-badge mb-4 inline-flex">Included Free</span>
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5 mt-4">
            Three specialized toolkits to support your recovery
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {bonuses.map((bonus, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="section-card p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-coral/15 flex items-center justify-center mx-auto mb-6">
                <bonus.icon className="w-8 h-8 text-coral-deep" />
              </div>
              <h3 className="font-display text-lg text-primary mb-3">{bonus.title}</h3>
              <p className="text-muted-foreground font-body">{bonus.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
