import { motion } from "framer-motion";
import { Shield, CalendarDays, TrendingUp, Award, CheckCircle, AlertCircle } from "lucide-react";

const BonusSection = () => {
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
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 rounded-full p-2">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest">Our 60-Day Guarantee</p>
                </div>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                  The <span className="text-blue-600">"Walk Pain-Free Or It's Free"</span> 60-Day Guarantee
                </h2>
                <div className="w-full h-px bg-slate-200 mb-6" />
                {/* Main guarantee statement */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 rounded-full p-3 shrink-0 mt-1">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-700 text-base leading-relaxed font-medium">
                      Try the system for 60 days.<br />
                      If you do the work and do not experience meaningful improvement, we will{" "}
                      <span className="text-blue-600 font-bold">refund 100%</span> of your investment. No questions asked.
                    </p>
                  </div>
                </div>
              </div>
              {/* Badge image */}
              <div className="shrink-0 flex items-start justify-center lg:justify-end">
                <img
                  src="/images/60-day-guarantee.png"
                  alt="60-Day Guarantee"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Middle: two columns */}
          <div className="flex flex-col lg:flex-row">
            {/* Left: 3 feature cards */}
            <div className="lg:w-3/5 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <div className="bg-blue-50 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <CalendarDays size={20} className="text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm mb-2">60 Full Days<br />To Test The System</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Two full months to follow the program and see real results.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <div className="bg-green-50 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp size={20} className="text-green-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm mb-2">Track Progress<br />Inside The App</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Monitor pain, activity, and improvement every step of the way.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <div className="bg-purple-50 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Award size={20} className="text-purple-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm mb-2">100% Refund<br />If You're Not Satisfied</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Do the work. If you don't get meaningful improvement, we make it right.</p>
                </div>
              </div>
            </div>

            {/* Right: 3 checkmark points */}
            <div className="lg:w-2/5 p-8 md:p-10 bg-slate-50 flex flex-col justify-center gap-5">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 rounded-full p-1.5 shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">Two Months. A Clear Process.</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Follow the system, track your progress, and experience the difference.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 rounded-full p-1.5 shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">Built On What Works.</p>
                  <p className="text-slate-500 text-xs leading-relaxed">A clinically-informed framework that has helped people after other approaches failed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 rounded-full p-1.5 shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">No Risk. All Confidence.</p>
                  <p className="text-slate-500 text-xs leading-relaxed">The only risk is staying where you are and hoping something changes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="border-t border-slate-200 bg-slate-50 px-8 py-6 flex items-start gap-4">
            <div className="bg-blue-50 rounded-full p-2 shrink-0 mt-0.5">
              <AlertCircle size={20} className="text-blue-600" />
            </div>
            <p className="text-slate-800 text-base font-semibold leading-relaxed">
              The only real risk is staying stuck in the same cycle of flare-ups, setbacks, and temporary fixes.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default BonusSection;
