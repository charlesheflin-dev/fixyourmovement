import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

// ─── Constants ─────────────────────────────────────────────────────────────────
const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";

// ─── Types ──────────────────────────────────────────────────────────────────────
type Q2Value = "stretching" | "shoes_orthotics" | "rest" | "physical_therapy" | "injections" | "nothing";

interface Answers {
  q1: string;
  q2: Q2Value[];
  q3: string;
  q4: string;
  q5: string;
}

type Step = "hook" | "profile" | "faam" | "results";

// ─── FAAM Questions (21 — ADL subscale, verbatim from clinical instrument) ─────
const FAAM_QUESTIONS: { id: string; text: string }[] = [
  { id: "q1", text: "Standing for more than 2 minutes" },
  { id: "q2", text: "Standing on hard surfaces" },
  { id: "q3", text: "Walking on uneven ground" },
  { id: "q4", text: "Walking down stairs" },
  { id: "q5", text: "Going up stairs" },
  { id: "q6", text: "Walking on level ground" },
  { id: "q7", text: "Stepping up and down curbs" },
  { id: "q8", text: "Squatting" },
  { id: "q9", text: "Coming up on your toes" },
  { id: "q10", text: "Walking initially (first few steps)" },
  { id: "q11", text: "Walking 5 or less minutes" },
  { id: "q12", text: "Walking approximately 10 minutes" },
  { id: "q13", text: "Walking 15 minutes or greater" },
  { id: "q14", text: "Home responsibilities" },
  { id: "q15", text: "Activities of daily living" },
  { id: "q16", text: "Personal care" },
  { id: "q17", text: "Light to moderate work (standing, walking)" },
  { id: "q18", text: "Heavy work (pushing, pulling, climbing, carrying)" },
  { id: "q19", text: "Recreational activities" },
  { id: "q20", text: "Rolling over in bed" },
  { id: "q21", text: "Performing usual leisure or recreational activities" },
];

// FAAM scale colors: displayVal 0=blue(easy), 1=teal, 2=yellow, 3=orange, 4=red(hard)
const SCALE_COLORS = ["#2563EB", "#0D9488", "#D97706", "#EA580C", "#DC2626"];
const QUESTIONS_PER_PAGE = 7;

// ─── Scoring helpers ────────────────────────────────────────────────────────────
function calculateFaamScore(responses: Record<string, number>): number {
  const sum = FAAM_QUESTIONS.reduce((acc, q) => acc + (responses[q.id] ?? 0), 0);
  return Math.round((sum / 84) * 100);
}

