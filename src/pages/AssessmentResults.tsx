import { useEffect, useState } from "react";

const GET_ASSESSMENT_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/get-assessment-results";
const INSTALL_URL = "https://app.fixyourmovement.com/install";

const archetypeResults: Record<string, {
  name: string;
  clinicalLabel: string;
  drJonathanNote: string;
  prescription: string[];
}> = {
  Archetype_Frustrated_Fix_Seeker: {
    name: "The Frustrated Fix-Seeker",
    clinicalLabel: "Pattern: High effort, low return. Multiple treatment attempts without lasting results.",
    drJonathanNote: "Your answers tell me something I see often — you've put in real effort, and that effort hasn't been rewarded. That's not a reflection of your commitment. It's a reflection of the treatments you've been given. Stretching, orthotics, rest — these manage symptoms. None of them build the underlying tissue capacity your foot actually needs. That's what's been missing. The system I'm prescribing for you is built around progressive loading — a structured process that tells your tissue, week by week, to rebuild. You don't need to try harder. You need a process that actually works.",
    prescription: [
      "Weeks 1–4 reset the tissue and establish your baseline capacity — the foundation everything else is built on",
      "Weeks 5–8 apply progressive load to rebuild what's been lost — this is where the cycle of setbacks ends",
      "Weeks 9–12 lock in your capacity gains and return you to full activity without managing every step",
    ],
  },
  Archetype_Active_Person: {
    name: "The Active Person",
    clinicalLabel: "Pattern: High activity demand, load-tolerance deficit. Pain is interfering with performance and identity.",
    drJonathanNote: "Your answers tell me that staying active isn't optional for you — it's part of who you are. The standard advice to 'rest and stay off it' doesn't account for people like you. And here's the clinical reality: rest reduces load temporarily, but it doesn't build capacity. So every time you return to activity, you're doing it with the same tissue tolerance you had before — or less. The system I'm prescribing for you keeps you moving while progressively rebuilding your foot's ability to handle load. Recovery and activity are not opposites. We just need to do this in the right order.",
    prescription: [
      "Phase 1 reduces inflammation while maintaining movement — you won't be sidelined, you'll be redirected",
      "Phase 2 progressively reloads the tissue so your foot can handle the demands you're putting on it",
      "Phase 3 returns you to full activity — running, sport, the gym — without the constant flare-up cycle",
    ],
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
  },
};

export default function AssessmentResults() {
  const [result, setResult] = useState<{
    name: string;
    clinicalLabel: string;
    drJonathanNote: string;
    prescription: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (!email) { setError(true); setLoading(false); return; }

    fetch(`${GET_ASSESSMENT_URL}?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(true); }
        else {
          const archetype = d.archetype as string;
          setResult(archetypeResults[archetype] ?? null);
        }
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

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

        {!loading && (error || !result) && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-base mb-4">We couldn't find your assessment results.</p>
            <a href="/lp/take-assessment" className="text-blue-600 text-sm font-medium hover:underline">
              Take the assessment →
            </a>
          </div>
        )}

        {!loading && result && (
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{result.name}</h2>
              <p className="text-slate-500 text-sm leading-relaxed italic">{result.clinicalLabel}</p>
            </div>

            {/* Dr. Jonathan note */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-5 mb-6">
              <p className="text-slate-700 text-sm leading-relaxed">"{result.drJonathanNote}"</p>
            </div>

            {/* Prescription */}
            <div className="bg-white rounded-xl border border-blue-100 px-5 py-5 mb-6">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">Your Prescribed Protocol</p>
              <div className="space-y-3">
                {result.prescription.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Log every day callout */}
            <div className="bg-green-50 rounded-xl border border-green-200 px-5 py-5 mb-8">
              <p className="text-green-800 text-sm font-bold mb-2">The one thing that predicts results.</p>
              <p className="text-green-700 text-sm leading-relaxed">
                Patients who log every day see measurable pain reduction within 7 days. Not because the exercises are magic — because daily logging keeps the load consistent and gives you real data on what's working. The app takes 2 minutes a day. That's the whole ask. Log every day, follow the protocol, and your foot will respond.
              </p>
            </div>

            {/* Primary CTA */}
            
              href={INSTALL_URL}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base text-center py-4 rounded-xl transition-colors mb-3"
            >
              Download the App — Start Your Free 7-Day Trial →
            </a>
            <p className="text-center text-slate-400 text-sm mb-8">
              No payment required to start. Your trial begins when you download.
            </p>

            {/* Email confirmation */}
            <div className="border-t border-slate-100 pt-6">
              <p className="text-slate-500 text-sm text-center">
                Your personalized recovery emails are on their way to your inbox — archetype-matched guidance based on your assessment.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}