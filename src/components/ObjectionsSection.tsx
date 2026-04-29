import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const objections = [
  {
    trigger: "I've started programs before and quit after two weeks. I'll probably do the same thing here.",
    response: `That is not a character flaw. It is a design flaw in every program you tried before. Most programs front-load the commitment and leave you to manufacture your own motivation. Of course people stall out. This system is built differently. The first week is low-effort and high-feedback. You are doing 10 to 20 minutes of specific, structured work — and you will feel a difference in days, not months. Small wins create momentum. The system is designed to generate those wins early, so motivation follows the result instead of preceding it. You also get built-in checkpoints, daily structure, and a support loop. You do not need perfect willpower. You need a system that keeps you on track even on low-motivation days. Two weeks is all we ask. Follow the micro-schedule. Use the support. Notice the early wins. If you show up for 14 days and see nothing, you have at least gained clarity. But the design says otherwise.`,
  },
  {
    trigger: "What if I push too hard and trigger a flare-up — and then I'm worse off than before?",
    response: `This is the most responsible concern you could raise. It means you are paying attention. The entire program is built as a phased biomechanical progression for exactly this reason. You never start with high-load work. Every movement is graded. Every phase comes with clear red flags and built-in regressions so that if something spikes, you know the exact steps to take — not a vague "rest and see." You get concrete decision rules. If X happens, do Y for 48 hours, then Z. No guesswork. No waiting for an appointment to get clarity. You are never left alone to figure it out. The structure is designed to prevent a flare from escalating. And if something does feel off, the support is there to walk you through the adjustment that day.`,
  },
  {
    trigger: "Exercises alone won't fix this. What about shoes, long days on my feet, activities outside the program?",
    response: `You are right. Exercises alone are not the answer. Which is why this is not an exercise program. Week one includes a clear shoe checklist — what to avoid, what to prioritize, and how to evaluate a pair for your specific mechanics in under 60 seconds. For long days on your feet, you get a short in-shift routine you can do in 2 to 3 minutes, plus load-management strategies and pacing templates built around real-world demands. For life outside the program — sport, walking, lifting, anything — you get a stepwise modification ladder. Not "take it easy." Exact steps: what to avoid, how to regress, how to safely load back up, and the signals that tell you when you are ready to progress. The system is built for real life, not just the 20 minutes a day you spend on it.`,
  },
  {
    trigger: "My diagnosis is specific — plantar fasciitis, Achilles tendinopathy, PTTD. A general program won't address what I actually have.",
    response: `That concern is intelligent. And it is exactly why this program was not built as a general program. The core is a phased biomechanical progression with a guided diagnostic pathway built in. Step one identifies which tissue and movement patterns are driving your pain. From there, dedicated modules map directly to plantar fascia, Achilles, and posterior tibial tendon presentations — each with its own loading strategies, dosages, and progressions appropriate to that tissue type. Someone with acute plantar pain uses different loading parameters than someone managing tendinopathy. The system accounts for that. It is not one-size-fits-all. It is systematic, specific, and built to adapt to your clinical presentation.`,
  },
  {
    trigger: "I'm worried I'll do something wrong and make it worse without anyone watching.",
    response: `That is a fair and responsible concern. Here is how the program addresses it directly. Every movement is video-demonstrated, slow, and explained with purpose-driven cues. The very first exercises are designed to reduce stress on the injured tissue — not increase it. You start at a level your body can handle. You get a clear list of red flags and objective cues to watch for. If something hurts, you do not guess. You step down one level using the built-in regression — and you know exactly which one. At the higher tiers, your progress is actively reviewed by Dr. Jonathan. Your form, your pain response, your progression — all of it is monitored and adjusted based on what is actually happening with your case. And the guarantee backs all of it. Follow the progression as taught. Use the checkpoints. If anything goes sideways, the support is there to work through it with you — or you get your money back. No arguing.`,
  },
];

const ObjectionsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-sage-light/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Still on the Fence? Let's Talk Through It.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {objections.map((item, i) => (
              <AccordionItem
                key={i}
                value={`objection-${i}`}
                className="section-card px-6 md:px-8 border-none"
              >
                <AccordionTrigger className="text-left text-lg font-display text-primary hover:no-underline py-6">
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg font-body leading-relaxed pb-6">
                  {item.response}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default ObjectionsSection;
