import { motion } from "framer-motion";

const ProblemSection = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-100/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Why Your Foot Pain Keeps Coming Back Has Nothing to Do With Your Foot
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>
            You have rested it. Stretched it. Bought the shoes, the orthotics, the insoles. You have sat through
            the appointments, followed the advice, and done everything you were told to do.
          </p>
          <p>
            And still, the moment you try to get back to your life — a morning run, a long walk, a hike with the
            family — it comes back.
          </p>
          <p>
            Here is what no one has told you: the pain is not the problem. It is a signal. And the signal is
            saying one thing — your tissue does not have enough capacity to handle the load you are placing on it.
            Not because you are broken. Not because you are getting old. Because the approach you have been given
            was never designed to fix that.
          </p>
          <p>
            Rest lowers your load. But it also lowers your capacity. So every time you return to activity, you are
            asking a weaker foot to do the same job. That is not bad luck. That is a predictable outcome of the
            wrong strategy.
          </p>
          <p>
            The stretches, the injections, the orthotics — they are not useless. But they are all working on the
            symptom, not the source. And that is why you are still here, still frustrated, still wondering if this
            is just your life now.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="section-card p-8 md:p-10 mt-10 border-l-4 border-blue"
        >
          <p className="text-lg text-muted-foreground font-body leading-relaxed italic">
            It is not your fault. You followed the advice you were given.
          </p>
          <p className="mt-3 text-xl font-display text-blue font-semibold">
            The advice was incomplete.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
