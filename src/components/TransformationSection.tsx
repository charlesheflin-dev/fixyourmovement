import { motion } from "framer-motion";

const features = [
  {
    label: "NO MORE PLANNING AROUND PAIN",
    desc:
      "Right now, you think twice before every walk, every trip, every morning. When your tissue can handle load, that mental math disappears. You just go.",
  },
  {
    label: "REAL STRENGTH, NOT BORROWED TIME",
    desc:
      "Orthotics and injections rent you a few good weeks. This system builds the structural capacity your foot needs to hold up on its own, permanently.",
  },
  {
    label: "A CLEAR PATH FORWARD",
    desc:
      "No more guessing, no more conflicting advice. You follow a structured 12-week progression, and you always know exactly what to do next and why.",
  },
  {
    label: "CONFIDENCE IN YOUR BODY AGAIN",
    desc:
      "The hardest part of chronic pain is not trusting your own foot. As your load tolerance grows, so does your certainty. You stop fearing movement and start owning it.",
  },
];

const TransformationSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            What Changes When Your Foot Is Actually Strong Again
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="section-card p-8"
            >
              <p className="font-display text-sm font-bold tracking-widest text-blue mb-3 uppercase">
                {feature.label}
              </p>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
