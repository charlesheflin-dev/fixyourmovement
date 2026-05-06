import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const BonusSection = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-100/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-card p-8 md:p-14 text-center border-t-4 border-slate-200"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-slate-400" />
          </div>

          <h2 className="font-display text-2xl md:text-4xl text-primary mb-8">
            The "Walk Pain-Free or It's Free" 90-Day Guarantee
          </h2>

          <div className="space-y-6 text-left text-lg text-muted-foreground font-body leading-relaxed">
            <p>
              Follow the system for 90 days. If you have not experienced a real, noticeable reduction in your
              daily foot and ankle pain — and a renewed confidence to move — show us you did the work. We will
              refund 100% of your investment. No questions asked.
            </p>
            <p>
              That is three full months to follow the system, track your progress, and feel the difference.
            </p>
            <p>
              The reason this guarantee exists is simple. This system is built on a clinical framework that works
              when it is followed. Dr. Jonathan has seen it work for people who had already tried everything else
              — cortisone shots, custom orthotics, years of physical therapy. The methodology is sound. The
              progression is deliberate. The results are real.
            </p>

            <div className="section-card p-6 border-l-4 border-blue my-6">
              <p className="text-xl font-display text-primary font-semibold">
                The only risk here is staying where you are.
              </p>
            </div>

            <p>
              Another year of flare-ups. More money on appointments that offer temporary relief. More activities
              missed. More distance from the life you want to be living.
            </p>
            <p>
              You have already taken enough chances on approaches that did not address the root problem. This
              time, the risk is entirely ours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BonusSection;
