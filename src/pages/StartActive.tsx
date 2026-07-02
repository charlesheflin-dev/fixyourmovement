import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CheckCircle, ShieldCheck, Lock, Tag, Infinity,
  Smartphone, BarChart2, SlidersHorizontal, Heart, UserCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import UserJourneyCarousel from "@/components/UserJourneyCarousel";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

import testimonial2 from "@/assets/testimonials/2B.jpg";
import testimonial7 from "@/assets/testimonials/7B.jpg";
import testimonial8 from "@/assets/testimonials/8B.jpg";

const CHECKOUT_URL = "/checkout";

const painData = [
  { month: "May", pain: 8, trend: 7.5 },
  { month: "Jun", pain: 6.5, trend: 6.5 },
  { month: "Jul", pain: 5.5, trend: 5.5 },
  { month: "Aug", pain: 4, trend: 4.5 },
  { month: "Sep", pain: 2.5, trend: 3.5 },
  { month: "Oct", pain: 2, trend: 2.5 },
];

const trackCheckout = () =>
  window.gtag?.("event", "checkout_click", {
    event_category: "conversion",
    event_label: "active_cta",
  });

function MicroQuote({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="border-l-4 border-blue-600 pl-5 my-8">
      <p className="text-slate-700 text-lg italic leading-relaxed">"{quote}"</p>
      <p className="text-blue-600 font-semibold text-sm mt-2">— {name}</p>
    </div>
  );
}

