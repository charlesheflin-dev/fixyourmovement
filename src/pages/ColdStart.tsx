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

// Production hero assets (supplied, used intact — see implementation spec Block 1/2).
const DJ_HEADSHOT_SRC = "/images/cold/dj-headshot.jpg";
const HEEL_MESSAGE_SRC = "/images/cold/heel-message.png";
const PHONES_SRC = "/images/cold/phones.png";

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
// GA4 client_id contains a dot, so the source/article gate rejects it — dot-tolerant variant.
function sanitizeClientId(v: string | null): string | null {
  if (!v) return null;
  const s = v.trim();
  return /^[A-Za-z0-9._-]{1,64}$/.test(s) ? s : null;
}
// Ad click ids (gclid/fbclid via the source gate) + GA4 client_id, mirroring sourceFields().
function clickIdFields(): {
  gclid_first: string | null; gclid_last: string | null;
  fbclid_first: string | null; fbclid_last: string | null;
  ga_client_id: string | null;
} {
  return {
    gclid_first:  sanitizeArticleSlug(getCookie("fcs_first_gclid")),
    gclid_last:   sanitizeArticleSlug(getCookie("fcs_last_gclid")),
    fbclid_first: sanitizeArticleSlug(getCookie("fcs_first_fbclid")),
    fbclid_last:  sanitizeArticleSlug(getCookie("fcs_last_fbclid")),
    ga_client_id: sanitizeClientId(getCookie("fcs_ga_client_id")),
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
      body: JSON.stringify({ anon_id, funnel: "download_cold", event, ...extra }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Non-fatal
  }
}

// ─── Verified account provisioning (build-spec A1/A2) ────────────────────────────
// Calls create-trial-profile, retries transient failures, and reports whether a REAL
// account now exists. Success = HTTP ok AND action in {created, resent}. A browser fetch
// resolves even on HTTP 500, so res.ok must be checked explicitly — that unchecked case
// was the source of the silent misses. Idempotent server-side, so retrying is safe.
async function createTrialProfileVerified(value: string): Promise<{ ok: boolean; otlToken: string | null }> {
  const body = JSON.stringify({ email: value, anon_id: getCookie("fcs_anon"), ...articleFields(), ...sourceFields(), ...clickIdFields() });
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(CREATE_TRIAL_PROFILE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        const action = data && typeof data.action === "string" ? data.action : null;
        if (action === "created" || action === "resent") {
          const otlToken = data && typeof data.otl_token === "string" && data.otl_token ? data.otl_token : null;
          return { ok: true, otlToken };
        }
      }
    } catch (err) {
      console.error("[ColdStart] create-trial-profile attempt failed:", err);
    }
    if (attempt < 2) await new Promise(r => setTimeout(r, 600 * (attempt + 1)));
  }
  return { ok: false, otlToken: null };
}

// ─── Testimonials (Block 4) — authentic member wording, source-of-truth content ──
const TESTIMONIALS = [
  {
    initials: "BR",
    name: "Brittany",
    meta: "Written July 15, 2026 · 15 days after purchase",
    body:
      "I am so happy that I found Dr Jonathan's program and app! I have been at it 3 weeks and have had so much progress already. I have gone from hobbling around all day everyday for the last 4 months to walking normally with very little pain. I was constantly looking online for exercises and tricks to help my foot feel better - there is so much out there and so much conflicting advice. It wasn't until I started using The Foot Capacity System that I really started getting better. The app is clear and straightforward and adjusts to how my foot feels each day. I do my exercises each day and then move on with my day knowing I've done what I need to so that I keep progressing. I have gained so much confidence and strength already. I know I am going to be able to meet my goal. Thank you Dr. Jonathan!",
  },
  {
    initials: "JL",
    name: "Jocelyn Lavoie",
    meta: "Report written August 23, 2026 · 10 weeks after purchase",
    body:
      "I feel like I should have a party. Today was my first full day with next to no pain. At most 0.5/10 when I first got up this morning. First time in over a year!! It's so weird that my brain isn't really processing it.\n\nAll that to say a HUGE THANK YOU for everything!! What you've built here is amazing, it works and I couldn't be happier with the results up to now. Thank you!!",
  },
  {
    initials: "KS",
    name: "Karen Stone",
    meta: "Feedback shared September 26, 2026 · Nearly 3 months after joining",
    body:
      "I just finished a spin class and during the class I realized I had no pain.\n\nI have been taking a HIIT class, doing my regular workouts, climbing stairs, biking, walking...all pain free.\n\nFor some reason it hit me this morning.\n\nThank you so much for this program!",
  },
];

