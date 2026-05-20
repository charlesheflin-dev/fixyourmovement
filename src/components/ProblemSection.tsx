import { motion } from "framer-motion";
import { PersonStanding, Clock, Hand, Footprints, CheckCircle, Lightbulb, Target } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Top: two columns */}
          <div className="flex flex-col lg:flex-row">

            {/* Left: text */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="w-8 h-0.5 bg-blue-600 mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Why Does Foot And Ankle Pain Keep{" "}
                <span className="text-blue-600">Coming Back?</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-6">
                Because temporary relief and long-term recovery are not the same thing.
              </p>
              <div className="w-full h-px bg-slate-200 mb-6" />

              {/* Cycle steps */}
              <p className="font-semibold text-slate-900 text-sm mb-4">Most people get stuck in the same frustrating cycle:</p>
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {[
                    { icon: PersonStanding, label: "Stretch." },
                    { icon: Clock, label: "Rest." },
                    { icon: Hand, label: "Massage." },
                  ].map(({ icon: Icon, label }, i, arr) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="bg-blue-50 rounded-full p-2">
                          <Icon size={16} className="text-blue-600" />
                        </div>
                        <p className="text-slate-600 text-xs font-medium text-center max-w-[60px]">{label}</p>
                      </div>
                      {i < arr.length - 1 && <span className="text-slate-300 text-lg mb-4">›</span>}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2">
                  {[
                    { icon: Footprints, label: "Different shoes or inserts." },
                    { icon: CheckCircle, label: "Temporary relief." },
                  ].map(({ icon: Icon, label }, i, arr) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="bg-blue-50 rounded-full p-2">
                          <Icon size={16} className="text-blue-600" />
                        </div>
                        <p className="text-slate-600 text-xs font-medium text-center max-w-[60px]">{label}</p>
                      </div>
                      {i < arr.length - 1 && <span className="text-slate-300 text-lg mb-4">›</span>}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Maybe things improve for a little while. But the moment life becomes more active again, the pain often returns.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                After enough setbacks, a lot of people quietly start wondering:
              </p>
              <p className="text-blue-600 font-semibold text-sm italic">
                "Is this just something I'm going to have to live with?"
              </p>
            </div>

            {/* Right: cycle image + insight card */}
            <div className="lg:w-1/2 p-8 md:p-12 bg-slate-50 flex flex-col justify-center gap-6">
              <img
                src="/images/why-pain-returns.png"
                alt="The pain cycle diagram"
                className="w-full rounded-2xl"
              />
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-2.5 shrink-0 mt-0.5">
                  <Lightbulb size={18} className="text-white" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  In many cases, the problem is not that the foot is permanently damaged. It's that the tissues simply do not yet have the{" "}
                  <span className="text-blue-600 font-semibold">strength and tolerance</span>{" "}
                  to consistently handle the demands being placed on them.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="border-t border-slate-200 bg-slate-50 px-8 py-6 flex items-start gap-4">
            <div className="bg-blue-50 rounded-full p-2 shrink-0 mt-0.5">
              <Target size={20} className="text-blue-600" />
            </div>
            <p className="text-slate-800 text-base font-semibold leading-relaxed">
              Most people are never shown how to rebuild that strength gradually or where to even begin.{" "}
              <span className="text-blue-600">That's the missing piece.</span>
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
