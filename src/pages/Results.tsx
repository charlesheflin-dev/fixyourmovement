import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ShieldCheck, Tag, Infinity, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const GET_RESULTS_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/get-results-data";
const CHECKOUT_URL = "/checkout";

interface ResultsData {
  userId: string;
  displayName: string | null;
  currentPhase: number;
  currentWeek: number;
  daysLogged: number;
  startingPain: number | null;
  latestPain: number | null;
  painDrop: number | null;
  archetype: string | null;
  faamScore: number | null;
  faamBand: string | null;
  painTimeline: { date: string; pain: number | null; capacity: number | null }[];
}

// ─── Archetype copy ────────────────────────────────────────────────────────────
const archetypeCopy: Record<string, {
  headline: string;
  subhead: string;
  recognitionBullets: string[];
  section2Headline: string;
  section2Body: string[];
}> = {
  Archetype_Frustrated_Fix_Seeker: {
    headline: "You've Already Put In The Work.\nThe Problem Was Never Your Effort.",
    subhead: "Most people who find The Foot Capacity System have already tried stretching, orthotics, injections, rest, exercises, and physical therapy. They weren't lacking effort. They were following advice that never gave them a clear process to follow.",
    recognitionBullets: [
      "You've tried multiple treatments and nothing has held",
      "You get temporary relief, then the pain comes right back",
      "You're exhausted from starting over every time there's a setback",
      "You want one clear process — not another exercise to guess with",
    ],
    section2Headline: "The Missing Piece Usually Isn't More Effort.",
    section2Body: [
      "Most plantar fasciitis treatments are built around symptom management. Stretching reduces tension temporarily. Orthotics offload pressure. Rest calms inflammation.",
      "None of those things build the underlying tissue capacity that your foot actually needs. So when you return to activity, the tissue isn't ready, and the symptoms return.",
      "The missing piece isn't a better exercise or a better shoe. It's a structured process that progressively loads the foot, builds tolerance over time, and gives you clear guidance through both progress and setbacks.",
    ],
  },
  Archetype_Active_Person: {
    headline: "You Don't Have To Choose Between\nRecovery And Staying Active.",
    subhead: "Most people dealing with plantar fasciitis are told to rest. But for active people, movement isn't just exercise — it's part of who they are. The problem is that rest alone rarely solves the underlying issue.",
    recognitionBullets: [
      "Heel or foot pain that flares up during or after activity",
      "You've been told to rest but the pain comes back when you return",
      "You're modifying workouts, skipping runs, or sitting out of sport",
      "You want a structured plan that works around your active life",
    ],
    section2Headline: "The Goal Isn't To Stop Moving. It's To Build Capacity.",
    section2Body: [
      "Plantar fasciitis develops when the load placed on your foot exceeds what the tissue can currently handle. Rest reduces that load temporarily, which is why symptoms calm down. But it doesn't build capacity.",
      "So when you return to activity, you're doing it with the same tissue tolerance you had before — or less. The pain comes back, often within days.",
      "The answer isn't less activity. It's a structured process that gradually increases your foot's ability to handle load — so you can return to what you love without constantly managing flare-ups.",
    ],
  },
  Archetype_Discouraged_Chronic: {
    headline: "You've Been Dealing With This Long Enough.\nRecovery Is Still Possible.",
    subhead: "Most people dealing with chronic foot pain haven't just lost confidence in treatments. They've started losing confidence in their own body. After months or years of setbacks, it's easy to wonder whether things will ever truly change.",
    recognitionBullets: [
      "You've been dealing with this for months or years",
      "You've started wondering if your foot will ever feel normal again",
      "You've lost confidence in treatments — and maybe in your own body",
      "You want a process you can trust and stay consistent with",
    ],
    section2Headline: "Chronic Pain Doesn't Just Affect Your Foot. It Affects Your Confidence.",
    section2Body: [
      "Duration of pain doesn't determine outcome. Consistency with the right process does.",
      "What chronic cases usually share isn't permanent damage — it's a long period of symptom management without capacity building. The tissue has never been progressively loaded in a way that builds real tolerance.",
      "This system was built for exactly this situation. The goal is to give you a structured process you can trust and stay consistent with — even when progress comes in stages.",
    ],
  },
  Archetype_Newly_Concerned: {
    headline: "You're Asking The Right Questions Early.\nThat Matters.",
    subhead: "When foot or heel pain is new, you have something many people wish they had later: time. The sooner you understand what's happening and begin the right process, the easier it becomes to stay ahead of the cycle that traps so many people.",
    recognitionBullets: [
      "Foot or heel pain that's new or recently started",
      "You're not sure what's causing it or what to do next",
      "You want to get ahead of it before it becomes a bigger problem",
      "You want clarity — not guesswork",
    ],
    section2Headline: "The Earlier You Understand The Problem, The More Options You Usually Have.",
    section2Body: [
      "Most people discover The Foot Capacity System after months or years of trying other things. You're here earlier — and that's a real advantage.",
      "Acting now, while symptoms are still manageable, is what keeps this from becoming the kind of long-term problem others spend years trying to resolve.",
      "The goal isn't to panic. The goal is to understand what's happening and start the right process now — before the cycle that traps most people even begins.",
    ],
  },
};

