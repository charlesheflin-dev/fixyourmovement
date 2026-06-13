import { useEffect, useState } from "react";

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

const GET_ASSESSMENT_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/get-assessment-results";
const INSTALL_URL = "https://app.fixyourmovement.com/install";

function getFaamBand(score: number): { tag: string; label: string; color: string; bg: string; border: string } {
  if (score >= 80) return { tag: "faam_high", label: "Mild Limitation", color: "#16A34A", bg: "#F0FDF4", border: "#86EFAC" };
  if (score >= 50) return { tag: "faam_moderate", label: "Moderate Limitation", color: "#D97706", bg: "#FFFBEB", border: "#FCD34D" };
  return { tag: "faam_low", label: "Significant Limitation", color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5" };
}

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

const archetypeData: Record<string, {
  name: string;
  clinicalLabel: string;
  drJonathanNote: string;
  prescription: string[];
  faamFraming: (score: number, band: string) => string;
  summary: string;
  whatStandsOut: string;
  whatMayBeGoingOn: string;
  theBiggerIssue: string;
  forYouSpecifically: string;
}> = {
  Archetype_Frustrated_Fix_Seeker: {
    name: "The Frustrated Fix-Seeker",
    clinicalLabel: "Pattern: High effort, low return. Multiple treatment attempts without lasting results.",
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
    summary: "You've put in the effort, but something important may still be getting overlooked.",
    whatStandsOut: "Your results suggest there may be a missing piece connecting everything you've already tried.",
    whatMayBeGoingOn: "You've been addressing symptoms. The underlying pattern may still be there.",
    theBiggerIssue: "The challenge isn't effort. It's having a process that makes sense.",
    forYouSpecifically: "You don't need another technique. You need something you can stick with.",
  },
  Archetype_Active_Person: {
    name: "The Active Person",
    clinicalLabel: "Pattern: High activity demand, load-tolerance deficit. Pain is interfering with performance and identity.",
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
    summary: "You're asking more from your foot than it's currently ready to handle.",
    whatStandsOut: "Your foot may not be the problem. The way it's handling load might be.",
    whatMayBeGoingOn: "You keep pushing forward. Your foot hasn't been keeping pace.",
    theBiggerIssue: "The challenge isn't doing too much. It's knowing when to push and when to pull back.",
    forYouSpecifically: "You don't need to stop doing everything you enjoy. You need a smarter way to keep moving.",
  },
  Archetype_Discouraged_Chronic: {
    name: "The Discouraged Chronic Sufferer",
    clinicalLabel: "Pattern: Long-duration symptoms, eroded confidence, repeated failed attempts.",
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
    summary: "It's become difficult to know what your foot can handle without consequences.",
    whatStandsOut: "Uncertainty may be creating as many limitations as the symptoms themselves.",
    whatMayBeGoingOn: "Every setback creates more hesitation. That cycle can become difficult to break.",
    theBiggerIssue: "The challenge isn't toughness. It's rebuilding confidence in your decisions.",
    forYouSpecifically: "You don't need perfect confidence. You need enough confidence to take the next step.",
  },
  Archetype_Newly_Concerned: {
    name: "The Newly Concerned",
    clinicalLabel: "Pattern: Early-stage symptoms, high awareness, strong prevention opportunity.",
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
    summary: "You're seeing warning signs early enough to make meaningful changes now.",
    whatStandsOut: "Your results suggest you're addressing this before it becomes harder to reverse.",
    whatMayBeGoingOn: "Your symptoms are trying to get your attention. Ignoring them rarely makes things easier.",
    theBiggerIssue: "The challenge isn't today's discomfort. It's where the pattern could lead if ignored.",
    forYouSpecifically: "You don't need to wait for things to get worse. You can start making changes now.",
  },
};

export default function AssessmentResults() {
  const [result, setResult] = useState<{
    archetype: string;
    faam_score: number;
    faam_band: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawEmail = params.get("email");
    if (!rawEmail) { setError(true); setLoading(false); return; }
    const email = rawEmail.replace(/ /g, "+");

    fetch(`${GET_ASSESSMENT_URL}?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(true); }
        else { setResult(d); }
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const archetype = result ? (archetypeData[result.archetype] ?? null) : null;
  const faamScore = result?.faam_score ?? 0;
  const faamBand = getFaamBand(faamScore);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <header className="border-b border-slate-100 py-4 px-6">
        <a href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
          <span className="text-slate-900 font-semibold text-base">The Foot Capacity System</span>
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && (error || !result || !archetype) && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-base mb-4">We couldn't find your assessment results.</p>
            <a href="/lp/take-assessment" className="text-blue-600 text-sm font-medium hover:underline">
              Take the assessment &#8594;
            </a>
          </div>
        )}

        {!loading && result && archetype && (
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

            {/* Install card — mobile only */}
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

            {/* Footer note */}
            <div className="border-t border-slate-100 pt-6 pb-8">
              <p className="text-slate-500 text-sm text-center">
                Your assessment results are saved. You can return to this page anytime using the link in your email.
              </p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}