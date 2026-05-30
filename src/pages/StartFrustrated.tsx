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

import testimonial1 from "@/assets/testimonials/1B.jpg";
import testimonial3 from "@/assets/testimonials/3B.jpg";
import testimonial5 from "@/assets/testimonials/5B.jpg";

// ─── Constants ────────────────────────────────────────────────────────────────
const CHECKOUT_URL = "https://whop.com/checkout/plan_f7hnKFT1vq0zb";

const painData = [
  { month: "May", pain: 8, trend: 7.5 },
  { month: "Jun", pain: 6.5, trend: 6.5 },
  { month: "Jul", pain: 5.5, trend: 5.5 },
  { month: "Aug", pain: 4, trend: 4.5 },
  { month: "Sep", pain: 2.5, trend: 3.5 },
  { month: "Oct", pain: 2, trend: 2.5 },
];

// ─── GA4 checkout click helper ────────────────────────────────────────────────
const trackCheckout = () =>
  window.gtag?.("event", "checkout_click", {
    event_category: "conversion",
    event_label: "frustrated_cta",
  });

// ─── Reusable CTA button ──────────────────────────────────────────────────────
function CheckoutButton({ label = "Get Started With The Foot Capacity System →", className = "" }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackCheckout}
      className={`inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors ${className}`}
    >
      {label}
    </a>
  );
}