const defaultCopy = archetypeCopy["Archetype_Frustrated_Fix_Seeker"];

function getFaamBandLabel(band: string | null): string {
  if (band === "faam_high") return "Mild Limitation";
  if (band === "faam_moderate") return "Moderate Limitation";
  if (band === "faam_low") return "Significant Limitation";
  return "Assessed";
}

function getFaamBandColor(band: string | null): string {
  if (band === "faam_high") return "#16A34A";
  if (band === "faam_moderate") return "#D97706";
  return "#DC2626";
}

function getPhaseLabel(phase: number): string {
  if (phase === -1) return "Phase 0.5 — Calm Mode";
  if (phase === 0) return "Maintenance";
  if (phase === 1) return "Phase 1 — Reset";
  if (phase === 2) return "Phase 2 — Restore";
  if (phase === 3) return "Phase 3 — Perform";
  return "Active Recovery";
}

export default function Results() {
  const { userId } = useParams<{ userId: string }>();
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) { setError(true); setLoading(false); return; }
    fetch(`${GET_RESULTS_URL}?userId=${userId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(true); } else { setData(d); }
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [userId]);

  const copy = data?.archetype ? (archetypeCopy[data.archetype] ?? defaultCopy) : defaultCopy;
  const hasPainDrop = data?.painDrop !== null && data?.painDrop !== undefined && data.painDrop > 0;
  const hasTimeline = data?.painTimeline && data.painTimeline.length > 3;
  const hasAppData = data && data.daysLogged > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading your recovery profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">

      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6 bg-white">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <img src={logo} alt="FCS" className="h-8 w-auto" />
          <span className="text-slate-900 font-bold text-base leading-tight tracking-tight">The Foot Capacity System</span>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="bg-white pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

              <div className="flex items-center gap-3.5 mb-8">
                <img src={logo} alt="FCS" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight">The Foot Capacity System</span>
              </div>

              {data?.displayName && (
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
                  Personalized for {data.displayName}
                </p>
              )}

              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5 whitespace-pre-line">
                {copy.headline.split("\n")[0]}<br />
                <span className="text-blue-600">{copy.headline.split("\n")[1]}</span>
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">{copy.subhead}</p>

              <div className="flex flex-col gap-1.5 mb-10">
                {copy.recognitionBullets.map((item, i) => (
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

        {/* ── YOUR DATA (only shown if app data exists) ── */}
        {hasAppData && (
          <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Your Recovery Data</p>
                <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-8">
                  Here's what your data shows so far.
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
                    <p className="text-3xl font-bold text-blue-600 mb-1">{data!.daysLogged}</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Days Logged</p>
                  </div>
                  {data!.currentWeek > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
                      <p className="text-3xl font-bold text-blue-600 mb-1">Week {data!.currentWeek}</p>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Current Week</p>
                    </div>
                  )}
                  {hasPainDrop && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
                      <p className="text-3xl font-bold text-green-600 mb-1">−{data!.painDrop}</p>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Pain Drop</p>
                    </div>
                  )}
                  {data!.faamScore !== null && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
                      <p className="text-3xl font-bold mb-1" style={{ color: getFaamBandColor(data!.faamBand) }}>
                        {data!.faamScore}%
                      </p>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">FAAM Score</p>
                    </div>
                  )}
                </div>

                {hasPainDrop && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
                    <p className="text-slate-900 font-semibold text-base mb-1">
                      Your pain dropped from {data!.startingPain}/10 to {data!.latestPain}/10.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      That's a {data!.painDrop} point reduction. This is what structured progressive loading does — not temporary relief, but a measurable shift in how your foot is functioning.
                    </p>
                  </div>
                )}

                {hasTimeline && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4">Pain Trend</p>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={data!.painTimeline} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94A3B8" }} tickFormatter={(d) => d.slice(5)} />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#94A3B8" }} />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }}
                          formatter={(value: number) => [`${value}/10`, "Pain"]}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line type="monotone" dataKey="pain" stroke="#2563EB" strokeWidth={2} dot={false} connectNulls />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

              </motion.div>
            </div>
          </section>
        )}

        {/* ── FAAM SCORE (shown if no app data but assessment exists) ── */}
        {!hasAppData && data?.faamScore !== null && (
          <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Your Assessment Score</p>
                <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                  Your FAAM score: <span style={{ color: getFaamBandColor(data!.faamBand) }}>{data!.faamScore}% — {getFaamBandLabel(data!.faamBand)}</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  People who start the Foot Capacity System with a score in your range typically see meaningful improvement in their functional ability by the end of Phase 2. The score measures how your foot is actually functioning — not just how much it hurts. Improving it requires the right process, applied consistently.
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── SECTION 2: SURFACE THE PAIN ── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Why It Keeps Happening</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">{copy.section2Headline}</h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                {copy.section2Body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DR. JONATHAN ── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <img
                  src="/images/dr-jonathan-schutza-headshot.png"
                  alt="Dr. Jonathan Schutza, PT, DPT"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-3">Built By A Physical Therapist</p>
                  <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-4">Dr. Jonathan Schutza, PT, DPT</h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>Dr. Jonathan Schutza is a licensed Doctor of Physical Therapy who built this system around one core belief: lasting recovery from plantar fasciitis requires progressive structure, not just symptom management.</p>
                    <p>He has worked with people who came to him after years of failed treatments — cortisone, orthotics, stretching, multiple rounds of PT. What he found consistently was not that those people lacked effort. They lacked a process that actually built tissue capacity.</p>
                    <p>The Foot Capacity System is the structured approach he built to change that — designed to be followed from home, at your own pace, with the clarity and guidance that most people never got from their prior care.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DR. JONATHAN VIDEO PLACEHOLDER ── */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">A Message For You</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">From Dr. Jonathan</h2>
              <div className="bg-slate-100 rounded-2xl aspect-video flex items-center justify-center border border-slate-200">
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Video message from Dr. Jonathan — coming soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PRICE CARD + GUARANTEE ── */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4 text-center">Continue Your Recovery</p>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-8 text-center">
                The Full 12-Week System
              </h2>

              {/* Price card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Most popular</p>
                    <p className="text-4xl font-bold text-slate-900">$157<span className="text-lg font-normal text-slate-400">/mo</span></p>
                    <p className="text-slate-500 text-sm mt-1">Only 3 monthly payments of $157</p>
                  </div>
                  
                    href={CHECKOUT_URL}
                    onClick={() => window.gtag?.("event", "checkout_click", { event_category: "conversion", event_label: "results_page_cta" })}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors text-center whitespace-nowrap"
                  >
                    Get Started →
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Full 12-week guided protocol",
                    "Daily exercise sessions (10-15 min)",
                    "Built-in flare-up support",
                    "Pain & capacity tracking",
                    "Phase-by-phase progression",
                    "Lifetime access after 12 weeks",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={15} className="text-blue-500 shrink-0" />
                      <p className="text-slate-600 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee card */}
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <div className="bg-blue-600 px-6 py-4 flex items-center gap-3">
                  <ShieldCheck size={20} className="text-white shrink-0" />
                  <div>
                    <p className="text-white font-bold text-base">Walk Pain-Free Or It's Free</p>
                    <p className="text-blue-100 text-sm">30-Day Money-Back Guarantee</p>
                  </div>
                </div>
                <div className="bg-white px-6 py-5">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Follow the system for 30 days. If you genuinely don't feel it's moving you in the right direction, reach out and we'll make it right — no complicated process, no questions designed to make it harder.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Full refund if it doesn't work for you",
                      "No complicated return process",
                      "Covers both payment plans",
                      "Your progress data stays yours",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-blue-500 shrink-0" />
                        <p className="text-slate-600 text-xs">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-5 mt-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-500" /> 30-Day Guarantee</span>
                <span className="flex items-center gap-1.5"><Tag size={14} className="text-blue-500" /> Flexible Payment Plans</span>
                <span className="flex items-center gap-1.5"><Infinity size={14} className="text-blue-500" /> Lifetime Access</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-14 md:py-20 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">
                Ready to continue your recovery with the full system?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                Everything you need to rebuild foot capacity, manage flare-ups, and stop starting over — structured, guided, and built specifically for your situation.
              </p>
              
                href={CHECKOUT_URL}
                onClick={() => window.gtag?.("event", "checkout_click", { event_category: "conversion", event_label: "results_page_final_cta" })}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                Get Started With The Foot Capacity System →
              </a>
              <p className="text-slate-400 text-sm mt-4">30-Day Guarantee · Flexible Payment Plans · Lifetime Access</p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-base">© {new Date().getFullYear()} The Foot Capacity System by Dr. Jonathan Schutza, PT, DPT. All rights reserved.</p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground/70 max-w-lg mx-auto">
            This program is for educational purposes and is not a substitute for personalized medical advice. Consult your healthcare provider before beginning any exercise program.
          </p>
        </div>
      </footer>

    </div>
  );
}