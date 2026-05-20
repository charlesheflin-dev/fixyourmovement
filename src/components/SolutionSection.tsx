import { motion } from "framer-motion";
import { Target, BarChart2, CheckCircle } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
        >
          {/* Top section: text left, image right */}
          <div className="flex flex-col lg:flex-row">

            {/* Left: text */}
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">Most People Stay Stuck</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Most People Don't Need More Random Advice.<br className="hidden md:block" />
                <span> They Need More </span>
                <span className="text-blue-600">Clarity.</span>
              </h2>
              <div className="w-10 h-0.5 bg-blue-600 mb-6" />
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                The hardest part of recovery is often not effort. It's uncertainty.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                The Foot Capacity System gives you a{" "}
                <span className="text-blue-600 font-medium">clear path forward</span>{" "}
                with guided structure, tracking, and support— so you always know what to focus on next.
              </p>
            </div>

            {/* Right: image */}
            <div className="lg:w-3/5 flex items-center justify-center p-6 lg:p-8">
              <div className="w-full">
                <img
                  src="/images/guesswork-to-clarity.png"
                  alt="From guesswork to clarity with the Foot Capacity System"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Bottom: 3 feature columns */}
          <div className="border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            <div className="flex items-start gap-4 p-6">
              <div className="bg-blue-50 rounded-full p-3 shrink-0">
                <Target size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm mb-1">Track Symptoms</p>
                <p className="text-slate-500 text-xs leading-relaxed">Log pain, activity, and how your foot and ankle feel.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <div className="bg-green-50 rounded-full p-3 shrink-0">
                <BarChart2 size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm mb-1">Monitor Trends</p>
                <p className="text-slate-500 text-xs leading-relaxed">See patterns and progress over time.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <div className="bg-blue-50 rounded-full p-3 shrink-0">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm mb-1">Progress With Confidence</p>
                <p className="text-slate-500 text-xs leading-relaxed">Follow a system designed to help you keep moving forward.</p>
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="border-t border-slate-200 bg-white px-8 py-5 flex items-start gap-4">
            <div className="bg-blue-50 rounded-full p-2 shrink-0 mt-0.5">
              <CheckCircle size={18} className="text-blue-600" />
            </div>
            <p className="text-slate-700 text-sm font-medium leading-relaxed">
              Recovery becomes more manageable when you can clearly see what's happening, what to do next, and how to keep moving forward—one step at a time.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
