import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-6 md:py-10 bg-primary/[0.03]">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-2xl md:text-4xl text-primary mb-10 text-center leading-tight">
            Ready To See How The Full System Works?
          </h2>
          <p className="text-xl text-muted-foreground font-body mb-10 text-center">
            Watch the guided walkthrough to see how The Foot Capacity System helps people approach recovery with more structure, more clarity, and far less guesswork.
          </p>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground font-body leading-relaxed mb-10">
            <p>
              Most people dealing with recurring foot and ankle pain are not lacking effort.
            </p>

            <p>
              They're usually lacking:
            </p>
            <ul className="list-disc list-inside">
              <li>Structure</li>
              <li>Consistency</li>
              <li>Clarity during setbacks</li>
              <li>Confidence in what to do next</li>
            </ul>

            <p>
              The Foot Capacity System was designed to help simplify that process.
            </p>

            <p>
              Inside the walkthrough, you'll see how the guided recovery system helps people:
            </p>
            <ul className="list-disc list-inside">
              <li>Follow a more organized recovery process</li>
              <li>Track progress over time</li>
              <li>Navigate flare-ups more calmly</li>
              <li>Stay consistent without constantly second-guessing themselves</li>
            </ul>

            <p className="text-foreground font-medium text-lg">
              The goal is simple: Help recovery feel more manageable, more sustainable, and less overwhelming long term.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/walkthrough"
              className="cta-button animate-pulse-glow text-xl"
            >
              Watch The Full Guided Walkthrough
            </Link>
            <p className="mt-4 text-muted-foreground text-base">
              Explore how The Foot Capacity System helps people move forward with more confidence, structure, and consistency from home.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
