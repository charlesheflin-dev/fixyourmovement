import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, ShieldCheck, Lock, Tag, Infinity, Smartphone, BarChart2, SlidersHorizontal, Heart, UserCheck, Route, Leaf, Dumbbell, PersonStanding, Star, Activity, AlertTriangle, ArrowDown, TrendingUp, Eye, Compass } from "lucide-react";
import logo from "@/assets/logo.png";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import WalkthroughTestimonialSection from "@/components/WalkthroughTestimonialSection";

const painData = [
  { month: "May", pain: 8, trend: 7.5 },
  { month: "Jun", pain: 6.5, trend: 6.5 },
  { month: "Jul", pain: 5.5, trend: 5.5 },
  { month: "Aug", pain: 4, trend: 4.5 },
  { month: "Sep", pain: 2.5, trend: 3.5 },
  { month: "Oct", pain: 2, trend: 2.5 },
];

const CHECKOUT_URL = "https://whop.com/checkout/plan_f7hnKFT1vq0zb";

export default function NewWalkthrough2() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>
        {/* SECTION 1 — HERO */}
        <section className="bg-white pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">The Foot Capacity System</p>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Recovery Becomes Much Less Overwhelming With The Right Structure.
              </h1>

              <p className="text-slate-600 text-xl leading-relaxed mb-4">
                The Foot Capacity System helps people move through recovery more calmly — through guided support, progress tracking, and a clearer day-to-day process.
              </p>

              <p className="text-slate-400 text-base italic leading-relaxed mb-10">
                The system was built to help people spend less time feeling stuck and more time steadily moving forward.
              </p>

              {/* Video */}
              <div style={{ position: "relative", paddingTop: "56.25%" }} className="rounded-2xl overflow-hidden shadow-xl mb-8">
                <iframe
                  src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/b37100f8162e1ab91cf86c9e284447da/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F6ec4d8b4-8156-40b2-b196-836d95530f00%2Fpublic"
                  loading="lazy"
                  style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen={true}
                />
              </div>

              <div className="text-center">
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                  Get Started With The Foot Capacity System →
                </a>
                <div className="flex justify-center gap-6 mt-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Tag size={13} className="text-blue-500 inline" /> One-time purchase</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-blue-500 inline" /> Lifetime access</span>
                  <span className="flex items-center gap-1"><Lock size={13} className="text-blue-500 inline" /> Secure checkout</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — WHAT CHANGES */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">What Starts Changing</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                What starts changing with a clearer recovery process.
              </h2>

              <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Less second-guessing.</p>
                  <p>Spend less time wondering whether you're doing too much, too little, or heading in the wrong direction. The system gives you a clear answer every single day.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">More consistency through flare-ups.</p>
                  <p>Setbacks stop feeling like complete restarts when recovery is approached with more structure over time. A flare-up becomes a signal to adjust — not a reason to stop.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">A clearer sense of progress.</p>
                  <p>Tracking trends over time helps recovery feel less emotional and much easier to understand. You can see whether things are actually improving instead of guessing.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">More confidence moving forward.</p>
                  <p>The goal is not perfection. The goal is helping recovery feel more steady, manageable, and sustainable long term.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — PRODUCT SUMMARY */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-2xl mx-auto px-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">

              {/* Header */}
              <div className="text-center px-8 pt-10 pb-6">
                <img src={logo} alt="FCS" className="h-10 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-900 mb-2">The Foot Capacity System</h2>
                <p className="text-blue-600 italic text-sm max-w-md mx-auto">A structured recovery system designed to help you stop guessing and move forward with more clarity and confidence.</p>
              </div>

              {/* Phone + Charts */}
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Phone */}
                  <div className="sm:w-2/5 flex flex-col items-center gap-4">
                    <img src="/images/new-phone.jpg" alt="App screenshot" className="w-full max-w-[180px] rounded-2xl" />
                    <img src="/images/new-phone2.jpg" alt="App screenshot 2" className="w-full max-w-[180px] rounded-2xl mt-4" />
                  </div>
                  {/* Charts column */}
                  <div className="sm:w-3/5 flex flex-col gap-4">

                    {/* Phase 1 Reset Chart */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <p className="font-semibold text-slate-900 text-sm">Phase 1: Reset</p>
                      <p className="text-slate-500 text-xs mb-3">May 11 – present</p>
                      <ResponsiveContainer width="100%" height={80}>
                        <LineChart data={[
                          { day: "May 11", red: 7, green: 5 },
                          { day: "May 12", red: 6, green: 5.5 },
                          { day: "May 13", red: 6.5, green: 6 },
                          { day: "May 14", red: 5.5, green: 6.5 },
                          { day: "May 15", red: 6, green: 7 },
                          { day: "May 16", red: 5, green: 7.5 },
                          { day: "May 17", red: 5.5, green: 8 },
                          { day: "May 18", red: 4.5, green: 8.5 },
                          { day: "Jun 16", red: 5, green: 9 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="day" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
                          <YAxis domain={[0, 10]} tick={{ fontSize: 9 }} width={20} />
                          <Line type="monotone" dataKey="red" stroke="#ef4444" dot={false} strokeWidth={2} />
                          <Line type="monotone" dataKey="green" stroke="#16A34A" dot={false} strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="flex justify-around mt-3 text-center">
                        <div><p className="text-lg font-bold text-slate-900">8</p><p className="text-xs text-slate-500">Starting pain</p></div>
                        <div><p className="text-lg font-bold text-slate-900">6</p><p className="text-xs text-slate-500">Ending pain</p></div>
                        <div><p className="text-lg font-bold text-slate-900">10</p><p className="text-xs text-slate-500">Days logged</p></div>
                      </div>
                    </div>

                    {/* FAAM */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <p className="font-semibold text-slate-900 text-sm">Foot Function Progress (FAAM)</p>
                      <p className="text-slate-500 text-xs mb-3">Your Foot and Ankle Ability score at each phase — higher is better. 100% = full function.</p>
                      <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2">
                        <span className="text-sm text-slate-700">Baseline (Onboarding)</span>
                        <span className="text-xl font-bold text-red-500">31%</span>
                      </div>
                    </div>

                    {/* Pain Over Time Chart */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <p className="font-semibold text-slate-900 text-sm">Insights</p>
                      <p className="font-medium text-slate-700 text-xs mt-1">Pain Over Time</p>
                      <p className="text-slate-500 text-xs mb-3">Daily pain scores from 0 (no pain) to 10 (worst)</p>
                      <ResponsiveContainer width="100%" height={100}>
                        <LineChart data={[
                          { month: "May 11", pain: 8 },
                          { month: "May 12", pain: 7 },
                          { month: "May 13", pain: 7.5 },
                          { month: "May 14", pain: 6 },
                          { month: "May 15", pain: 6.5 },
                          { month: "May 16", pain: 5.5 },
                          { month: "May 17", pain: 6 },
                          { month: "Jun 15", pain: 5 },
                          { month: "Jun 16", pain: 6 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
                          <YAxis domain={[0, 10]} tick={{ fontSize: 9 }} width={20} />
                          <Line type="monotone" dataKey="pain" stroke="#16A34A" dot={{ r: 3, fill: "#16A34A" }} strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                      {/* Analytics */}
                      <div className="flex justify-around mt-3 text-center flex-wrap gap-2">
                        <div><p className="text-base font-bold text-slate-900">30</p><p className="text-xs text-slate-500">Rehab Minutes</p></div>
                        <div><p className="text-base font-bold text-slate-900">10</p><p className="text-xs text-slate-500">Days Logged</p></div>
                        <div><p className="text-base font-bold text-slate-900">7</p><p className="text-xs text-slate-500">Avg Pain Score</p></div>
                        <div><p className="text-base font-bold text-green-600">-3</p><p className="text-xs text-slate-500">Pain Change</p></div>
                        <div><p className="text-base font-bold text-slate-900">4</p><p className="text-xs text-slate-500">Milestones</p></div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="px-8 pb-6">
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest text-center mb-6">What's Included</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex flex-col items-start gap-2">
                    <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                      <Smartphone size={18} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Full App Access</p>
                    <p className="text-slate-500 text-xs">Complete access to the app, exercises, and all program features.</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                      <BarChart2 size={18} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Progress Tracking</p>
                    <p className="text-slate-500 text-xs">Track strength, mobility, and consistency with powerful visual insights.</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                      <SlidersHorizontal size={18} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Structured Phases</p>
                    <p className="text-slate-500 text-xs">Step-by-step phases guide you from foundation to fuller function.</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                      <Heart size={18} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Flare-Up Support</p>
                    <p className="text-slate-500 text-xs">Tools and guidance to help you manage setbacks and stay on track.</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                      <Infinity size={18} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Lifetime Access</p>
                    <p className="text-slate-500 text-xs">Use the system for as long as you need, with future updates included.</p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                      <UserCheck size={18} className="text-blue-600" />
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">Guided Recovery</p>
                    <p className="text-slate-500 text-xs">Clear instructions and expert guidance every step of the way.</p>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="mx-6 mb-4 bg-blue-50 rounded-2xl p-5 flex gap-4 items-start">
                <div className="bg-blue-600 rounded-full p-2 shrink-0">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">60-Day Guarantee</p>
                  <p className="text-slate-600 text-xs mt-1">Try The Foot Capacity System risk-free for 60 days. If you don't feel it's the right fit, let us know and we'll make it right—no hassle.</p>
                </div>
              </div>

              {/* Price */}
              <div className="mx-6 mb-6 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-4xl font-bold text-blue-600">$397</p>
                  <p className="text-blue-600 text-xs font-semibold">One-Time Payment</p>
                  <p className="text-slate-500 text-xs">No monthly fees. No subscriptions.</p>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <Infinity size={20} className="text-slate-400" />
                    <p className="font-semibold text-slate-900 text-sm">Lifetime Access Included</p>
                  </div>
                  <p className="text-slate-500 text-xs">Get lifetime access to the complete system, all updates, and everything you need to keep moving forward.</p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="border-t border-slate-100 px-8 py-4 flex justify-around text-xs text-slate-500">
                <span className="flex items-center gap-1"><Lock size={12} className="text-blue-500" /> Secure Checkout</span>
                <span className="flex items-center gap-1"><Tag size={12} className="text-blue-500" /> One-Time Payment</span>
                <span className="flex items-center gap-1"><Infinity size={12} className="text-blue-500" /> Lifetime Access</span>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4 — HOW THE SYSTEM WORKS */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">How The System Supports You</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                A closer look at how the system helps guide recovery through both progress and setbacks.
              </h2>

              <div className="space-y-12 text-slate-600 text-lg leading-relaxed">

                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-3">A clearer recovery process.</p>
                  <p className="mb-4">Recovery happens in phases. The system gives you a clear plan for each stage — so you always know what to focus on and why. Each phase builds on the last, gradually increasing the demands on your foot as your capacity improves.</p>
                  <div className="flex flex-col sm:flex-row gap-6 mt-6 text-center">
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Reset</p>
                      <p className="text-slate-400 text-xs">Weeks 1–4</p>
                      <p className="text-slate-600 text-sm mt-1">Calm pain and restore movement.</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Restore</p>
                      <p className="text-slate-400 text-xs">Weeks 5–8</p>
                      <p className="text-slate-600 text-sm mt-1">Build strength and capacity.</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Perform</p>
                      <p className="text-slate-400 text-xs">Weeks 9–12</p>
                      <p className="text-slate-600 text-sm mt-1">Improve function and tolerance.</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Maintain</p>
                      <p className="text-slate-400 text-xs">For Life</p>
                      <p className="text-slate-600 text-sm mt-1">Keep progress moving long term.</p>
                    </div>
                  </div>
                  <p className="mt-6 text-slate-500 text-base italic">The system looks for consistent trends, not perfect days.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="font-semibold text-slate-900 text-xl mb-3">Support during flare-ups.</p>
                  <p className="mb-4">Flare-ups happen during recovery. The system helps you temporarily reduce overload, adjust your plan, and keep progressing — without feeling like you're starting over.</p>
                  <div className="flex flex-col sm:flex-row gap-6 mt-6 text-center">
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Flare-Up Detected</p>
                      <p className="text-slate-600 text-sm mt-1">The system recognizes the change.</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Reduce Load Temporarily</p>
                      <p className="text-slate-600 text-sm mt-1">Lower stress. Keep moving.</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Build Back Gradually</p>
                      <p className="text-slate-600 text-sm mt-1">Progress resumes step by step.</p>
                    </div>
                  </div>
                  <p className="mt-6 text-slate-500 text-base italic">Setbacks are normal. They don't erase progress. The system helps you reset, not restart.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="font-semibold text-slate-900 text-xl mb-3">Tracking progress over time.</p>
                  <p className="mb-6">Recovery is rarely perfectly linear. The system helps you look at longer-term trends instead of reacting emotionally to every difficult day or temporary setback.</p>
                  <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
                    <p className="font-semibold text-slate-900 text-sm mb-1">Pain Over Time</p>
                    <p className="text-slate-500 text-xs mb-3">Daily pain scores from 0 (no pain) to 10 (worst)</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={painData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: "12px" }} />
                        <Line type="monotone" dataKey="pain" stroke="#16A34A" dot={true} strokeWidth={2} name="Daily Pain" />
                        <Line type="monotone" dataKey="trend" stroke="#94a3b8" dot={false} strokeDasharray="5 5" name="Trend" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-slate-500 text-base italic">Some days will feel better than others. What matters most is the overall direction over time.</p>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — OBJECTION CARDS */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Common Concerns</p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Still have questions?
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed mb-12">
                Here are the most common concerns people have before getting started — and honest answers to each one.
              </p>

              <div className="space-y-12">

                <div>
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">I've Already Tried Everything</p>
                  <p className="font-semibold text-slate-900 text-xl mb-3">Most people have. The missing piece is usually structure, not effort.</p>
                  <p className="text-slate-600 text-lg leading-relaxed">Most people who find this system have already been through physical therapy, orthotics, stretching routines, and cortisone shots. The reason those approaches often don't last is that they address symptoms without building the underlying capacity your feet actually need. This system takes a different approach — structured progressive loading that rebuilds tissue tolerance from the ground up.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">What If I Make It Worse?</p>
                  <p className="font-semibold text-slate-900 text-xl mb-3">The system is built around graded progressions — not guesswork.</p>
                  <p className="text-slate-600 text-lg leading-relaxed">Every phase of the program starts conservatively and builds gradually. There are built-in regressions, flare-up guidance, and decision rules for adjusting load. The goal is never to push through pain — it's to build capacity safely over time.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">I Always Start Programs And Quit</p>
                  <p className="font-semibold text-slate-900 text-xl mb-3">That's not a willpower problem. It's a structure problem.</p>
                  <p className="text-slate-600 text-lg leading-relaxed">Most programs fail people because they're overwhelming, unclear, or don't account for bad days. This system is designed to create early wins, reduce overwhelm, and give you a clear next step every single day — even when you don't feel like doing much.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">What If I Flare Up Again?</p>
                  <p className="font-semibold text-slate-900 text-xl mb-3">Flare-ups are expected. They don't mean starting over.</p>
                  <p className="text-slate-600 text-lg leading-relaxed">Setbacks are a normal and expected part of recovery. The system includes built-in flare-up support that helps you temporarily reduce load, stay consistent at a lower intensity, and build back gradually without losing your progress. A setback is not a restart.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">How Is This Different From YouTube Or Physical Therapy?</p>
                  <p className="font-semibold text-slate-900 text-xl mb-3">Structure, progression, and daily guidance — not just exercises.</p>
                  <p className="text-slate-600 text-lg leading-relaxed">YouTube gives you individual exercises with no context, no progression, and no way to know if what you're doing is appropriate. This system gives you a structured phase-by-phase process built by a Doctor of Physical Therapy, with progress tracking, flare-up guidance, and a clear framework for moving from pain reduction through to full function.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">Will This Work For My Diagnosis?</p>
                  <p className="font-semibold text-slate-900 text-xl mb-3">This system was designed for chronic foot and ankle pain broadly.</p>
                  <p className="text-slate-600 text-lg leading-relaxed">Whether you're dealing with plantar fasciitis, Achilles issues, posterior tibial tendon dysfunction, or general heel pain, the system's adaptable progressions are built around tissue-specific loading principles. If you have a recent surgical history or acute injury, check with your provider before starting.</p>
                </div>

                <div className="border-t border-slate-100 pt-12">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">Can I Really Do This From Home?</p>
                  <p className="font-semibold text-slate-900 text-xl mb-3">Yes. No gym, no clinic, no special equipment required.</p>
                  <p className="text-slate-600 text-lg leading-relaxed">Everything in the system can be done at home. A few sessions may use a resistance band or small towel — nothing that requires a significant investment or a specific setup. The system was built specifically for guided home recovery.</p>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — WHO THIS IS FOR / NOT FOR */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Is this system right for you?
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12">
                This system was built for a specific kind of person. Here's how to know if that's you.
              </p>

              <div className="space-y-4 mb-12">
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">This is for you if...</p>
                {[
                  "You've been dealing with foot or ankle pain that keeps coming back despite trying other approaches.",
                  "You're frustrated with conflicting advice and want one clear, structured process to follow.",
                  "You want guided recovery you can do from home without needing clinic visits.",
                  "You're tired of restarting and want a system that accounts for setbacks and flare-ups.",
                  "You want to track your progress and actually see whether things are improving over time.",
                  "You're willing to follow a structured process consistently over time."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 shrink-0 mt-1" />
                    <p className="text-slate-700 text-lg leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-10 space-y-4">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4">This is not for you if...</p>
                {[
                  "You're looking for an overnight fix or a passive solution that requires no effort.",
                  "You're unwilling to follow a structured program consistently over time.",
                  "You need emergency or acute medical care — this system is not a substitute for urgent treatment.",
                  "You're expecting results without tracking or engaging with the daily guidance.",
                  "You want someone to do the work for you — this system guides you, but you have to show up."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-slate-300 font-bold shrink-0 mt-1 text-lg">—</span>
                    <p className="text-slate-400 text-lg leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 — TESTIMONIALS */}
        <WalkthroughTestimonialSection />

        {/* SECTION 8 — FAQ */}
        <section className="py-16 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">

            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-6">Common Questions</p>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              Questions people ask before getting started.
            </h2>

            <p className="text-slate-400 text-base italic mb-12">
              Honest answers to the questions we hear most often.
            </p>

            <Accordion type="single" collapsible defaultValue="faq-cat-1" className="space-y-3">

              <AccordionItem value="faq-cat-1" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  Will this actually work if I've tried everything else and nothing has helped?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Most people who come to this system have already tried stretching, orthotics, rest, cortisone shots, and generic physical therapy exercises. The reason those things often don't work long term is that they address symptoms without building the underlying capacity your feet actually need. This system is built around a different approach — structured progressive loading that rebuilds tissue tolerance from the ground up. It's not another set of exercises to try. It's a process designed to work when other things haven't.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-2" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  How do I know if this is right for my specific type of foot pain?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  This system was designed for people dealing with chronic foot and ankle pain — particularly those stuck in a cycle of temporary relief followed by flare-ups. If your pain is affecting your ability to walk, exercise, work, or enjoy daily life, and you haven't been able to break that cycle on your own, this system was built for exactly that situation. If you have a specific diagnosis or recent surgical history, we recommend checking with your provider before starting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-3" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What if I have a flare-up — do I have to start over from the beginning?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  No. Flare-ups are a normal and expected part of recovery — they don't erase your progress. The system includes built-in flare-up support that helps you temporarily reduce load, stay consistent at a lower intensity, and build back gradually without losing ground. A setback is not a restart. The system is designed to keep you moving forward even on difficult days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-4" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  How is this different from the exercises I can find for free on YouTube?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  YouTube gives you individual exercises with no context, no progression, and no way to know if what you're doing is appropriate for where you are in recovery. This system gives you a structured phase-by-phase process built by a Doctor of Physical Therapy, with progress tracking, flare-up guidance, and a clear framework for moving from pain reduction all the way through to full function. The difference is not the exercises — it's the structure around them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-5" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  How much time does this take each day?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  Most daily sessions take around 10 to 15 minutes. The system is designed to fit into a normal life, not add an overwhelming burden on top of it. Consistency over time matters far more than long sessions, and the structure reflects that.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-6" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  Is this safe to do if I've already had surgery or been told my case is severe?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  The system is designed to be conservative and progressive, starting from where you are and building gradually. That said, if you have had recent surgery, a significant structural diagnosis, or have been told your case requires specialized care, we recommend consulting with your physician or physical therapist before starting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-7" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  What if I buy this and it doesn't work for me?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  The system comes with a 60-day guarantee. If you follow the structure and genuinely don't feel it's moving you in the right direction, reach out and we will make it right. The goal is for this to work for you — and if it doesn't, you shouldn't have to pay for it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-8" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  Do I need any special equipment or do I have to go to a gym?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  No gym and no special equipment required. Everything in the system can be done at home. A few sessions may use a resistance band or a small towel, but nothing that requires a significant investment or a specific setup.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-9" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  I've had this pain for years — is it too late for me to actually recover?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  It is not too late. Most people who go through this system have been dealing with foot pain for months or years before finding it. Duration of pain does not determine outcome. Consistency with the right process does.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-cat-10" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                  How is a digital program going to be as effective as seeing a physical therapist in person?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                  This system gives you structured daily guidance, progress tracking, flare-up support, and a clear plan every single day — built by a Doctor of Physical Therapy who specializes in exactly this condition. It is not a replacement for hands-on care when that is needed. But for people who need structure, consistency, and expert guidance they can follow from home, it delivers more day-to-day support than most in-person programs do.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </section>

        {/* SECTION 9 — FINAL CTA */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                A more supported way to move through recovery.
              </h2>

              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                Access the complete system, app, and tools designed to help recovery feel less overwhelming and easier to manage over time.
              </p>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                Get Started With The Foot Capacity System →
              </a>

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500">
                <span className="flex items-center gap-2"><Tag size={13} className="text-blue-500 shrink-0" />One-time purchase</span>
                <span className="flex items-center gap-2"><ShieldCheck size={13} className="text-blue-500 shrink-0" />Lifetime access included</span>
                <span className="flex items-center gap-2"><Lock size={13} className="text-blue-500 shrink-0" />Secure checkout</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">
            © {new Date().getFullYear()} The Foot Capacity System. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 justify-center md:justify-end">
            <a href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-slate-600 transition-colors">Refund Policy</a>
            <a href="/eula" className="hover:text-slate-600 transition-colors">EULA</a>
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
            <a href="https://members.fixyourmovement.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Patient App</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
