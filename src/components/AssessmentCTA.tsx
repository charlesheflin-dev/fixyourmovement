import { motion } from "framer-motion";

export default function AssessmentCTA() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">
            Free Assessment
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Not sure where to start? Find out where you stand.
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Take the free Foot Capacity Assessment — a short, structured tool that helps identify what may be contributing to your foot pain and what to focus on first. Takes about 3 minutes.
          </p>

          {/* Benefits strip */}
          <div className="bg-slate-50 rounded-2xl p-5 mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 text-center">
              After completing the assessment, you'll discover:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Which recovery profile fits your situation",
                "What may be slowing your progress",
                "Why certain advice hasn't worked for you",
                "How your symptoms compare to your function level",
                "What to focus on next",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0 mt-0.5 text-sm">→</span>
                  <p className="text-sm text-slate-600 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA block */}
          <div className="rounded-2xl overflow-hidden border border-slate-200">
            <div className="px-6 py-5 flex flex-col sm:flex-row items-center gap-4" style={{ background: "#0d2550" }}>
              <p className="text-white text-sm leading-relaxed flex-1">
                Take the Recovery Profile Assessment and the Foot and Ankle Ability Measure now and get personalized insights based on you.
              </p>
              <a href="/lp/take-assessment"
                className="flex-shrink-0 text-white font-bold text-sm rounded-xl px-5 py-3 flex items-center gap-2 whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ background: "#e8531a" }}
              >
                Start my assessments →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-6 py-3 bg-white border-t border-slate-100">
              {[
                { label: "Personalized to you", sub: "Not one-size-fits-all" },
                { label: "100% private", sub: "Secure & confidential" },
                { label: "Trusted by thousands", sub: "Proven framework" },
                { label: "No obligation", sub: "Just clarity" },
              ].map((badge, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-blue-600 mt-0.5 text-xs font-bold">✓</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{badge.label}</p>
                    <p className="text-xs text-slate-400 leading-tight">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}