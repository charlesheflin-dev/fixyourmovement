import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import UserJourneyCarousel from "@/components/UserJourneyCarousel";
import { installUrlWithTracking } from "@/lib/installTracking";

// ─── Constants ──────────────────────────────────────────────────────────────────
const CREATE_TRIAL_PROFILE_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/create-trial-profile";
const LOG_FUNNEL_EVENT_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/log-funnel-event";
const INSTALL_URL = "https://app.fixyourmovement.com/install";
const VIDEO_ID = "b37100f8162e1ab91cf86c9e284447da";
const VIDEO_THUMBNAIL_ID = "0a87b6a7-6fb2-48dc-9e26-aa5c134c0200";
const VIDEO_POSTER_SRC = `https://imagedelivery.net/ZUbdF1A6bMNaR2l0OC84jw/${VIDEO_THUMBNAIL_ID}/public`;


// ─── Pill ───────────────────────────────────────────────────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
        {children}
      </div>
    </div>
  );
}

// ─── Info Card ──────────────────────────────────────────────────────────────────
function InfoCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <p className="text-blue-700 text-xs font-bold uppercase tracking-widest">{label}</p>
      </div>
      {children}
    </div>
  );
}

// ─── Check icon ─────────────────────────────────────────────────────────────────
function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── CheckCircle icon ────────────────────────────────────────────────────────────
function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// ─── Read cookie helper ──────────────────────────────────────────────────────────
function getCookie(name: string): string | null {
  const match = document.cookie.split("; ").find(row => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

// ─── Origin-article attribution (from blog cookies; edge re-validates) ───────────
function sanitizeArticleSlug(v: string | null): string | null {
  if (!v) return null;
  const s = v.trim().slice(0, 200);
  return /^[A-Za-z0-9/_-]+$/.test(s) ? s : null;
}
function articleFields(): { first_article: string | null; last_article: string | null } {
  return {
    first_article: sanitizeArticleSlug(getCookie("fcs_first_article")),
    last_article:  sanitizeArticleSlug(getCookie("fcs_last_article")),
  };
}
function sourceFields(): { first_source: string | null; last_source: string | null } {
  return {
    first_source: sanitizeArticleSlug(getCookie("fcs_first_source")),
    last_source:  sanitizeArticleSlug(getCookie("fcs_last_source")),
  };
}

// ─── Funnel-events (Change 3 Tier 1) ─────────────────────────────────────────────
// Fire-and-forget front-funnel event to log-funnel-event, keyed by the fcs_anon cookie
// minted app-wide in App.tsx. keepalive so it survives navigation; never blocks UX; a
// dead endpoint can't harm the funnel. account_created carries the raw email (server
// hashes it — never stored raw).
function logFunnelEvent(event: string, extra?: Record<string, unknown>) {
  try {
    const anon_id = getCookie("fcs_anon");
    if (!anon_id) return;
    fetch(LOG_FUNNEL_EVENT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ anon_id, funnel: "download", event, ...extra }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Non-fatal
  }
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function DownloadApp() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [objectionOpen, setObjectionOpen] = useState<number | null>(null);
  const [posterVisible, setPosterVisible] = useState(true);


  // Tracked install URL: stamps fcs_anon + install_src=session so a wall event on
  // app.fixyourmovement.com joins back to this session's funnel_events row. No-op if
  // the anon cookie is absent.
  const installHref = installUrlWithTracking(INSTALL_URL, { anon: getCookie("fcs_anon"), src: "session" });

  const landingLogged = useRef(false);
  const emailFocusLogged = useRef(false);

  useEffect(() => {
    if (landingLogged.current) return;
    landingLogged.current = true;
    logFunnelEvent("landing_reached");
  }, []);

  // When the install screen replaces the opt-in page, reset scroll to top —
  // React preserves the window scroll offset across the state swap, so without
  // this the user lands mid-page and has to scroll up. (2026-08-25)
  useEffect(() => {
    if (!submitted) return;
    window.scrollTo(0, 0);
  }, [submitted]);

  const handleEmailFocus = () => {
    if (emailFocusLogged.current) return;
    emailFocusLogged.current = true;
    logFunnelEvent("email_field_viewed");
  };

  const handleDownloadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement | null;
    const value = emailInput?.value?.trim().toLowerCase();
    if (!value) {
      emailInput?.focus();
      return;
    }

    logFunnelEvent("email_submitted");
    setEmail(value);
    document.cookie = `fcs_email=${encodeURIComponent(value)}; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/; SameSite=Lax`;

    // Mint the account now — the real create that used to run only after the
    // confirmation return. No stage_only; article + source attribution ride the body
    // (cookie survives now that there's no inbox hop), matched field-for-field.
    fetch(CREATE_TRIAL_PROFILE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value, anon_id: getCookie("fcs_anon"), ...articleFields(), ...sourceFields() }),
    }).catch(err => console.error("[DownloadApp] create-trial-profile error:", err));

    logFunnelEvent("account_created", { email: value });

    // Background add to AWeber (main list, per the form's listname) — full-fidelity
    // replay of the form's own fields; no-cors keepalive; the native redirect is bypassed.
    try {
      const params = new URLSearchParams();
      new FormData(form).forEach((v, k) => params.append(k, String(v)));
      fetch(form.action, {
        method: "POST",
        body: params,
        mode: "no-cors",
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Non-fatal
    }

    // Origin attribution stage — retained until the body-path is verified on staging
    // (build-spec change-set #3); harmless if it leaves an unconsumed staged row.
    try {
      fetch(CREATE_TRIAL_PROFILE_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ email: value, ...articleFields(), ...sourceFields(), stage_only: true }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Non-fatal
    }

    // Straight to the install screen in-session — no inbox trip.
    setSubmitted(true);
  };

  const handleSendEmail = async () => {
    if (emailSent || emailLoading) return;
    setEmailLoading(true);
    const cleanEmail = email.trim().replace(/ /g, "+").toLowerCase();
    try {
      await fetch(CREATE_TRIAL_PROFILE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, anon_id: getCookie("fcs_anon"), ...articleFields(), ...sourceFields() }),
      });
    } catch {
      // Non-fatal
    }
    setEmailLoading(false);
    setEmailSent(true);
  };

  const objections = [
    {
      q: "What if I've already tried everything?",
      a: "The system was built for exactly that. Most people who find it have already tried PT, orthotics, stretching, and injections. The difference isn't the exercises. It's having a structured process that builds capacity week over week instead of managing symptoms one at a time.",
    },
    {
      q: "What if I have a flare-up?",
      a: "Flare-ups are expected. The app doesn't punish them — it adjusts. There's a built-in Calm Mode that reduces load temporarily without losing your progress. You keep moving forward even on hard days.",
    },
    {
      q: "How is 10 minutes a day going to do anything?",
      a: "Consistency with the right protocol beats occasional long sessions every time. The daily log tells the app where you are, which determines what you do next. That feedback loop is what makes the difference — not the length of the session.",
    },
  ];

  // ── STEP 1: OPT-IN PAGE ─────────────────────────────────────────────────────
  if (!submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

        {/* Header */}
        <header className="w-full bg-white border-b border-slate-200 py-3 px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="The Foot Capacity System" className="h-10 w-auto" />
              <div>
                <p className="font-bold text-slate-900 text-base leading-tight">The Foot Capacity System</p>
                <p className="text-slate-400 text-xs">Dr. Jonathan Schutza, PT, DPT</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              FREE TRIAL · LOG 7 DAYS
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-10">

          {/* Headline — white card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-8 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Recovery Shouldn't<br />Require A Waiting Room.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Just a daily recovery plan from Dr. Jonathan<br className="hidden sm:block" /> delivered directly to your phone.
            </p>
          </div>

          {/* App showcase card — phones + features + 3-step */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-8 mb-4">

            {/* From Guesswork → To Clarity */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="text-blue-600 text-sm font-semibold">From Guesswork</span>
              <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
                <path d="M0 6 H72 M66 1 L78 6 L66 11" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-blue-600 text-sm font-semibold">To Clarity</span>
            </div>

            {/* Phone image + features side by side on desktop, stacked on mobile */}
            <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
              {/* Phone image */}
              <div className="md:w-1/2">
                <img
                  src="/images/3-phones.png"
                  alt="The Foot Capacity System app"
                  className="w-full"
                />
              </div>

              {/* Features list */}
              <div className="md:w-1/2 flex flex-col justify-center">
                <div className="space-y-3">
                  {[
                    "No referrals",
                    "No specialists",
                    "No copays",
                    "No insurance approval",
                    "No waiting rooms",
                    "No travel or gas",
                    "No rearranging your life",
                    "No childcare logistics",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3-step process */}
            <div className="border-t border-slate-100 pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { num: "1", label: "Assess", body: "Find your starting point and get personalized." },
                  { num: "2", label: "Follow Your Plan", body: "Get daily guidance based on how your foot feels." },
                  { num: "3", label: "Track Progress", body: "See what's working and keep moving forward." },
                ].map((step, i) => (
                  <div key={i}>
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-2">
                      {step.num}
                    </div>
                    <p className="text-blue-600 font-bold text-sm mb-1">{step.label}</p>
                    <p className="text-slate-500 text-xs leading-snug">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-8 mb-4">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-2">
              Get Your Free Access — Log 7 Days
            </h2>
            <p className="text-blue-600 font-semibold text-base text-center mb-2">
              Your first step is simple.
            </p>
            <p className="text-slate-500 text-sm text-center mb-6 leading-relaxed">
              Enter your name and email below.<br />
              We'll send you immediate access to the app and<br />
              start your first week with Dr. Jonathan.
            </p>

            <form
              method="post"
              acceptCharset="UTF-8"
              action="https://www.aweber.com/scripts/addlead.pl"
              onSubmit={handleDownloadSubmit}
              className="space-y-3 max-w-md mx-auto"
            >
              <input type="hidden" name="meta_web_form_id" value="356574860" />
              <input type="hidden" name="meta_split_id" value="" />
              <input type="hidden" name="listname" value="awlist6958674" />
              <input type="hidden" name="redirect" value="https://fixyourmovement.com/email-confirmation" />
              <input type="hidden" name="meta_redirect_onlist" value="https://www.aweber.com/thankyou-coi.htm?m=text" />
              <input type="hidden" name="meta_adtracking" value="FCS_Direct_App_Download_no_Assessment" />
              <input type="hidden" name="meta_message" value="1" />
              <input type="hidden" name="meta_required" value="name,email" />
              <input type="hidden" name="meta_tooltip" value="" />

              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  name="name"
                  placeholder="First name"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onFocus={handleEmailFocus}
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 rounded-xl transition-colors"
              >
                GET INSTANT ACCESS →
              </button>

              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mt-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                No credit card. No spam. Your email stays private.
              </div>
            </form>
          </div>

          {/* You're Not Doing This Alone card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-8 mb-4">
            <div className="flex items-start gap-5">
              <div className="shrink-0 mt-1">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <p className="text-blue-600 font-bold text-base mb-1">You're Not Doing This Alone</p>
                <p className="text-slate-900 font-bold text-base leading-snug mb-3">
                  Your daily plan lives inside the app,<br />but the support doesn't stop there.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Dr. Jonathan regularly reviews member progress, provides guidance through the in-app messaging system, and helps people navigate the setbacks, questions, and flare-ups that often derail recovery.
                </p>
                <div className="flex items-start gap-2 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div>
                    <p className="text-blue-600 text-sm font-bold">This is not just an app.</p>
                    <p className="text-slate-600 text-sm">It's a recovery system backed by a real physical therapist.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-step process card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-8 mb-4">
            <p className="text-slate-900 font-bold text-base text-center mb-6">
              Open the app, follow today's plan, and start moving forward.
            </p>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  ),
                  label: "Open the app",
                  body: "Your plan is ready when you are.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  ),
                  label: "Log your pain",
                  body: "Track your foot's response daily.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                  ),
                  label: "Follow today's plan",
                  body: "Watch short videos and do your session.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  ),
                  label: "Track your progress",
                  body: "See what's working and keep moving.",
                },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="mb-2">{step.icon}</div>
                  <p className="text-slate-900 font-bold text-xs mb-1">{step.label}</p>
                  <p className="text-slate-500 text-xs leading-snug">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 py-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p className="text-slate-400 text-xs">Trusted by thousands. Built by a physical therapist. Backed by science.</p>
          </div>

        </main>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-white py-6 px-6 text-center">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} The Foot Capacity System &middot;{" "}
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            {" "}&middot;{" "}
            <a href="/terms-of-service" className="hover:underline">Terms</a>
          </p>
        </div>
      </div>
    );
  }

  // ── STEP 2: DOWNLOAD PAGE ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-2xl mx-auto px-6 py-8">

        {/* ── SECTION 1 — HERO ────────────────────────────────────── */}
        <div style={{ paddingTop: "32px" }}>
          <Pill>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Free Trial — 7 Days of Logging
          </Pill>

          <h1 className="text-3xl font-extrabold text-slate-900 text-center leading-tight mb-3">
            See How Your Foot Responds<br />Over Your First 7 Days of Logging.
          </h1>
          <p className="text-slate-500 text-base text-center leading-relaxed mb-5 max-w-sm mx-auto">
            No credit card. No commitment. A clear daily plan and a way to track whether it's working.
          </p>

          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-1.5"><Check /><span className="text-slate-600 text-sm">No credit card</span></div>
            <div className="flex items-center gap-1.5"><Check /><span className="text-slate-600 text-sm">No commitment</span></div>
          </div>
        </div>

        {/* ── SECTION 2 — WHAT'S INCLUDED ─────────────────────────── */}
        <div className="mb-8">
          <Pill>
            <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-black flex items-center justify-center">✓</span>
            What's Included
          </Pill>

          <h2 className="text-2xl font-extrabold text-slate-900 text-center leading-tight mb-3">
            Everything In Your Free Trial
          </h2>
          <p className="text-slate-500 text-sm text-center leading-snug mb-6 max-w-xs mx-auto">
            This isn't a library of exercises. It's a plan that knows where you are and tells you what's next.
          </p>

          <div className="space-y-3">
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
                label: "Daily Guided Sessions",
                body: "Know exactly what to do today. Every day. No guessing, no searching for videos, no wondering if you're doing it right.",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                label: "Pain Tracking",
                body: "Log your pain daily and see whether what you're doing is actually working. Numbers don't lie.",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                label: "Flare-Up Support",
                body: "Know what to do when things get harder — without losing ground. The app adjusts. You keep moving forward.",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                ),
                label: "Progress Visibility",
                body: "Watch your capacity score climb week over week. See the trend. Know it's working.",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                label: "Dr. Jonathan's Framework",
                body: "Built by a Doctor of Physical Therapy who specializes in plantar fasciitis. Not a generic exercise library — a clinical protocol.",
              },
            ].map((item, i) => (
              <InfoCard key={i} icon={item.icon} label={item.label}>
                <p className="text-slate-700 text-sm leading-relaxed">{item.body}</p>
              </InfoCard>
            ))}
          </div>
        </div>

        {/* ── SECTION 3 — DR. JONATHAN VIDEO ─────────────────────── */}
        <div className="mb-8">
          <Pill>
            <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-black flex items-center justify-center">▶</span>
            A Message From Dr. Jonathan
          </Pill>

          <h2 className="text-2xl font-extrabold text-slate-900 text-center leading-tight mb-3">
            Why So Many People Stay Stuck
          </h2>
          <p className="text-slate-500 text-sm text-center leading-snug mb-5 max-w-xs mx-auto">
            Most people aren't missing effort. They're missing direction.
          </p>

          <div className="rounded-2xl overflow-hidden shadow-lg mb-5" style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={`https://customer-hene8ngxxo3eajlj.cloudflarestream.com/${VIDEO_ID}/iframe${!posterVisible ? "?autoplay=true" : ""}`}
              style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            {posterVisible && (
              <div
                onClick={() => setPosterVisible(false)}
                style={{
                  position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                  backgroundImage: `url(${VIDEO_POSTER_SRC})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#2563EB">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <InfoCard
            label="The Idea Behind The System"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
            }
          >
            <p className="text-slate-700 text-sm leading-relaxed mb-2">Most people are given advice.</p>
            <p className="text-slate-700 text-sm leading-relaxed mb-2">Very few are given direction.</p>
            <p className="text-blue-600 text-sm font-semibold">That's what this system was built to provide.</p>
          </InfoCard>
        </div>

        {/* ── SECTION 4 — SOCIAL PROOF ────────────────────────────── */}
        <div className="mb-8">
          <div className="space-y-3">
            {[
              "Walking no longer felt impossible.",
              "The structure finally made recovery make sense.",
              "I stopped panicking during flare-ups.",
            ].map((quote, i) => (
              <div key={i} className="border-l-4 border-blue-600 pl-4 py-1">
                <p className="text-slate-700 text-base font-medium leading-snug">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 5 — OBJECTIONS ──────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-slate-900 text-center leading-tight mb-5">
            Common Questions
          </h2>
          <div className="space-y-3">
            {objections.map((obj, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setObjectionOpen(objectionOpen === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                >
                  <span className="text-slate-900 font-semibold text-sm leading-snug">{obj.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: objectionOpen === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {objectionOpen === i && (
                  <div className="px-5 pb-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{obj.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 6 — FINAL CTA ───────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center leading-tight mb-3">
            Start Today. See What 7 Days of Logging Does.
          </h2>
          <p className="text-slate-500 text-sm text-center leading-snug mb-6 max-w-xs mx-auto">
            About 10–15 minutes per day. No credit card. No commitment.
          </p>

          <a
            href={installHref}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base text-center py-4 rounded-xl transition-colors mb-4"
          >
            START MY PLAN &#8594;
          </a>

<p className="text-center text-slate-500 text-sm leading-relaxed max-w-xs mx-auto mb-8">
            No card required. The trial exists because we're confident in what happens in the first week.
          </p>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 px-5 py-5 text-center">
            {email ? (
              <p className="text-slate-600 text-sm mb-4">
                Want your sign-in link sent to <span className="font-semibold text-slate-900">{email}</span>?
              </p>
            ) : (
              <p className="text-slate-600 text-sm mb-4">
                Want us to send your sign-in link to your email?
              </p>
            )}
            {emailSent ? (
              <div className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-green-700 text-sm font-semibold">Sign-in link sent — check your inbox.</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={emailLoading || !email}
                className="w-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-sm py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {emailLoading ? "Sending…" : "Email Me My Sign-In Link"}
              </button>
            )}
          </div>
        </div>

        {/* User Journey Carousel */}
        <div className="mb-8">
          <p className="text-blue-600 text-[13px] font-semibold uppercase tracking-widest mb-2 text-center">Real Member Results</p>
          <p className="text-slate-500 text-sm text-center mb-5">These are real outcomes from active members tracked inside the app.</p>
          <UserJourneyCarousel />
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-6 pb-8 text-center">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} The Foot Capacity System &middot;{" "}
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            {" "}&middot;{" "}
            <a href="/terms-of-service" className="hover:underline">Terms</a>
          </p>
        </div>

      </main>
    </div>
  );
}