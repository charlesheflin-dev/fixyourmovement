import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-card p-8 md:p-12 text-center border-t-4 border-sage"
        >
          <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-6">
            <Heart className="w-7 h-7 text-sage" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-6">
            A Program With a Bigger Purpose
          </h2>
          <div className="space-y-5 text-left text-lg text-muted-foreground font-body leading-relaxed">
            <p>
              One of the reasons this system matters so much to Dr. Jonathan is because access to physical therapy is not equal.
            </p>
            <p>
              Some people wait weeks or months just to get into a clinic. Others cannot afford repeated visits, even when they know they need help. And many people who could benefit from the right guidance never receive it consistently enough to make real progress.
            </p>
            <p>
              This program helps change that. By creating a system people can follow from home, more people can get access to structured, biomechanics-driven rehabilitation — without being limited by geography, clinic availability, scheduling, or repeated appointment costs.
            </p>
            <p>
              A portion of the proceeds from The Foot Capacity System also goes toward helping expand access to care and support the long-term vision of building a clinic that serves underserved communities who might not otherwise receive physical therapy at all.
            </p>
            <p className="text-foreground font-medium italic font-display text-xl text-center pt-2">
              So when someone joins this program, they are not only investing in their own recovery — they are helping extend care to people who need it most.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
