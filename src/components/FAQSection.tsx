import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is this just another set of exercises I can find online?",
    a: "No. This is a structured progression built around biomechanics, tissue adaptation, and load capacity. It is designed to help you understand what is happening, what to do next, and how to progress without guessing.",
  },
  {
    q: "Is this only for plantar fasciitis?",
    a: "Plantar fasciitis is one of the main conditions this system is built to help, but the bigger focus is foot capacity. That means the system also speaks to recurring heel pain, arch pain, and the broader movement issues that often keep foot pain coming back.",
  },
  {
    q: "Do I need special equipment?",
    a: "No. The program is designed to work with minimal equipment. Optional tools may be recommended as you progress, but they are not required to get started.",
  },
  {
    q: "Do I need to stop all activity while I recover?",
    a: "Not necessarily. In most cases, the goal is not to shut life down. The goal is to modify load intelligently while rebuilding strength and capacity at the same time.",
  },
  {
    q: "How long before I start seeing progress?",
    a: "Everyone starts from a different place, but many people begin noticing meaningful changes as they follow the progression and rebuild load tolerance correctly. The key is consistency and structure.",
  },
  {
    q: "What if I have had this pain for a long time?",
    a: "That is exactly who this system is for. It was built for people who have been stuck in the cycle for months or years and are ready for a more structured, root-cause approach.",
  },
  {
    q: "What if my pain flares up?",
    a: "That is one of the reasons the program includes the Flare Recovery Playbook. You will know what to do, how to respond, and how to keep moving forward without feeling lost every time symptoms rise.",
  },
  {
    q: "Is Dr. Jonathan an actual physical therapist?",
    a: "Yes. Dr. Jonathan Schutza is a licensed PT and holds a Doctor of Physical Therapy degree. His work is rooted in biomechanics-driven rehabilitation and a structured clinical approach to chronic foot pain.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="section-card px-6 md:px-8 border-none"
              >
                <AccordionTrigger className="text-left text-lg font-display text-primary hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg font-body leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
