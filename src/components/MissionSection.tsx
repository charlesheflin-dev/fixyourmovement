import { motion } from "framer-motion";

const quotes = [
  {
    text:
      "I struggled with plantar fasciitis for 3 years. Cortisone, shockwave, thousands in shoes. After following this system, I went two weeks without pain for the first time.",
    attribution: "Plantar Fasciitis Sufferer, 3-Year Chronic Case",
  },
  {
    text:
      "I realized the traditional advice my doctor and PT gave was actually making my Achilles worse. Dr. Jonathan's approach helped me break out of that cycle and get my mobility back.",
    attribution: "Achilles Tendinitis Patient, 12+ Months of Failed Treatment",
  },
];

const MissionSection = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-100/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="section-card p-8 md:p-10"
            >
              <div
                className="font-display text-6xl leading-none mb-4 select-none text-slate-900 opacity-25"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p className="font-display text-xl md:text-2xl text-primary leading-relaxed italic mb-6">
                {quote.text}
              </p>
              <p className="font-body text-base text-muted-foreground font-medium">— {quote.attribution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
