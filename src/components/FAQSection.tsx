import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs: { q: string; a: React.ReactNode; highlight?: boolean }[] = [
  {
    q: "Is this just another set of exercises I can find online?",
    a: "No. This is a structured clinical progression built around biomechanics, load tolerance, and real decision-making — sequenced in a way you will not find in a YouTube video.",
  },
  {
    q: "Do I need special equipment?",
    a: "No. Most of the work requires minimal or no equipment. You can follow the system from home without any special setup.",
  },
  {
    q: "How does the app guide me through my recovery?",
    a: "You log simple daily inputs — pain levels and activity. The system reads that data and directs your next step based on how your body is actually responding, not a fixed calendar.",
  },
  {
    q: "What if my pain goes up and down?",
    a: "That is expected. The system is built to respond to those changes so you can adjust early — before a spike becomes a setback.",
  },
  {
    q: "Is this personalized to my situation?",
    a: "Tier 2 adapts your progression based on your own data. Tier 3 adds direct clinical oversight from Dr. Jonathan, with case-specific adjustments throughout your 12 weeks.",
  },
  {
    q: "Do I need to stop all activity while I recover?",
    a: "In most cases, no. The goal is to modify how much load you place on the tissue while you rebuild its capacity — not to stop moving entirely.",
  },
  {
    q: "How long before I start seeing progress?",
    a: "Most people begin to notice a shift as their consistency builds and their tissue starts tolerating more load. There is no fixed timeline — the system moves at the pace your body signals it is ready.",
  },
  {
    q: "I have already tried physical therapy. Why would this be different?",
    a: "Most physical therapy addresses symptoms. This system addresses the root cause — the tissue's low capacity to handle load. That is the piece most approaches skip entirely.",
  },
  {
    q: "What if I follow the program and it does not work for me?",
    a: (
      <>
        The system is backed by the <strong>Walk Pain-Free or It's Free</strong> 90-day guarantee. Follow it,
        do the work, and if you have not seen a meaningful reduction in pain and improved confidence to move,
        show us the work and you get a full refund.
      </>
    ),
    highlight: true,
  },
  {
    q: "Which tier is right for me?",
    a: "If you are self-directed and ready to follow a clear structure independently, the Blueprint is built for you. If you want your progression guided by your own data, the Guided Recovery System is the stronger choice. If you want direct clinical oversight and one-on-one sessions with Dr. Jonathan, Private Recovery Access is the highest level available — and it is limited to 10 people.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 md:py-20">
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
                className={`section-card px-6 md:px-8 border-none ${
                  faq.highlight ? "border-l-4 border-sage" : ""
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

          {/* Bottom CTA */}
          <div className="text-center mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center font-display font-semibold text-base py-3.5 px-8 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Still have a question? Reach out before you decide. →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
