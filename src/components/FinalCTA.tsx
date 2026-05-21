import { motion } from "framer-motion";

import { Map, BarChart2, Shield, Target, CheckCircle } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">

            {/* Left: image */}
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-0">
              <img
                src="/images/moves-you-forward.png"
                alt="Recovery isn't about doing more. It's about doing what moves you forward."
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: text + features + CTA */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">Ready To See How The Full System Works?</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Watch the Guided Walkthrough
              </h2>
              <div className="w-10 h-0.5 bg-blue-600 mb-6" />
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Explore how The Foot Capacity System helps people approach recovery with more structure, more clarity, and far less guesswork.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                  <div className="bg-blue-50 rounded-full p-2.5 shrink-0">
                    <Map size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Follow a more organized recovery process</p>
                    <p className="text-slate-500 text-xs mt-0.5">Understand exactly what to do and when.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                  <div className="bg-green-50 rounded-full p-2.5 shrink-0">
                    <BarChart2 size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Track progress over time</p>
                    <p className="text-slate-500 text-xs mt-0.5">See your trends and know you're moving forward.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                  <div className="bg-purple-50 rounded-full p-2.5 shrink-0">
                    <Shield size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Navigate flare-ups more calmly</p>
                    <p className="text-slate-500 text-xs mt-0.5">Adjust with confidence and stay on track.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 rounded-full p-2.5 shrink-0">
                    <Target size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Stay consistent without second-guessing</p>
                    <p className="text-slate-500 text-xs mt-0.5">Build habits that make progress sustainable.</p>
                  </div>
                </div>
              </div>

              {/* Goal statement */}
              <p className="text-slate-700 text-base leading-relaxed mb-8">
                The goal is simple:{" "}
                <span className="text-blue-600 font-semibold">Help recovery feel more manageable, more sustainable, and less overwhelming long term.</span>
              </p>

              {/* CTA */}
              <div className="text-center">
                <a href="https://fixyourmovement.com/walkthrough" target="_blank" rel="noopener noreferrer" className="cta-button animate-pulse-glow text-base md:text-lg">
                  Watch The Full Guided Walkthrough
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
