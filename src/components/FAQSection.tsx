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
    a: "No. This is a structured rehabilitation progression built around biomechanics, tissue adaptation, and progressive load tolerance.",
  },
  {
    q: "Is this only for plantar fasciitis?",
    a: "Plantar fasciitis is one of the primary conditions addressed, but the system focuses on rebuilding foot capacity more broadly.",
  },
  {
    q: "Do I need special equipment?",
    a: "No. Most exercises require minimal equipment.",
  },
  {
    q: "Do I need to stop activity completely?",
    a: "Not usually. The goal is intelligent load modification while rebuilding strength.",
  },
  {
    q: "How long before I see progress?",
    a: "Many participants notice improvements as they consistently follow the progression and rebuild load tolerance.",
  },
  {
    q: "Is Dr. Jonathan an actual physical therapist?",
    a: "Yes. Dr. Jonathan Schutza is a licensed PT with a Doctor of Physical Therapy degree specializing in biomechanics-driven rehabilitation.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-8 md:py-12">
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
