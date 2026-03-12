import { motion } from "framer-motion";
import { ClipboardList, Shield, Footprints } from "lucide-react";

const bonuses = [
  {
    icon: ClipboardList,
    title: "Foot Recovery Tracking Toolkit",
    desc: "Helps you measure progress and see improvement in pain, strength, and activity tolerance over time.",
  },
  {
    icon: Shield,
    title: "Flare Recovery Playbook",
    desc: "Gives you a clear plan for what to do if symptoms spike, so you are never left wondering whether to push, back off, or panic.",
  },
  {
    icon: Footprints,
    title: "Movement Re-Patterning Toolkit",
    desc: "Helps you identify and improve walking mechanics that may be contributing to repeated irritation.",
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
          className="text-center mb-6"
        >
          <span className="trust-badge mb-4 inline-flex">Included With The Program</span>
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5 mt-4">
            What You Receive Inside The Program
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Inside the system, you get guided video instruction from Dr. Jonathan, clear progressions, and practical tools that help you stay on track.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-muted-foreground text-lg mt-10 italic"
        >
          Together, these tools help turn recovery from something vague and frustrating into something structured, measurable, and doable.
        </motion.p>
      </div>
    </section>
  );
};

export default BonusSection;