function getFaamBand(score: number): { tag: string; label: string; color: string; bg: string; border: string } {
  if (score >= 80) return { tag: "faam_high", label: "Mild Limitation", color: "#16A34A", bg: "#F0FDF4", border: "#86EFAC" };
  if (score >= 50) return { tag: "faam_moderate", label: "Moderate Limitation", color: "#D97706", bg: "#FFFBEB", border: "#FCD34D" };
  return { tag: "faam_low", label: "Significant Limitation", color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5" };
}

// ─── Archetype data ─────────────────────────────────────────────────────────────
const archetypeResults: Record<string, {
  name: string;
  shortName: string;
  description: string;
  faamFraming: (score: number, band: string) => string;
  salesUrl: string;
}> = {
  Archetype_Frustrated_Fix_Seeker: {
    name: "The Frustrated Fix-Seeker",
    shortName: "Frustrated Fix-Seeker",
    description: "You've put in the work — and you deserve answers, not more guesswork. Your emails will focus on why so many plantar fasciitis treatments fail, and what a structured approach actually looks like.",
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — your foot is managing, but not without compensation. For someone who has tried multiple treatments, this score reflects exactly what happens when symptoms are managed but underlying capacity is never rebuilt. The goal from here is getting that number higher by building what treatments have been missing.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation — the kind that makes daily life feel like something you have to manage rather than just live. This is where most people end up after months of trying things that address the symptom without building the underlying tissue capacity. A structured process is what changes this number.`;
      return `Your score of ${score}% reflects significant functional limitation. This is the reality behind what you've been experiencing — your foot isn't just in pain, it's genuinely limited in what it can do. After everything you've tried, this score makes sense. It's not a reflection of your effort. It's a reflection of what those approaches were actually building — or not building.`;
    },
    salesUrl: "https://fixyourmovement.com/start/frustrated",
  },
  Archetype_Active_Person: {
    name: "The Active Person",
    shortName: "Active Person",
    description: "Staying active matters to you — and recovery doesn't have to mean stopping. Your emails will focus on how to keep moving safely while your foot capacity rebuilds.",
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — which means you're still moving, but not freely. For someone who defines themselves by staying active, even mild limitation has a real cost. The goal isn't just maintaining what you have. It's building enough capacity that activity stops requiring constant management.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation. This is what it looks like when your activity level is bumping up against what your foot can currently handle. The tissue isn't keeping up — and rest isn't the answer. A progressive process that builds load tolerance is what closes the gap between where you are and where you want to be.`;
      return `Your score of ${score}% reflects significant functional limitation. This explains why activity has become so difficult to manage — your foot's capacity is significantly below the demands you're placing on it. The path back to full activity isn't rest. It's structured progressive loading that gradually rebuilds what your foot can handle.`;
    },
    salesUrl: "https://fixyourmovement.com/start/active",
  },
  Archetype_Discouraged_Chronic: {
    name: "The Discouraged Chronic Sufferer",
    shortName: "Discouraged Chronic",
    description: "You've been dealing with this long enough. Your emails will focus on why chronic pain doesn't mean permanent damage — and why recovery is still very much possible.",
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — which is actually meaningful context. Despite how long you've been dealing with this, your foot is still functioning. Chronic pain changes how you move and how you think about your body, but this score tells a different story than permanent damage. There is a path forward.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation. After dealing with this for as long as you have, this number captures exactly what chronic pain does over time — it doesn't just hurt, it erodes function. But moderate limitation is not permanent limitation. Duration of pain does not determine outcome. Consistency with the right process does.`;
      return `Your score of ${score}% reflects significant functional limitation. This number is real — and it reflects what long-standing foot pain actually does to the way you move through life. But significant limitation is not the same as permanent damage. This score is where you're starting, not where you're staying. Recovery is still possible, and this system was built for exactly this situation.`;
    },
    salesUrl: "https://fixyourmovement.com/start/chronic",
  },
  Archetype_Newly_Concerned: {
    name: "The Newly Concerned",
    shortName: "Newly Concerned",
    description: "You're asking the right questions early. Your emails will focus on what's actually happening with your foot and what to do now — before the cycle that traps most people even begins.",
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — which is exactly where you'd expect to be at this stage. Your foot is managing well enough that daily life still works, but the limitation is real. Acting now, while you're still in this range, is what keeps this from becoming a chronic problem. The earlier the right process starts, the better the outcome.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation — more than you might have expected given how early you're catching this. This tells you that what's happening isn't minor, and it deserves a structured response now rather than later. Starting the right process at this point is what prevents this from becoming the kind of long-term problem others spend years trying to resolve.`;
      return `Your score of ${score}% reflects significant functional limitation — which is important information. This isn't a minor ache that will resolve on its own. Your foot is already meaningfully limited, and starting the right process now is what makes the difference between a short recovery and a long one. You're asking the right questions at exactly the right time.`;
    },
    salesUrl: "https://fixyourmovement.com/start/new",
  },
};

