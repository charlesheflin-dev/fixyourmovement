import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

// Mirrors Results.tsx exactly — same public Edge Function, same identifier handling.
const GET_RESULTS_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/get-results-data";
// Persistence endpoint — DOES NOT EXIST YET. Built in the next step (save-survey-response
// + survey_responses table + event log). Until then this POST no-ops (fire-and-forget);
// it never blocks the user from reaching their results.
const SAVE_SURVEY_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/save-survey-response";

// We read only the fields the survey card needs. The second hero metric shows a genuine
// before/after: Starting Pain -> Pain Today, from get-results-data (startingPain,
// latestPain, painDrop). It renders ONLY when there is real improvement (painDrop > 0). When
// there is no pain drop, we fall back to Recovery Sessions (an honest effort count that
// mirrors the Results page) — never to a fabricated capability/capacity gain. If neither is
// available, the card shows Days Completed alone.
interface SurveyResultsData {
  userId: string;
  daysLogged: number;
  startingPain: number | null;
  latestPain: number | null;
  painDrop: number | null;
  trialSessionsCompleted: number | null;
  error?: string;
}

const Q2_OPTIONS = [
  "I can feel progress. I want to keep going.",
  "I think it's helping. I just need more time.",
  "I want to continue, but cost is a concern.",
  "I'm still not sure this is right for me.",
];

const Q3_OPTIONS = [
  "Walking without thinking about my feet",
  "Exercise or sports",
  "Traveling without foot pain",
  "Keeping up with my family",
];

function toNum(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

// Subtle fade-in reveal: children mount when `show` becomes true and animate opacity/
// translate over ~200ms. Once revealed they stay mounted (no re-trigger, no layout jump).
function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (show && !mounted) setMounted(true);
  }, [show, mounted]);

  useEffect(() => {
    if (mounted && !visible) {
      raf.current = requestAnimationFrame(() => setVisible(true));
      return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }
  }, [mounted, visible]);

  if (!mounted) return null;
  return (
    <div
      className="transition-all duration-200 ease-out motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)" }}
    >
      {children}
    </div>
  );
}

