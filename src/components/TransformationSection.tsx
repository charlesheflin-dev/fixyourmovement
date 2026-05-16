import { motion } from "framer-motion";

const TransformationSection = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-5">
            Designed To Feel Clear, Organized, And Easy To Follow
          </h2>
          <p className="text-lg text-muted-foreground font-body mt-2">
            Recovery becomes much less stressful when people stop trying to figure everything out on their own.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground font-body leading-relaxed">
          <p>
            One of the biggest challenges in recovery is not motivation. It's uncertainty. Not knowing whether you're progressing too quickly, doing too much, or responding appropriately can make the entire process feel frustrating and inconsistent.
          </p>
          <p>
            The Foot Capacity System was designed to simplify that experience. Inside the app, members can follow guided recovery sessions, track symptoms over time, monitor progress visually, and navigate flare-ups with more structure and less second-guessing.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="section-card p-8"
          >
            <p className="font-display text-lg font-bold text-slate-900 mb-4">Everything inside the system is designed to feel:</p>
            <ul className="list-disc list-inside text-muted-foreground font-body text-lg leading-relaxed">
              <li>Simple</li>
              <li>Organized</li>
              <li>Manageable</li>
              <li>Supportive</li>
            </ul>
          </motion.div>

          <p>
            The goal is to help people spend less time worrying about what they should do next and more time following a process they can actually stick with consistently.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-card p-8 mt-6 border-l-4 border-blue"
          >
            <p className="text-lg text-muted-foreground font-body leading-relaxed italic">
              For many people, having a clearer structure becomes the difference between constantly restarting and finally moving forward again.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
