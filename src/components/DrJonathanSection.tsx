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

          <div className="section-card p-8 md:p-10 text-center border-l-4 border-coral">
            <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
              If the treatment was really working, why did the pain keep returning?
            </p>
          </div>

          <p>The answer was simple, even if it was not convenient.</p>
          <p>
            Most approaches were managing symptoms instead of rebuilding the tissue's ability to handle load.
          </p>
          <p>The pain was being turned down, but the underlying capacity problem was still there.</p>
          <p>So Dr. Jonathan changed his approach.</p>
          <p>
            He went deeper into biomechanics, tissue adaptation, movement quality, and progressive loading. Instead of teaching people to avoid load forever, he focused on rebuilding the kind of foot that could tolerate life again.
          </p>
          <p className="text-foreground font-medium">That shift changed everything.</p>
          <p>
            Because when you finally address the root issue, things start to move in the right direction.
          </p>
          <p>Not overnight. Not magically. But for real.</p>
          <p className="text-foreground font-medium">That is what this system is built on.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="section-card p-8 md:p-10 mt-12 text-center bg-primary/[0.03]"
        >
          <h3 className="font-display text-2xl md:text-3xl text-coral-deep italic mb-2">
            Not temporary relief.
          </h3>
          <h3 className="font-display text-2xl md:text-3xl text-primary font-bold">
            A real rebuild.
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default DrJonathanSection;
