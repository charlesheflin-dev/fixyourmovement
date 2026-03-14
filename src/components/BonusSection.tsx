import { motion } from "framer-motion";
import { ClipboardList, Shield, Footprints } from "lucide-react";

const bonuses = [
  {
    icon: ClipboardList,
    title: "The Foot Recovery Tracking Toolkit",
    desc: "Helps you monitor progress in pain, strength, and activity tolerance.",
  },
  {
    icon: Shield,
    title: "The Flare Recovery Playbook",
    desc: "Gives you a clear plan for what to do if symptoms spike so you always know how to respond.",
  },
  {
    icon: Footprints,
    title: "The Movement Re-Patterning Toolkit",
    desc: "Helps identify walking patterns and movement habits that may contribute to repeated irritation.",
  },
];

const BonusSection = () => {
  return (
    <section className="py-8 md:py-12 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            What You Receive Inside the Program
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Inside the system, you receive guided video instruction from Dr. Jonathan along with tools designed to make the process easier to follow.
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mt-4">
            You will also receive practical support resources including:
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
          Together these tools help turn recovery from something vague and frustrating
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-muted-foreground text-lg mt-2 italic"
        >
          into something structured and measurable.
        </motion.p>
      </div>
    </section>
  );
};

export default BonusSection;
