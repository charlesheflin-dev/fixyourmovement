import { motion } from "framer-motion";

const DrJonathanSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Why Dr. Jonathan Built This
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg text-muted-foreground font-body leading-relaxed"
        >
          <p>
            Early in his career, Dr. Jonathan followed the same standard playbook many people with chronic foot pain have already experienced.
          </p>
          <p className="font-medium text-foreground">Rest. Ice. Stretch. Repeat.</p>
          <p>Patients would often feel better at first.</p>
          <p>Then they came back.</p>
          <p>Same pain. Same foot. Same frustration.</p>
          <p>That raised an uncomfortable question.</p>

          <div className="section-card p-8 md:p-10 text-center border-l-4 border-coral mt-6 mb-6">
            <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
              If the treatment was working, why did the pain keep returning?
            </p>
          </div>

          <p>The answer became clear.</p>
          <p>
            Most approaches were managing symptoms instead of rebuilding the tissue's ability to tolerate load.
          </p>
          <p>Pain was being turned down, but the underlying capacity problem was still there.</p>
          <p>So Dr. Jonathan shifted his focus.</p>
          <p>
            Instead of teaching people to avoid load, he began helping them rebuild the kind of foot that could tolerate life again.
          </p>
          <p className="text-foreground font-medium">That shift changed everything.</p>
          <p>Not overnight. Not magically. But for real.</p>
          <p className="text-foreground font-medium">That philosophy became the foundation of The Foot Capacity System.</p>
        </motion.div>


      </div>
    </section>
  );
};

export default DrJonathanSection;
