import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

// ─── Constants ─────────────────────────────────────────────────────────────────
const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";
const SAVE_ASSESSMENT_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/save-assessment";
const CREATE_TRIAL_PROFILE_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/create-trial-profile";
const INSTALL_URL = "https://app.fixyourmovement.com/install";

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

// ─── useIsMobile hook ───────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── QR Code component ──────────────────────────────────────────────────────────
function QRCode({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 inline-block">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}&color=1e3a5f&bgcolor=ffffff&qzone=1`}
          alt="Scan to install the app"
          width={160}
          height={160}
          className="rounded-lg"
        />
      </div>
      <p className="text-slate-500 text-sm text-center">Scan with your phone camera to install the app</p>
      <a href={url} className="text-blue-600 text-xs font-medium hover:underline">
        Or open on your phone: app.fixyourmovement.com/install
      </a>
    </div>
  );
}

// ─── Archetype data ─────────────────────────────────────────────────────────────
const archetypeResults: Record<string, {
  name: string;
  shortName: string;
  clinicalLabel: string;
  description: string;
  drJonathanNote: string;
  prescription: string[];
  faamFraming: (score: number, band: string) => string;
  salesUrl: string;
  summary: string;
  whatStandsOut: string;
  whatMayBeGoingOn: string;
  theBiggerIssue: string;
  forYouSpecifically: string;
}> = {
  Archetype_Frustrated_Fix_Seeker: {
    name: "The Frustrated Fix-Seeker",
    shortName: "Frustrated Fix-Seeker",
    clinicalLabel: "Pattern: High effort, low return. Multiple treatment attempts without lasting results.",
    description: "You've put in the work — and you deserve answers, not more guesswork. Your emails will focus on why so many plantar fasciitis treatments fail, and what a structured approach actually looks like.",
    drJonathanNote: "Your answers tell me something I see often — you've put in real effort, and that effort hasn't been rewarded. That's not a reflection of your commitment. It's a reflection of the treatments you've been given. Stretching, orthotics, rest — these manage symptoms. None of them build the underlying tissue capacity your foot actually needs. That's what's been missing. The system I'm prescribing for you is built around progressive loading — a structured process that tells your tissue, week by week, to rebuild. You don't need to try harder. You need a process that actually works.",
    prescription: [
      "Weeks 1-4 reset the tissue and establish your baseline capacity — the foundation everything else is built on",
      "Weeks 5-8 apply progressive load to rebuild what's been lost — this is where the cycle of setbacks ends",
      "Weeks 9-12 lock in your capacity gains and return you to full activity without managing every step",
    ],
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — your foot is managing, but not without compensation. For someone who has tried multiple treatments, this score reflects exactly what happens when symptoms are managed but underlying capacity is never rebuilt. The goal from here is getting that number higher by building what treatments have been missing.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation — the kind that makes daily life feel like something you have to manage rather than just live. This is where most people end up after months of trying things that address the symptom without building the underlying tissue capacity. A structured process is what changes this number.`;
      return `Your score of ${score}% reflects significant functional limitation. This is the reality behind what you've been experiencing — your foot isn't just in pain, it's genuinely limited in what it can do. After everything you've tried, this score makes sense. It's not a reflection of your effort. It's a reflection of what those approaches were actually building — or not building.`;
    },
    salesUrl: "https://fixyourmovement.com/start/frustrated",
    summary: "You've put in the effort, but something important may still be getting overlooked.",
    whatStandsOut: "Your results suggest there may be a missing piece connecting everything you've already tried.",
    whatMayBeGoingOn: "You've been addressing symptoms. The underlying pattern may still be there.",
    theBiggerIssue: "The challenge isn't effort. It's having a process that makes sense.",
    forYouSpecifically: "You don't need another technique. You need something you can stick with.",
  },
  Archetype_Active_Person: {
    name: "The Active Person",
    shortName: "Active Person",
    clinicalLabel: "Pattern: High activity demand, load-tolerance deficit. Pain is interfering with performance and identity.",
    description: "Staying active matters to you — and recovery doesn't have to mean stopping. Your emails will focus on how to keep moving safely while your foot capacity rebuilds.",
    drJonathanNote: "Your answers tell me that staying active isn't optional for you — it's part of who you are. The standard advice to rest and stay off it doesn't account for people like you. And here's the clinical reality: rest reduces load temporarily, but it doesn't build capacity. So every time you return to activity, you're doing it with the same tissue tolerance you had before — or less. The system I'm prescribing for you keeps you moving while progressively rebuilding your foot's ability to handle load. Recovery and activity are not opposites. We just need to do this in the right order.",
    prescription: [
      "Phase 1 reduces inflammation while maintaining movement — you won't be sidelined, you'll be redirected",
      "Phase 2 progressively reloads the tissue so your foot can handle the demands you're putting on it",
      "Phase 3 returns you to full activity — running, sport, the gym — without the constant flare-up cycle",
    ],
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — which means you're still moving, but not freely. For someone who defines themselves by staying active, even mild limitation has a real cost. The goal isn't just maintaining what you have. It's building enough capacity that activity stops requiring constant management.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation. This is what it looks like when your activity level is bumping up against what your foot can currently handle. The tissue isn't keeping up — and rest isn't the answer. A progressive process that builds load tolerance is what closes the gap between where you are and where you want to be.`;
      return `Your score of ${score}% reflects significant functional limitation. This explains why activity has become so difficult to manage — your foot's capacity is significantly below the demands you're placing on it. The path back to full activity isn't rest. It's structured progressive loading that gradually rebuilds what your foot can handle.`;
    },
    salesUrl: "https://fixyourmovement.com/start/active",
    summary: "You're asking more from your foot than it's currently ready to handle.",
    whatStandsOut: "Your foot may not be the problem. The way it's handling load might be.",
    whatMayBeGoingOn: "You keep pushing forward. Your foot hasn't been keeping pace.",
    theBiggerIssue: "The challenge isn't doing too much. It's knowing when to push and when to pull back.",
    forYouSpecifically: "You don't need to stop doing everything you enjoy. You need a smarter way to keep moving.",
  },
  Archetype_Discouraged_Chronic: {
    name: "The Discouraged Chronic Sufferer",
    shortName: "Discouraged Chronic",
    clinicalLabel: "Pattern: Long-duration symptoms, eroded confidence, repeated failed attempts.",
    description: "You've been dealing with this long enough. Your emails will focus on why chronic pain doesn't mean permanent damage — and why recovery is still very much possible.",
    drJonathanNote: "Your answers tell me you've been carrying this for a long time — and that the weight of it goes beyond your foot. When nothing works for months or years, you stop trusting treatments. You may have started to wonder if your foot will ever feel normal again. I want to be direct with you: duration of pain does not determine outcome. What I consistently find in chronic cases is not permanent damage — it's a long period of symptom management with no real capacity building. The tissue has never been progressively loaded in a way that builds genuine tolerance. That's what this system does. And it's built specifically for patients who've been told everything else.",
    prescription: [
      "Phase 1 is gentler for chronic cases — we rebuild the baseline before we load it, which is what most protocols skip",
      "Phase 2 introduces progressive load in a way your tissue can actually absorb — no flare-up triggers, no guesswork",
      "Phase 3 gives you the functional capacity to trust your foot again — not just manage it",
    ],
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — which is actually meaningful context. Despite how long you've been dealing with this, your foot is still functioning. Chronic pain changes how you move and how you think about your body, but this score tells a different story than permanent damage. There is a path forward.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation. After dealing with this for as long as you have, this number captures exactly what chronic pain does over time — it doesn't just hurt, it erodes function. But moderate limitation is not permanent limitation. Duration of pain does not determine outcome. Consistency with the right process does.`;
      return `Your score of ${score}% reflects significant functional limitation. This number is real — and it reflects what long-standing foot pain actually does to the way you move through life. But significant limitation is not the same as permanent damage. This score is where you're starting, not where you're staying. Recovery is still possible, and this system was built for exactly this situation.`;
    },
    salesUrl: "https://fixyourmovement.com/start/chronic",
    summary: "It's become difficult to know what your foot can handle without consequences.",
    whatStandsOut: "Uncertainty may be creating as many limitations as the symptoms themselves.",
    whatMayBeGoingOn: "Every setback creates more hesitation. That cycle can become difficult to break.",
    theBiggerIssue: "The challenge isn't toughness. It's rebuilding confidence in your decisions.",
    forYouSpecifically: "You don't need perfect confidence. You need enough confidence to take the next step.",
  },
  Archetype_Newly_Concerned: {
    name: "The Newly Concerned",
    shortName: "Newly Concerned",
    clinicalLabel: "Pattern: Early-stage symptoms, high awareness, strong prevention opportunity.",
    description: "You're asking the right questions early. Your emails will focus on what's actually happening with your foot and what to do now — before the cycle that traps most people even begins.",
    drJonathanNote: "Your answers tell me you're catching this early — and that matters more than most people realize. The patients I see with the hardest recoveries are the ones who waited. They tried to rest through it, assumed it would go away, and by the time they took it seriously, the tissue had lost significant capacity. You have a real advantage right now: your foot is telling you something before the damage compounds. What I'm prescribing for you isn't a reaction — it's a structured process that builds the capacity your foot needs before it becomes the kind of chronic problem that takes years to resolve.",
    prescription: [
      "Phase 1 establishes your baseline capacity and gives your tissue the structured load it needs to adapt",
      "Phase 2 builds progressive tolerance so your foot can handle the demands of your life without breaking down",
      "Phase 3 locks in those gains — so what you build actually holds",
    ],
    faamFraming: (score, band) => {
      if (band === "faam_high") return `Your score of ${score}% shows mild functional limitation — which is exactly where you'd expect to be at this stage. Your foot is managing well enough that daily life still works, but the limitation is real. Acting now, while you're still in this range, is what keeps this from becoming a chronic problem. The earlier the right process starts, the better the outcome.`;
      if (band === "faam_moderate") return `Your score of ${score}% reflects moderate functional limitation — more than you might have expected given how early you're catching this. This tells you that what's happening isn't minor, and it deserves a structured response now rather than later. Starting the right process at this point is what prevents this from becoming the kind of long-term problem others spend years trying to resolve.`;
      return `Your score of ${score}% reflects significant functional limitation — which is important information. This isn't a minor ache that will resolve on its own. Your foot is already meaningfully limited, and starting the right process now is what makes the difference between a short recovery and a long one. You're asking the right questions at exactly the right time.`;
    },
    salesUrl: "https://fixyourmovement.com/start/new",
    summary: "You're seeing warning signs early enough to make meaningful changes now.",
    whatStandsOut: "Your results suggest you're addressing this before it becomes harder to reverse.",
    whatMayBeGoingOn: "Your symptoms are trying to get your attention. Ignoring them rarely makes things easier.",
    theBiggerIssue: "The challenge isn't today's discomfort. It's where the pattern could lead if ignored.",
    forYouSpecifically: "You don't need to wait for things to get worse. You can start making changes now.",
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

  const isMobile = useIsMobile();

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
      // Save full assessment data to Supabase — non-fatal
      try {
        await fetch(SAVE_ASSESSMENT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.replace(/ /g, "+"),
            archetype: archetypeKey,
            faam_score: score,
            faam_band: band.tag,
            faam_responses: faamResponses,
            hook_answers: answers,
          }),
        });
      } catch {
        // Non-fatal
      }
      // Create trial profile — non-fatal, must run after save-assessment
      try {
        await fetch(CREATE_TRIAL_PROFILE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.replace(/ /g, "+") }),
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

      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FCS" className="h-8 w-auto" />
            <span className="text-slate-900 font-bold text-base leading-tight tracking-tight">The Foot Capacity System</span>
          </div>
        </div>
      </header>

      {/* Step indicator — hidden on results */}
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
            STEP 3 — RESULTS (5-section rebuild)
        ══════════════════════════════════════════════════ */}
        {step === "results" && archetype && (
          <div className="py-2">

            {/* ── SECTION 1 — ASSESSMENT COMPLETE ─────────────────── */}

            <div className="flex justify-center mb-4" style={{ paddingTop: "24px" }}>
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Assessment Complete
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 text-center leading-tight mb-3">
              {archetype.name}
            </h1>

            <p className="text-slate-500 text-base text-center leading-snug mb-6 max-w-xs mx-auto">
              {archetype.summary}
            </p>

            {/* FAAM score card — supporting role, gauge reduced ~20% */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest text-center mb-4">
                FAAM Score
              </p>
              <div className="flex justify-center mb-4">
                <div className="relative" style={{ width: 128, height: 128 }}>
                  <svg width="128" height="128" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="54"
                      fill="none"
                      stroke={faamBand.color}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={String(2 * Math.PI * 54)}
                      strokeDashoffset={String(2 * Math.PI * 54 - (faamScore / 100) * 2 * Math.PI * 54)}
                      transform="rotate(-90 60 60)"
                      style={{ transition: "stroke-dashoffset 1s ease-out" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold" style={{ color: faamBand.color, lineHeight: 1 }}>{faamScore}</span>
                    <span className="text-xs font-semibold text-slate-400 mt-0.5">/ 100</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div
                  className="px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{ color: faamBand.color, backgroundColor: faamBand.bg, border: `1px solid ${faamBand.border}` }}
                >
                  {faamBand.label}
                </div>
              </div>
              <ScoreBar score={faamScore} />
              <div className="rounded-xl p-4 mt-4" style={{ backgroundColor: faamBand.bg, border: `1px solid ${faamBand.border}` }}>
                <p className="font-semibold text-xs mb-1" style={{ color: faamBand.color }}>What this means for you</p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {archetype.faamFraming(faamScore, faamBand.tag)}
                </p>
              </div>
            </div>

            {/* What Stands Out insight card */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <p className="text-blue-700 text-xs font-bold uppercase tracking-widest">What Stands Out</p>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.whatStandsOut}</p>
            </div>

            {/* ── SECTION 2 — DR. JONATHAN'S ASSESSMENT ────────────── */}

            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-black flex items-center justify-center">2</span>
                Dr. Jonathan's Assessment
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 text-center leading-tight mb-3">
              Why This Keeps Happening
            </h2>
            <p className="text-slate-500 text-sm text-center leading-snug mb-6 max-w-xs mx-auto">
              Your assessment reveals a pattern. Let's look at what it may be showing.
            </p>

            {/* Card 1 — What May Be Going On */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="text-blue-700 text-xs font-bold uppercase tracking-widest">What May Be Going On</p>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.whatMayBeGoingOn}</p>
            </div>

            {/* Card 2 — The Bigger Issue */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="text-blue-700 text-xs font-bold uppercase tracking-widest">The Bigger Issue</p>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.theBiggerIssue}</p>
            </div>

            {/* App visual */}
            <div className="flex justify-center mb-6">
              <img
                src="/images/app-mockup-t2.png"
                alt="Foot Capacity System app"
                className="w-full max-w-sm rounded-2xl shadow-lg"
              />
            </div>

            {/* Why people like the app */}
            <div className="mb-4">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest text-center mb-4">Why People Like The App</p>
              <div className="space-y-2">
                <p className="text-slate-800 text-base font-medium text-center">Know where you stand.</p>
                <p className="text-slate-800 text-base font-medium text-center">Know what to focus on.</p>
                <p className="text-slate-800 text-base font-medium text-center">Know whether you're moving forward.</p>
              </div>
            </div>

            {/* Bottom reassurance */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-8 text-center">
              <p className="text-slate-800 text-base font-semibold leading-snug">Not more information.</p>
              <p className="text-slate-800 text-base font-semibold leading-snug">More direction.</p>
            </div>

            {/* ── SECTION 3 — WHAT HAPPENS NEXT ────────────────────── */}

            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-black flex items-center justify-center">3</span>
                What Happens Next
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 text-center leading-tight mb-3">
              You're Closer Than You Think.
            </h2>
            <p className="text-slate-500 text-sm text-center leading-snug mb-6 max-w-xs mx-auto">
              Most people don't need more advice. They need a way to move forward.
            </p>

            {/* This Week */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-4">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-2">This Week</p>
              <p className="text-slate-800 text-sm font-semibold mb-1">Check in daily.</p>
              <p className="text-slate-700 text-sm">Follow the guidance.</p>
              <p className="text-slate-700 text-sm">Start building momentum.</p>
            </div>

            {/* Over the Next Few Weeks */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-4">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-2">Over The Next Few Weeks</p>
              <p className="text-slate-800 text-sm font-semibold mb-1">Become more consistent.</p>
              <p className="text-slate-700 text-sm">Feel more confident.</p>
              <p className="text-slate-700 text-sm">Learn what works for you.</p>
            </div>

            {/* Over Time */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-4">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-2">Over Time</p>
              <p className="text-slate-800 text-sm font-semibold mb-1">Get back to more of the things you enjoy.</p>
              <p className="text-slate-700 text-sm">With fewer setbacks.</p>
            </div>

            {/* For You Specifically — dynamic */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="text-blue-700 text-xs font-bold uppercase tracking-widest">For You Specifically</p>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.forYouSpecifically}</p>
            </div>

            {/* Bottom reassurance line */}
            <div className="text-center mb-8 pt-2">
              <p className="text-slate-500 text-sm leading-relaxed">Small actions.<br />Repeated consistently.<br />Can create meaningful change.</p>
            </div>

            {/* ── SECTION 4 — DR. JONATHAN VIDEO ───────────────────── */}

            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-black flex items-center justify-center">4</span>
                A Message From Dr. Jonathan
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 text-center leading-tight mb-3">
              Why So Many People Stay Stuck
            </h2>
            <p className="text-slate-500 text-sm text-center leading-snug mb-6 max-w-xs mx-auto">
              Most people aren't missing effort. They're missing direction.
            </p>

            {/* VSL video */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-5" style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                id="vsl-iframe"
                src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/b37100f8162e1ab91cf86c9e284447da/iframe"
                style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <div
                id="vsl-poster"
                onClick={() => {
                  const poster = document.getElementById("vsl-poster");
                  if (poster) poster.style.display = "none";
                }}
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
            </div>

            {/* Trust card */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>
                </div>
                <p className="text-blue-700 text-xs font-bold uppercase tracking-widest">The Idea Behind The System</p>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">Most people are given advice.</p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">Very few are given direction.</p>
              <p className="text-blue-600 text-sm font-semibold leading-relaxed">That's what this system was built to provide.</p>
            </div>

            {/* ── SECTION 5 — START FREE ────────────────────────────── */}

            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-black flex items-center justify-center">5</span>
                Start Free
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 text-center leading-tight mb-3">
              See What Changes In The Next 7 Days
            </h2>
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-slate-600 text-sm font-medium">No credit card.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-slate-600 text-sm font-medium">No commitment.</span>
              </div>
            </div>

            {/* App visual */}
            <div className="flex justify-center mb-5">
              <img
                src="/images/app-mockup-t2.png"
                alt="Foot Capacity System app"
                className="w-full max-w-sm rounded-2xl shadow-lg"
              />
            </div>

            {/* What you're really getting */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-5">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-3">What You're Really Getting</p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">Not another list of exercises.</p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">Not another round of guessing.</p>
              <p className="text-blue-600 text-sm font-semibold leading-relaxed">Daily guidance built around where you are today.</p>
            </div>

            {/* Primary CTA */}
            {isMobile ? (
              <a
                href={INSTALL_URL}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base text-center py-4 rounded-xl transition-colors mb-5"
              >
                START MY FREE 7-DAY TRIAL &#8594;
              </a>
            ) : (
              <div className="mb-5">
                <QRCode url={INSTALL_URL} />
              </div>
            )}

            {/* Install card */}
            {isMobile && (
              <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5 mb-5 text-center">
                <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-3">Install The App</p>
                <a
                  href={INSTALL_URL}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Open on your phone: app.fixyourmovement.com/install &#8594;
                </a>
              </div>
            )}

            {/* Reassurance line */}
            <p className="text-center text-slate-400 text-sm mb-6">
              About 10–15 minutes per day.
            </p>

            {/* Email confirmation */}
            <div className="border-t border-slate-100 pt-6 pb-8">
              <p className="text-slate-500 text-sm text-center">
                Archetype-matched recovery emails are also on their way to your inbox — daily guidance built around your profile.
              </p>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}