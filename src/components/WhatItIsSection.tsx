import { motion } from "framer-motion";

const WhatItIsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            What The Foot Capacity System Is
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>
            The Foot Capacity System is a structured, video-guided program designed to help you rebuild foot strength, restore movement, and break the cycle of recurring plantar fasciitis and chronic foot pain — from home.
          </p>
          <p>This is not a random collection of stretches.</p>
          <p>It is not a generic rehab bundle pulled from the internet.</p>
          <p>And it is not another passive approach built around temporary relief.</p>
          <p>
            It is a clear progression that teaches you how to understand your symptoms, manage load intelligently, rebuild strength step by step, and regain confidence in your feet again.
          </p>
          <p>
            Everything is delivered through simple guided videos that walk you through the process from home, on your schedule — without repeated clinic visits, long waiting lists, or conflicting advice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-8 text-center">
            Who This Is For
          </h2>

          <div className="space-y-4">
            {[
              "The person whose first steps out of bed are painful.",
              "The person who dreads long walks because they know what comes after.",
              "The person who used to run, hike, train, or stay active — without thinking twice about their feet.",
              'The person who is tired of hearing "just rest it" or "stretch more" when that clearly has not solved the problem.',
            ].map((item, i) => (
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
                    <path d="M4 8L7 11L12 5" stroke="hsl(18, 72%, 58%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className="text-foreground text-lg font-body">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-lg text-muted-foreground font-body leading-relaxed">
            <p>It is for active adults who want a lasting solution.</p>
            <p>
              It is for people with chronic plantar fasciitis, recurring heel pain, arch pain, foot weakness, and movement patterns that keep feeding irritation.
            </p>
            <p className="text-foreground font-medium">
              And it is for people who do not want to build their life around pain anymore.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
