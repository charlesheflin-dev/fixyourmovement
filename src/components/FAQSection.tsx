import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs: { q: string; a: React.ReactNode; highlight?: boolean }[] = [
  {
    q: "Is this only for plantar fasciitis?",
    a: "No. While many people initially discover the system because of plantar fasciitis or heel pain, The Foot Capacity System was designed more broadly around improving foot and ankle strength, movement tolerance, and long-term recovery consistency.",
  },
  {
    q: "What if I've already tried physical therapy, stretching, orthotics, or other programs?",
    a: "Most people who explore The Foot Capacity System have already tried several approaches before finding it. Usually, the difference is not one magical exercise. It's finally having a more structured approach that helps people stay consistent and stop second-guessing recovery constantly.",
  },
  {
    q: "What happens if symptoms flare up again?",
    a: "Flare-ups are a normal part of recovery for many people. The system was designed to help people navigate setbacks with more structure and less panic instead of feeling like all their progress has disappeared.",
  },
  {
    q: "Can this be followed from home?",
    a: "Yes. The Foot Capacity System was specifically designed to help people follow a more structured recovery process from home through guided sessions, tracking tools, and built-in recovery support.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-6 md:py-10">
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
          <p className="text-lg text-muted-foreground font-body">
            A few common questions people ask before exploring The Foot Capacity System further.
          </p>
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
                className={`section-card px-6 md:px-8 border-none ${
                  faq.highlight ? "border-l-4 border-slate-200" : ""
                }`}
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
