import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-12 md:py-20 bg-primary/[0.03]">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-10 text-center leading-tight">
            One Year From Now, Where Will You Be?
          </h2>

          {/* Two-column vision split */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Left — With the System */}
            <div className="rounded-2xl p-8 md:p-10" style={{ background: "hsl(var(--sage-light))" }}>
              <p className="font-display font-bold text-base text-primary uppercase tracking-widest mb-5">
                With the System
              </p>
              <div className="space-y-4 text-base text-muted-foreground font-body leading-relaxed">
                <p>
                  You get up. Your feet hit the floor. And you just... walk. No bracing for that first step. No
                  testing the ground. No mental calculation of how far you can go before it starts.
                </p>
                <p>
                  You sign up for that hiking trip. You chase your kids around the yard. You lace up for a run
                  without the quiet dread that follows you through every mile.
                </p>
                <p className="text-foreground font-medium">
                  That is not a fantasy. That is what happens when your tissue finally has the capacity to handle
                  your life.
                </p>
              </div>
            </div>

            {/* Right — Without Action */}
            <div className="rounded-2xl p-8 md:p-10" style={{ background: "hsl(var(--primary) / 0.07)" }}>
              <p className="font-display font-bold text-base text-coral-deep uppercase tracking-widest mb-5">
                Without Action
              </p>
              <div className="space-y-4 text-base text-muted-foreground font-body leading-relaxed">
                <p>
                  Same morning. Same floor. Same first step. And the same sharp reminder that nothing has changed.
                </p>
                <p>
                  Tissues that are not progressively loaded get weaker over time. The threshold drops. The
                  flare-ups come faster. The activities you are still doing today become the ones you avoid next
                  year.
                </p>
                <p className="text-foreground font-medium">
                  You have already tried the passive route. You know where it leads.
                </p>
              </div>
            </div>
          </div>

          {/* Full-width closing copy */}
          <div className="max-w-3xl mx-auto space-y-5 text-lg text-muted-foreground font-body leading-relaxed mb-10 text-center">
            <p>
              The only thing that changes the outcome is addressing the root cause: rebuilding the structural
              capacity your foot has lost. That is what this system is built to do. Not manage your symptoms until
              the next flare. Build the foundation that prevents the next one.
            </p>
            <p className="text-foreground font-medium text-xl">
              The question is not whether this works. The question is whether you are ready to stop repeating the
              same pattern and start building something that holds.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/choose-your-plan"
              className="cta-button animate-pulse-glow text-xl"
            >
              Yes — I'm Ready to Build Something That Holds →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