export default function StartActive() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>

        {/* ── SECTION 1: HERO ───────────────────────────────────────────────
            ARCHETYPE: Active Person
            Core fear: "Can I recover without giving up my activities?"
            Hero speaks to identity — they define themselves by movement.
        */}
        <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3.5 mb-8">
                <img src={logo} alt="FCS" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">
                  The Foot Capacity System
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
                You Don't Have To Choose Between<br />
                <span className="text-blue-600">Recovery And Staying Active.</span>
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-3">
                Most people dealing with plantar fasciitis are told to rest. Stop running. Stop training. Wait it out. But for active people, movement isn't just exercise — it's part of who they are. The problem is that rest alone rarely solves the underlying issue.
              </p>

              <p className="text-slate-500 text-base italic leading-relaxed mb-8">
                This system was built to help you stay engaged in the activities you love while gradually rebuilding foot capacity — so recovery becomes part of your life instead of putting your life on hold.
              </p>

              <div className="flex flex-col gap-1.5 mb-10">
                {[
                  "Heel or foot pain that flares up during or after activity",
                  "You've been told to rest but the pain comes back when you return",
                  "You're modifying workouts, skipping runs, or sitting out of sport",
                  "You're worried that pushing through will make things worse",
                  "You want a structured plan that works around your active life",
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="text-blue-600 font-bold shrink-0">—</span>
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-500" /> Risk Free 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Tag size={14} className="text-blue-500" /> Flexible Payment Plans</span>
                <span className="flex items-center gap-1.5"><Infinity size={14} className="text-blue-500" /> Lifetime Access</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-blue-500" /> Guided From Home</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: SURFACE THE PAIN ──────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">
                Why Rest Alone Rarely Works
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                The Goal Isn't To Stop Moving. It's To Build Capacity.
              </h2>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Plantar fasciitis develops when the load placed on your foot — running, training, standing, walking — exceeds what the tissue can currently handle. Rest reduces that load temporarily, which is why symptoms calm down. But it doesn't build capacity.
                </p>
                <p>
                  So when you return to activity, you're doing it with the same tissue tolerance you had before — or less, because deconditioning makes it worse. The pain comes back, often within days.
                </p>
                <p>
                  The answer isn't less activity. It's a structured process that gradually increases your foot's ability to handle load — so you can return to what you love without constantly managing flare-ups.
                </p>
              </div>

              <MicroQuote
                quote="I have had this pain since the beginning of cross country season and it has been bad enough that I couldn't run for a few meets. I talked to my athletic trainer but never got away from it — and this just gave me relief."
                name="Zaiden Peterson"
              />

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  That's what this system is built around — progressive loading that rebuilds tissue tolerance from the ground up, with clear daily guidance so you always know what's safe and what to focus on.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: INTRODUCE THE SYSTEM ──────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">
                A Smarter Approach
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Keep moving. Build capacity. Stop restarting.
              </h2>

              <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Know exactly what's safe each day.</p>
                  <p>The system gives you a clear plan every day — what to do, how much load is appropriate, and when to pull back. You stop guessing whether today is a good day to train.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Stay consistent through flare-ups.</p>
                  <p>When symptoms spike after activity, the system helps you reduce load temporarily and keep moving at a lower intensity — instead of stopping completely and losing your progress.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Build toward full return to activity.</p>
                  <p>Each phase of the system progressively increases the demands on your foot — so by the time you return to full training, your tissue is actually ready to handle it.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Track progress, not just pain.</p>
                  <p>The system tracks trends over time so you can see whether your foot function is improving — not just how it feels on any given morning after a hard session.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3.5: USER JOURNEY CAROUSEL ──────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-3 text-center">Real Member Results</p>
            <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-2 text-center">
              What the data looks like in practice.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8 text-center">
              These are real outcomes from active members tracked inside the app.
            </p>
            <UserJourneyCarousel />
          </div>
        </section>

        {/* ── SECTION 3.5: COMPARISON ──────────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4 text-center">See The Difference</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-3 text-center">
                Traditional Care vs. The Foot Capacity System
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 text-center">
                Two very different approaches to recovery.<br />
                One is built around appointments. The other is built around you.
              </p>

              <div className="relative flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-7 flex flex-col">
                  <div className="mb-5">
                    <p className="font-bold text-slate-900 text-lg mb-0.5">Traditional Care</p>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Often Looks Like This</p>
                  </div>
                  <div className="flex flex-col gap-3 mb-6">
                    {[
                      "Multiple in-person appointments each week",
                      "Driving to and from clinics",
                      "Waiting rooms and repeated scheduling",
                      "Hard to maintain progress between visits",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <span className="text-slate-300 font-bold shrink-0 mt-0.5">✕</span>
                        <p className="text-slate-600 text-base leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto bg-slate-50 rounded-xl p-4">
                    <p className="text-slate-500 text-sm leading-relaxed">In-person physical therapy can be effective. The challenge is that it often requires time, coordination, and consistency — things that are not always easy to maintain with a busy, unpredictable life.</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center shrink-0">
                  <span className="text-slate-400 font-bold text-sm tracking-widest">VS.</span>
                </div>
                <div className="flex md:hidden items-center justify-center">
                  <span className="text-slate-400 font-bold text-sm tracking-widest">VS.</span>
                </div>

                <div className="flex-1 bg-white border border-blue-200 rounded-2xl shadow-sm p-7 flex flex-col">
                  <div className="mb-5">
                    <p className="font-bold text-blue-600 text-lg mb-0.5">The Foot Capacity System</p>
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest">Built For Real-Life Consistency</p>
                  </div>
                  <div className="flex flex-col gap-3 mb-6">
                    {[
                      "Guided directly from your phone",
                      "Tracks pain and progress daily",
                      "Structured 15 to 20 minute sessions",
                      "Built to fit into your real life",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 border-b border-blue-50 pb-3 last:border-0 last:pb-0">
                        <span className="text-blue-500 font-bold shrink-0 mt-0.5">✓</span>
                        <p className="text-slate-700 text-base leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto bg-blue-50 rounded-xl p-4">
                    <p className="text-slate-600 text-sm leading-relaxed">No commuting. No waiting rooms. No building your week around appointments. <span className="text-blue-600 font-semibold">Recovery on your schedule.</span></p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-10">
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-2">One Clear System.</p>
                <p className="font-display text-2xl font-bold text-slate-900">One clear path forward.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 4: DOCTOR CREDIBILITY ────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <img
                  src="/images/dr-jonathan-schutza-headshot.png"
                  alt="Dr. Jonathan Schutza, PT, DPT"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-3">
                    Built By A Physical Therapist
                  </p>
                  <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-4">
                    Dr. Jonathan Schutza, PT, DPT
                  </h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>
                      Dr. Jonathan Schutza is a licensed Doctor of Physical Therapy who understands that for active people, being told to simply rest is not a recovery plan — it's a pause that delays the real work.
                    </p>
                    <p>
                      He built this system around progressive loading principles that allow people to stay active during recovery — training smarter, not stopping entirely — while building the foot capacity needed to return to full function.
                    </p>
                    <p>
                      The Foot Capacity System gives you the structure, daily guidance, and flare-up support that most active people never get from standard care — designed to work around your life, not against it.
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <a href="https://www.instagram.com/dr.schutza.pt/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                      <img src="/images/follow-on-instagram.png" alt="Follow on Instagram" className="h-10 w-auto rounded-lg" loading="lazy" />
                    </a>
                    <a href="https://www.facebook.com/share/18vGC5rzP8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                      <img src="/images/follow-on-facebook.png" alt="Follow on Facebook" className="h-10 w-auto rounded-lg" loading="lazy" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 5: FEATURED PULL QUOTE ───────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
                <div className="text-blue-600 text-5xl font-bold leading-none mb-6">"</div>
                <p className="text-slate-800 text-xl md:text-2xl font-medium leading-relaxed mb-4">
                  I have had this pain since the beginning of cross country season and it has been bad enough that I couldn't run for a few meets. I talked to my athletic trainer but never got away from it —{" "}
                  <span className="text-blue-600 font-bold">and this just gave me relief.</span>
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold">Zaiden Peterson</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 6: APP WALKTHROUGH VIDEO ─────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">
                See The System In Action
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-3">
                A guided walkthrough of exactly how it works.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Dr. Jonathan walks you through the app, the phases, the daily sessions, and how the system supports you through both training and setbacks.
              </p>
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
                <a href="#product-summary" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                  See What's Included →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 7: MICRO-QUOTES ───────────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-8">What People Notice After Starting</p>
              <MicroQuote
                quote="You are the most positive, supportive physical therapist that I have come across on social media. The fact that you focus on foot and ankle rehab is a bonus. You have added greatly to my Post Tibial Tendonitis recovery with additional exercises that support my own therapist's recommendations."
                name="@bogiegrl"
              />
              <MicroQuote
                quote="Dr. Jonathan Schutza is a truly exceptional Physical Therapist whose innovative approach has made a significant impact on my recovery. What sets him apart is recording himself demonstrating the correct form for every exercise — ensuring clarity when I continue rehabilitation at home."
                name="Debbie Wisenor"
              />
              <MicroQuote
                quote="I have had this pain since the beginning of cross country season. I talked to my athletic trainer but never got away from it — and this just gave me relief."
                name="Zaiden Peterson"
              />
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 8: HOW THE SYSTEM WORKS ──────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">How The System Supports You</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                A closer look at how the system guides recovery through both progress and setbacks.
              </h2>
              <div className="space-y-12 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-3">A phased recovery process.</p>
                  <p className="mb-4">Recovery happens in stages. Each phase builds on the last, gradually increasing the demands on your foot as your capacity improves.</p>
                  <div className="flex flex-col sm:flex-row gap-6 mt-6 text-center">
                    {[
                      { label: "Reset", weeks: "Weeks 1–4", desc: "Calm pain and restore movement." },
                      { label: "Restore", weeks: "Weeks 5–8", desc: "Build strength and capacity." },
                      { label: "Perform", weeks: "Weeks 9–12", desc: "Improve function and tolerance." },
                      { label: "Maintain", weeks: "For Life", desc: "Keep progress moving long term." },
                    ].map((phase) => (
                      <div key={phase.label} className="flex-1">
                        <p className="font-bold text-slate-900 text-sm">{phase.label}</p>
                        <p className="text-slate-400 text-xs">{phase.weeks}</p>
                        <p className="text-slate-600 text-sm mt-1">{phase.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-slate-500 text-base italic">The system looks for consistent trends, not perfect days.</p>
                </div>
                <div className="border-t border-slate-100 pt-12">
                  <p className="font-semibold text-slate-900 text-xl mb-3">Flare-ups don't mean starting over.</p>
                  <p className="mb-4">When symptoms spike after training, the system helps you reduce load temporarily and keep progressing — without losing everything you've built.</p>
                  <div className="flex flex-col sm:flex-row gap-6 mt-6 text-center">
                    {[
                      { label: "Flare-Up Detected", desc: "The system recognizes the change." },
                      { label: "Reduce Load Temporarily", desc: "Lower stress. Keep moving." },
                      { label: "Build Back Gradually", desc: "Progress resumes step by step." },
                    ].map((step) => (
                      <div key={step.label} className="flex-1">
                        <p className="font-bold text-slate-900 text-sm">{step.label}</p>
                        <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-slate-500 text-base italic">Setbacks are normal. They don't erase progress. The system helps you reset, not restart.</p>
                </div>
                <div className="border-t border-slate-100 pt-12">
                  <p className="font-semibold text-slate-900 text-xl mb-3">Tracking progress over time.</p>
                  <p className="mb-6">Recovery is rarely perfectly linear. The system helps you look at longer-term trends instead of reacting to every difficult day.</p>
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
                  <p className="text-slate-500 text-base italic">Some days will feel better than others. What matters most is the overall direction.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 9: OBJECTION HANDLING ────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Real Concerns, Honest Answers</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-10">Questions worth answering before you decide.</h2>
              <div className="space-y-12 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-3">"Can I keep being active while I recover?"</p>
                  <p className="mb-3">This is the right question — and the answer depends on how you approach it. Complete rest rarely solves the underlying problem. But unstructured activity often makes it worse.</p>
                  <p>The system is designed to help you keep moving at an appropriate level throughout recovery. What changes is the structure around your activity — how much load, how often, and how you respond when symptoms flare. That structure is what makes continued activity safe.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"What if I push too hard and make things worse?"</p>
                  <p className="mb-3">The system is built around graded progressions — meaning it starts conservatively and increases load gradually as your capacity improves. You're not guessing how much is too much.</p>
                  <p>When symptoms spike, the built-in flare-up protocol helps you reduce load, stay consistent, and build back without losing ground. The system is designed to keep you safe, not push you past your limits.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"How long before I can get back to full training?"</p>
                  <p className="mb-3">That depends on where you're starting from and how consistent you are with the process. What the system does is give you a clear, measurable path — so you can actually track whether your foot function is improving week over week.</p>
                  <p>Most people begin feeling more confident in their foot within the first few weeks. Full return to sport or training follows as capacity builds through the phases.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"Can I do this alongside my current training?"</p>
                  <p>Yes. The daily sessions run 10 to 15 minutes and are designed to complement — not replace — your existing activity. The system helps you structure your recovery around your training, not the other way around.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"What if this doesn't work for me?"</p>
                  <p>The system comes with a 30-day guarantee. If you follow the structure and genuinely don't feel it's moving you in the right direction, email us at contact@fixyourmovement.com and we'll refund your investment. No complicated forms, no hoops to jump through.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 10: WHO THIS IS FOR / NOT FOR ────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-3">Is this the right system for you?</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12">This system was built for a specific kind of person. Here's how to know if that's you.</p>
              <div className="space-y-4 mb-12">
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">This is for you if...</p>
                {[
                  "You're dealing with foot or heel pain that flares up during or after activity.",
                  "You want to keep moving but need a structured plan that makes it safe.",
                  "You're tired of stopping and restarting every time symptoms spike.",
                  "You want to track your foot function and see real progress over time.",
                  "You're willing to follow a structured process — even on hard days.",
                  "You want guided recovery you can do from home without clinic visits.",
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
                  "You're looking for a way to train through pain without addressing the cause.",
                  "You're unwilling to follow a structured program consistently over time.",
                  "You need emergency or acute medical care — this is not a substitute for urgent treatment.",
                  "You expect results without engaging with the daily guidance.",
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

        {/* ── SECTION 11: TESTIMONIAL BLOCK ────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-3 text-center">Patient Experiences</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-10 text-center">Active people who found a way to keep moving.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial2} alt="Zaiden Peterson testimonial" className="w-full h-auto" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial7} alt="Debbie Wisenor testimonial" className="w-full h-auto" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial8} alt="@bogiegrl testimonial" className="w-full h-auto" />
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center mt-6">Individual results vary. These are real experiences from people who followed the system and stayed consistent.</p>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 12: VALUE STACK + PRICE REVEAL ───────────────────────── */}
        <section id="product-summary" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                <div className="text-center px-8 pt-10 pb-6">
                  <img src={logo} alt="FCS" className="h-10 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">The Foot Capacity System</h2>
                  <p className="text-blue-600 italic text-sm max-w-md mx-auto">A structured recovery system designed to help you keep moving safely while your foot capacity rebuilds.</p>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-2/5 flex flex-col items-center gap-4">
                      <img src="/images/new-phone.jpg" alt="App screenshot" className="w-full max-w-[180px] rounded-2xl" />
                      <img src="/images/new-phone2.jpg" alt="App screenshot 2" className="w-full max-w-[180px] rounded-2xl mt-4" />
                    </div>
                    <div className="sm:w-3/5 flex flex-col gap-4">
                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="font-semibold text-slate-900 text-sm">Phase 1: Reset</p>
                        <p className="text-slate-500 text-xs mb-3">May 11 – present</p>
                        <ResponsiveContainer width="100%" height={80}>
                          <LineChart data={[
                            { day: "May 11", red: 7, green: 5 },{ day: "May 12", red: 6, green: 5.5 },{ day: "May 13", red: 6.5, green: 6 },
                            { day: "May 14", red: 5.5, green: 6.5 },{ day: "May 16", red: 5, green: 7.5 },{ day: "May 18", red: 4.5, green: 8.5 },{ day: "Jun 16", red: 5, green: 9 },
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
                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="font-semibold text-slate-900 text-sm">Foot Function Progress (FAAM)</p>
                        <p className="text-slate-500 text-xs mb-3">Higher is better. 100% = full function.</p>
                        <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2">
                          <span className="text-sm text-slate-700">Baseline (Onboarding)</span>
                          <span className="text-xl font-bold text-red-500">31%</span>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="font-semibold text-slate-900 text-sm">Insights — Pain Over Time</p>
                        <p className="text-slate-500 text-xs mb-3">Daily pain scores from 0–10</p>
                        <ResponsiveContainer width="100%" height={100}>
                          <LineChart data={[
                            { month: "May 11", pain: 8 },{ month: "May 14", pain: 6 },{ month: "May 16", pain: 5.5 },
                            { month: "May 17", pain: 6 },{ month: "Jun 15", pain: 5 },{ month: "Jun 16", pain: 6 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
                            <YAxis domain={[0, 10]} tick={{ fontSize: 9 }} width={20} />
                            <Line type="monotone" dataKey="pain" stroke="#16A34A" dot={{ r: 3, fill: "#16A34A" }} strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                        <div className="flex justify-around mt-3 text-center flex-wrap gap-2">
                          <div><p className="text-base font-bold text-slate-900">30</p><p className="text-xs text-slate-500">Rehab Minutes</p></div>
                          <div><p className="text-base font-bold text-slate-900">10</p><p className="text-xs text-slate-500">Days Logged</p></div>
                          <div><p className="text-base font-bold text-green-600">-3</p><p className="text-xs text-slate-500">Pain Change</p></div>
                          <div><p className="text-base font-bold text-slate-900">4</p><p className="text-xs text-slate-500">Milestones</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-6">
                  <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest text-center mb-6">What's Included</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { icon: Smartphone, label: "Full App Access", desc: "Complete access to the app, exercises, and all program features." },
                      { icon: BarChart2, label: "Progress Tracking", desc: "Track strength, mobility, and consistency with powerful visual insights." },
                      { icon: SlidersHorizontal, label: "Structured Phases", desc: "Step-by-step phases guide you from foundation to fuller function." },
                      { icon: Heart, label: "Flare-Up Support", desc: "Tools and guidance to help you manage setbacks and stay on track." },
                      { icon: Infinity, label: "Lifetime Access", desc: "Use the system for as long as you need, with future updates included." },
                      { icon: UserCheck, label: "Guided Recovery", desc: "Clear instructions and expert guidance every step of the way." },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="flex flex-col items-start gap-2">
                        <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center"><Icon size={18} className="text-blue-600" /></div>
                        <p className="font-semibold text-slate-900 text-sm">{label}</p>
                        <p className="text-slate-500 text-xs">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mx-6 mb-4 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-4xl font-bold text-blue-600">$157</p>
                    <p className="text-slate-500 text-xs mt-1">Only 3 monthly payments of $157.</p>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2"><Infinity size={20} className="text-slate-400" /><p className="font-semibold text-slate-900 text-sm">Lifetime Access Included</p></div>
                    <p className="text-slate-500 text-xs">Get lifetime access to the complete system, all updates, and everything you need to keep moving forward.</p>
                  </div>
                </div>

                <div className="mx-6 mb-4 border border-blue-200 rounded-2xl overflow-hidden">
                  <div className="bg-blue-600 px-6 py-4 flex items-center gap-3">
                    <ShieldCheck size={22} className="text-white shrink-0" />
                    <div>
                      <p className="text-white font-bold text-sm">30-Day Satisfaction Guarantee</p>
                      <p className="text-blue-200 text-xs">Walk Pain-Free Or It's Free</p>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-5">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Recovery can feel frustrating when you've already invested time, money, and energy into things that never fully solved the problem. That is why we want people to explore this system without pressure. Follow the program, track your progress, and give yourself time to build consistency.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      If you do not feel the system is helping you make meaningful progress within 30 days of purchase, email us at <span className="text-blue-600 font-medium">contact@fixyourmovement.com</span> and we'll refund your investment. No complicated forms, no hoops to jump through.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "30 full days to explore the system",
                        "Track progress directly inside the app",
                        "Built for consistency from home",
                        "Full refund if the program is not right for you",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-slate-700 text-xs leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-100 px-8 py-4 flex justify-around text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Lock size={12} className="text-blue-500" /> Secure Checkout</span>
                  <span className="flex items-center gap-1"><Tag size={12} className="text-blue-500" /> Flexible Payment Plans</span>
                  <span className="flex items-center gap-1"><Infinity size={12} className="text-blue-500" /> Lifetime Access</span>
                </div>
                <div className="px-8 py-8 text-center border-t border-slate-100">
                  <a href={CHECKOUT_URL} target="_self" rel="noopener noreferrer" onClick={trackCheckout}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors w-full text-center">
                    Get Started With The Foot Capacity System →
                  </a>
                  <div className="flex justify-center gap-6 mt-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-blue-500 inline" /> Risk Free 30-Day Guarantee</span>
                    <span className="flex items-center gap-1"><Lock size={13} className="text-blue-500 inline" /> Secure checkout</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 13: FAQ ───────────────────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Common Questions</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-3">Questions people ask before getting started.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">Most active people aren't wondering if they should recover. They're wondering how to recover without losing everything they've built.</p>
              <p className="text-slate-400 text-base mb-12">Below are the most common questions from people in exactly your situation.</p>
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  { value: "faq-1", q: "Can I keep training while I use this system?", a: "The system is designed around keeping you moving at an appropriate level throughout recovery. What changes is the structure around your activity — load, frequency, and how you respond to symptoms. Most people continue some form of activity throughout the program." },
                  { value: "faq-2", q: "What if I have a flare-up — do I have to start over?", a: "No. Flare-ups are a normal part of recovery. The system includes built-in flare-up support that helps you temporarily reduce load, stay consistent at a lower intensity, and build back gradually. A setback is not a restart." },
                  { value: "faq-3", q: "How long before I can return to full training?", a: "That depends on where you're starting from and how consistently you follow the process. What the system does is give you a measurable path so you can track whether your foot function is improving week over week. Most people begin feeling more confident within the first few weeks." },
                  { value: "faq-4", q: "How much time does this take each day?", a: "Most daily sessions take around 10 to 15 minutes. The system is designed to fit into a normal training life, not add an overwhelming burden on top of it." },
                  { value: "faq-5", q: "Do I need any special equipment or do I have to go to a gym?", a: "No gym and no special equipment required. Everything in the system can be done at home. A few sessions may use a resistance band or a small towel, but nothing that requires a significant investment." },
                  { value: "faq-6", q: "How is this different from the exercises I can find for free on YouTube?", a: "YouTube gives you individual exercises with no context, no progression, and no way to know if what you're doing is appropriate for where you are in recovery. This system gives you a structured phase-by-phase process with daily guidance, progress tracking, and flare-up support built in. The difference is not the exercises — it's the structure around them." },
                  { value: "faq-7", q: "What if I buy this and it doesn't work for me?", a: "The system comes with a 30-day guarantee. Try it, and if you don't feel it's right for you, email us at contact@fixyourmovement.com within 30 days and we'll refund your investment. No complicated forms, no hoops to jump through." },
                  { value: "faq-8", q: "Is this safe to do alongside my current sport or training?", a: "The system is designed to be conservative and progressive, starting from where you are and building gradually. If you have a recent injury, significant structural diagnosis, or have been told your case requires specialized care, we recommend consulting with your physician or physical therapist before starting." },
                ].map(({ value, q, a }) => (
                  <AccordionItem key={value} value={value} className="border-b border-slate-200 pb-1">
                    <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">{q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 14: FINAL CTA ─────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                You don't have to choose between recovery and the life you love.
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                The Foot Capacity System gives you the structure to keep moving safely while your foot builds the capacity to handle everything you're asking of it.
              </p>
              <a href={CHECKOUT_URL} target="_self" rel="noopener noreferrer" onClick={trackCheckout}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors">
                Get Started With The Foot Capacity System →
              </a>
              <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500">
                <span className="flex items-center gap-2"><ShieldCheck size={13} className="text-blue-500 shrink-0" />Risk Free 30-Day Guarantee</span>
                <span className="flex items-center gap-2"><Lock size={13} className="text-blue-500 shrink-0" />Secure checkout</span>
                <span className="flex items-center gap-2"><Infinity size={13} className="text-blue-500 shrink-0" />Lifetime access</span>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">© {new Date().getFullYear()} The Foot Capacity System. All rights reserved.</p>
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