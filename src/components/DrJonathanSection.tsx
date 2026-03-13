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
              Why were so many people going through the same cycle of temporary relief without actually rebuilding their foot's capacity?
            </p>
          </div>

          <p>
            Over time, Dr. Jonathan began refining a different approach focused on restoring strength and tissue capacity. Patients who had tried everything elsewhere often came to him after unsuccessful treatment and began seeing lasting improvement.
          </p>
          <p>
            When he started sharing this perspective publicly, the response was immediate. Many people said they had never heard their condition explained this way before.
          </p>
          <p className="text-foreground font-medium">
            Fix Your Movement was built to bring this systems based, capacity building approach to people who do not have access to that level of care in their local area.
          </p>
        </motion.div>


      </div>
    </section>
  );
};

export default DrJonathanSection;
