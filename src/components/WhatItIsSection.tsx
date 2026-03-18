import { motion } from "framer-motion";

const WhatItIsSection = () => {
  return (
    <section className="py-8 md:py-12 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            What Is The Foot Capacity System
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
            The Foot Capacity System is a structured, video-guided rehabilitation program designed to help you rebuild foot strength, restore movement, and break the cycle of recurring plantar fasciitis and chronic foot pain from home.
          </p>
          <p>This is not a random collection of stretches.</p>
          <p>It is not a generic rehab bundle pulled from the internet.</p>
          <p>And it is not another passive approach built around temporary relief.</p>
          <p>
            It is a step-by-step progression that teaches you how to:
          </p>
          <ul className="list-disc pl-8 space-y-2 mt-2">
            <li>understand your symptoms</li>
            <li>manage load intelligently</li>
            <li>rebuild strength progressively</li>
            <li>regain confidence in your feet again</li>
          </ul>
          <p className="mt-4">
            Everything is delivered through guided videos that walk you through the process from home, on your schedule, without repeated clinic visits, long waiting lists, or conflicting advice.
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

          <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
            This program was built for people who have been stuck in the same cycle for too long.
          </p>

          <div className="space-y-4">
            {[
              "The person whose first steps out of bed are painful.",
              "The person who dreads long walks because they know what might come after.",
              "The person who used to run, hike, train, or stay active without thinking twice about their feet.",
              'The person who is tired of hearing: "Just rest it." "Stretch more." "Give it time."',
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
                    <path d="M4 8L7 11L12 5" stroke="hsl(18, 72%, 58%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-foreground text-lg font-body">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-lg text-muted-foreground font-body leading-relaxed">
            <p>It is for active adults dealing with:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>chronic plantar fasciitis</li>
              <li>plantar heel spurs</li>
              <li>arch pain</li>
              <li>foot weakness</li>
              <li>movement patterns that keep feeding irritation</li>
            </ul>
            <p className="text-foreground font-medium mt-6">
              And for people who do not want to build their life around pain anymore.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
