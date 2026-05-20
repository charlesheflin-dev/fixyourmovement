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
                src="/images/3-phones2.png"
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

        </motion.div>
      </div>
    </section>
  );
};

export default WhatItIsSection;
