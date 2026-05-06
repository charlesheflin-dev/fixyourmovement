import { motion } from "framer-motion";

const personas = [
  {
    title: "The Frustrated Active Adult",
    desc:
      "You were a runner, a hiker, or just someone who stayed active — until foot pain started making every step a decision. You have tried the usual fixes and you are done with temporary.",
  },
  {
    title: "The Repeat PT Patient",
    desc:
      "You have been to physical therapy. Maybe more than once. You got some relief, then it came back. You are not looking for another round of the same approach — you want something that actually holds.",
  },
  {
    title: "The Independent Self-Manager",
    desc:
      "You do not want to rearrange your week around appointments. You want a clear, structured plan you can follow at home, on your schedule, which gives you real results without depending on anyone else to keep you on track.",
  },
];

const WhatItIsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-100/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5 tracking-widest uppercase">
            Who This Is For
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="section-card p-8 border-t-4 border-slate-900"
            >
              <h3 className="font-display text-lg text-slate-900 font-bold mb-4">{persona.title}</h3>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">{persona.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
