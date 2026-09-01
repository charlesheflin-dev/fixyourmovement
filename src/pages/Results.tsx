import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, TrendingUp, Map, Video, ArrowRight, Shield, Zap, Infinity } from "lucide-react";
import UserJourneyCarousel from "@/components/UserJourneyCarousel";
import logo from "@/assets/logo.png";

const GET_RESULTS_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/get-results-data";
const CHECKOUT_URL = "/checkout";
const INSIGHTS_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/generate-results-insights";

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
  isTrial: boolean;
  trialStartedAt: string | null;
  currentStreak: number;
  surveyBranch: string | null;
  hasExtension: boolean;
  trialSessionsCompleted: number;
  totalReps: number;
  painTimeline: { date: string; pain: number | null; capacity: number | null }[];
}

interface InsightsData {
  heroSubhead: string;
  trendInsight: string;
  accomplishmentsCopy: string;
  finalCtoCopy: string[];
}

const FALLBACK_INSIGHTS: InsightsData = {
  heroSubhead: "You showed up every day and did the work. That's what creates real change.",
  trendInsight: "Your foot is adapting to the structured load you've been giving it. Consistency over time is what drives lasting recovery.",
  accomplishmentsCopy: "Showing up consistently is the most important thing you built.",
  finalCtoCopy: [
    "You've already put in the work.",
    "You've established a starting point.",
    "You've built real consistency.",
    "Your next phase is ready.",
  ],
};

// ── Section 1: Recovery Week Complete Hero ────────────────────────────────────