export default function PostTrialSurvey() {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email")?.replace(/ /g, "+") ?? null;
  const navigate = useNavigate();

  const [data, setData] = useState<SurveyResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const startedFired = useRef(false);

  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [q3Other, setQ3Other] = useState("");

  // Fetch — mirrors Results.tsx: userId OR ?email=, redirect to /walkthrough only on a
  // genuine failure (no identifier, fetch error, or user-not-found). Zero-log users are
  // NOT bounced — they proceed to the survey and the reframed results (Slice C).
  useEffect(() => {
    if (!userId && !emailParam) { window.location.href = "/walkthrough"; return; }
    const fetchUrl = userId
      ? `${GET_RESULTS_URL}?userId=${userId}`
      : `${GET_RESULTS_URL}?email=${encodeURIComponent(emailParam!)}`;
    fetch(fetchUrl)
      .then((r) => r.json())
      .then((d: SurveyResultsData) => {
        if (d.error) {
          window.location.href = "/walkthrough";
        } else {
          setData(d);
          setLoading(false);
          // Fire the survey_started funnel event once - only here, after we know the survey
          // is actually being shown to a valid user (the redirects above never reach this
          // branch). Fire-and-forget; never blocks render.
          if (!startedFired.current) {
            startedFired.current = true;
            fetch(SAVE_SURVEY_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              keepalive: true,
              body: JSON.stringify({
                event: "started",
                userId: d.userId ?? userId ?? null,
                email: emailParam,
              }),
            }).catch(() => { /* non-fatal */ });
          }
        }
      })
      .catch(() => { window.location.href = "/walkthrough"; });
  }, [userId, emailParam]);

  const startingPain = data ? toNum(data.startingPain) : null;
  const latestPain = data ? toNum(data.latestPain) : null;
  const painDrop = data ? toNum(data.painDrop) : null;
  // Show the pain progression only when it is a real improvement — never fabricate progress.
  const showPainProgress =
    painDrop !== null && painDrop > 0 && startingPain !== null && latestPain !== null;
  // Honest effort-count fallback when there's no pain improvement to show. Mirrors the
  // Results page's "Recovery Sessions" tile. Only shown when it's a positive count.
  const recoverySessions = data ? toNum(data.trialSessionsCompleted) : null;
  const showRecoverySessions =
    !showPainProgress && recoverySessions !== null && recoverySessions > 0;

  const canSubmit = q1 !== null && q2 !== null; // Q1 + Q2 required; Q3 optional

  function handleSeeResults() {
    if (!canSubmit || !data) return;

    const q3Value = q3 === "Other" ? (q3Other.trim() || "Other") : q3;

    // Fire-and-forget persistence. If the endpoint isn't live yet, this silently no-ops
    // and the user still reaches their results. Payload carries everything the design doc
    // lists under "Data Captured".
    fetch(SAVE_SURVEY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        userId: data.userId ?? userId ?? null,
        email: emailParam,
        daysCompleted: data.daysLogged,
        startingPain,
        latestPain,
        painDrop,
        recoverySessions,
        q1Score: q1,
        q2Value: q2,
        q3Value,
        surveyCompleted: true,
        completedAt: new Date().toISOString(),
      }),
    }).catch(() => { /* non-fatal — never blocks the hand-off */ });

    const target = userId
      ? `/results/${userId}`
      : `/results?email=${encodeURIComponent(emailParam!)}`;
    navigate(target);
  }

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

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-lg mx-auto px-6 py-10">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header className="text-center mb-8">
          <h1 className="text-[32px] leading-tight font-bold text-gray-900">
            Your personalized results are ready.
          </h1>
          <p className="mt-3 text-[18px] text-gray-500">
            Just two quick questions first.
          </p>
        </header>

        {/* ── Hero Summary Card ──────────────────────────────────────────────── */}
        <section
          className="rounded-[18px] border px-6 py-7 mb-10"
          style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}
        >
          <h2 className="text-center text-[22px] font-semibold text-blue-600">
            You've Already Started.
          </h2>

          <div className="mt-6 flex items-stretch">
            <div className="flex-1 text-center">
              <div className="text-[13px] tracking-wide text-gray-500 uppercase">Days Completed</div>
              <div className="mt-1 text-4xl font-bold text-blue-600">{data.daysLogged}</div>
            </div>

            {showPainProgress ? (
              <>
                <div className="w-px bg-blue-200 mx-2" aria-hidden="true" />
                <div className="flex-1 text-center">
                  <div className="text-[13px] tracking-wide text-gray-500 uppercase">Pain Level</div>
                  <div className="mt-1 text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
                    <span>{startingPain}</span>
                    <span className="text-gray-400" aria-hidden="true">→</span>
                    <span className="text-blue-600">{latestPain}</span>
                    <span className="sr-only">pain dropped from {startingPain} to {latestPain} out of 10</span>
                  </div>
                </div>
              </>
            ) : showRecoverySessions ? (
              <>
                <div className="w-px bg-blue-200 mx-2" aria-hidden="true" />
                <div className="flex-1 text-center">
                  <div className="text-[13px] tracking-wide text-gray-500 uppercase">Recovery Sessions</div>
                  <div className="mt-1 text-4xl font-bold text-blue-600">{recoverySessions}</div>
                </div>
              </>
            ) : null}
          </div>

          <div className="mt-6 pt-5 border-t border-blue-200 text-center">
            <p className="text-[16px] text-gray-600">Every recovery starts somewhere.</p>
            <p className="text-[16px] text-blue-600">This is just the beginning.</p>
          </div>
        </section>

        {/* ── Question 1 — router (required) ─────────────────────────────────── */}
        <section className="mb-2">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center" aria-hidden="true">1</span>
            <h3 className="text-[20px] font-semibold text-gray-900">
              How likely are you to keep going and finish what you started?
            </h3>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-[13px] text-gray-500 mb-2 px-1">
              <span>Not Ready</span>
              <span>I'm Ready to Finish</span>
            </div>
            <div
              role="radiogroup"
              aria-label="How likely are you to keep going and finish what you started, from 1 (not ready) to 10 (ready to finish)"
              className="grid grid-cols-5 gap-2 w-max mx-auto"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                const selected = q1 === n;
                return (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={`${n} out of 10`}
                    onClick={() => setQ1(n)}
                    className={
                      "w-11 h-11 min-w-[44px] rounded-full border text-[15px] font-semibold flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 " +
                      (selected
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-blue-200 text-blue-600 hover:border-blue-400")
                    }
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Question 2 — objection surfacer (required) ─────────────────────── */}
        <Reveal show={q1 !== null}>
          <section className="mt-10">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold flex items-center justify-center" aria-hidden="true">2</span>
              <h3 className="text-[20px] font-semibold text-gray-900">
                Which one sounds most like you right now?
              </h3>
            </div>

            <div role="radiogroup" aria-label="Which one sounds most like you right now?" className="mt-5 space-y-3">
              {Q2_OPTIONS.map((opt) => {
                const selected = q2 === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setQ2(opt)}
                    className={
                      "w-full text-left flex items-center gap-3 rounded-xl border px-4 py-4 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 " +
                      (selected ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300")
                    }
                  >
                    <span
                      className={
                        "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center " +
                        (selected ? "border-blue-600" : "border-gray-300")
                      }
                      aria-hidden="true"
                    >
                      {selected && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </span>
                    <span className="text-[16px] text-gray-800">{opt}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* ── Divider + Question 3 — optional ────────────────────────────────── */}
        <Reveal show={q2 !== null}>
          <div className="mt-10 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1" style={{ backgroundColor: "#E5E7EB" }} />
            <span className="text-[13px] text-gray-400">Optional</span>
            <span className="h-px flex-1" style={{ backgroundColor: "#E5E7EB" }} />
          </div>

          <section className="mt-6">
            <h3 className="text-[20px] font-semibold text-gray-900">
              What are you most excited to get back to?
            </h3>

            <div role="radiogroup" aria-label="What are you most excited to get back to? (optional)" className="mt-5 space-y-3">
              {Q3_OPTIONS.map((opt) => {
                const selected = q3 === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setQ3(opt)}
                    className={
                      "w-full text-left flex items-center gap-3 rounded-xl border px-4 py-4 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 " +
                      (selected ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300")
                    }
                  >
                    <span
                      className={
                        "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center " +
                        (selected ? "border-blue-600" : "border-gray-300")
                      }
                      aria-hidden="true"
                    >
                      {selected && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </span>
                    <span className="text-[16px] text-gray-800">{opt}</span>
                  </button>
                );
              })}

              {/* Other */}
              <button
                type="button"
                role="radio"
                aria-checked={q3 === "Other"}
                onClick={() => setQ3("Other")}
                className={
                  "w-full text-left flex items-center gap-3 rounded-xl border px-4 py-4 min-h-[44px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 " +
                  (q3 === "Other" ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300")
                }
              >
                <span
                  className={
                    "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center " +
                    (q3 === "Other" ? "border-blue-600" : "border-gray-300")
                  }
                  aria-hidden="true"
                >
                  {q3 === "Other" && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </span>
                <span className="text-[16px] text-gray-800">Other</span>
              </button>

              {q3 === "Other" && (
                <input
                  type="text"
                  value={q3Other}
                  onChange={(e) => setQ3Other(e.target.value)}
                  aria-label="Tell us what you're most excited to get back to"
                  placeholder="Tell us…"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[16px] text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />
              )}
            </div>
          </section>
        </Reveal>

        {/* ── Primary CTA ────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={handleSeeResults}
          disabled={!canSubmit}
          className={
            "mt-10 w-full rounded-xl py-4 text-[20px] font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 " +
            (canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50 cursor-not-allowed")
          }
        >
          See My Results →
        </button>
      </main>
    </div>
  );
}
