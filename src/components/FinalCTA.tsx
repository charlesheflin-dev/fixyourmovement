import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-12 md:py-20 bg-primary/[0.03]">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-8 text-center leading-tight">
            One Year From Now, Where Will You Be?
          </h2>

          {/* Vision 1 — positive */}
          <div className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed mb-8">
            <p>
              Picture a regular morning. You get up. Your feet hit the floor. And you just... walk. No bracing
              for that first step. No testing the ground. No mental calculation of how far you can go before it
              starts.
            </p>
            <p>
              You sign up for that hiking trip. You chase your kids around the yard. You lace up for a run
              without the quiet dread that follows you through every mile.
            </p>
            <p className="text-foreground font-medium text-xl">
              That is not a fantasy. That is what happens when your tissue finally has the capacity to handle
              your life.
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-10 flex items-center">
            <div className="flex-1 border-t border-border" />
            <span className="mx-4 text-muted-foreground font-body text-sm uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Vision 2 — inaction */}
          <div className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed mb-10">
            <p>
              Now picture the other version. Same morning. Same floor. Same first step. And the same sharp
              reminder that nothing has changed.
            </p>
            <p>
              Because here is the honest truth about inaction: the pain does not stay the same. Tissues that are
              not progressively loaded get weaker over time. The threshold drops. The flare-ups come faster. The
              activities you are still doing today become the ones you avoid next year.
            </p>
            <p>
              Every week you spend in the cycle of rest, temporary relief, and re-injury is a week your foot
              loses more of the capacity it needs to handle real life.
            </p>
            <p>You have already tried the passive route. You know where it leads.</p>
            <p>
              The only thing that changes the outcome is addressing the root cause: rebuilding the structural
              capacity your foot has lost. That is what this system is built to do. Not manage your symptoms
              until the next flare. Build the foundation that prevents the next one.
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