// ─── Reusable question option components ────────────────────────────────────────
function RadioGroup({
  options,
  selected,
  onChange,
}: {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full text-left px-4 py-3 rounded-lg border text-sm leading-snug transition-colors ${selected === opt.value
            ? "border-blue-600 bg-blue-50 text-blue-900 font-medium"
            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: { label: string; value: Q2Value }[];
  selected: Q2Value[];
  onChange: (v: Q2Value) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full text-left px-4 py-3 rounded-lg border text-sm leading-snug transition-colors ${selected.includes(opt.value)
            ? "border-blue-600 bg-blue-50 text-blue-900 font-medium"
            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
            }`}
        >
          <span
            className={`inline-block w-4 h-4 mr-3 rounded border align-middle mb-0.5 transition-colors ${selected.includes(opt.value) ? "bg-blue-600 border-blue-600" : "border-slate-400"
              }`}
          />
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── FAAM Score Gauge ───────────────────────────────────────────────────────────
function FaamGauge({ score }: { score: number }) {
  const band = getFaamBand(score);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 160, height: 160 }}>
        <svg width="160" height="160" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={band.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: band.color, lineHeight: 1 }}>{score}</span>
          <span className="text-xs font-semibold text-slate-500 mt-0.5">/ 100</span>
        </div>
      </div>
      <div
        className="mt-3 px-4 py-1.5 rounded-full text-sm font-semibold"
        style={{ color: band.color, backgroundColor: band.bg, border: `1px solid ${band.border}` }}
      >
        {band.label}
      </div>
    </div>
  );
}

// ─── Score bar ──────────────────────────────────────────────────────────────────
function ScoreBar({ score }: { score: number }) {
  const band = getFaamBand(score);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
        <span>0%</span>
        <span>50%</span>
        <span>80%</span>
        <span>100%</span>
      </div>
      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-red-100" />
        <div className="absolute top-0 bottom-0" style={{ left: "50%", width: "30%", backgroundColor: "#FEF3C7" }} />
        <div className="absolute top-0 bottom-0" style={{ left: "80%", right: 0, backgroundColor: "#DCFCE7" }} />
        <div
          className="absolute top-0 left-0 bottom-0 rounded-full transition-all duration-1000"
          style={{ width: `${score}%`, backgroundColor: band.color }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1.5">
        <span className="text-red-500 font-medium">Significant</span>
        <span className="text-amber-500 font-medium">Moderate</span>
        <span className="text-green-500 font-medium">Mild</span>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function Assessment() {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<Step>("hook");

  const [answers, setAnswers] = useState<Answers>({ q1: "", q2: [], q3: "", q4: "", q5: "" });
  const [hookLoading, setHookLoading] = useState(false);
  const [hookError, setHookError] = useState<string>("");
  const [archetypeKey, setArchetypeKey] = useState<string>("");

  const [faamPage, setFaamPage] = useState(0);
  const [faamResponses, setFaamResponses] = useState<Record<string, number>>({});
  const [faamLoading, setFaamLoading] = useState(false);
  const [faamError, setFaamError] = useState<string>("");

  const [faamScore, setFaamScore] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      const decoded = decodeURIComponent(emailParam);
      setEmail(decoded);
      document.cookie = `fcs_email=${encodeURIComponent(decoded)}; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/; SameSite=Lax`;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, faamPage]);

  const hookAllAnswered = answers.q1 !== "" && answers.q3 !== "" && answers.q4 !== "" && answers.q5 !== "";

  const handleQ2Toggle = (value: Q2Value) => {
    setAnswers((prev) => ({
      ...prev,
      q2: prev.q2.includes(value) ? prev.q2.filter((v) => v !== value) : [...prev.q2, value],
    }));
  };

  const handleHookSubmit = async () => {
    if (!hookAllAnswered) return;
    setHookLoading(true);
    setHookError("");
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.replace(/ /g, "+"), answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setArchetypeKey(data.archetype as string);
      setStep("profile");
    } catch (err: unknown) {
      setHookError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setHookLoading(false);
    }
  };

  const pageQuestions = FAAM_QUESTIONS.slice(faamPage * QUESTIONS_PER_PAGE, (faamPage + 1) * QUESTIONS_PER_PAGE);
  const startIdx = faamPage * QUESTIONS_PER_PAGE;
  const isLastPage = faamPage === 2;
  const pageAnswered = pageQuestions.every((q) => faamResponses[q.id] !== undefined);
  const totalAnswered = Object.keys(faamResponses).length;

  const handleFaamSubmit = async () => {
    if (!pageAnswered) return;
    setFaamLoading(true);
    setFaamError("");
    try {
      const score = calculateFaamScore(faamResponses);
      setFaamScore(score);
      const band = getFaamBand(score);
      try {
        await fetch(WORKER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.replace(/ /g, "+"),
            faam_tag: band.tag,
            faam_score: score,
          }),
        });
      } catch {
        // Non-fatal
      }
      setStep("results");
    } catch (err: unknown) {
      setFaamError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setFaamLoading(false);
    }
  };

  const archetype = archetypeResults[archetypeKey] ?? null;
  const faamBand = getFaamBand(faamScore);

  const q1Options = [
    { label: "A few weeks", value: "few_weeks" },
    { label: "A few months", value: "few_months" },
    { label: "More than 6 months", value: "more_than_6_months" },
    { label: "More than a year", value: "more_than_1_year" },
  ];
  const q2Options: { label: string; value: Q2Value }[] = [
    { label: "Stretching or foam rolling", value: "stretching" },
    { label: "New shoes or orthotics", value: "shoes_orthotics" },
    { label: "Rest", value: "rest" },
    { label: "Physical therapy", value: "physical_therapy" },
    { label: "Cortisone injections", value: "injections" },
    { label: "Nothing yet — I'm just starting to figure this out", value: "nothing" },
  ];
  const q3Options = [
    { label: "Staying active — running, the gym, sport, hiking", value: "staying_active" },
    { label: "Getting through a normal work day", value: "work_day" },
    { label: "Basic daily activities like walking, standing, or traveling", value: "daily_activities" },
    { label: "Everything — it's starting to affect my confidence in my body", value: "everything_confidence" },
    { label: "Honestly I'm not sure yet — it's still early and I'm trying to understand what's going on", value: "not_sure_yet" },
  ];
  const q4Options = [
    { label: "I've already tried so much — I'm not sure anything will actually work", value: "tried_so_much" },
    { label: "I just need to know whether I can keep being active while I recover", value: "keep_active" },
    { label: "I'm starting to wonder if my foot will ever feel normal again", value: "wondering_if_normal" },
    { label: "I'm new to this and still figuring out what's going on and what to do next", value: "new_to_this" },
  ];
  const q5Options = [
    { label: "Getting back to running, sport, or the gym without constantly worrying", value: "back_to_sport" },
    { label: "Being able to work and get through the day without pain taking over", value: "work_pain_free" },
    { label: "Walking, traveling, or playing with my family without thinking about my feet", value: "family_activities" },
    { label: "Just feeling like I can trust my body again", value: "trust_body" },
    { label: "Understanding what's happening and getting ahead of it before it becomes a bigger problem", value: "get_ahead" },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Header — updated with logo */}
      <header className="border-b border-slate-100 py-4 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FCS" className="h-8 w-auto" />
            <span className="text-slate-900 font-bold text-base leading-tight tracking-tight">The Foot Capacity System</span>
          </div>
        </div>
      </header>

      {/* Step indicator */}
      {step !== "results" && (
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-blue-600 text-white">
                {step === "hook" ? "1" : "✓"}
              </div>
              <span className={`text-sm font-medium ${step === "hook" ? "text-slate-900" : "text-blue-600"}`}>
                Recovery Assessment
              </span>
            </div>
            <div className="flex-1 h-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === "faam" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                2
              </div>
              <span className={`text-sm font-medium ${step === "faam" ? "text-slate-900" : "text-slate-400"}`}>
                Functional Assessment
              </span>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-6 py-12">

        {/* ══════════════════════════════════════════════════
            STEP 1 — HOOK QUESTIONS
        ══════════════════════════════════════════════════ */}
        {step === "hook" && (
          <>
            <div className="mb-10">
              <p className="text-blue-600 text-sm font-medium uppercase tracking-wide mb-4">Step 1 of 2</p>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-5">
                Tell Us About Your Situation
              </h1>
              <p className="text-slate-600 text-base leading-relaxed mb-3">
                Answer five quick questions about your symptoms and recovery history. We'll use your responses to better understand your situation before moving into the functional assessment.
              </p>
              <p className="text-slate-400 text-sm">⏱ Takes approximately 3 minutes</p>
            </div>

            {/* Q1 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-4">
                1. How long have you been dealing with foot or heel pain?
              </p>
              <RadioGroup options={q1Options} selected={answers.q1} onChange={(v) => setAnswers((p) => ({ ...p, q1: v }))} />
            </div>

            {/* Q2 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-1">2. What have you already tried?</p>
              <p className="text-slate-500 text-sm mb-4">Select all that apply.</p>
              <CheckboxGroup options={q2Options} selected={answers.q2} onChange={handleQ2Toggle} />
            </div>

            {/* Q3 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-4">3. What does foot pain most get in the way of for you?</p>
              <RadioGroup options={q3Options} selected={answers.q3} onChange={(v) => setAnswers((p) => ({ ...p, q3: v }))} />
            </div>

            {/* Q4 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-4">4. When you think about recovery, what feels most true right now?</p>
              <RadioGroup options={q4Options} selected={answers.q4} onChange={(v) => setAnswers((p) => ({ ...p, q4: v }))} />
            </div>

            {/* Q5 */}
            <div className="mb-10">
              <p className="text-slate-900 font-semibold text-base mb-4">5. What would a successful recovery look like for you?</p>
              <RadioGroup options={q5Options} selected={answers.q5} onChange={(v) => setAnswers((p) => ({ ...p, q5: v }))} />
            </div>

            {hookError && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {hookError}
              </p>
            )}

            <button
              type="button"
              onClick={handleHookSubmit}
              disabled={!hookAllAnswered || hookLoading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-base py-4 rounded-lg transition-colors"
            >
              {hookLoading ? "Saving your profile…" : "Continue to Functional Assessment →"}
            </button>

            {!hookAllAnswered && (
              <p className="text-center text-slate-400 text-sm mt-3">
                Please answer questions 1, 3, 4, and 5 to continue.
              </p>
            )}
          </>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 1b — RECOVERY PROFILE INTERSTITIAL
        ══════════════════════════════════════════════════ */}
        {step === "profile" && (() => {
          const profileContent: Record<string, { headline: string; label: string; body: string[] }> = {
            Archetype_Frustrated_Fix_Seeker: {
              label: "Recovery Profile #1",
              headline: "Feeling Like Nothing Has Worked",
              body: [
                "Based on your answers, it sounds like you've been dealing with this for a while.",
                "You've probably tried a lot already. Different treatments. Different exercises. Different advice. Maybe some things helped for a bit, but nothing seemed to stick.",
                "If that sounds familiar, you're not alone.",
                "One thing I've learned is that most people in this situation aren't lacking effort. They're often missing a clear plan and a way to understand what their foot can handle right now.",
                "Before we talk about what comes next, let's get a better picture of where you're starting from.",
              ],
            },
            Archetype_Active_Person: {
              label: "Recovery Profile #2",
              headline: "Staying Active While Recovering",
              body: [
                "Based on your answers, it sounds like your biggest concern is staying active.",
                "You enjoy moving. Whether that's running, the gym, hiking, sports, or just keeping up with life, you don't want recovery to mean sitting on the sidelines.",
                "That's completely understandable.",
                "The good news is that recovery and activity don't always have to be opposites.",
                "A big part of recovery is learning what your foot can tolerate right now and building from there.",
                "Let's take a look at where you're starting today.",
              ],
            },
            Archetype_Discouraged_Chronic: {
              label: "Recovery Profile #3",
              headline: "Learning To Trust Your Body Again",
              body: [
                "Based on your answers, it sounds like this has been affecting more than just your foot.",
                "You may be wondering if things will ever feel normal again. Maybe you've started questioning what your body can handle or whether you're making the right decisions.",
                "Those feelings are more common than you think.",
                "Many people who recover go through a period where they feel stuck, frustrated, or unsure of what to do next.",
                "Recovery isn't always about finding the perfect treatment. Sometimes it's about rebuilding confidence and learning to trust your body again.",
                "Let's start by seeing where things stand today.",
              ],
            },
            Archetype_Newly_Concerned: {
              label: "Recovery Profile #4",
              headline: "Getting Ahead Of the Problem Early",
              body: [
                "Based on your answers, it sounds like you're still trying to figure out what's going on.",
                "That's actually a great place to be.",
                "Many people wait until things become much more painful or disruptive before they start looking for answers.",
                "The fact that you're paying attention now gives you an opportunity to get ahead of it.",
                "The goal isn't to panic. The goal is to understand what's happening and make smart decisions moving forward.",
                "Let's get a clearer picture of where things stand today.",
              ],
            },
          };

          const profile = profileContent[archetypeKey] ?? profileContent["Archetype_Frustrated_Fix_Seeker"];

          return (
            <div className="max-w-xl mx-auto">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-2">{profile.label}</p>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-8">{profile.headline}</h1>
              <div className="space-y-5 mb-10">
                {profile.body.map((para, i) => (
                  <p key={i} className="text-slate-700 text-base leading-relaxed">{para}</p>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-8">
                <button
                  type="button"
                  onClick={() => setStep("faam")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-lg transition-colors mb-4"
                >
                  Continue To Your Foot Capacity Assessment →
                </button>
                <p className="text-center text-slate-500 text-sm leading-relaxed">
                  The next assessment takes about 2 to 3 minutes and helps establish your starting point. Your results will help personalize the guidance you receive moving forward.
                </p>
              </div>
            </div>
          );
        })()}

        {/* ══════════════════════════════════════════════════
            STEP 2 — FAAM QUESTIONNAIRE
        ══════════════════════════════════════════════════ */}
        {step === "faam" && (
          <>
            <div className="mb-8">
              <p className="text-blue-600 text-sm font-medium uppercase tracking-wide mb-2">Step 2 of 2 — Functional Assessment</p>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
                How is your foot functioning right now?
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                Rate how much difficulty you have with each activity today. This gives you a real, measurable baseline — the Foot and Ankle Ability Measure used by physical therapists worldwide.
              </p>
            </div>

            {/* Difficulty scale legend */}
            <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-200">
              <p className="text-xs font-bold text-slate-500 text-center mb-3 uppercase tracking-wider">Difficulty Scale</p>
              <div className="flex justify-center gap-3 mb-2">
                {[0, 1, 2, 3, 4].map((val) => (
                  <div
                    key={val}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ border: `2px solid ${SCALE_COLORS[val]}`, color: SCALE_COLORS[val] }}
                  >
                    {val}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>No difficulty</span>
                <span>Unable to do</span>
              </div>
            </div>

            {/* Page progress indicator */}
            <div className="flex items-center justify-center gap-0 mb-2">
              {[0, 1, 2].map((p) => (
                <div key={p} className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: p <= faamPage ? "#2563EB" : "#E2E8F0",
                      color: p <= faamPage ? "white" : "#94A3B8",
                      border: `2px solid ${p <= faamPage ? "#2563EB" : "#E2E8F0"}`,
                    }}
                  >
                    {p < faamPage ? "✓" : p + 1}
                  </div>
                  {p < 2 && (
                    <div className="h-0.5 w-12" style={{ background: p < faamPage ? "#2563EB" : "#E2E8F0" }} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-blue-600 text-sm font-bold text-center mb-1">Page {faamPage + 1} of 3</p>
            <p className="text-slate-400 text-xs text-center mb-8">
              Questions {startIdx + 1}–{startIdx + pageQuestions.length} of 21
            </p>

            {/* Questions */}
            <div className="space-y-4 mb-6">
              {pageQuestions.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-slate-900 font-semibold text-sm mb-4 leading-snug">
                    <span className="text-blue-600">{startIdx + idx + 1}.</span> {q.text}
                  </p>
                  <div className="flex gap-2 justify-between">
                    {[0, 1, 2, 3, 4].map((displayVal) => {
                      const storedVal = 4 - displayVal;
                      const isSelected = faamResponses[q.id] === storedVal;
                      return (
                        <button
                          key={displayVal}
                          type="button"
                          onClick={() => setFaamResponses((prev) => ({ ...prev, [q.id]: storedVal }))}
                          className="flex-1 h-11 rounded-full font-bold text-sm transition-all"
                          style={{
                            border: `2px solid ${SCALE_COLORS[displayVal]}`,
                            background: isSelected ? SCALE_COLORS[displayVal] : "white",
                            color: isSelected ? "white" : SCALE_COLORS[displayVal],
                          }}
                        >
                          {displayVal}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {isLastPage && totalAnswered === 21 && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
                <div>
                  <p className="text-green-800 font-semibold text-sm">All 21 questions answered.</p>
                  <p className="text-green-700 text-xs">Tap below to see your results.</p>
                </div>
              </div>
            )}

            {faamError && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{faamError}</p>
            )}

            <div className="flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4">
              <p className="text-xs text-slate-500">
                Answered<br />
                <strong className="text-sm text-slate-900">{totalAnswered} of 21</strong>
              </p>
              <button
                type="button"
                onClick={() => { if (isLastPage) { handleFaamSubmit(); } else { setFaamPage((p) => p + 1); } }}
                disabled={faamLoading || !pageAnswered}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                {faamLoading ? "Calculating…" : isLastPage ? "See My Results →" : "Next →"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => { if (faamPage === 0) { setStep("hook"); } else { setFaamPage((p) => p - 1); } }}
              disabled={faamLoading}
              className="w-full text-slate-500 hover:text-slate-700 text-sm py-2 transition-colors"
            >
              ← Back
            </button>

            <p className="text-center text-slate-400 text-xs mt-4">
              🔒 Your responses are private and secure.
            </p>
          </>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 3 — RESULTS
        ══════════════════════════════════════════════════ */}
        {step === "results" && archetype && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-5">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-2">Your Assessment Results</p>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">{archetype.name}</h1>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 mb-6">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest text-center mb-6">
                Foot & Ankle Ability Measure (FAAM)
              </p>
              <div className="flex justify-center mb-6">
                <FaamGauge score={faamScore} />
              </div>
              <div className="mb-6">
                <ScoreBar score={faamScore} />
              </div>
              <div className="rounded-xl p-5" style={{ backgroundColor: faamBand.bg, border: `1px solid ${faamBand.border}` }}>
                <p className="font-semibold text-sm mb-1" style={{ color: faamBand.color }}>What this means for you</p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {archetype.faamFraming(faamScore, faamBand.tag)}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-6">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">Your Recovery Profile</p>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{archetype.name}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{archetype.description}</p>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-100 px-5 py-4 mb-8 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-900 font-semibold text-sm">Your results are on their way.</p>
                <p className="text-blue-700 text-xs leading-relaxed mt-0.5">
                  We've sent a full copy of your FAAM results and recovery profile to your inbox. Check for an email from Dr. Jonathan Schutza.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
              <p className="text-slate-900 font-bold text-lg mb-2">Ready to start changing this score?</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                The Foot Capacity System is a structured 12-week home recovery program designed to rebuild foot strength and break the cycle of plantar fasciitis — built specifically for people in your situation.
              </p>
              <a
                href={archetype.salesUrl}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-xl text-center transition-colors"
              >
                See How The Full System Works →
              </a>
              <div className="flex justify-center gap-5 mt-4 text-xs text-slate-400">
                <span>🛡️ 30-Day Guarantee</span>
                <span>🔒 Secure Checkout</span>
                <span>♾️ Lifetime Access</span>
              </div>
            </div>

            <div className="text-center">
              <a href="/" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">
                Return to fixyourmovement.com
              </a>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}