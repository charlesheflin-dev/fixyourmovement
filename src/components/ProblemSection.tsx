import { motion } from "framer-motion";

const frustrations = [
  "You stretch every morning — but the pain keeps coming back",
  "You've tried expensive orthotics and new shoes with no lasting relief",
  "Physical therapy helped for a while, then symptoms returned",
  "You've started avoiding walks, stairs, or activities you used to love",
  "You wonder if this is just something you have to live with",
];

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Does this sound familiar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most people dealing with chronic foot pain go through the same frustrating cycle. 
            You're not doing anything wrong — you've just been missing a critical piece.
          </p>
        </motion.div>

        <div className="space-y-5 max-w-2xl mx-auto">
          {frustrations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="section-card p-6 flex items-start gap-4"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center mt-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8H12" stroke="hsl(18, 68%, 70%)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <p className="text-foreground text-lg font-body">{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="section-card p-8 md:p-10 mt-14 text-center border-l-4 border-coral"
        >
          <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
            "The real problem isn't your plantar fascia. It's that your foot doesn't have the 
            strength and load capacity to handle what you're asking it to do."
          </p>
          <p className="mt-4 text-muted-foreground font-body">— Dr. Jonathan, DPT</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