function HeroSection({ data, insights, insightsLoading }: { data: ResultsData; insights: InsightsData; insightsLoading: boolean }) {
  const hasPainDrop = data.painDrop !== null && data.painDrop > 0;

  return (
    <section className="relative bg-gradient-to-b from-blue-600 to-blue-800 pt-10 pb-20 px-6">
      <div className="max-w-lg mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          <CheckCircle size={14} />
          Recovery Week Complete
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          You Started.<br />
          You Showed Up.<br />
          You Made Progress.
        </h1>

        {/* Subhead */}
        <p className="text-blue-100 text-base leading-relaxed mb-8">
          {insightsLoading
            ? <span className="inline-block bg-white/20 rounded animate-pulse w-64 h-5" />
            : insights.heroSubhead}
        </p>

        {/* Pain stats card */}
        {hasPainDrop && (
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 mb-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-wide mb-1">Starting Pain</p>
                <p className="text-3xl font-bold text-white">{data.startingPain}<span className="text-lg font-normal text-blue-200">/10</span></p>
              </div>
              <div className="text-center border-x border-white/20">
                <p className="text-green-300 text-[11px] font-semibold uppercase tracking-wide mb-1">Improvement</p>
                <p className="text-3xl font-bold text-green-300">&#8722;{data.painDrop}</p>
                <p className="text-green-300 text-[10px] font-bold uppercase tracking-wide">Points</p>
              </div>
              <div className="text-center">
                <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-wide mb-1">Pain Today</p>
                <p className="text-3xl font-bold text-green-300">{data.latestPain}<span className="text-lg font-normal text-blue-200">/10</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Accomplishment row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: "📅", value: data.daysLogged, label: "Days Logged" },
            { icon: "👟", value: data.trialSessionsCompleted, label: "Recovery Sessions" },
            { icon: "🔥", value: data.currentStreak, label: "Days Checked In" },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wide leading-tight mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Success card */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 mb-8 text-left">
          <CheckCircle size={20} className="text-green-300 shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">Your progress has been saved.</p>
            <p className="text-blue-200 text-xs">Your next progression is ready.</p>
          </div>
        </div>

      </div>

      {/* Wave bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ── Section 2: Progress Trend ─────────────────────────────────────────────────

function ProgressTrendSection({ data, insights, insightsLoading }: { data: ResultsData; insights: InsightsData; insightsLoading: boolean }) {
  const hasPainDrop = data.painDrop !== null && data.painDrop > 0;
  const hasTimeline = data.painTimeline && data.painTimeline.length >= 2;

  if (!hasTimeline) return null;

  const chartData = data.painTimeline.map((p) => ({
    date: p.date.slice(5), // MM-DD
    pain: p.pain,
    capacity: p.capacity !== null ? Math.round(p.capacity * 10) / 10 : null,
  }));

  // Hide capacity line if more than 80% of values are identical (legacy flat-line detection)
  const capacityValues = chartData.map((d) => d.capacity).filter((v) => v !== null);
  const mostCommonCapacity = capacityValues.length > 0
    ? capacityValues.sort((a, b) =>
        capacityValues.filter((v) => v === a).length - capacityValues.filter((v) => v === b).length
      ).pop()
    : null;
  const flatCapacityCount = capacityValues.filter((v) => v === mostCommonCapacity).length;
  const showCapacity = capacityValues.length > 0 && flatCapacityCount / capacityValues.length < 0.8;

  return (
    <section className="py-10 px-6 bg-white border-t border-slate-100">
      <div className="max-w-lg mx-auto">

        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-blue-600" />
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Your Progress Trend</p>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
          You've Already Started Moving in the Right Direction.
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          Your progress tells a story.
        </p>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4">
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /> Pain Score (0–10)</span>
            {showCapacity && <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-green-500 inline-block rounded" /> Capacity Score (0–10)</span>}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94A3B8" }} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#94A3B8" }} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }}
                labelStyle={{ color: "#475569", fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="pain" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: "#3B82F6" }} name="Pain" connectNulls />
              {showCapacity && <Line type="monotone" dataKey="capacity" stroke="#22C55E" strokeWidth={2} dot={{ r: 3, fill: "#22C55E" }} name="Capacity" connectNulls />}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Progress insight card — always shown, AI-driven */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-4 flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp size={14} className="text-green-600" />
          </div>
          <div>
            {insightsLoading
              ? <div className="space-y-2"><div className="bg-green-200 rounded animate-pulse h-4 w-48" /><div className="bg-green-100 rounded animate-pulse h-3 w-64" /></div>
              : <p className="text-green-700 text-sm leading-relaxed">{insights.trendInsight}</p>
            }
          </div>
        </div>

        {/* Transition line */}
        <p className="text-slate-400 text-sm text-center leading-relaxed">
          The goal isn't temporary relief.<br />It's building the capacity to keep moving forward.
        </p>

      </div>
    </section>
  );
}

// ── Section 3: What You Accomplished ─────────────────────────────────────────

function AccomplishmentsSection({ data, insights, insightsLoading }: { data: ResultsData; insights: InsightsData; insightsLoading: boolean }) {
  return (
    <section className="py-10 px-6 bg-slate-50 border-t border-slate-100">
      <div className="max-w-lg mx-auto">

        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-base">🏆</span>
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">What You Accomplished This Week</p>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-slate-900 leading-tight text-center mb-3">
          You Showed Up.<br />That's Something To Be Proud Of.
        </h2>

        {/* Supporting copy */}
        <p className="text-slate-500 text-sm text-center leading-relaxed mb-7">
          {insightsLoading
            ? <span className="inline-block bg-slate-200 rounded animate-pulse w-56 h-4" />
            : insights.accomplishmentsCopy}
        </p>

        {/* Achievement grid — 2x2 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: "📅", value: data.trialSessionsCompleted, label: "Recovery Sessions", sub: `You completed ${data.trialSessionsCompleted} guided recovery sessions.` },
            { icon: "📊", value: data.daysLogged, label: "Symptom Check-ins", sub: "You logged your pain and symptoms every day." },
            { icon: "💪", value: data.totalReps > 0 ? data.totalReps : "—", label: "Exercise Reps", sub: "You put in the reps and gave your foot what it needs." },
            { icon: "🔥", value: data.currentStreak, label: "Days Checked In", sub: "You kept showing up and checking in." },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="text-3xl font-bold text-blue-600 mb-1">{item.value}</p>
              <p className="text-slate-700 text-xs font-bold uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-slate-400 text-xs leading-snug">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Success card */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <CheckCircle size={18} className="text-green-500 shrink-0" />
          <div>
            <p className="text-green-800 text-sm font-bold">You're not starting from scratch.</p>
            <p className="text-green-700 text-xs">You've already built momentum. Now it's time to keep building.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Section 4: Recovery Roadmap ───────────────────────────────────────────────

function RoadmapSection({ data }: { data: ResultsData }) {
  const { currentPhase, currentWeek } = data;

  // Build phase list — only include Calm Mode if user is currently in it
  const allPhases: {
    key: string;
    phaseNum: number;
    label: string;
    name: string;
    weeks?: string;
    bullets: string[];
    state: "completed" | "active" | "upcoming";
    weekLabel?: string;
  }[] = [];

  if (currentPhase === -1) {
    allPhases.push({
      key: "calm",
      phaseNum: -1,
      label: "Calm Mode",
      name: "Calm Mode",
      bullets: ["Reducing Load", "Managing Flare-Up", "Building Baseline"],
      state: "active",
      weekLabel: `Week ${currentWeek}`,
    });
  }

  allPhases.push({
    key: "phase1",
    phaseNum: 1,
    label: "Phase 1",
    name: "Build Foundation",
    weeks: "Weeks 1–4",
    bullets: ["Strength", "Stability", "Movement Quality"],
    state: currentPhase > 1 ? "completed" : currentPhase === 1 ? "active" : "upcoming",
    weekLabel: currentPhase === 1 ? `Week ${currentWeek}` : undefined,
  });

  allPhases.push({
    key: "phase2",
    phaseNum: 2,
    label: "Phase 2",
    name: "Restore Capacity",
    weeks: "Weeks 5–8",
    bullets: ["Load Tolerance", "Confidence", "Resilience"],
    state: currentPhase > 2 ? "completed" : currentPhase === 2 ? "active" : "upcoming",
    weekLabel: currentPhase === 2 ? `Week ${currentWeek}` : undefined,
  });

  allPhases.push({
    key: "phase3",
    phaseNum: 3,
    label: "Phase 3",
    name: "Return to Activity",
    weeks: "Weeks 9–12",
    bullets: ["Move More", "Do More", "Trust Your Foot Again"],
    state: currentPhase > 3 ? "completed" : currentPhase === 3 ? "active" : "upcoming",
    weekLabel: currentPhase === 3 ? `Week ${currentWeek}` : undefined,
  });

  return (
    <section className="py-10 px-6 bg-white border-t border-slate-100">
      <div className="max-w-lg mx-auto">

        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Map size={14} className="text-blue-600" />
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Your Recovery Roadmap</p>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-slate-900 leading-tight text-center mb-3">
          Here's What Comes Next.<br />You're Right On Track.
        </h2>

        <p className="text-slate-500 text-sm text-center leading-relaxed mb-8">
          Recovery happens in phases. You've already completed the first step.
        </p>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-slate-200" />

          <div className="space-y-4">
            {allPhases.map((phase, i) => (
              <div key={phase.key} className="relative flex gap-4">
                {/* Node */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                  phase.state === "completed"
                    ? "bg-green-500 border-green-500"
                    : phase.state === "active"
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-slate-300"
                }`}>
                  {phase.state === "completed"
                    ? <CheckCircle size={18} className="text-white" />
                    : phase.state === "active"
                    ? <span className="text-white text-sm font-bold">{i + 1}</span>
                    : <span className="text-slate-400 text-sm font-bold">{i + 1}</span>
                  }
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl border px-4 py-4 mb-1 ${
                  phase.state === "completed"
                    ? "bg-green-50 border-green-200"
                    : phase.state === "active"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white border-slate-200 opacity-80"
                }`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${
                    phase.state === "completed" ? "text-green-600"
                    : phase.state === "active" ? "text-blue-600"
                    : "text-slate-400"
                  }`}>{phase.label}</p>
                  <p className={`font-bold text-base mb-0.5 ${
                    phase.state === "completed" ? "text-green-800"
                    : phase.state === "active" ? "text-slate-900"
                    : "text-slate-400"
                  }`}>{phase.name}</p>
                  {phase.weeks && phase.state !== "active" && (
                    <p className="text-slate-400 text-xs mb-2">{phase.weeks}</p>
                  )}
                  {phase.state === "completed" && (
                    <span className="inline-block bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">
                      Complete
                    </span>
                  )}
                  {phase.state === "active" && (
                    <span className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">
                      You Are Here — {phase.weekLabel}
                    </span>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {phase.bullets.map((b, j) => (
                      <span key={j} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        phase.state === "completed"
                          ? "bg-green-100 text-green-700"
                          : phase.state === "active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-400"
                      }`}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance card */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 mt-6">
          <CheckCircle size={18} className="text-green-500 shrink-0" />
          <div>
            <p className="text-green-800 text-sm font-bold">You're not starting over.</p>
            <p className="text-green-700 text-xs">You've already laid the groundwork. Your next phase is ready.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Section 5: Personal Message from Dr. Jonathan ────────────────────────────

function DrJonathanSection() {
  const [posterVisible, setPosterVisible] = useState(true);
  return (
    <section className="py-10 px-6 bg-slate-50 border-t border-slate-100">
      <div className="max-w-lg mx-auto">

        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Video size={14} className="text-blue-600" />
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">A Personal Message From Dr. Jonathan</p>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-slate-900 leading-tight text-center mb-5">
          You Made It Through Recovery Week.
        </h2>

        {/* Supporting copy */}
        <div className="text-center text-slate-500 text-sm leading-relaxed mb-6 space-y-1">
          <p>Most people never make it this far.</p>
          <p>You showed up.</p>
          <p>You stayed consistent.</p>
          <p>You started building momentum.</p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg mb-3" style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={`https://customer-hene8ngxxo3eajlj.cloudflarestream.com/7e581f9df0bbb0e4ee02287983d4f31b/iframe${!posterVisible ? "?autoplay=true" : ""}`}
            style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          {posterVisible && (
          <div
            onClick={() => setPosterVisible(false)}
            style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              backgroundImage: "url(https://imagedelivery.net/ZUbdF1A6bMNaR2l0OC84jw/0a87b6a7-6fb2-48dc-9e26-aa5c134c0200/public)",
              backgroundSize: "cover", backgroundPosition: "center",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#2563EB">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
          )}
        </div>
        <p className="text-slate-400 text-xs text-center mb-6">A message from Dr. Jonathan</p>

        {/* Encouragement card */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-4 text-center">
          <CheckCircle size={18} className="text-green-500 mx-auto mb-2" />
          <p className="text-green-800 text-sm font-bold mb-1">You've already proven you can stay consistent.</p>
          <p className="text-green-700 text-sm">That's how real recovery begins.</p>
        </div>

      </div>
    </section>
  );
}

// ── Section 6: Your Next Step (Offer) ────────────────────────────────────────

function NextStepSection({ branch }: { branch: string | null }) {
  const isMedium = branch === "medium";
  const checkoutHref = isMedium ? `${CHECKOUT_URL}?offer=save50` : CHECKOUT_URL;
  return (
    <section className="py-10 px-6 bg-white border-t border-slate-100">
      <div className="max-w-lg mx-auto">

        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <ArrowRight size={14} className="text-blue-600" />
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">Your Next Step</p>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-slate-900 leading-tight text-center mb-3">
          Your Next Phase Is Ready.<br />Let's Keep The Momentum Going.
        </h2>

        <p className="text-slate-500 text-sm text-center leading-relaxed mb-6">
          You've built a strong foundation. Your personalized Phase 1 plan is ready.
        </p>

        {isMedium && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-5">
            <p className="text-blue-900 font-bold text-base mb-2">Take 30 More Days to Decide.</p>
            <p className="text-blue-800 text-sm leading-relaxed">
              Seven days isn't long to be sure. So here's $50 off your first month — your next 30 days for just <span className="font-bold">$47</span>, then $97/mo until you recover, cancel anytime with a single click in the app. Use the full month to decide if the Foot Capacity System is right for you, backed by our 30-day money-back guarantee.
            </p>
          </div>
        )}

        {/* Recommendation card */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-start gap-3 mb-5">
          <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 text-xs font-bold uppercase tracking-wide mb-0.5">Recommended For You</p>
            <p className="text-green-900 font-bold text-sm">Phase 1 — Build Foundation</p>
            <p className="text-green-700 text-xs mt-0.5">Continue building strength, stability, and movement quality.</p>
          </div>
        </div>

        {/* Primary CTA */}
      <a  
        href={checkoutHref}
          onClick={() => window.gtag?.("event", "checkout_click", { event_category: "conversion", event_label: `results_offer_cta_${branch ?? "none"}` })}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg text-center py-4 rounded-xl transition-colors shadow-lg mb-4"
        >
          {isMedium ? "Continue 30 days for only $47" : "Continue My Recovery"} &#8594;
        </a>

        {/* Trust row */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: <Shield size={16} className="text-blue-500 mx-auto mb-1" />, label: "30-Day Guarantee" },
            { icon: <Zap size={16} className="text-blue-500 mx-auto mb-1" />, label: "Instant Access" },
            { icon: <Infinity size={16} className="text-blue-500 mx-auto mb-1" />, label: "Lifetime Access" },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              {item.icon}
              <p className="text-slate-600 text-xs font-semibold leading-tight">{item.label}</p>
            </div>
          ))}
        </div>

        {/* User Journey Carousel */}
        <div className="mt-8">
          <p className="text-blue-600 text-[13px] font-semibold uppercase tracking-widest mb-2 text-center">Every Recovery Is Different.</p>
          <UserJourneyCarousel />
        </div>

      </div>
    </section>
  );
}

// ── Section 7: Don't Start Over. Keep Going. ─────────────────────────────────

function FinalCtaSection({ insights, insightsLoading, branch }: { insights: InsightsData; insightsLoading: boolean; branch: string | null }) {
  const checkoutHref = branch === "medium" ? `${CHECKOUT_URL}?offer=save50` : CHECKOUT_URL;
  return (
    <section className="py-12 px-6 bg-slate-50 border-t border-slate-100">
      <div className="max-w-lg mx-auto text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
          <ArrowRight size={24} className="text-blue-600" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">
          Don't Start Over.
        </h2>
        <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">
          Keep Going.
        </h2>
        <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mb-6" />

        {/* Body */}
        <div className="text-slate-500 text-sm leading-loose mb-8 space-y-1">
          {insightsLoading
            ? [1,2,3,4].map((i) => <div key={i} className="bg-slate-200 rounded animate-pulse h-4 w-48 mx-auto mb-1" />)
            : (insights.finalCtoCopy ?? FALLBACK_INSIGHTS.finalCtoCopy).map((line, i) => <p key={i}>{line}</p>)
          }
        </div>

        {/* Success card */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-4 flex items-center gap-3 text-left mb-8">
          <CheckCircle size={20} className="text-green-500 shrink-0" />
          <div>
            <p className="text-green-800 text-sm font-bold">Everything you've completed has been saved.</p>
            <p className="text-green-700 text-xs mt-0.5">Your next progression is ready.</p>
          </div>
        </div>

        {/* Final CTA */}
        <a
          href={checkoutHref}
          onClick={() => window.gtag?.("event", "checkout_click", { event_category: "conversion", event_label: `results_final_cta_${branch ?? "none"}` })}
          className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-5 rounded-xl transition-colors shadow-lg mb-3"
        >
          {branch === "medium" ? "Continue 30 days for only $47" : "Continue My Recovery"} &#8594;
        </a>

        {/* Reassurance row */}
        <p className="text-slate-400 text-xs mb-8">
          Instant access &nbsp;·&nbsp; 30-Day Guarantee &nbsp;·&nbsp; Lifetime Access
        </p>


      </div>
    </section>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

// Slice C: data-quality heroes + free-week offer

const GRANT_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/grant-trial-extension";

// Shown when the user has zero logged days — no progress to report yet, so we
// reframe honestly and route to the free week instead of a hard checkout close.
function NoLogsHeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-600 to-blue-800 pt-10 pb-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          <CheckCircle size={14} />
          Your Trial
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Your Results Start<br />With Your First Log.
        </h1>
        <p className="text-blue-100 text-base leading-relaxed mb-8">
          We don&apos;t have any logged days for you yet, and that&apos;s okay. The Foot Capacity System builds your results from how your foot responds day to day. Log a few days inside the app and your real, personalized progress will show up right here.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// Shown when the user logged days but pain has not improved yet. Validate the
// effort (never fabricate progress) and route to the free week.
function FlatHeroSection({ data }: { data: ResultsData }) {
  return (
    <section className="relative bg-gradient-to-b from-blue-600 to-blue-800 pt-10 pb-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-green-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          <CheckCircle size={14} />
          Recovery Week Complete
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Recovery Isn&apos;t<br />a Straight Line.
        </h1>
        <p className="text-blue-100 text-base leading-relaxed mb-8">
          One week in, the numbers don&apos;t always move yet, and that&apos;s completely normal. What matters most right now is that you showed up and did the work — that consistency is exactly what recovery is built on.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: "📅", value: data.daysLogged, label: "Days Logged" },
            { icon: "👟", value: data.trialSessionsCompleted, label: "Recovery Sessions" },
            { icon: "🔥", value: data.currentStreak, label: "Days Checked In" },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wide leading-tight mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// Gentle-path offer: claim a free extra week. Grant is enforced server-side (one
// per user); an already-extended or non-trial user is routed to the $47 offer.
function FreeWeekSection({ userId, email }: { userId: string | null; email: string | null }) {
  const [claiming, setClaiming] = useState(false);
  const [granted, setGranted] = useState(false);

  async function claim() {
    if (claiming) return;
    setClaiming(true);
    try {
      const res = await fetch(GRANT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, source: "results_freeweek" }),
      });
      const d = await res.json();
      if (d.granted) {
        window.gtag?.("event", "free_week_granted", { event_category: "conversion", event_label: "results_freeweek" });
        setGranted(true);
      } else {
        window.location.href = "/checkout?offer=save50";
      }
    } catch {
      window.location.href = "/checkout?offer=save50";
    }
  }

  if (granted) {
    return (
      <section className="px-6 py-12 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <CheckCircle size={14} />
            Week Added
          </div>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-3">You&apos;ve Got Another Week.</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Done — 7 more days added. Keep logging inside the app, and your results will be waiting when you&apos;re ready.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
          Not Ready to Decide?<br />Take Another Week — Free.
        </h2>
        <p className="text-slate-600 text-base leading-relaxed mb-8">
          You don&apos;t have to decide today. Take 7 more days on us, no charge and no card required. Keep logging, and see how much further your foot can go.
        </p>
        <button
          type="button"
          onClick={claim}
          disabled={claiming}
          className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-lg py-4 rounded-xl transition-colors"
        >
          {claiming ? "Adding your week…" : "Add My Free Week"}
          {!claiming && <ArrowRight size={20} />}
        </button>
      </div>
    </section>
  );
}

function BeforeYouDecideSection() {
  const items = [
    "Progress saved",
    "Next phase ready",
    "Plan adapts with you",
    "30-Day Money-Back Guarantee",
    "HSA/FSA may be available",
  ];
  return (
    <section className="py-10 px-6 bg-white border-t border-slate-100">
      <div className="max-w-lg mx-auto">
        <div className="rounded-2xl border border-slate-200 shadow-sm px-6 py-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Before You Decide</h2>
          </div>
          <p className="text-slate-500 text-sm mb-5">Everything you&apos;ve built is ready for what&apos;s next.</p>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-blue-600 shrink-0" />
                <span className="text-slate-700 text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://fixyourmovement.com/hsa-fsa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-blue-600 hover:underline"
          >
            Learn How HSA/FSA Works &#8594;
          </a>
        </div>
      </div>
    </section>
  );
}

function StillNotSureSection() {
  return (
    <section className="py-10 px-6 bg-white border-t border-slate-100">
      <div className="max-w-lg mx-auto">
        <div className="rounded-2xl border border-slate-200 shadow-sm px-6 py-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">It&apos;s okay if you&apos;re still not sure.</h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-2">
            <p>After my first week, I wasn&apos;t completely sure yet.</p>
            <p>Seven weeks later, my pain has gone from a 5/10 to about a 1/10.</p>
            <p>I finally feel like I&apos;m making real progress instead of just managing the pain.</p>
          </div>
          <p className="text-slate-900 text-sm font-semibold mt-4">— Jana D.</p>
          <p className="text-slate-400 text-xs">Original trial member</p>
        </div>
      </div>
    </section>
  );
}

function MemberReviewsSection() {
  const reviews = [
    {
      name: "Carol-Anne",
      body: "The best strength building course I have ever done for my plantar fasciitis issues. Issues that I have had for 5+ years. I have tried so many things. Some helped a bit but Dr Schutza's strength building programme is outstanding and in a league of its own. I am in weeks 4 and have experienced a massive difference in my feet. Dr Schutza has designed an amazing app with superb exercises. He provides oversight on one's progress allowing one to proceed with confidence. Simply outstanding. If I could give a score of 10 stars I would!",
    },
    {
      name: "Karen",
      body: "Dealing with plantar fasciitis pain since October, seeing a doctor, going to PT, I was fed up. I searched online for exercises and came across Dr. Jonathan's site. I started following his exercise suggestions before the Foot Capacity System because I liked his demeanor. When he presented the system, I admit, I was skeptical; I gave the Trial a chance and was impressed. Along with the progression of exercises, it's the accountability and consistency that are making a big difference. My pain is minimal compared to where I started. Currently in Phase 2 - week 4, and seeing my strength and mobility improve is encouraging. I am impressed with the option to continue with this program, or never really leave, should the pain and limitations return. I feel confident that this is the right approach for me. Thank you so much for this program!",
    },
    {
      name: "Brittany",
      body: "I am so happy that I found Dr Jonathan's program and app! I have been at it 3 weeks and have had so much progress already. I have gone from hobbling around all day everyday for the last 4 months to walking normally with very little pain. I was constantly looking online for exercises and tricks to help my foot feel better - there is so much out there and so much conflicting advice. It wasn't until I started using The Foot Capacity System that I really started getting better. The app is clear and straightforward and adjusts to how my foot feels each day. I do my exercises each day and then move on with my day knowing I've done what I need to so that I keep progressing. I have gained so much confidence and strength already. I know I am going to be able to meet my goal. Thank you Dr. Jonathan!",
    },
  ];
  return (
    <section className="py-10 px-6 bg-white border-t border-slate-100">
      <div className="max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-slate-900 text-center mb-6">What Members Are Saying</h2>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 shadow-sm px-6 py-6">
              <p className="text-slate-900 text-sm font-bold">{r.name}</p>
              <p className="text-amber-400 text-sm tracking-wide mb-3">★★★★★</p>
              <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Results() {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email")?.replace(/ /g, "+") ?? null;
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<InsightsData>(FALLBACK_INSIGHTS);
  const [insightsLoading, setInsightsLoading] = useState(true);

  useEffect(() => {
    if (!userId && !emailParam) { window.location.href = "/walkthrough"; return; }
    const fetchUrl = userId
      ? `${GET_RESULTS_URL}?userId=${userId}`
      : `${GET_RESULTS_URL}?email=${encodeURIComponent(emailParam!)}`;
    fetch(fetchUrl)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          window.location.href = "/walkthrough";
        } else {
          setData(d);
          setLoading(false);
          // Fire insights generation — non-fatal
          fetch(INSIGHTS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              daysLogged: d.daysLogged,
              startingPain: d.startingPain,
              latestPain: d.latestPain,
              painDrop: d.painDrop,
              trialSessionsCompleted: d.trialSessionsCompleted,
              totalReps: d.totalReps,
              currentStreak: d.currentStreak,
              currentPhase: d.currentPhase,
              currentWeek: d.currentWeek,
              painTimeline: d.painTimeline,
            }),
          })
            .then((r) => r.json())
            .then((ins) => {
              if (ins.heroSubhead) setInsights(ins);
            })
            .catch(() => {/* keep fallback */})
            .finally(() => setInsightsLoading(false));
        }
      })
      .catch(() => { window.location.href = "/walkthrough"; });
  }, [userId, emailParam]);

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

  if (!data) return null;

  // Slice C — render by data quality. daysLogged 0 -> nologs; logged but no pain
  // improvement -> flat; otherwise improved.
  const resultsMode =
    data.daysLogged === 0
      ? "nologs"
      : (data.painDrop === null || data.painDrop <= 0)
        ? "flat"
        : "improved";
  // Offer softens monotonically: nologs/flat (any branch) and improved+low get the
  // free week; improved with high/medium/none keeps the existing checkout sections
  // (which already route medium -> $47 internally). Never hardens.
  // Gentle-path users who have NOT yet used their free week get the free-week
  // button; those who already have (hasExtension) fall through to the $47 offer
  // instead of being shown a "free week" they can't actually claim.
  const gentlePath = resultsMode !== "improved" || data.surveyBranch === "low";
  const showFreeWeek = gentlePath && !data.hasExtension;
  const forceSave50 = gentlePath && data.hasExtension;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Header — logo only, no CTA per spec */}
      <header className="border-b border-slate-100 py-4 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FCS" className="h-8 w-auto" />
            <span className="text-slate-900 font-bold text-base leading-tight tracking-tight">The Foot Capacity System</span>
          </div>
        </div>
      </header>

      <main>
        {resultsMode === "improved" && <HeroSection data={data} insights={insights} insightsLoading={insightsLoading} />}
        {resultsMode === "flat" && <FlatHeroSection data={data} />}
        {resultsMode === "nologs" && <NoLogsHeroSection />}
        {resultsMode === "improved" && <ProgressTrendSection data={data} insights={insights} insightsLoading={insightsLoading} />}
        {resultsMode === "improved" && <AccomplishmentsSection data={data} insights={insights} insightsLoading={insightsLoading} />}
        {resultsMode === "improved" && <RoadmapSection data={data} />}
        <DrJonathanSection />
        {showFreeWeek
          ? <FreeWeekSection userId={userId ?? null} email={emailParam} />
          : (
            <>
              <BeforeYouDecideSection />
              <StillNotSureSection />
              <MemberReviewsSection />
              <NextStepSection branch={forceSave50 ? "medium" : data.surveyBranch} />
              <FinalCtaSection insights={insights} insightsLoading={insightsLoading} branch={forceSave50 ? "medium" : data.surveyBranch} />
            </>
          )}
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-100">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">&#169; {new Date().getFullYear()} The Foot Capacity System by Dr. Jonathan Schutza, PT, DPT. All rights reserved.</p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-400 flex-wrap">
            <a href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-slate-600 transition-colors">Refund Policy</a>
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
          <p className="mt-4 text-xs text-slate-300 max-w-lg mx-auto">
            This program is for educational purposes and is not a substitute for personalized medical advice. Consult your healthcare provider before beginning any exercise program.
          </p>
        </div>
      </footer>

    </div>
  );
}