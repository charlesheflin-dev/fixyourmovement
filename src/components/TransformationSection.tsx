import { motion } from "framer-motion";
import { HelpCircle, Smartphone, ClipboardList, TrendingUp, Shield, SignpostBig, CheckCircle } from "lucide-react";

const TransformationSection = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Top: two columns */}
          <div className="flex flex-col lg:flex-row">

            {/* Left: heading + two feature rows */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="w-8 h-0.5 bg-blue-600 mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Designed To Feel{" "}
                <span className="text-blue-600">Clear, Organized, And Easy To Follow</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Recovery becomes much less stressful when people stop trying to figure everything out on their own.
              </p>
              <div className="w-full h-px bg-slate-200 mb-6" />

              {/* Two feature items */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 rounded-full p-3 shrink-0">
                    <HelpCircle size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Uncertainty makes recovery harder.</p>
                    <p className="text-slate-500 text-xs leading-relaxed">Not knowing if you're doing too much, too little, or the right thing can make the process feel frustrating and inconsistent.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 rounded-full p-3 shrink-0">
                    <Smartphone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">We built a better way.</p>
                    <p className="text-slate-500 text-xs leading-relaxed">The Foot Capacity System simplifies recovery with guided sessions, progress tracking, structured phases, and clearer direction during setbacks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 4 feature cards */}
            <div className="lg:w-1/2 p-8 md:p-12 bg-slate-50 flex flex-col justify-center gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                <div className="bg-blue-50 rounded-xl p-3 shrink-0">
                  <ClipboardList size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">Guided Sessions</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Follow structured recovery progressions step by step.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                <div className="bg-green-50 rounded-xl p-3 shrink-0">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">Progress Tracking</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Monitor symptoms, activity, and trends over time.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                <div className="bg-purple-50 rounded-xl p-3 shrink-0">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">Flare-Up Support</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Adjust without panic when setbacks happen.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-start gap-4">
                <div className="bg-blue-50 rounded-xl p-3 shrink-0">
                  <SignpostBig size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">Clearer Direction</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Spend less time second-guessing what to do next.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="border-t border-slate-200 bg-slate-50 px-8 py-6 flex items-start gap-4">
            <div className="bg-blue-50 rounded-full p-2 shrink-0 mt-0.5">
              <CheckCircle size={20} className="text-blue-600" />
            </div>
            <p className="text-slate-800 text-base font-semibold leading-relaxed">
              For many people, having a clearer structure becomes the difference between constantly restarting and finally moving forward again.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;
