import { motion } from "framer-motion";

const DrJonathanSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Why Dr. Jonathan Built The Foot Capacity System
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
            Early in his career, Dr. Jonathan began noticing the same pattern.
          </p>
          <p>Patients arrived after trying everything.</p>
          <p>Rest. Ice. Stretching. Orthotics. Even physical therapy.</p>
          <p>Many had already been told nothing more could be done.</p>
          <p>Some said it the moment they walked in.</p>

          <div className="section-card p-8 md:p-10 text-center border-l-4 border-blue my-8">
            <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
              "PT didn't work for me."
            </p>
          </div>

          <p>
            But when Dr. Jonathan evaluated them and guided them through a different progression,
            something surprising happened.
          </p>
          <p>They improved.</p>
          <p>That raised an important question.</p>

          <div className="section-card p-8 md:p-10 text-center border-l-4 border-slate-200 my-8">
            <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
              If therapy had already "failed," why were these patients finally making progress?
            </p>
          </div>

          <p>Over time the answer became clear.</p>
          <p>
            Most approaches were focused on calming symptoms instead of rebuilding the tissue's ability to
            tolerate load.
          </p>
          <p>Pain might improve for a while.</p>
          <p>But the underlying capacity problem remained.</p>
          <p>
            Dr. Jonathan approached these conditions differently, helping people rebuild the kind of foot that
            could tolerate the forces of everyday life.
          </p>
          <p>Then something else happened.</p>
          <p>
            As he began sharing this perspective online, hundreds of people reached out saying the same
            thing.
          </p>
          <p>They had never heard their condition explained this way before.</p>

          <div className="section-card p-8 md:p-10 text-center border-l-4 border-blue my-8">
            <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
              It became clear that many people simply did not have access to this kind of care.
            </p>
          </div>

          <p>
            So Dr. Jonathan built a way to bring his systems based, capacity building approach into people's
            homes.
          </p>
          <p className="text-foreground font-medium">
            That work became the foundation of The Foot Capacity System.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DrJonathanSection;
