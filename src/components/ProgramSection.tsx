import { motion } from "framer-motion";
import { ShieldOff, Layers, TrendingUp, Footprints } from "lucide-react";

const steps = [
  {
    num: "1",
    label: "HALT THE PAIN CYCLE",
    icon: ShieldOff,
    desc: "You start by calming irritated tissue and finding a stable baseline your body can actually build from. No pushing through pain. No guessing. Just a clear starting point.",
    bullets: [
      "Reduces flare-up frequency from day one",
      "Establishes the foundation every phase builds on",
    ],
  },
  {
    num: "2",
    label: "ENGAGE THE FOUNDATION",
    icon: Layers,
    desc: "Next, you reactivate the deep supportive muscles that have gone quiet from years of avoidance and passive treatment. This is the step most programs skip entirely.",
    bullets: [
      "Targets the specific muscles that protect your foot under load",
      "Rebuilds the internal support your foot lost during the pain cycle",
    ],
  },
  {
    num: "3",
    label: "ADAPT WITH LOAD",
    icon: TrendingUp,
    desc: "Here is where real change happens. You introduce progressive resistance in a controlled, deliberate sequence. Your tissue responds by getting stronger and more resilient.",
    bullets: [
      "Systematically increases your foot's capacity to handle stress",
      "Follows a clear weekly progression — no interpretation needed",
    ],
  },
  {
    num: "4",
    label: "LINK TO FUNCTION",
    icon: Footprints,
    desc: "Finally, you integrate your new strength into real-world movement. Walking. Stairs. Running. The activities that matter to you. This is where confidence comes back.",
    bullets: [
      "Bridges the gap between rehab exercises and real life",
      "Prepares your foot to handle full activity without fear of a setback",
    ],
  },
];

const ProgramSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5 tracking-widest uppercase">
            How the Foot Capacity System Works
          </h2>
          <p className="text-foreground text-lg max-w-3xl mx-auto leading-relaxed font-body mb-3">
            Most people have tried pieces of this. What they have never had is a system that connects all four
            phases in the right order. That is what makes the difference.
          </p>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed font-body">
            This is not a random set of exercises. It is a structured, four-phase process built to rebuild your
            foot from the ground up.
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="mt-12 relative">
          {/* Connecting line */}
          <div
            className="absolute left-7 md:left-9 top-10 bottom-10 w-0.5 hidden md:block"
            style={{ background: "hsl(var(--border))" }}
            aria-hidden="true"
          />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="section-card p-6 md:p-8 flex items-start gap-6"
                >
                  {/* Icon + Number */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1.5 z-10">
                    <StepIcon className="w-7 h-7 text-primary" />
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-display font-bold text-base">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-display text-xs font-bold tracking-widest text-coral-deep uppercase mb-2">
                      {step.label}
                    </p>
                    <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-light flex items-center justify-center mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6L5 8.5L9.5 3.5"
                                stroke="hsl(100, 12%, 56%)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="text-foreground font-body text-base">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
