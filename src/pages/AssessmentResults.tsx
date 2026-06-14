import { useEffect, useState } from "react";

const GET_ASSESSMENT_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/get-assessment-results";
const INSTALL_URL = "https://app.fixyourmovement.com/install";

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

function getFaamBand(score: number): { tag: string; label: string; color: string; bg: string; border: string } {
  if (score >= 80) return { tag: "faam_high", label: "Mild Limitation", color: "#16A34A", bg: "#F0FDF4", border: "#86EFAC" };
  if (score >= 50) return { tag: "faam_moderate", label: "Moderate Limitation", color: "#D97706", bg: "#FFFBEB", border: "#FCD34D" };
  return { tag: "faam_low", label: "Significant Limitation", color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5" };
}

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
    theBiggerIssue: "The challenge isn't effort. It's having a process that actually builds tissue capacity — not just manages pain.",
    forYouSpecifically: "You don't need another technique. You need a structured process you can actually stick with.",
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
    theBiggerIssue: "The challenge isn't doing too much. It's knowing when to push and when to pull back — and having a system that tells you.",
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
    theBiggerIssue: "The challenge isn't toughness. It's rebuilding enough confidence to take consistent action again.",
    forYouSpecifically: "You don't need perfect confidence. You need enough confidence to take the next step — and a system that makes that step clear.",
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
    theBiggerIssue: "The challenge isn't today's discomfort. It's where this pattern could lead if it doesn't get the right response now.",
    forYouSpecifically: "You don't need to wait for things to get worse. You have an opportunity right now that most people wish they had taken earlier.",
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
  const [posterVisible, setPosterVisible] = useState(true);

  const isMobile = useIsMobile();

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

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <header className="border-b border-slate-100 py-4 px-6">
        <a href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
          <span className="text-slate-900 font-semibold text-base">The Foot Capacity System</span>
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">

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
          <div className="py-4">

            {/* Dr. Jonathan header */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/dr-jonathan-schutza-headshot.png"
                alt="Dr. Jonathan Schutza, PT, DPT"
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm shrink-0"
              />
              <div>
                <p className="text-slate-900 font-semibold text-sm">Dr. Jonathan Schutza, PT, DPT</p>
                <p className="text-slate-400 text-xs">Your Assessment Results</p>
              </div>
            </div>

            {/* Archetype label */}
            <div className="mb-6">
              <p className="text-blue-600 text-[13px] font-semibold uppercase tracking-widest mb-1">Your Recovery Profile</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{archetype.name}</h2>
              <p className="text-slate-500 text-sm leading-relaxed italic">{archetype.clinicalLabel}</p>
            </div>

            {/* FAAM Score card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 mb-6">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest text-center mb-6">
                Foot and Ankle Ability Measure (FAAM)
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

            {/* What Stands Out — name the problem */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 px-5 py-5 mb-4">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-2">What Stands Out</p>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.whatStandsOut}</p>
            </div>

            {/* Dr. Jonathan note */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-5 mb-4">
              <p className="text-slate-700 text-sm leading-relaxed">"{archetype.drJonathanNote}"</p>
            </div>

            {/* What May Be Going On — agitate */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 px-5 py-5 mb-4">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-2">What May Be Going On</p>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.whatMayBeGoingOn}</p>
            </div>

            {/* The Bigger Issue — deepen */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 px-5 py-5 mb-6">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-2">The Bigger Issue</p>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.theBiggerIssue}</p>
            </div>

            {/* Prescription — solution reveal */}
            <div className="bg-white rounded-xl border border-blue-100 px-5 py-5 mb-6">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">Your Prescribed Protocol</p>
              <div className="space-y-3">
                {archetype.prescription.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* For You Specifically — personalized bridge */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 px-5 py-5 mb-6">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-2">For You Specifically</p>
              <p className="text-slate-700 text-sm leading-relaxed">{archetype.forYouSpecifically}</p>
            </div>

            {/* Log every day callout */}
            <div className="bg-green-50 rounded-xl border border-green-200 px-5 py-5 mb-6">
              <p className="text-green-800 text-sm font-bold mb-2">The one thing that makes this work for you specifically.</p>
              <p className="text-green-700 text-sm leading-relaxed">
                A few minutes of exercises. Thirty seconds of logging your pain score after. That's the whole ask. When you log daily, the app sees where you are and surfaces the exact exercises right for your current situation — not a generic protocol, your protocol. Patients who log every day see measurable pain reduction in their first week. That's not a coincidence. It's the mechanism.
              </p>
            </div>

            {/* VSL video */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6" style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                id="vsl-iframe"
                src={`https://customer-hene8ngxxo3eajlj.cloudflarestream.com/28ca18dffae027045f0b7e95c357abfb/iframe${!posterVisible ? "?autoplay=true" : ""}`}
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

            {/* Summary — reduce anxiety before CTA */}
            <p className="text-slate-500 text-sm text-center leading-relaxed italic mb-6">{archetype.summary}</p>

            {/* Guarantee block */}
            <div className="bg-blue-600 rounded-xl px-5 py-5 mb-6">
              <p className="text-white text-sm font-bold mb-2">We're confident enough to let you go first.</p>
              <p className="text-blue-100 text-sm leading-relaxed mb-3">
                Download the full app. Follow your prescribed protocol for 7 days. Log daily. If your pain doesn't go down, you don't pay — ever. No card required to start. No commitment beyond showing up.
              </p>
              <p className="text-blue-200 text-xs leading-relaxed">
                After your free trial, you can continue with the full Foot Capacity System for $397 one-time or 3 monthly payments of $157. No surprises. You'll see your options clearly inside the app before anything is charged. Compare this to the cost of traditional in-person physical therapy sessions. If at-home, self-paced care is not right for you, you don't pay.
              </p>
            </div>

            {/* Primary CTA */}
            {isMobile ? (
              <a
                href={INSTALL_URL}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base text-center py-4 rounded-xl transition-colors mb-3"
              >
                Start Your Free 7-Day Trial &#8594;
              </a>
            ) : (
              <div className="mb-3 flex flex-col items-center gap-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(INSTALL_URL)}`}
                  alt="QR code to install the app"
                  className="w-36 h-36 rounded-xl border border-blue-200 shadow-sm"
                />
                <p className="text-slate-500 text-xs">Scan with your phone to install the app</p>
              </div>
            )}

            <p className="text-center text-slate-400 text-sm mb-8">
              No credit card. No commitment. Log daily and watch what happens.
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