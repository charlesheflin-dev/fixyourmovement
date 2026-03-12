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
            Your recovery helps others heal too
          </h2>
          <div className="space-y-5 text-left text-lg text-muted-foreground font-body leading-relaxed">
            <p>
              Throughout my career, I've worked with patients who waited weeks — sometimes months 
              — just to get access to physical therapy. In some communities, people are placed on 
              waiting lists and many never receive the care they need.
            </p>
            <p>
              A portion of the proceeds from The Foot Capacity System goes toward expanding 
              access to care and helping build a clinic that serves people in underserved 
              communities who otherwise might not receive physical therapy at all.
            </p>
            <p className="text-foreground font-medium italic font-display text-xl text-center pt-2">
              When you join this program, you're not only investing in your own recovery — 
              you're helping expand care for people who need it most.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