// ─── FAQ (Block 5) ───────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How do I get started?",
    a: "Enter your email and you'll get immediate access online. Nothing needs to be downloaded to begin.",
  },
  {
    q: "How much time does it take each day?",
    a: "Most daily sessions take about 15–20 minutes. The goal isn't longer workouts. It's consistency with the right plan. Your check-ins help FCS guide what you do next, so you can build capacity over time instead of bouncing between random exercises.",
  },
  {
    q: "What if my foot flares up or I have a question?",
    a: "FCS is designed to account for how your foot is responding. If you hit a setback, have a flare-up, or aren't sure what to do next, members can also message Dr. Jonathan for guidance.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. You can start your free recovery plan without entering a credit card.",
  },
];

// ─── Small shared marks ──────────────────────────────────────────────────────────
function ShieldCheck({ size = 18, stroke = "#2563EB" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function AccentBar() {
  return <div className="w-10 h-1 rounded-full bg-blue-600 mx-auto mb-5" />;
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function ColdStart() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Provisioning UX (build-spec A1): submitting = the create call is in flight;
  // provisionError = the create did not confirm a real account, so stay on the form and
  // offer a retry instead of advancing to a false "You're In".
  const [submitting, setSubmitting] = useState(false);
  const [provisionError, setProvisionError] = useState(false);

  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [posterVisible, setPosterVisible] = useState(true);
  // One-time auto-login token from create-trial-profile. Captured reactively from the
  // fire-and-forget mint below; when it lands, installHref restamps with ?fcs_otl= so a
  // just-registered user lands in-session. If the user taps before it arrives (or it
  // fails), the bare link -> normal OTP sign-in. Never blocks the instant screen swap.
  const [otlToken, setOtlToken] = useState<string | null>(null);

  // Tracked install URL: stamps fcs_anon + install_src=session so a wall event on
  // app.fixyourmovement.com joins back to this session's funnel_events row. No-op if
  // the anon cookie is absent.
  const installHref = installUrlWithTracking(INSTALL_URL, { anon: getCookie("fcs_anon"), src: "session", otl: otlToken });

  const landingLogged = useRef(false);
  const emailFocusLogged = useRef(false);
  const touchStartX = useRef(0);

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

  // Block 1 conversion actions (header FREE PLAN + hero CTA) smooth-scroll to the first
  // opt-in form in Block 2 — never a new page, modal, or submission (spec §9/§10).
  const scrollToForm = () => {
    const el = document.getElementById("free-recovery-plan");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prevTestimonial = () =>
    setTestimonialIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () =>
    setTestimonialIndex(i => (i + 1) % TESTIMONIALS.length);

  const handleDownloadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement | null;
    const value = emailInput?.value?.trim().toLowerCase();
    if (!value) {
      emailInput?.focus();
      return;
    }

    logFunnelEvent("email_submitted");
    setEmail(value);
    setProvisionError(false);
    setSubmitting(true);
    document.cookie = `fcs_email=${encodeURIComponent(value)}; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/; SameSite=Lax`;

    // Background add to AWeber (main list, per the form's listname) — full-fidelity
    // replay of the form's own fields; no-cors keepalive; the native redirect is bypassed.
    // Fired before the awaited create so a paid-intent lead is never lost, regardless of
    // provisioning outcome (build-spec A4).
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

    // Mint the account — AWAIT and VERIFY (build-spec A1/A2). Advance to the install
    // screen ONLY when the edge function confirms a real account exists; on failure, stay
    // on the form and show a retry instead of a false "You're In".
    const provisioned = await createTrialProfileVerified(value);

    if (provisioned.ok) {
      if (provisioned.otlToken) setOtlToken(provisioned.otlToken);
      logFunnelEvent("account_created", { email: value });
      setSubmitting(false);
      setSubmitted(true);
    } else {
      logFunnelEvent("provision_failed");
      setSubmitting(false);
      setProvisionError(true);
    }
  };

  const handleSendEmail = async () => {
    if (emailSent || emailLoading) return;
    setEmailLoading(true);
    setEmailError(false);
    const cleanEmail = email.trim().replace(/ /g, "+").toLowerCase();
    // Reuse the verified provisioning helper — by this point the account already exists
    // (the submit path only advances on a confirmed account), so this is a link RESEND.
    // Only show "sent" when the edge function actually confirms it (build-spec A3).
    const sent = await createTrialProfileVerified(cleanEmail);
    setEmailLoading(false);
    if (sent.ok) {
      setEmailSent(true);
    } else {
      setEmailError(true);
    }
  };

  // ─── First / second opt-in form (identical wiring + copy; Block 2 carries the anchor) ──
  const optInForm = (anchorId?: string) => (
    <div
      id={anchorId}
      className="bg-blue-50 border border-blue-100 rounded-3xl px-5 sm:px-8 py-8 scroll-mt-4"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center leading-tight mb-3">
        Ready to Start? Get Your Free Recovery Plan
      </h2>
      <p className="text-slate-600 text-sm sm:text-base text-center mb-6 leading-relaxed">
        Enter your name and email and you'll go straight into FCS, no download required, to build your recovery plan.
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
        <input type="hidden" name="meta_adtracking" value="FCS_Cold_App_Download" />
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
            autoComplete="given-name"
            className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            autoComplete="email"
            inputMode="email"
            onFocus={handleEmailFocus}
            className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {provisionError && (
          <p className="text-red-600 text-sm text-center font-medium">
            Something went wrong creating your account. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Creating your account…" : "Get My Free Recovery Plan"}
        </button>
      </form>

      {/* Browser-first reassurance — conversion-critical, not fine print (spec §9) */}
      <div className="mt-5 text-center">
        <p className="text-slate-700 text-sm font-semibold">
          Enter your email and get immediate access online.
        </p>
        <p className="text-slate-500 text-sm mt-1">
          No credit card. · Nothing to download. · Start right in your browser.
        </p>
      </div>
    </div>
  );

  // ── STEP 2: YOU'RE IN — GO STRAIGHT TO THE APP ───────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
        <main className="flex-1 w-full max-w-lg mx-auto px-6 py-12 flex flex-col justify-center">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-10 text-center">

            {/* Confirmation pill */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-green-100">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                You're In — Account Created
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              You're in.<br />Now let's build your plan.
            </h1>

            <p className="text-slate-600 text-base leading-relaxed mb-5 max-w-md mx-auto">
              Next you'll open the app and answer a few quick questions — how your foot feels, what you've already tried, where the pain sits. That's how Dr. Jonathan's system maps a recovery plan around <span className="font-semibold text-slate-900">your</span> foot, instead of handing you another generic list of exercises.
            </p>

            <div className="bg-blue-50 rounded-xl border border-blue-100 px-5 py-4 mb-7 max-w-md mx-auto">
              <p className="text-slate-700 text-sm leading-relaxed">
                It runs right in your browser, on <span className="font-semibold text-slate-900">any phone or any computer</span>. Nothing to download. No app store. No setup.
              </p>
            </div>

            <a
              href={installHref}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg text-center py-4 rounded-xl transition-colors mb-3"
            >
              Open the App &amp; Start &#8594;
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
              Takes about 3 minutes. No password to set up. No credit card.
            </p>

            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={14} />
              <p className="text-slate-400 text-xs">Free recovery plan · Built by Dr. Jonathan Schutza, PT, DPT</p>
            </div>
          </div>

          {/* Different-device fallback — demoted from a co-equal CTA to a quiet link */}
          <div className="text-center mt-6">
            {emailSent ? (
              <div className="flex items-center justify-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-green-700 text-sm font-semibold">Sign-in link sent — check your inbox.</p>
              </div>
            ) : (
              <>
                {emailError && (
                  <p className="text-red-600 text-sm mb-2">Couldn't send the link — please try again.</p>
                )}
                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={emailLoading || !email}
                  className="text-slate-500 text-sm underline hover:text-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                >
                  {emailLoading ? "Sending…" : "On a different device? Email my sign-in link instead."}
                </button>
              </>
            )}
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

  const active = TESTIMONIALS[testimonialIndex];

  // Shared Block 1 hero copy — single source so the desktop and mobile compositions can
  // never drift. Only the composition differs by breakpoint; the copy/CTA are identical.
  const heroCopy = (
    <>
      <p className="text-blue-600 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] mb-3">
        Plantar Fasciitis Recovery At Home
      </p>
      <h1 className="text-[28px] leading-[1.1] sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        <span className="text-slate-900">Trying to Get Rid of Plantar Fasciitis? </span>
        <span className="text-blue-600">Stop Guessing What to Do Next.</span>
      </h1>
      <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-5 max-w-md">
        Get a structured, at-home recovery plan that guides you day by day based on how your foot is responding.
      </p>

      <div className="flex items-center gap-2.5 mb-5">
        <ShieldCheck size={22} />
        <div className="leading-tight">
          <p className="text-slate-500 text-xs">Built by</p>
          <p className="text-slate-900 font-bold text-sm sm:text-base">Dr. Jonathan Schutza, PT, DPT</p>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToForm}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg px-6 py-4 rounded-xl transition-colors shadow-sm"
      >
        Get My Free Recovery Plan →
      </button>

      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-3 text-slate-500 text-xs">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>No credit card</span><span className="text-slate-300">·</span>
        <span>Start online</span><span className="text-slate-300">·</span>
        <span>Nothing to install</span>
      </div>
    </>
  );

  // ── STEP 1: PPC LANDING PAGE (Blocks 1–5) ────────────────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Header — no navigation, no hamburger (spec §3) */}
      <header className="w-full bg-white border-b border-slate-200 py-3 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="The Foot Capacity System" className="h-9 w-auto" />
            <p className="font-bold text-slate-900 text-sm sm:text-base leading-tight">Foot Capacity System</p>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full shrink-0 transition-colors"
          >
            Free Plan
          </button>
        </div>
      </header>

      <main className="flex-1 w-full">

        {/* ════════════ BLOCK 1 — HERO / SEARCH CONGRUENCY ════════════ */}
        {/* ONE continuous hero. The supplied heel/quote asset is the backdrop (whole image —
            quote lower-left, blue underline, dominant red heel lower-right — never cropped).
            The copy sits over its open upper-left; Dr. Jonathan dominates the upper-right with
            faded edges, so DJ and the heel read as a single composition with no hard seam and
            no white dead zone — not two stacked image sections. */}
        <section className="relative bg-white">
          <div className="relative max-w-5xl mx-auto overflow-hidden">

            {/* ───── Desktop (lg+): layered composition ───── */}
            {/* lg+ only, where the container is a fixed max-w-5xl (1024px) so the copy height
                is constant and the padding can be tuned once. padding-top opens the upper band
                for the copy (left) + Dr. Jonathan (right); the heel/message flows in below it,
                so the message clears the copy with no white dead zone up top (padding, not a
                margin, keeps the absolute copy/DJ pinned to the hero top). */}
            <div className="relative hidden lg:block" style={{ paddingTop: "300px" }}>
              {/* Heel + handwritten message — full supplied asset, nothing cropped; faded top
                  edge blends up into the copy/DJ so it reads as one hero, no seam. */}
              <img
                src={HEEL_MESSAGE_SRC}
                alt="The right exercise at the wrong time is still the wrong exercise."
                className="pointer-events-none select-none relative z-0 block w-full"
                style={{
                  WebkitMaskImage: "linear-gradient(to top, #000 90%, transparent 100%)",
                  maskImage: "linear-gradient(to top, #000 90%, transparent 100%)",
                }}
              />
              {/* Dr. Jonathan — large, dominates the upper-right; edges faded so he is never a
                  hard rectangle and his lower/left edges melt into the heel backdrop */}
              <img
                src={DJ_HEADSHOT_SRC}
                alt="Dr. Jonathan Schutza, PT, DPT"
                className="pointer-events-none select-none absolute top-0 right-0 z-10 w-[50%] md:w-[47%] max-w-[560px]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 58%, transparent 98%), linear-gradient(to left, #000 70%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 58%, transparent 98%), linear-gradient(to left, #000 70%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                  maskComposite: "intersect",
                }}
              />
              {/* Copy — left half, in the open upper-left above the message */}
              <div className="absolute top-0 left-0 z-20 w-[54%] px-5 sm:px-6 pt-8 md:pt-12">
                {heroCopy}
              </div>
            </div>

            {/* ───── Mobile + tablet (< lg): copy first, then a blended DJ → heel composition ───── */}
            <div className="lg:hidden px-5 sm:px-6 pt-8 max-w-3xl mx-auto">
              {heroCopy}
              <div className="relative mt-6">
                {/* Heel + message — full asset, nothing cropped (entire quote preserved) */}
                <img
                  src={HEEL_MESSAGE_SRC}
                  alt="The right exercise at the wrong time is still the wrong exercise."
                  className="pointer-events-none select-none block w-full"
                />
                {/* Dr. Jonathan flows in from the upper-right, faded into the heel's open upper
                    area — one composition, no hard rectangular break (DJ may crop) */}
                <img
                  src={DJ_HEADSHOT_SRC}
                  alt="Dr. Jonathan Schutza, PT, DPT"
                  className="pointer-events-none select-none absolute top-0 right-0 z-10 w-[58%] sm:w-[46%] max-w-[260px] sm:max-w-[340px]"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 54%, transparent 96%), linear-gradient(to left, #000 64%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, #000 54%, transparent 96%), linear-gradient(to left, #000 64%, transparent 100%)",
                    WebkitMaskComposite: "source-in",
                    maskComposite: "intersect",
                  }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ════════════ BLOCK 2 — PRODUCT / HOW FCS WORKS ════════════ */}
        <section className="bg-white px-5 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <AccentBar />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center leading-tight mb-4">
              <span className="text-slate-900">Your Foot Changes.</span><br />
              <span className="text-blue-600">Your Plan Should Too.</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg text-center leading-relaxed mb-8 max-w-xl mx-auto">
              Plantar fasciitis recovery isn't about finding more exercises. It's about knowing{" "}
              <span className="font-bold text-slate-900">what your foot is ready for today and what to do next.</span>
            </p>

            {/* Product image with restrained pale-blue glow */}
            <div className="relative flex justify-center mb-10">
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-[88%] h-[72%] rounded-[50%] bg-blue-100/70 blur-2xl" />
              </div>
              <img
                src={PHONES_SRC}
                alt="The Foot Capacity System app — Today's Log, Functional Assessment, and Progress"
                className="relative w-full max-w-lg"
                loading="lazy"
              />
            </div>

            {/* Three-step process */}
            <div className="space-y-6 max-w-xl mx-auto mb-12">
              {[
                { n: "1", label: "Check In", body: "Track your pain and activity so FCS knows where you are." },
                { n: "2", label: "Follow Your Plan", body: "Get a personalized plan with guided exercises, sets, and reps." },
                { n: "3", label: "Build From There", body: "Keep checking in. FCS adjusts based on your progress and how your foot is responding." },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 font-extrabold text-lg flex items-center justify-center shrink-0">
                    {step.n}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm uppercase tracking-wide mb-1">{step.label}</p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FIRST OPT-IN FORM — Block 1 CTA destination */}
            {optInForm("free-recovery-plan")}
          </div>
        </section>

        {/* ════════════ BLOCK 3 — DIFFERENCE + DR. JONATHAN ════════════ */}
        <section className="bg-slate-50 px-5 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <AccentBar />
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5 text-center">
              <span className="text-slate-900">Random Exercises</span><br />
              <span className="text-blue-600">Aren't a Recovery Plan.</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              You can find hundreds of plantar fasciitis exercises online. The hard part is knowing{" "}
              <span className="font-bold text-slate-900">which ones make sense for your foot, how much to do, and when you're ready for more.</span>
            </p>
            <p className="text-slate-900 font-bold text-base mb-2">That's the difference with FCS.</p>
            <p className="text-slate-600 text-base leading-relaxed mb-10">
              Instead of bouncing between stretches, YouTube videos, and conflicting advice, you follow a structured recovery process built by a physical therapist who treats these problems every day.
            </p>

            <div className="border-t border-slate-200 pt-10">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-2">You're Not Doing This Alone.</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                Meet Dr. Jonathan Schutza, PT, DPT
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                Dr. Jonathan built the Foot Capacity System around a simple idea:{" "}
                <span className="font-bold text-slate-900">your foot needs the right amount of challenge at the right time.</span>
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                FCS gives you a plan to follow at home, while Dr. Jonathan regularly reviews member progress and provides guidance through the messaging system when questions, setbacks, or flare-ups come up.
              </p>
            </div>

            {/* Video introduction card (text only — no play icon here) */}
            <div className="mt-12 mb-6 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-6 text-center">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-2">A Message From Dr. Jonathan</p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                Why So Many People Stay Stuck
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-snug max-w-sm mx-auto">
                Most people aren't missing effort. They're missing direction.
              </p>
            </div>

            {/* Functional video player */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-10" style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={`https://customer-hene8ngxxo3eajlj.cloudflarestream.com/${VIDEO_ID}/iframe${!posterVisible ? "?autoplay=true" : ""}`}
                style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="A message from Dr. Jonathan Schutza"
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

            {/* Closing authority card */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-6 flex items-start gap-4">
              <ShieldCheck size={32} />
              <p className="text-blue-700 font-bold text-base sm:text-lg leading-snug">
                You're not just getting exercises. You're getting a process backed by a real physical therapist.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════ BLOCK 4 — PROOF + SECOND OPT-IN ════════════ */}
        <section className="bg-white px-5 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-3 text-center">Real Members. Measurable Progress.</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 text-center">
              <span className="text-slate-900">See What Progress</span><br />
              <span className="text-blue-600">Can Look Like.</span>
            </h2>
            <p className="text-slate-600 text-base text-center leading-relaxed mb-8 max-w-xl mx-auto">
              Recovery looks different for everyone. Here's what FCS members are reporting as they build strength, improve function, and get back to the things they want to do.
            </p>

            {/* Existing member-progress component — unchanged (not a testimonial carousel) */}
            <UserJourneyCarousel />

            {/* Testimonial transition */}
            <div className="pt-12 mt-4">
              <AccentBar />
              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-3 text-center">Real People. Real Experiences.</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-8 text-center">
                Here's What FCS Members Are Saying.
              </h3>
            </div>

            {/* Swipeable testimonial carousel */}
            <div className="relative mb-12">
              <button
                type="button"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>

              <div
                className="px-9 sm:px-12"
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (dx > 45) prevTestimonial();
                  else if (dx < -45) nextTestimonial();
                }}
              >
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 sm:px-7 py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-slate-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {active.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base leading-tight">{active.name}</p>
                      <div className="flex gap-0.5 text-amber-400 mt-0.5">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 9.5 9 9" /></svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    {active.body.split("\n\n").map((para, i) => (
                      <p key={i} className="text-slate-700 text-[15px] leading-relaxed">{para}</p>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs">{active.meta}</p>
                </div>
              </div>

              {/* Pagination dots */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.initials}
                    type="button"
                    onClick={() => setTestimonialIndex(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === testimonialIndex ? "w-5 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
                  />
                ))}
              </div>
            </div>

            {/* SECOND / FINAL OPT-IN FORM */}
            {optInForm()}
          </div>
        </section>

        {/* ════════════ BLOCK 5 — FAQ + FOOTER ════════════ */}
        <section className="bg-slate-50 px-5 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <AccentBar />
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 text-center">
              <span className="text-slate-900">A Few Questions</span><br />
              <span className="text-blue-600">Before You Start.</span>
            </h2>
            <p className="text-slate-600 text-base text-center leading-relaxed mb-8 max-w-md mx-auto">
              Get the answers you need so you can feel confident taking the next step.
            </p>

            <div className="space-y-3">
              {FAQS.map((faq, i) => {
                const open = faqOpen === i;
                return (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setFaqOpen(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      className="w-full text-left px-4 sm:px-5 py-4 flex items-center gap-3"
                    >
                      <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                      <span className="flex-1 text-slate-900 font-bold text-sm sm:text-base leading-snug">{faq.q}</span>
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {open && (
                      <div id={`faq-panel-${i}`} className="px-4 sm:px-5 pb-4 pl-14 sm:pl-15">
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer trust line */}
            <div className="flex items-center justify-center gap-2 mt-14">
              <ShieldCheck size={15} />
              <p className="text-slate-400 text-sm">Trusted by thousands. Built by a physical therapist. Backed by science.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Legal footer */}
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
