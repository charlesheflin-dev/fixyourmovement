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

const archetypeResults: Record<string, { name: string; description: string }> = {
  Archetype_Frustrated_Fix_Seeker: {
    name: "The Frustrated Fix-Seeker",
    description:
      "You've put in the work — and you deserve answers, not more guesswork. Your emails will focus on why so many plantar fasciitis treatments fail, and what a structured approach actually looks like.",
  },
  Archetype_Active_Person: {
    name: "The Active Person",
    description:
      "Staying active matters to you — and recovery doesn't have to mean stopping. Your emails will focus on how to keep moving safely while your foot capacity rebuilds.",
  },
  Archetype_Discouraged_Chronic: {
    name: "The Discouraged Chronic Sufferer",
    description:
      "You've been dealing with this long enough. Your emails will focus on why chronic pain doesn't mean permanent damage — and why recovery is still very much possible.",
  },
  Archetype_Newly_Concerned: {
    name: "The Newly Concerned",
    description:
      "You're asking the right questions early. Your emails will focus on what's actually happening with your foot and what to do now — before the cycle that traps most people even begins.",
  },
};

export default function AssessmentPage() {
  const [email, setEmail] = useState<string>("");
  const [answers, setAnswers] = useState<Answers>({ q1: "", q2: [], q3: "", q4: "", q5: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ name: string; description: string } | null>(null);
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
        description: "Check your inbox — we've sent you a personalized recovery email based on your answers.",
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
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-blue-600 text-sm font-medium uppercase tracking-wide mb-2">Your Recovery Profile</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{result?.name}</h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-lg mx-auto mb-8">
              {result?.description}
            </p>
            <div className="border-t border-slate-100 pt-8">
              <p className="text-slate-500 text-sm mb-4">
                Check your inbox — your first personalized recovery email is on its way.
              </p>
              <a
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors"
              >
                Learn More About The System →
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}