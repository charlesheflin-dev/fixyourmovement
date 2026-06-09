import { useState, useEffect } from "react";

const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";

type Q2Value = "stretching" | "shoes_orthotics" | "rest" | "physical_therapy" | "injections" | "nothing";

interface Answers {
  q1: string;
  q2: Q2Value[];
  q3: string;
  q4: string;
  q5: string;
}

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

export default function AssessmentPage() {
  const [email, setEmail] = useState<string>("");
  const [answers, setAnswers] = useState<Answers>({ q1: "", q2: [], q3: "", q4: "", q5: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ name: string; clinicalLabel: string; drJonathanNote: string; prescription: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) setEmail(decodeURIComponent(emailParam));
  }, []);

  const allAnswered =
    answers.q1 !== "" &&
    answers.q3 !== "" &&
    answers.q4 !== "" &&
    answers.q5 !== "";

  const handleQ2Toggle = (value: Q2Value) => {
    setAnswers((prev) => ({
      ...prev,
      q2: prev.q2.includes(value)
        ? prev.q2.filter((v) => v !== value)
        : [...prev.q2, value],
    }));
  };

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.replace(/ /g, "+"), answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      const archetype = data.archetype as string;
      setResult(archetypeResults[archetype] ?? {
        name: "Your Recovery Profile",
        clinicalLabel: "Pattern: Assessment complete",
        drJonathanNote: "Your personalized recovery guidance is on the way.",
        prescription: ["Check your email for your next steps"],
      });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const q1Options = [
    { label: "A few weeks", value: "few_weeks" },
    { label: "A few months", value: "few_months" },
    { label: "More than 6 months", value: "more_than_6_months" },
    { label: "More than a year", value: "more_than_1_year" },
  ];

  const q2Options = [
    { label: "Stretching or foam rolling", value: "stretching" as Q2Value },
    { label: "New shoes or orthotics", value: "shoes_orthotics" as Q2Value },
    { label: "Rest", value: "rest" as Q2Value },
    { label: "Physical therapy", value: "physical_therapy" as Q2Value },
    { label: "Cortisone injections", value: "injections" as Q2Value },
    { label: "Nothing yet — I'm just starting to figure this out", value: "nothing" as Q2Value },
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

  const RadioGroup = ({
    options,
    selected,
    onChange,
  }: {
    options: { label: string; value: string }[];
    selected: string;
    onChange: (v: string) => void;
  }) => (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full text-left px-4 py-3 rounded-lg border text-sm leading-snug transition-colors ${
            selected === opt.value
              ? "border-blue-600 bg-blue-50 text-blue-900 font-medium"
              : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  const CheckboxGroup = ({
    options,
    selected,
    onChange,
  }: {
    options: { label: string; value: Q2Value }[];
    selected: Q2Value[];
    onChange: (v: Q2Value) => void;
  }) => (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full text-left px-4 py-3 rounded-lg border text-sm leading-snug transition-colors ${
            selected.includes(opt.value)
              ? "border-blue-600 bg-blue-50 text-blue-900 font-medium"
              : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
          }`}
        >
          <span className={`inline-block w-4 h-4 mr-3 rounded border align-middle mb-0.5 transition-colors ${
            selected.includes(opt.value) ? "bg-blue-600 border-blue-600" : "border-slate-400"
          }`} />
          {opt.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6">
        <a href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
          <span className="text-slate-900 font-semibold text-base">The Foot Capacity System</span>
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {!submitted ? (
          <>
            {/* Heading */}
            <div className="mb-10">
              <p className="text-blue-600 text-sm font-medium uppercase tracking-wide mb-2">Personalized Recovery</p>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
                What kind of recovery journey are you on?
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                Answer five short questions. We'll use your answers to personalize the recovery guidance you receive.
              </p>
              {!email && (
                <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                  Please confirm your email before completing this assessment.
                </p>
              )}
            </div>

            {/* Q1 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-4">
                1. How long have you been dealing with foot or heel pain?
              </p>
              <RadioGroup
                options={q1Options}
                selected={answers.q1}
                onChange={(v) => setAnswers((prev) => ({ ...prev, q1: v }))}
              />
            </div>

            {/* Q2 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-1">
                2. What have you already tried?
              </p>
              <p className="text-slate-500 text-sm mb-4">Select all that apply.</p>
              <CheckboxGroup
                options={q2Options}
                selected={answers.q2}
                onChange={handleQ2Toggle}
              />
            </div>

            {/* Q3 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-4">
                3. What does foot pain most get in the way of for you?
              </p>
              <RadioGroup
                options={q3Options}
                selected={answers.q3}
                onChange={(v) => setAnswers((prev) => ({ ...prev, q3: v }))}
              />
            </div>

            {/* Q4 */}
            <div className="mb-8">
              <p className="text-slate-900 font-semibold text-base mb-4">
                4. When you think about recovery, what feels most true right now?
              </p>
              <RadioGroup
                options={q4Options}
                selected={answers.q4}
                onChange={(v) => setAnswers((prev) => ({ ...prev, q4: v }))}
              />
            </div>

            {/* Q5 */}
            <div className="mb-10">
              <p className="text-slate-900 font-semibold text-base mb-4">
                5. What would a successful recovery look like for you?
              </p>
              <RadioGroup
                options={q5Options}
                selected={answers.q5}
                onChange={(v) => setAnswers((prev) => ({ ...prev, q5: v }))}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered || loading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-base py-4 rounded-lg transition-colors"
            >
              {loading ? "Submitting…" : "See My Recovery Profile →"}
            </button>

            {!allAnswered && (
              <p className="text-center text-slate-400 text-sm mt-3">
                Please answer questions 1, 3, 4, and 5 to continue.
              </p>
            )}
          </>
        ) : (
          /* Result */
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{result?.name}</h2>
              <p className="text-slate-500 text-sm leading-relaxed italic">{result?.clinicalLabel}</p>
            </div>

            {/* Dr. Jonathan note */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-5 mb-6">
              <p className="text-slate-700 text-sm leading-relaxed">"{result?.drJonathanNote}"</p>
            </div>

            {/* Prescription */}
            <div className="bg-white rounded-xl border border-blue-100 px-5 py-5 mb-6">
              <p className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">Your Prescribed Protocol</p>
              <div className="space-y-3">
                {result?.prescription.map((item, i) => (
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
            <a
              href="https://app.fixyourmovement.com/install"
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
                Your personalized recovery emails are on their way to your inbox — archetype-matched guidance based on your answers above.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}