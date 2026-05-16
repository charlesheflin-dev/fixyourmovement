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
            Why Does Foot And Ankle Pain Keep Coming Back?
          </h2>
          <p className="text-lg text-muted-foreground font-body mt-2">
            Because temporary relief and long-term recovery are not the same thing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>
            Most people dealing with recurring foot or ankle pain end up stuck in the same frustrating cycle.
          </p>
          <p>
            They stretch.
          </p>
          <p>
            Rest.
          </p>
          <p>
            Massage the area.
          </p>
          <p>
            Try different shoes or inserts.
          </p>
          <p>
            Maybe things improve for a little while. But the moment they start walking more, exercising again, traveling, or simply getting back to normal life, the pain flares back up.
          </p>
          <p>
            After enough setbacks, a lot of people quietly start wondering: "Is this just something I'm going to have to live with?"
          </p>
          <p>
            In many cases, the problem is not that the foot is permanently damaged. It's that the tissues simply do not yet have the strength and tolerance to consistently handle the demands being placed on them.
          </p>
          <p>
            That's the missing piece most people are never taught. Once that starts making sense, recovery usually starts making more sense too.
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
            Most people are never shown how to rebuild that strength gradually or where to even begin.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
