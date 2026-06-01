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

import testimonial3 from "@/assets/testimonials/3B.jpg";
import testimonial4 from "@/assets/testimonials/4B.jpg";
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
    event_label: "chronic_cta",
  });

function MicroQuote({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="border-l-4 border-blue-600 pl-5 my-8">
      <p className="text-slate-700 text-lg italic leading-relaxed">"{quote}"</p>
      <p className="text-blue-600 font-semibold text-sm mt-2">— {name}</p>
    </div>
  );
}

export default function StartChronic() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>

        {/* ── SECTION 1: HERO ───────────────────────────────────────────────
            ARCHETYPE: Discouraged Chronic Sufferer
            Core fear: "Is it too late for me? Is this permanent?"
            Hero speaks to hope — duration doesn't determine outcome.
        */}
        <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <div className="flex items-center gap-3.5 mb-8">
                <img src={logo} alt="FCS" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
              </div>
              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
                How Long You've Had This Pain<br />
                <span className="text-blue-600">Does Not Determine Whether You Can Recover.</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-3">
                Most people dealing with chronic foot pain haven't just lost confidence in treatments. They've started losing confidence in their own body. After months or years of setbacks, it's easy to wonder whether things will ever truly change.
              </p>
              <p className="text-slate-500 text-base italic leading-relaxed mb-8">
                It hasn't. Recovery doesn't become impossible because pain has lasted longer. What matters is having a process you can trust and stay consistent with — even when progress comes in stages.
              </p>
              <div className="flex flex-col gap-1.5 mb-10">
                {[
                  "You've been dealing with this for months or years, not weeks",
                  "You've had temporary relief before, but the pain always comes back",
                  "You're starting to wonder if your foot will ever feel normal again",
                  "You've quietly started to accept the pain as part of your life",
                  "You want to trust your body again — and stop obsessing over every step",
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
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Why Chronic Pain Feels Different</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Chronic Pain Doesn't Just Affect Your Foot. It Affects Your Confidence.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  When foot pain has been present for months or years, it changes the way you move, the way you plan your day, and the way you think about your body. You start modifying everything — what shoes you wear, how far you walk, what activities you avoid.
                </p>
                <p>
                  The stop-start cycle that comes with chronic pain is one of the hardest patterns to break. You try something, get some relief, push a little too hard, flare up, and feel like you're back at square one. Over and over.
                </p>
                <p>
                  What most chronic sufferers have never had is a structured process that accounts for that cycle — one that helps you stay consistent even during setbacks, and builds the foot's tolerance gradually enough that the flare-ups become less frequent and less severe over time.
                </p>
              </div>
              <MicroQuote
                quote="I had heel pain for over five years. I tried everything — orthotics, steroid injections, stretching, different doctors. Nothing worked long-term. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked. He's not just fixing the pain — he's teaching me how to stay better."
                name="Dee Bell"
              />
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  That's what this system is built to provide. Not another short-term solution — a process that helps you finally break the cycle and build lasting capacity in your foot.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: INTRODUCE THE SYSTEM ──────────────────────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Breaking The Cycle</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Chronic pain requires a different kind of consistency.
              </h2>
              <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">A process built around your current capacity.</p>
                  <p>The system starts from where you are — not where you think you should be. Each phase builds gradually, so the demands on your foot increase only as your tolerance improves.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Setbacks don't erase progress.</p>
                  <p>For people with chronic pain, flare-ups feel catastrophic because there's no structure to fall back on. This system gives you a clear protocol for setbacks — reduce load, stay consistent, build back. The cycle starts to break.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Progress you can actually measure.</p>
                  <p>When pain has been present for a long time, it's easy to lose perspective on whether things are actually improving. The system tracks trends over weeks and months — so you can see the direction you're moving, even when individual days feel discouraging.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Start trusting your foot again.</p>
                  <p>The goal isn't just less pain. It's building enough confidence in your foot that you stop planning your life around it — and start moving through it with less fear.</p>
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
                    <p>Dr. Jonathan Schutza is a licensed Doctor of Physical Therapy who has worked with many people who came to him after years of chronic foot and heel pain — having already tried multiple rounds of treatment without lasting results.</p>
                    <p>What he found consistently was that chronic pain sufferers weren't lacking effort or willpower. They were lacking a structured process that built tissue capacity gradually enough to break the stop-start cycle for good.</p>
                    <p>The Foot Capacity System is the process he built for exactly that situation — designed to help people with long-standing pain finally move forward with more consistency, more clarity, and less fear of setbacks.</p>
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
                  I had heel pain for over five years. I tried everything — orthotics, steroid injections, stretching, different doctors. Nothing worked long-term. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked.{" "}
                  <span className="text-blue-600 font-bold">He's not just fixing the pain — he's teaching me how to stay better.</span>
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold">Dee Bell</p>
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
                Dr. Jonathan walks you through the app, the phases, the daily sessions, and how the system helps you navigate setbacks without losing your progress.
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
                quote="I had heel pain for over five years. Nothing worked long-term. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked."
                name="Dee Bell"
              />
              <MicroQuote
                quote="You have helped me and my chronically painful foot by giving me the language and background knowledge to talk to my doctor and my PT. It has had an impact on my recovery for sure."
                name="@vicbre415"
              />
              <MicroQuote
                quote="I tore a tendon in my plantar fascia and developed a DVT in the same leg. In May, I started with Dr. Jonathan Schutza and had remarkable progress. Through his guided strengthening program, I was able to walk with better mobility and less pain."
                name="Wendy Peterman"
              />
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 8: HOW THE SYSTEM WORKS ──────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">How The System Supports You</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">A closer look at how the system guides recovery through both progress and setbacks.</h2>
              <div className="space-y-12 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-3">A phased recovery process.</p>
                  <p className="mb-4">Recovery happens in stages. The system gives you a clear plan for each phase — so you always know what to focus on, and each phase builds on the last.</p>
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
                  <p className="mb-4">When symptoms spike, the system helps you reduce load temporarily, adjust your plan, and keep progressing — without feeling like you've lost everything.</p>
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
                  <p className="font-semibold text-slate-900 text-xl mb-3">"Is it too late for me to actually recover?"</p>
                  <p className="mb-3">It is not too late. Most people who go through this system have been dealing with foot pain for months or years before finding it. Duration of pain does not determine outcome.</p>
                  <p>What determines outcome is consistency with the right process. Chronic pain often persists not because the body can't heal, but because the approach hasn't given the tissue what it needs to build lasting capacity. That's what this system is designed to provide.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"I've tried so many things and always end up back at square one."</p>
                  <p className="mb-3">The stop-start cycle is one of the most discouraging patterns in chronic pain recovery. You improve, you push a little, it flares, and it feels like the progress was an illusion.</p>
                  <p>The system is built to break that cycle. Built-in flare-up support means setbacks have a clear protocol — reduce load, stay consistent, build back. Over time, the flare-ups become less frequent and less severe as your foot capacity genuinely improves.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"What if my case is too severe or too complex for this?"</p>
                  <p className="mb-3">The system is designed to be conservative and progressive, starting from where you are and building gradually. It was built for people with significant, long-standing pain — not people with mild occasional discomfort.</p>
                  <p>If you have had recent surgery or been told your case requires specialized care, we recommend consulting with your physician before starting. For most people with chronic plantar fasciitis or heel pain, the system is appropriate.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"How is this different from physical therapy I've already tried?"</p>
                  <p>Most PT focuses on symptom management during clinic visits — with limited guidance for what happens between appointments. This system gives you structured daily guidance, progress tracking, and flare-up support every single day. The difference is not the exercises — it's the consistency and structure around them.</p>
                </div>
                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">"What if this doesn't work either?"</p>
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
                  "You've been dealing with foot or heel pain for months or years.",
                  "You've had temporary relief before but the pain always comes back.",
                  "You're starting to wonder if your foot will ever feel normal again.",
                  "You want a structured process that accounts for setbacks — not just good days.",
                  "You want to see measurable progress over time, not just feel it.",
                  "You're willing to follow a consistent process — even imperfectly.",
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
                  "You're looking for an overnight fix or passive solution.",
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
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-10 text-center">People who had been dealing with this for a long time.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial3} alt="Dee Bell testimonial" className="w-full h-auto" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial4} alt="Wendy Peterman testimonial" className="w-full h-auto" />
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
                  <p className="text-blue-600 italic text-sm max-w-md mx-auto">A structured recovery system designed to help you finally break the cycle of chronic foot pain — with clarity, consistency, and built-in support.</p>
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
              <p className="text-slate-600 text-lg leading-relaxed mb-4">Most people dealing with chronic pain aren't wondering if recovery is possible. They're wondering if it's still possible for them.</p>
              <p className="text-slate-400 text-base mb-12">Below are the most common questions from people in exactly your situation.</p>
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  { value: "faq-1", q: "I've had this pain for years — is it too late to actually recover?", a: "It is not too late. Most people who go through this system have been dealing with foot pain for months or years before finding it. Duration of pain does not determine outcome. Consistency with the right process does." },
                  { value: "faq-2", q: "What if I have a flare-up — do I have to start over from the beginning?", a: "No. Flare-ups are a normal and expected part of recovery — especially for people with chronic pain. The system includes built-in flare-up support that helps you temporarily reduce load, stay consistent at a lower intensity, and build back gradually. A setback is not a restart." },
                  { value: "faq-3", q: "Will this actually work if I've tried everything else and nothing has helped?", a: "Most people who come to this system have already tried stretching, orthotics, rest, cortisone shots, and physical therapy. The reason those things often don't work long term is that they address symptoms without building the underlying capacity your feet need. This system is built around structured progressive loading — a fundamentally different approach designed to work when other things haven't." },
                  { value: "faq-4", q: "How is this different from physical therapy I've already done?", a: "Most PT focuses on symptom management during clinic visits — with limited guidance for what happens between appointments. This system gives you structured daily guidance, progress tracking, and flare-up support every single day. The difference is not the exercises — it's the consistency and structure around them." },
                  { value: "faq-5", q: "How much time does this take each day?", a: "Most daily sessions take around 10 to 15 minutes. The system is designed to fit into a normal life, not add an overwhelming burden on top of it. Consistency over time matters far more than long sessions." },
                  { value: "faq-6", q: "Is this safe to do if my case is severe or complex?", a: "The system is designed to be conservative and progressive, starting from where you are and building gradually. If you have had recent surgery, a significant structural diagnosis, or been told your case requires specialized care, we recommend consulting with your physician before starting." },
                  { value: "faq-7", q: "What if I buy this and it doesn't work for me?", a: "The system comes with a 30-day guarantee. Try it, and if you don't feel it's right for you, email us at contact@fixyourmovement.com within 30 days and we'll refund your investment. No complicated forms, no hoops to jump through." },
                  { value: "faq-8", q: "Do I need any special equipment or do I have to go to a gym?", a: "No gym and no special equipment required. Everything in the system can be done at home. A few sessions may use a resistance band or a small towel, but nothing that requires a significant investment or a specific setup." },
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
                Duration of pain doesn't determine whether you can recover.
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                The Foot Capacity System gives you the structured process, daily guidance, and flare-up support to finally break the cycle — no matter how long you've been stuck in it.
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