// ─── Inline micro-quote ───────────────────────────────────────────────────────
function MicroQuote({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="border-l-4 border-blue-600 pl-5 my-8">
      <p className="text-slate-700 text-lg italic leading-relaxed">"{quote}"</p>
      <p className="text-blue-600 font-semibold text-sm mt-2">— {name}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StartFrustrated() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>

        {/* ── SECTION 1: HERO ──────────────────────────────────────────────── */}
        {/*
          ARCHETYPE: Frustrated Fix-Seeker
          Core fear: "Why should I believe this will be different?"
          Hero speaks to effort already spent, not to the symptom alone.
        */}
        <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Logo lockup */}
              <div className="flex items-center gap-3.5 mb-8">
                <img src={logo} alt="FCS" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">
                  The Foot Capacity System
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
                You've Already Put In The Work.<br />
                <span className="text-blue-600">The Problem Was Never Your Effort.</span>
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-3">
                Most people who find The Foot Capacity System have already tried stretching, orthotics, cortisone, rest, and physical therapy. They did everything they were told. The pain kept coming back.
              </p>

              <p className="text-slate-500 text-base italic leading-relaxed mb-8">
                This system was built for exactly that situation — not as another thing to try, but as a structured process designed to work when other things haven't.
              </p>

              {/* Recognition bullets — archetype-specific */}
              <div className="flex flex-col gap-1.5 mb-10">
                {[
                  "You've tried multiple treatments and nothing has held",
                  "You get temporary relief, then the pain comes right back",
                  "You're starting to wonder if your foot will ever feel normal",
                  "You're exhausted from starting over every time there's a setback",
                  "You want one clear process — not another exercise to guess with",
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="text-blue-600 font-bold shrink-0">—</span>
                    {item}
                  </span>
                ))}
              </div>

              {/* Trust badges — no checkout link yet */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-500" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Tag size={14} className="text-blue-500" /> One-Time Purchase</span>
                <span className="flex items-center gap-1.5"><Infinity size={14} className="text-blue-500" /> Lifetime Access</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-blue-500" /> Guided From Home</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: SURFACE THE PAIN ──────────────────────────────────── */}
        {/*
          Name the cycle precisely. Make them feel seen.
          This is not problem-agitation — it's recognition.
        */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">
                Why It Keeps Happening
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                The cycle isn't your fault. But it won't break on its own.
              </h2>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Most plantar fasciitis treatments are built around symptom management. Stretching reduces tension temporarily. Orthotics offload pressure. Rest calms inflammation. Cortisone masks pain for a while.
                </p>
                <p>
                  None of those things build the underlying tissue capacity that your foot actually needs. So when you return to activity — even normal walking — the tissue isn't ready, and the symptoms return.
                </p>
                <p>
                  The missing piece isn't a better exercise or a better shoe. It's a structured process that progressively loads the foot, builds tolerance over time, and gives you clear guidance through both progress and setbacks.
                </p>
              </div>

              {/* Micro-quote 1 */}
              <MicroQuote
                quote="I had heel pain for over five years. I tried everything — orthotics, steroid injections, stretching, different doctors. Nothing worked long-term. Dr. Jonathan Schutza was the first to explain the real cause of my pain and create a plan that finally worked."
                name="Dee Bell"
              />

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  That's what this system is built around. Not symptom management — capacity building. A clear, phased process you can follow from home, with daily guidance and built-in support when things get hard.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 3: INTRODUCE THE SYSTEM — CONCEPT ONLY ───────────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">
                A Different Approach
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Structure is what makes the difference.
              </h2>

              <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Less second-guessing.</p>
                  <p>The system gives you a clear answer every day — what to do, how much, and why. You're not piecing together advice from multiple sources anymore.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Flare-ups don't mean starting over.</p>
                  <p>When symptoms spike, the system helps you adjust load, stay consistent at a lower intensity, and build back — without panic and without losing your progress.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">Progress you can actually see.</p>
                  <p>Tracking trends over time takes the emotion out of hard days. You can see whether things are improving instead of relying on how your foot feels on any given morning.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-2">One process. Not another guess.</p>
                  <p>This isn't a set of exercises to add to what you're already doing. It's a complete system that replaces the guesswork with a clear, progressive path forward.</p>
                </div>
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
                      Dr. Jonathan Schutza is a licensed Doctor of Physical Therapy who built this system around one core belief: lasting recovery from plantar fasciitis requires progressive structure, not just symptom management.
                    </p>
                    <p>
                      He has worked with people who came to him after years of failed treatments — cortisone, orthotics, stretching, multiple rounds of PT. What he found consistently was not that those people lacked effort. They lacked a process that actually built tissue capacity.
                    </p>
                    <p>
                      The Foot Capacity System is the structured approach he built to change that — designed to be followed from home, at your own pace, with the clarity and guidance that most people never got from their prior care.
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <a
                      href="https://www.instagram.com/dr.schutza.pt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img src="/images/follow-on-instagram.png" alt="Follow on Instagram" className="h-9 rounded-lg" loading="lazy" />
                    </a>
                    <a
                      href="https://www.facebook.com/share/18vGC5rzP8/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img src="/images/follow-on-facebook.png" alt="Follow on Facebook" className="h-9 rounded-lg" loading="lazy" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 5: FEATURED PULL QUOTE ───────────────────────────────── */}
        {/*
          Large-format. Archetype-matched. Lorenzo is perfect for Frustrated Fix-Seeker —
          3 years, tried everything, finally broke through.
        */}
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
                  I've been struggling with plantar fasciitis for 3 years, tried cortisone, shockwave, thousands of different shoes. Until December when I saw one of your fascia strengthening exercises. I'm doing so many exercises you're suggesting plus toe spacers while I sleep, and for the first time it's been{" "}
                  <span className="text-blue-600 font-bold">2 weeks without pain. It's unreal.</span>
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  I wanted to thank you. Not many people talk about the stuff you do.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-blue-600" />
                  <p className="text-blue-600 font-semibold">Lorenzo Luongo</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 6: APP WALKTHROUGH VIDEO ──────────────────────────────── */}
        {/*
          This is the product demo — not a sales pitch.
          By this point they understand the problem, the concept, and trust Dr. Jonathan.
          Now they see exactly what they're getting.
          CTA after video is a scroll anchor — NOT a checkout link.
        */}
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
                Dr. Jonathan walks you through the app, the phases, the daily sessions, and how the system handles setbacks. This is what structured recovery actually looks like.
              </p>

              {/* Walkthrough video — b37100f8162e1ab91cf86c9e284447da */}
              <div
                style={{ position: "relative", paddingTop: "56.25%" }}
                className="rounded-2xl overflow-hidden shadow-xl mb-8"
              >
                <iframe
                  src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/b37100f8162e1ab91cf86c9e284447da/iframe?preload=true&poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F6ec4d8b4-8156-40b2-b196-836d95530f00%2Fpublic"
                  loading="lazy"
                  style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen={true}
                />
              </div>

              {/* Scroll anchor — NOT checkout */}
              <div className="text-center">
                <a
                  href="#product-summary"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  See What's Included →
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 7: INLINE PROOF — MICRO-QUOTES AFTER VIDEO ───────────── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-0"
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-8">
                What People Notice After Starting
              </p>

              <MicroQuote
                quote="PT would often improve the immediate problem, but never addressed the deeper issues. Jonathan assessed my gait and began a regimen that got to the root of the problem — basically teaching me how to walk again."
                name="Lory Tubbs"
              />

              <MicroQuote
                quote="I've been struggling with plantar fasciitis for 3 years, tried cortisone, shockwave, thousands of different shoes. For the first time it's been 2 weeks without pain. It's unreal."
                name="Lorenzo Luongo"
              />

              <MicroQuote
                quote="He's not just fixing the pain — he's teaching me how to stay better. I can't recommend him enough."
                name="Dee Bell"
              />
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 8: HOW THE SYSTEM WORKS ──────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">
                How The System Supports You
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                A closer look at how the system guides recovery through both progress and setbacks.
              </h2>

              <div className="space-y-12 text-slate-600 text-lg leading-relaxed">

                {/* Phase structure */}
                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-3">A phased recovery process.</p>
                  <p className="mb-4">
                    Recovery happens in stages. The system gives you a clear plan for each phase — so you always know what to focus on, and each phase builds on the last.
                  </p>
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
                  <p className="mt-6 text-slate-500 text-base italic">
                    The system looks for consistent trends, not perfect days.
                  </p>
                </div>

                {/* Flare-up support */}
                <div className="border-t border-slate-100 pt-12">
                  <p className="font-semibold text-slate-900 text-xl mb-3">Flare-ups don't mean starting over.</p>
                  <p className="mb-4">
                    When symptoms spike, the system helps you reduce load temporarily, adjust your plan, and keep progressing — without feeling like you've lost everything you built.
                  </p>
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
                  <p className="mt-6 text-slate-500 text-base italic">
                    Setbacks are normal. They don't erase progress. The system helps you reset, not restart.
                  </p>
                </div>

                {/* Progress tracking */}
                <div className="border-t border-slate-100 pt-12">
                  <p className="font-semibold text-slate-900 text-xl mb-3">Tracking progress over time.</p>
                  <p className="mb-6">
                    Recovery is rarely perfectly linear. The system helps you look at longer-term trends instead of reacting to every difficult day.
                  </p>
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
                  <p className="text-slate-500 text-base italic">
                    Some days will feel better than others. What matters most is the overall direction.
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 9: OBJECTION HANDLING ────────────────────────────────── */}
        {/*
          Frustrated Fix-Seeker objection order:
          1. I've already tried everything (lead objection for this archetype)
          2. Why is this different from YouTube / generic PT
          3. What if I flare up again
          4. Can I actually do this from home
          5. What if this doesn't work either
          Prose format — not hidden in accordions. These are conversion-critical.
        */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">
                Real Concerns, Honest Answers
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-10">
                Questions worth answering before you decide.
              </h2>

              <div className="space-y-12 text-slate-600 text-lg leading-relaxed">

                <div>
                  <p className="font-semibold text-slate-900 text-xl mb-3">
                    "I've already tried everything. Why would this be different?"
                  </p>
                  <p className="mb-3">
                    This is the most honest question anyone in your situation can ask. You've done PT. You've rested. You've stretched. You've bought the shoes and tried the injections. The fact that none of it held isn't a reflection of your effort — it's a reflection of what those approaches actually do.
                  </p>
                  <p>
                    Most treatments address the symptom without building tissue capacity. This system is built around progressive loading — a process that gradually increases the demands on your plantar fascia so it can actually handle load again. That's a fundamentally different approach, not just a different set of exercises.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">
                    "How is this different from YouTube exercises or generic PT?"
                  </p>
                  <p className="mb-3">
                    YouTube gives you exercises with no context, no progression, and no way to know if what you're doing is right for where you are right now. Generic PT gives you appointments — but not necessarily a structured plan you can follow every day between visits.
                  </p>
                  <p>
                    This system gives you a phase-by-phase progression built by a Doctor of Physical Therapy, with daily guidance, progress tracking, and flare-up support built in. The difference isn't the exercises. It's the structure around them.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">
                    "What if I flare up again while using this?"
                  </p>
                  <p className="mb-3">
                    Flare-ups are expected during recovery — especially for people who have had chronic pain for a long time. The system doesn't pretend they won't happen. It gives you a clear protocol for when they do.
                  </p>
                  <p>
                    You temporarily reduce load, stay consistent at a lower intensity, and build back gradually. A flare-up becomes a signal to adjust — not a reason to stop. Most people find that over time, setbacks become less severe and easier to navigate.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">
                    "Can I actually make progress doing this from home?"
                  </p>
                  <p>
                    The system was designed specifically for home use. No gym, no clinic visits, no equipment beyond what you likely already have. Daily sessions run 10 to 15 minutes. The structure, guidance, and tracking are all built into the app — so you get the clarity of working with a physical therapist without needing to be in a clinic to get it.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-10">
                  <p className="font-semibold text-slate-900 text-xl mb-3">
                    "What if I invest in this and it doesn't work for me either?"
                  </p>
                  <p>
                    The system comes with a 30-day guarantee. If you follow the structure and genuinely don't feel it's moving you in the right direction, email us at contact@fixyourmovement.com and we'll refund your investment. No complicated forms, no hoops to jump through. The goal is for this to work for you — and if it doesn't, you shouldn't have to pay for it.
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 10: WHO THIS IS FOR / NOT FOR ────────────────────────── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-3">
                Is this the right system for you?
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12">
                This system was built for a specific kind of person. Here's how to know if that's you.
              </p>

              <div className="space-y-4 mb-12">
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">This is for you if...</p>
                {[
                  "You've tried multiple treatments and nothing has held long-term.",
                  "You're exhausted from conflicting advice and want one clear process to follow.",
                  "You want structured recovery you can do from home without clinic visits.",
                  "You're tired of restarting and want a system that accounts for setbacks.",
                  "You want to actually see whether things are improving over time.",
                  "You're willing to follow a structured process consistently — even imperfectly.",
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
                  "You're looking for a passive solution that requires no engagement.",
                  "You're unwilling to follow a structured program consistently over time.",
                  "You need emergency or acute medical care — this is not a substitute for urgent treatment.",
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

        {/* ── SECTION 11: TESTIMONIAL BLOCK ─────────────────────────────────── */}
        {/*
          3 full image cards — static, not carousel.
          Selected for Frustrated Fix-Seeker: Lorenzo (1B), Dee (3B), Lory (5B)
          All three speak to trying everything and finally finding something that worked.
        */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-3 text-center">
                Patient Experiences
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-10 text-center">
                People who had already tried everything.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial1} alt="Lorenzo Luongo testimonial" className="w-full h-auto" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial3} alt="Dee Bell testimonial" className="w-full h-auto" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={testimonial5} alt="Lory Tubbs testimonial" className="w-full h-auto" />
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center mt-6">
                Individual results vary. These are real experiences from people who followed the system and stayed consistent.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 12: VALUE STACK + PRICE REVEAL ───────────────────────── */}
        {/*
          FIRST CHECKOUT LINK appears here — after price has been seen.
          Price ($397) must be visible before any checkout button.
        */}
        <section id="product-summary" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">

                {/* Header */}
                <div className="text-center px-8 pt-10 pb-6">
                  <img src={logo} alt="FCS" className="h-10 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">The Foot Capacity System</h2>
                  <p className="text-blue-600 italic text-sm max-w-md mx-auto">
                    A structured recovery system designed to help you stop guessing and move forward with more clarity and confidence.
                  </p>
                </div>

                {/* App screenshots + charts */}
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
                            { day: "May 11", red: 7, green: 5 },
                            { day: "May 12", red: 6, green: 5.5 },
                            { day: "May 13", red: 6.5, green: 6 },
                            { day: "May 14", red: 5.5, green: 6.5 },
                            { day: "May 16", red: 5, green: 7.5 },
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
                            { month: "May 11", pain: 8 },
                            { month: "May 14", pain: 6 },
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

                {/* What's included */}
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
                        <div className="bg-blue-50 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
                          <Icon size={18} className="text-blue-600" />
                        </div>
                        <p className="font-semibold text-slate-900 text-sm">{label}</p>
                        <p className="text-slate-500 text-xs">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee */}
                <div className="mx-6 mb-4 bg-blue-50 rounded-2xl p-5 flex gap-4 items-start">
                  <div className="bg-blue-600 rounded-full p-2 shrink-0">
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">30-Day Satisfaction Guarantee</p>
                    <p className="text-slate-600 text-xs mt-1">
                      Try the full system for 30 days. If you don't feel it's right for you, email us at contact@fixyourmovement.com and we'll refund your investment. No complicated forms, no hoops to jump through.
                    </p>
                  </div>
                </div>

                {/* Price — visible before first checkout button */}
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
                    <p className="text-slate-500 text-xs">
                      Get lifetime access to the complete system, all updates, and everything you need to keep moving forward.
                    </p>
                  </div>
                </div>

                {/* Trust strip */}
                <div className="border-t border-slate-100 px-8 py-4 flex justify-around text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Lock size={12} className="text-blue-500" /> Secure Checkout</span>
                  <span className="flex items-center gap-1"><Tag size={12} className="text-blue-500" /> One-Time Payment</span>
                  <span className="flex items-center gap-1"><Infinity size={12} className="text-blue-500" /> Lifetime Access</span>
                </div>

                {/* FIRST CHECKOUT BUTTON — price is now visible above */}
                <div className="px-8 py-8 text-center border-t border-slate-100">
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackCheckout}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors w-full text-center"
                  >
                    Get Started With The Foot Capacity System →
                  </a>
                  <div className="flex justify-center gap-6 mt-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-blue-500 inline" /> 30-Day guarantee</span>
                    <span className="flex items-center gap-1"><Lock size={13} className="text-blue-500 inline" /> Secure checkout</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 13: FAQ ───────────────────────────────────────────────── */}
        {/*
          Frustrated Fix-Seeker FAQ order:
          Lead with the hardest objection first — "will this work if nothing has?"
          Follow with flare-ups, duration, difference from PT, time, equipment, guarantee.
        */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Common Questions</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-3">
                Questions people ask before getting started.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Most people who find this system have already tried a lot. These questions reflect where they actually are.
              </p>
              <p className="text-slate-400 text-base mb-12">
                Below are the most common questions from people in exactly your situation.
              </p>

              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="faq-1" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    Will this actually work if I've tried everything else and nothing has helped?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Recovery Process</p>
                    <div className="space-y-3 text-slate-600 text-base leading-relaxed">
                      <p>Most people who come to this system have already tried stretching, orthotics, rest, cortisone shots, and generic physical therapy exercises. The reason those things often don't work long term is that they address symptoms without building the underlying capacity your feet actually need.</p>
                      <p>This system is built around a different approach — structured progressive loading that rebuilds tissue tolerance from the ground up. It's not another set of exercises to try. It's a process designed to work when other things haven't.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    What if I have a flare-up — do I have to start over from the beginning?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Flare-Ups</p>
                    <div className="space-y-3 text-slate-600 text-base leading-relaxed">
                      <p>No. Flare-ups are a normal and expected part of recovery — they don't erase your progress. The system includes built-in flare-up support that helps you temporarily reduce load, stay consistent at a lower intensity, and build back gradually without losing ground.</p>
                      <p>A setback is not a restart. The system is designed to keep you moving forward even on difficult days.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    I've had this pain for years — is it too late to actually recover?
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Chronic Pain</p>
                    <div className="space-y-3 text-slate-600 text-base leading-relaxed">
                      <p>It is not too late. Most people who go through this system have been dealing with foot pain for months or years before finding it. Duration of pain does not determine outcome. Consistency with the right process does.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    How is this different from the exercises I can find for free on YouTube?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                    YouTube gives you individual exercises with no context, no progression, and no way to know if what you're doing is appropriate for where you are in recovery. This system gives you a structured phase-by-phase process built by a Doctor of Physical Therapy, with progress tracking, flare-up guidance, and a clear framework for moving from pain reduction all the way through to full function. The difference is not the exercises — it's the structure around them.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    How much time does this take each day?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                    Most daily sessions take around 10 to 15 minutes. The system is designed to fit into a normal life, not add an overwhelming burden on top of it. Consistency over time matters far more than long sessions, and the structure reflects that.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-6" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    Do I need any special equipment or do I have to go to a gym?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                    No gym and no special equipment required. Everything in the system can be done at home. A few sessions may use a resistance band or a small towel, but nothing that requires a significant investment or a specific setup.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-7" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    What if I buy this and it doesn't work for me?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                    The system comes with a 30-day guarantee. Try it, and if you don't feel it's right for you, email us at contact@fixyourmovement.com within 30 days of purchase and we'll refund your investment. No complicated forms, no hoops to jump through.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-8" className="border-b border-slate-200 pb-1">
                  <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">
                    How is a digital program going to be as effective as seeing a physical therapist in person?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">
                    This system gives you structured daily guidance, progress tracking, flare-up support, and a clear plan every single day — built by a Doctor of Physical Therapy who specializes in exactly this condition. It is not a replacement for hands-on care when that is needed. But for people who need structure, consistency, and expert guidance they can follow from home, it delivers more day-to-day support than most in-person programs do.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 14: FINAL CTA ─────────────────────────────────────────── */}
        {/* Second and last checkout link on the page */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                You've put in enough effort without the right process.
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                The Foot Capacity System gives you the structure, daily guidance, and support that most people never got from their prior care — so you can finally move forward with clarity instead of guesswork.
              </p>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCheckout}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                Get Started With The Foot Capacity System →
              </a>
              <div className="flex flex-wrap gap-6 mt-8 text-sm text-slate-500">
                <span className="flex items-center gap-2"><Tag size={13} className="text-blue-500 shrink-0" />One-time purchase</span>
                <span className="flex items-center gap-2"><ShieldCheck size={13} className="text-blue-500 shrink-0" />30-Day guarantee</span>
                <span className="flex items-center gap-2"><Lock size={13} className="text-blue-500 shrink-0" />Secure checkout</span>
                <span className="flex items-center gap-2"><Infinity size={13} className="text-blue-500 shrink-0" />Lifetime access</span>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
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