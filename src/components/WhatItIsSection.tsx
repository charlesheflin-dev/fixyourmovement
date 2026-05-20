import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, BarChart2, Shield, CheckCircle } from "lucide-react";

const WhatItIsSection = () => {
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
          {/* Top section: image left, text right */}
          <div className="flex flex-col lg:flex-row">

            {/* Left: 3 phones image */}
            <div className="lg:w-1/2 p-6 lg:p-10 flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
              <img
                src="/images/3-phones.png"
                alt="The Foot Capacity System app screens"
                className="w-full max-w-md rounded-2xl"
              />
            </div>

            {/* Right: text + features */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">A More Structured Way To Approach Recovery</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                A Recovery System Built Around Structure,{" "}
                <span className="text-blue-600">Not Guesswork.</span>
              </h2>
              <div className="w-10 h-0.5 bg-blue-600 mb-6" />
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Recovery is rarely linear. The Foot Capacity System gives you the structure and feedback you need to make confident decisions and keep moving forward.
              </p>

              {/* Feature list */}
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 rounded-full p-3 shrink-0">
                    <Play size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Guided Recovery Sessions</p>
                    <p className="text-slate-500 text-xs leading-relaxed">Follow structured progressions designed to build strength, capacity, and confidence.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 rounded-full p-3 shrink-0">
                    <BarChart2 size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Daily Tracking & Progress Monitoring</p>
                    <p className="text-slate-500 text-xs leading-relaxed">Log symptoms and activity, monitor trends, and see your progress over time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 rounded-full p-3 shrink-0">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Flare-Up Support</p>
                    <p className="text-slate-500 text-xs leading-relaxed">When setbacks happen, the system helps you adjust so you can get back on track faster.</p>
                  </div>
                </div>
              </div>

              {/* Callout */}
              <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3 mb-8">
                <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-slate-700 text-sm font-medium leading-relaxed">
                  Clarity leads to better decisions.<br />Better decisions lead to more consistent recovery.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link to="/walkthrough" className="cta-button animate-pulse-glow text-base md:text-lg">
                  See The Full Guided Walkthrough
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom: 3 step columns */}
          <div className="border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-white">
            <div className="flex flex-col items-center text-center p-6 gap-3">
              <div className="bg-blue-50 rounded-full p-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Track</p>
              <p className="text-slate-500 text-xs leading-relaxed">Log pain, activity, and symptoms daily.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 gap-3">
              <div className="bg-blue-50 rounded-full p-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
              </div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Follow</p>
              <p className="text-slate-500 text-xs leading-relaxed">Follow guided sessions built for progressive recovery.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 gap-3">
              <div className="bg-green-50 rounded-full p-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Monitor</p>
              <p className="text-slate-500 text-xs leading-relaxed">Monitor progress and adjust so you can keep moving forward.</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
