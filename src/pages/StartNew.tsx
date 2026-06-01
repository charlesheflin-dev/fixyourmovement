import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CheckCircle, ShieldCheck, Lock, Tag, Infinity,
  Smartphone, BarChart2, SlidersHorizontal, Heart, UserCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

import testimonial6 from "@/assets/testimonials/6B.jpg";
import testimonial7 from "@/assets/testimonials/7B.jpg";
import testimonial9 from "@/assets/testimonials/9B.jpg";

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
    event_label: "new_cta",
  });

function MicroQuote({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="border-l-4 border-blue-600 pl-5 my-8">
      <p className="text-slate-700 text-lg italic leading-relaxed">"{quote}"</p>
      <p className="text-blue-600 font-semibold text-sm mt-2">— {name}</p>
    </div>
  );
}

export default function StartNew() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>

        {/* ── SECTION 1: HERO ───────────────────────────────────────────────
            ARCHETYPE: Newly Concerned
            Core fear: "What should I actually be doing right now? Am I making it worse?"
            Hero speaks to clarity and early action — getting ahead of the cycle.
        */}
        <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <div className="flex items-center gap-3.5 mb-8">
                <img src={logo} alt="FCS" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
              </div>
              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
                You're Asking The Right Questions Early.<br />
                <span className="text-blue-600">Here's What You Should Actually Be Doing.</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-3">
                When foot or heel pain is new, you have something many people wish they had later: time. The sooner you understand what's happening and begin the right process, the easier it becomes to stay ahead of the cycle that traps so many people.
              </p>
              <p className="text-slate-500 text-base italic leading-relaxed mb-8">
                This system was built to give you the structure, clarity, and daily guidance to take advantage of the opportunity you have right now — before foot pain starts influencing how you move, exercise, travel, and live.
              </p>
              <div className="flex flex-col gap-1.5 mb-10">
                {[
                  "You've noticed foot or heel pain that's new or recently getting worse",
                  "You're not sure what's causing it or what you should be doing",
                  "You're worried that the wrong approach will make things worse",
                  "You want to understand what's happening and get ahead of it now",
                  "You'd rather build the right habits early than spend years trying to undo the wrong ones",
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="text-blue-600 font-bold shrink-0">—</span>{item}
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
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">What's Actually Happening</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                The Earlier You Understand The Problem, The More Options You Usually Have.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Plantar fasciitis and heel pain develop when the load on your foot — from walking, standing, or activity — exceeds what the tissue can currently handle. In the early stages, this often shows up as soreness that improves with movement, or stiffness that's worst in the morning.
                </p>
                <p>
                  The most common mistake at this stage is either ignoring it and pushing through, or stopping everything and hoping it resolves on its own. Both approaches miss the point. What the foot needs is structured, progressive loading — gradually building its capacity to handle the demands being placed on it.
                </p>
                <p>
                  The people who get ahead of foot pain are the ones who start that process early. Before the cycle of flare-ups and restarts begins. Before the pain becomes part of how they plan their day.
                </p>
              </div>
              <MicroQuote
                quote="You have helped me and my chronically painful foot by giving me the language and background knowledge to talk to my doctor and my PT. You've introduced theories and movements that I can bring to them for clarification. It has started great conversations and I believe I've gotten better care."
                name="@vicbre415"
              />
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  That's exactly what this system is designed to help you do — start the right process now, with the clarity and structure that makes consistent progress possible.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: INTRODUCE THE SYSTEM ──────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Getting It Right From The Start</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                A clear process is the difference between a short recovery and a long one.
              </h2>
              <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Understand what's happening and why.</p>
                  <p>The system gives you a clear explanation of what's driving your symptoms and what the recovery process actually looks like — so you're not piecing together conflicting information from multiple sources.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Know exactly what to do each day.</p>
                  <p>Rather than guessing whether to rest or push through, the system gives you a clear daily plan — what to do, how much is appropriate, and when to adjust based on how your symptoms respond.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Build capacity before the cycle starts.</p>
                  <p>The earlier you start building progressive load tolerance in your foot, the better your chances of resolving this before it becomes a long-term pattern. The system is designed to guide that process from the very beginning.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Track progress from day one.</p>
                  <p>Monitoring your symptoms and function from the start gives you a clear picture of how your foot is responding — and helps you make better decisions about activity and load throughout recovery.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 4: DOCTOR CREDIBILITY ────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <img src="/images/dr-jonathan-schutza-headshot.png" alt="Dr. Jonathan Schutza, PT, DPT"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md shrink-0" loading="lazy" />
                <div>
                  <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-3">Built By A Physical Therapist</p>
                  <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-4">Dr. Jonathan Schutza, PT, DPT</h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>Dr. Jonathan Schutza is a licensed Doctor of Physical Therapy who built this system around a straightforward principle: most people dealing with foot pain never get a clear explanation of what's happening or a structured process to address it.</p>
                    <p>They get generic advice — stretch more, rest, get orthotics — without the context to understand whether it's working or why. This system was built to change that.</p>
                    <p>Whether you're in the early stages of heel pain or trying to understand what's going on before it gets worse, the system gives you the clarity, structure, and daily guidance to approach recovery the right way from the start.</p>
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
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
                <div className="text-blue-600 text-5xl font-bold leading-none mb-6">"</div>
                <p className="text-slate-800 text-xl md:text-2xl font-medium leading-relaxed mb-4">
                  I've suffered a lisfranc injury requiring surgery and I'm in rehab phase regaining all the strength I've lost. I love that you're proud of your faith.{" "}
                  <span className="text-blue-600 font-bold">Very clear and exercises are achievable.</span>{" "}
                  I'm from Australia — thanks for your work.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold">@youngcarol</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 6: APP WALKTHROUGH VIDEO ─────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">See The System In Action</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-3">A guided walkthrough of exactly how it works.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Dr. Jonathan walks you through the app, the phases, the daily sessions, and how the system guides you from the very start of recovery through to full function.
              </p>
              <div style={{ position: "relative", paddingTop: "56.25%" }} className="rounded-2xl overflow-hidden shadow-xl mb-8">
                <iframe
                  src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/b37100f8162e1ab91cf86c9e284447da/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F6ec4d8b4-8156-40b2-b196-836d95530f00%2Fpublic"
                  loading="lazy" style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen={true} />
              </div>
              <div className="text-center">
                <a href="#product-summary" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">See What's Included →</a>
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
                quote="Very clear and exercises are achievable. I'm from Australia — thanks for your work."
                name="@youngcarol"
              />
              <MicroQuote
                quote="You have helped me and my chronically painful foot by giving me the language and background knowledge to talk to my doctor and my PT. It has started great conversations and I believe I've gotten better care."
                name="@vicbre415"
              />
              <MicroQuote
                quote="Dr. Jonathan Schutza is a truly exceptional Physical Therapist. What sets him apart is recording himself demonstrating the correct form for every exercise — ensuring clarity when I continue rehabilitation at home. I wholeheartedly recommend Dr. Schutza for personalized, accessible, and results-driven care."
                name="Debbie Wisenor"
              />
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 8: HOW THE SYSTEM WORKS ──────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">How The System Supports You</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">A closer look at how the system guides recovery from day one.</h2>
              <div className="space-y-12 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-3">A phased recovery process.</p>
                  <p className="mb-4">The system guides you through four clear phases — each one building on the last, so your foot develops the capacity it needs at each stage.</p>
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
                  <p className="font-semibold text-slate-900 text-xl mb-3">Built-in guidance if symptoms flare.</p>
                  <p className="mb-4">Even in early recovery, symptoms can fluctuate. The system gives you a clear protocol for those moments — so you always know how to respond without guessing.</p>
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
                  <p className="mt-6 text-slate-500 text-base italic">Knowing how to respond to setbacks early is what prevents them from becoming long-term patterns.</p>
                </div>
                <div className="border-t border-slate-100 pt-12">
                  <p className="font-semibold text-slate-900 text-xl mb-3">Track your progress from the start.</p>
                  <p className="mb-6">Monitoring symptoms and function from day one gives you real data on how your foot is responding — so you can make informed decisions instead of guessing.</p>
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
                  <p className="font-semibold text-slate-900 text-xl mb-3">"What should I actually be doing right now?"</p>
                  <p className="mb-3">The short answer: structured, progressive loading — starting conservatively and building gradually as your foot's tolerance improves. Not complete rest. Not pushing through pain. A clear, measured process.</p>
                  <p>The system gives you that process in a format you can follow every day from home — with daily guidance, tracking, and built-in support when symptoms fluctuate.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"Am I making it worse by continuing to be active?"</p>
                  <p className="mb-3">Activity isn't the problem — unstructured activity without appropriate load management is. The system helps you stay active at the right level while your foot builds capacity, rather than stopping entirely and losing the progress that comes from consistent movement.</p>
                  <p>Every session gives you a clear indication of what's appropriate for that day based on where you are in the process.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"Is it too early to start something like this?"</p>
                  <p>No — it's exactly the right time. The people who recover most effectively are the ones who start the right process early, before the stop-start cycle of flare-ups and restarts gets established. Starting now means you're building capacity before it becomes a chronic problem.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"Do I need a formal diagnosis before starting?"</p>
                  <p>Not necessarily. The system was designed for people dealing with foot and heel pain — whether or not they have a formal diagnosis. If your pain is significantly limiting your function, or if you've had recent surgery or a significant structural injury, we recommend checking with your physician first.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"What if this doesn't turn out to be right for me?"</p>
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
                  "You're dealing with new or recently worsening foot or heel pain.",
                  "You want to understand what's happening and start the right process now.",
                  "You're worried about making things worse and want clear daily guidance.",
                  "You want to track your progress and see how your foot is responding over time.",
                  "You'd rather get ahead of this now than spend months trying to undo a chronic pattern.",
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
                  "You need emergency or acute medical care — this is not a substitute for urgent treatment.",
                  "You're unwilling to follow a structured program consistently over time.",
                  "You're looking for a passive solution that requires no engagement.",
                  "You expect results without tracking or engaging with the daily guidance.",
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
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-10 text-center">People who got the clarity they were looking for.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial6} alt="@youngcarol testimonial" className="w-full h-auto" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial7} alt="Debbie Wisenor testimonial" className="w-full h-auto" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial9} alt="@vicbre415 testimonial" className="w-full h-auto" />
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
                  <p className="text-blue-600 italic text-sm max-w-md mx-auto">A structured recovery system designed to help you get ahead of foot pain — with the clarity, guidance, and daily structure to do it right from the start.</p>
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
              <p className="text-slate-600 text-lg leading-relaxed mb-4">Most people who are new to foot pain aren't wondering if they should do something. They're wondering what the right thing to do actually is.</p>
              <p className="text-slate-400 text-base mb-12">Below are the most common questions from people in exactly your situation.</p>
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  { value: "faq-1", q: "What should I actually be doing right now for foot or heel pain?", a: "The most effective approach is structured, progressive loading — starting conservatively and building gradually as your foot's tolerance improves. Not complete rest, and not pushing through pain. The system gives you a clear daily plan for exactly that, from day one." },
                  { value: "faq-2", q: "Do I need a formal diagnosis before I start?", a: "Not necessarily. The system was designed for people dealing with foot and heel pain — whether or not they have a formal diagnosis. If your pain is significantly limiting your function, or if you've had recent surgery or a significant structural injury, we recommend checking with your physician first." },
                  { value: "faq-3", q: "Is it too early to use a structured program like this?", a: "No — early is exactly the right time. The people who recover most effectively are the ones who start the right process before the stop-start cycle of flare-ups and restarts gets established. Starting now means building capacity before it becomes a chronic problem." },
                  { value: "faq-4", q: "How much time does this take each day?", a: "Most daily sessions take around 10 to 15 minutes. The system is designed to fit into a normal life without becoming overwhelming. Consistency over time matters far more than long sessions." },
                  { value: "faq-5", q: "What if my symptoms flare up while I'm using the system?", a: "The system includes built-in flare-up support that gives you a clear protocol when symptoms spike — temporarily reduce load, stay consistent at a lower intensity, and build back gradually. You always know what to do, even on difficult days." },
                  { value: "faq-6", q: "Do I need any special equipment or do I have to go to a gym?", a: "No gym and no special equipment required. Everything in the system can be done at home. A few sessions may use a resistance band or a small towel, but nothing that requires a significant investment or a specific setup." },
                  { value: "faq-7", q: "How is this different from generic advice I can find online?", a: "Online advice gives you isolated exercises or general tips with no progression, no context, and no way to know if what you're doing is appropriate for where you are. This system gives you a structured phase-by-phase process built by a Doctor of Physical Therapy, with daily guidance and progress tracking built in." },
                  { value: "faq-8", q: "What if I buy this and it doesn't turn out to be right for me?", a: "The system comes with a 30-day guarantee. Try it, and if you don't feel it's right for you, email us at contact@fixyourmovement.com within 30 days and we'll refund your investment. No complicated forms, no hoops to jump through." },
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
                The best time to start the right process is now.
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                The Foot Capacity System gives you the structure, daily guidance, and clarity to get ahead of foot pain — before the cycle that traps most people even begins.
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