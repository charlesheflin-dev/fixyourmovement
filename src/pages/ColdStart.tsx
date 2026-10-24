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

// Production assets (supplied, used intact — v3 spec §3). The heel/message image now sits
// in Section 4, separate from Dr. Jonathan; the phone image is the v3 sharpened asset.
const DJ_HEADSHOT_SRC = "/images/cold/dj-headshot.jpg";
const HEEL_MESSAGE_SRC = "/images/cold/heel-message.png";
const PHONES_SRC = "/images/cold/phones-ppc-sharpened.png";

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

// ─── Form position (which of the two identical forms the visitor used) ───────────
// Rides in the EXISTING funnel-event `meta` field (log-funnel-event stores any object
// <= 2000 chars as jsonb; nothing reads meta today). Additive only — it never changes
// which events fire or how often.
type FormPosition = "form_top" | "form_bottom";
const FORM_ANCHOR: Record<FormPosition, string> = {
  form_top: "free-recovery-plan",
  form_bottom: "free-recovery-plan-bottom",
};

// ─── Navigation-click diagnostics (GA4, existing gtag only) ──────────────────────
// Fixed location ids only — never user content. Diagnostics, not a conversion: no
// key-event / Ads import intended. A missing or failing gtag must never block scrolling.
type AnchorLocation = "header_free_plan" | "hero_free_plan" | "footer_free_plan";
function trackAnchorClick(location: AnchorLocation) {
  try {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "lp_anchor_click", { event_category: "navigation", event_label: location });
    }
  } catch {
    // Non-fatal — analytics must never block navigation
  }
}

function prefersReducedMotion(): boolean {
  try {
    return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

// ─── Testimonials (Section 7) — authentic member wording, source-of-truth content ─
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

// ─── FAQ (Section 9) — v3 copy ───────────────────────────────────────────────────
const FAQS = [
  {
    q: "How do I get started?",
    a: "Enter your name and email to start online. Answer a few questions about your foot, then follow your starting plan with exercise videos and clear sets and reps. Nothing needs to be downloaded to begin.",
  },
  {
    q: "How much time does it take each day?",
    a: "Most daily sessions take about 15–20 minutes, including your exercises and check-in. The videos show you what to do, and your plan tells you how many sets and reps to complete.",
  },
  {
    q: "What if my foot flares up or I have a question?",
    a: "Keep your pain check-ins accurate. FCS uses your responses to adjust your guidance, including easing back when your foot needs it. For questions, start with Ask Dr. Jonathan AI inside the app. You can also message Dr. Jonathan when you need his input on your situation.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. Your first 7 check-ins are free, with no credit card required. After that, you can choose a paid plan if you’d like to continue. There’s no automatic charge.",
  },
];

// ─── Shared type + spacing tokens (v3 §2) — one style per role across the page ───
const T = {
  h1: "text-[32px] min-[360px]:text-[34px] md:text-[52px] font-extrabold leading-[1.12] tracking-tight",
  h2: "text-[28px] md:text-[38px] font-extrabold leading-[1.18] tracking-tight text-center",
  step: "text-[18px] md:text-[20px] font-bold leading-[1.3] uppercase tracking-wide text-slate-900",
  statement: "text-[21px] md:text-[26px] font-bold leading-[1.35] text-slate-900",
  body: "text-[17px] md:text-[18px] leading-[1.55] text-slate-700",
  faqQ: "text-[17px] md:text-[18px] font-semibold leading-[1.4] text-slate-900",
  label: "text-[16px] font-semibold leading-[1.4] text-slate-900",
  button: "text-[16px] md:text-[17px] font-bold leading-[1.3]",
  eyebrow: "text-[12px] md:text-[13px] font-bold leading-[1.4] uppercase tracking-[0.16em] text-blue-600",
  subtitle: "text-[14px] md:text-[16px] font-semibold leading-[1.4] text-blue-600",
  note: "text-[15px] leading-[1.45] text-slate-500",
  legal: "text-[14px] leading-[1.5]",
  closing: "text-[22px] md:text-[28px] font-semibold leading-[1.35] text-slate-900",
};
// Mobile 20px gutters (16px at <=340px). Each section contributes half the 48/72px gap,
// so one effective gap applies at every boundary.
const GUTTER = "px-5 max-[340px]:px-4";
const SECTION = `${GUTTER} py-6 md:py-9`;
const TEXT_WIDTH = "max-w-[720px] mx-auto";
const PRIMARY_BUTTON =
  `${T.button} inline-flex items-center justify-center text-center min-h-[52px] px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`;

// ─── Small shared marks ──────────────────────────────────────────────────────────
function ShieldCheck({ size = 18, stroke = "#2563EB" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function FiveStars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" role="img" aria-label="Five stars">
      {[0, 1, 2, 3, 4].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 9.5 9 9" />
        </svg>
      ))}
    </div>
  );
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
  // Which form instance the in-flight / failed submit came from, so the loading label and
  // the retry error show on that form only. `submitting` stays one shared guard, so the two
  // forms can never run overlapping submits.
  const [activeForm, setActiveForm] = useState<FormPosition | null>(null);

  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  // Video loads only on tap (lazy; never autoplays with sound on page load).
  const [videoStarted, setVideoStarted] = useState(false);
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

  // Once per page view (whichever form is focused first), exactly as before — the form
  // position only annotates it.
  const handleEmailFocus = (position: FormPosition) => {
    if (emailFocusLogged.current) return;
    emailFocusLogged.current = true;
    logFunnelEvent("email_field_viewed", { meta: { form_position: position } });
  };

  // Anchor CTAs (header FREE PLAN, hero, closing) smooth-scroll to a form — never a new
  // page, modal, or submission. Scroll first; the diagnostic event can't block it.
  const goToForm = (position: FormPosition, location: AnchorLocation) => {
    const el = document.getElementById(FORM_ANCHOR[position]);
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    trackAnchorClick(location);
  };

  const prevTestimonial = () =>
    setTestimonialIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () =>
    setTestimonialIndex(i => (i + 1) % TESTIMONIALS.length);

  const handleDownloadSubmit = async (e: React.FormEvent<HTMLFormElement>, position: FormPosition) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement | null;
    const value = emailInput?.value?.trim().toLowerCase();
    if (!value) {
      emailInput?.focus();
      return;
    }

    logFunnelEvent("email_submitted", { meta: { form_position: position } });
    setEmail(value);
    setProvisionError(false);
    setActiveForm(position);
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
      logFunnelEvent("account_created", { email: value, meta: { form_position: position } });
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

  // ─── Sections 3 and 8 opt-in form — identical card, fields, button and wiring; only the
  //     heading and introduction differ. Unique wrapper, heading and field IDs per instance. ──
  const optInForm = (position: FormPosition) => {
    const anchorId = FORM_ANCHOR[position];
    const isTop = position === "form_top";
    const isActive = activeForm === position;
    return (
      <div
        id={anchorId}
        className="max-w-[560px] mx-auto bg-blue-50 border border-blue-100 rounded-[20px] px-6 py-6 md:px-8 md:py-8 scroll-mt-6"
      >
        <h2 id={`${anchorId}-heading`} className={T.h2}>
          {isTop ? (
            <>
              <span className="block text-slate-900">Start With a Plan</span>
              <span className="block text-blue-600">for Your Foot.</span>
            </>
          ) : (
            <>
              <span className="block text-slate-900">Give Yourself</span>
              <span className="block text-blue-600">a Clear Next Step.</span>
            </>
          )}
        </h2>
        <p className={`${T.body} text-center mt-5`}>
          {isTop
            ? "Enter your name and email, answer a few questions, and get your starting exercises with video guidance and assigned sets and reps."
            : "Start at home with guided exercises and a plan that responds to your check-ins."}
        </p>

        <form
          method="post"
          acceptCharset="UTF-8"
          action="https://www.aweber.com/scripts/addlead.pl"
          onSubmit={(e) => handleDownloadSubmit(e, position)}
          aria-labelledby={`${anchorId}-heading`}
          className="mt-6 space-y-5"
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

          <div>
            <label htmlFor={`${anchorId}-name`} className={`${T.label} block mb-2`}>First name</label>
            <input
              id={`${anchorId}-name`}
              type="text"
              name="name"
              autoComplete="given-name"
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-[16px] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor={`${anchorId}-email`} className={`${T.label} block mb-2`}>Email address</label>
            <input
              id={`${anchorId}-email`}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              onFocus={() => handleEmailFocus(position)}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-[16px] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {provisionError && isActive && (
            <p className="text-red-600 text-[15px] text-center font-medium" role="alert">
              Something went wrong creating your account. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`${PRIMARY_BUTTON} w-full disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {submitting && isActive ? "Creating your account…" : "Start My Free Recovery Plan →"}
          </button>
        </form>

        {/* Browser-first reassurance — conversion-critical, not fine print */}
        <div className="mt-3 md:mt-5 text-center">
          <p className="text-[14px] leading-[1.45] md:text-[15px] text-slate-500">
            <span className="block md:inline">Your first 7 check-ins are free.</span>{" "}
            <span className="block md:inline mt-1 md:mt-0">No credit card required.</span>
          </p>
          <p className="text-[14px] leading-[1.45] md:text-[15px] text-slate-500 mt-1.5 md:mt-0">
            <span className="block md:inline">Start online,</span>{" "}
            <span className="block md:inline">with nothing to download.</span>
          </p>
        </div>
      </div>
    );
  };

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

  // ── STEP 1: PPC LANDING PAGE (v3 Sections 1–10) ──────────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Header — logo left, FREE PLAN right, no navigation / hamburger */}
      <header className={`w-full bg-white border-b border-slate-200 py-3 ${GUTTER}`}>
        <div className="max-w-[1120px] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src={logo} alt="The Foot Capacity System" className="h-9 w-auto" />
            <p className="font-bold text-slate-900 text-sm sm:text-base leading-tight">Foot Capacity System</p>
          </div>
          <button
            type="button"
            onClick={() => goToForm("form_top", "header_free_plan")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wide px-4 py-2 min-h-[40px] rounded-full shrink-0 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Free Plan
          </button>
        </div>
      </header>

      <main className="flex-1 w-full">

        {/* ════════════ SECTION 1 — HERO ════════════ */}
        {/* Mobile: copy → CTA → reassurance → Michelle proof → modest portrait.
            Desktop: copy left; Michelle + smaller portrait right. No heel image here. */}
        <section className={`${GUTTER} pt-8 pb-6 md:pt-12 md:pb-9`}>
          <div className="max-w-[1120px] mx-auto md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:items-center">
            <div className="min-w-0">
              <p className={`${T.eyebrow} mb-3`}>Plantar Fasciitis Recovery at Home</p>
              <h1 className={T.h1}>
                <span className="block text-slate-900">Stop Guessing Your Way Through Plantar Fasciitis.</span>
                <span className="block text-blue-600">Follow a Plan That Adjusts to Your Foot.</span>
              </h1>
              <p className={`${T.body} mt-5`}>
                Exercise videos show you what to do. Assigned sets and reps tell you how much. Your daily check-ins help guide what comes next.
              </p>

              <div className="flex items-center gap-2 md:gap-2.5 mt-5">
                <ShieldCheck size={22} />
                <p className="text-[14px] leading-[1.4] md:text-[18px] md:leading-[1.55] text-slate-700">
                  Built by <span className="font-bold text-slate-900">Dr. Jonathan Schutza, <span className="whitespace-nowrap">PT, DPT</span></span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => goToForm("form_top", "hero_free_plan")}
                className={`${PRIMARY_BUTTON} w-full sm:w-auto mt-6 shadow-sm`}
              >
                Start My Free Recovery Plan →
              </button>

              <p className={`${T.note} mt-3`}>No credit card. Start online. Nothing to install.</p>
            </div>

            <div className="min-w-0 mt-8 md:mt-0 space-y-6">
              {/* Michelle — abbreviated five-star proof (live text, authentic wording) */}
              <figure className="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 py-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <figcaption className="font-bold text-slate-900 text-[16px] leading-tight">Michelle Shabason</figcaption>
                  <FiveStars />
                </div>
                <blockquote className={`${T.body} mt-3`}>
                  “Huge improvements: almost no morning pain, walking/standing much longer, including at work, and much more functional around the house.”
                </blockquote>
                <p className="text-[14px] leading-[1.4] md:text-[15px] md:leading-[1.45] text-slate-500 mt-3">
                  <span className="block md:inline">September 8, 2026</span>
                  <span className="hidden md:inline"> · </span>
                  <span className="block md:inline mt-0.5 md:mt-0">10 weeks after purchase</span>
                </p>
                <p className="text-[14px] leading-[1.4] md:text-[15px] md:leading-[1.45] text-slate-500 mt-2 md:mt-1">Individual results vary.</p>
              </figure>

              <img
                src={DJ_HEADSHOT_SRC}
                alt="Dr. Jonathan Schutza, PT, DPT"
                className="w-full max-w-[360px] md:max-w-none mx-auto rounded-2xl object-cover object-top aspect-[3/2] shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* ════════════ SECTION 2 — RECOGNITION + PRODUCT IMAGE ════════════ */}
        <section className={`${GUTTER} pt-6 md:pt-9`}>
          <div className={TEXT_WIDTH}>
            <h2 className={T.h2}>
              <span className="block text-slate-900">Foot Pain Takes More</span>
              <span className="block text-blue-600">Than Your Next Step.</span>
            </h2>

            <div className="mt-5 space-y-4">
              <p className={`${T.body} border-l-[3px] border-blue-200 pl-4`}>
                Two hours into your shift. Your heel is screaming. Six hours still ahead.
              </p>
              <p className={`${T.body} border-l-[3px] border-blue-200 pl-4`}>
                Your kids call, “Come play!” But you’re on the sidelines again.
              </p>
              <p className={`${T.body} border-l-[3px] border-blue-200 pl-4`}>
                Walking used to clear your head. Now you dread the morning after.
              </p>
              <p className={`${T.body} font-bold text-slate-900 pt-3 md:pt-0`}>
                Getting through the day isn’t the same as enjoying it.
              </p>
              <p className={T.body}>
                Start working toward more comfortable movement with guided sessions that take about{" "}
                <span className="font-bold text-slate-900">15–20 minutes a day at home.</span>
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <img
                src={PHONES_SRC}
                alt="The Foot Capacity System app on three phones"
                width={1326}
                height={1186}
                className="w-full max-w-[560px] h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ════════════ SECTION 3 — THREE STEPS + FIRST FORM ════════════ */}
        {/* Continues Section 2's explanation: ~28px from the phone image, no heading. */}
        <section className={`${GUTTER} pt-7 pb-6 md:pt-8 md:pb-9`}>
          <div className={TEXT_WIDTH}>
            <ol className="space-y-6 md:space-y-7">
              {[
                { n: "1", label: "Check In", body: "Report your pain so your plan accounts for how your foot is feeling." },
                { n: "2", label: "Watch and Follow", body: "Watch the exercise videos, follow your assigned sets and reps, and record what you complete." },
                { n: "3", label: "Know What Comes Next", body: "Your check-ins help the system guide when to build up, stay steady, or ease back." },
              ].map((step) => (
                <li key={step.n} className="grid grid-cols-[36px_1fr] gap-x-3 items-start">
                  <span className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-extrabold text-[17px] flex items-center justify-center" aria-hidden="true">
                    {step.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className={T.step}>
                      <span className="sr-only">Step {step.n}: </span>{step.label}
                    </h3>
                    <p className={`${T.body} mt-1`}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* FIRST FORM — header FREE PLAN + hero CTA destination */}
            <div className="mt-10 md:mt-12">
              {optInForm("form_top")}
            </div>
          </div>
        </section>

        {/* ════════════ SECTION 4 — DIFFERENCE + HEEL IMAGE ════════════ */}
        <section className={SECTION}>
          <div className={TEXT_WIDTH}>
            <h2 className={T.h2}>
              <span className="block text-slate-900">YouTube Knows What You Watched.</span>
              <span className="block text-blue-600">It Doesn’t Know Your Foot.</span>
            </h2>
            <p className={`${T.body} mt-5`}>
              Saved videos. Screenshots. Stretches. Strengthening exercises. You can collect plenty of advice and still wonder what to do tomorrow morning.
            </p>
            <p className={`${T.body} font-bold text-slate-900 mt-4`}>
              Which exercise? How much? Should you progress, stay steady, or back off?
            </p>

            {/* Supplied heel/message image, complete and intact — its quote is in the asset */}
            <div className="mt-8 flex justify-center">
              <img
                src={HEEL_MESSAGE_SRC}
                alt="The right exercise at the wrong time is still the wrong exercise."
                width={1239}
                height={1269}
                className="w-full max-w-[560px] h-auto"
                loading="lazy"
              />
            </div>

            <p className={`${T.body} mt-8`}>
              FCS brings your exercises and daily check-ins together to guide those decisions. Your plan responds to what you report, giving you a clearer next step.
            </p>
          </div>
        </section>

        {/* ════════════ SECTION 5 — DR. JONATHAN + VIDEO ════════════ */}
        <section className={SECTION}>
          <div className={TEXT_WIDTH}>
            <h2 className={`${T.h2} text-slate-900`}>Meet Dr. Jonathan Schutza.</h2>
            <p className={`${T.subtitle} text-center mt-2`}>Your Physical Therapist Behind FCS.</p>

            <p className={`${T.statement} text-center mt-6`}>
              Calming pain is one thing. Rebuilding what your foot can handle is another.
            </p>

            <div className="mt-6 space-y-4">
              <p className={T.body}>
                Dr. Jonathan Schutza, PT, DPT, built FCS to help you work toward both, with the right amount of challenge at the right time.
              </p>
              <p className={T.body}>
                His involvement goes beyond the exercise videos. He reviews member progress and provides individual guidance when his input is needed.
              </p>
            </div>

            {/* Existing approved video — responsive 16:9, loads only when tapped */}
            <div className="mt-8 relative w-full rounded-2xl overflow-hidden shadow-lg bg-slate-900" style={{ paddingTop: "56.25%" }}>
              {videoStarted ? (
                <iframe
                  src={`https://customer-hene8ngxxo3eajlj.cloudflarestream.com/${VIDEO_ID}/iframe?autoplay=true`}
                  style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="A message from Dr. Jonathan Schutza"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setVideoStarted(true)}
                  aria-label="Play the video message from Dr. Jonathan Schutza"
                  className="absolute inset-0 w-full h-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                >
                  <img
                    src={VIDEO_POSTER_SRC}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span
                    className="relative w-16 h-16 rounded-full bg-white/90 flex items-center justify-center"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
                    aria-hidden="true"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#2563EB">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ════════════ SECTION 6 — MEASURABLE MEMBER RESULTS ════════════ */}
        <section className={SECTION}>
          <div className={TEXT_WIDTH}>
            <p className={`${T.eyebrow} text-center`}>Real Members. Measurable Progress.</p>
            <h2 className={`${T.h2} mt-3`}>
              <span className="block text-slate-900">See What Progress</span>
              <span className="block text-blue-600">Can Look Like.</span>
            </h2>
            <p className={`${T.body} text-center mt-5`}>
              Explore changes in pain and reported foot function from FCS members. Open their stories to see where they started and how they progressed.
            </p>
            <p className={`${T.note} text-center mt-3`}>
              Recovery looks different for everyone. Individual results vary.
            </p>
          </div>

          {/* Existing member-progress component — unchanged (horizontal scroll + tap-to-open;
              not a testimonial carousel, no arrows/dots) */}
          <div className="max-w-[1120px] mx-auto mt-8">
            <UserJourneyCarousel />
          </div>

          <p className={`${T.body} font-bold text-slate-900 text-center mt-6`}>
            Tap any result to read the member’s full story.
          </p>
        </section>

        {/* ════════════ SECTION 7 — MEMBER TESTIMONIALS ════════════ */}
        <section className={SECTION}>
          <div className={TEXT_WIDTH}>
            <h2 className={T.h2}>
              <span className="block text-slate-900">More Comfortable Mornings.</span>
              <span className="block text-blue-600">More of Everyday Life.</span>
            </h2>
            <p className={`${T.body} text-center mt-5`}>
              Members share what their progress has meant at home, at work, and in the activities they enjoy.
            </p>

            {/* Existing swipeable testimonial carousel — Brittany, Jocelyn Lavoie, Karen Stone */}
            <div className="relative mt-8">
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
                className="px-11 sm:px-12"
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
                      <p key={i} className="text-slate-700 text-[16px] leading-relaxed">{para}</p>
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
                    aria-current={i === testimonialIndex ? "true" : undefined}
                    className={`h-2 rounded-full transition-all ${i === testimonialIndex ? "w-5 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ SECTION 8 — SECOND / FINAL FORM ════════════ */}
        <section className={SECTION}>
          <div className={TEXT_WIDTH}>
            {optInForm("form_bottom")}
          </div>
        </section>

        {/* ════════════ SECTION 9 — FAQ ACCORDION ════════════ */}
        <section className={SECTION}>
          <div className={TEXT_WIDTH}>
            <h2 className={T.h2}>
              <span className="text-slate-900">Before You </span>
              <span className="text-blue-600">Start.</span>
            </h2>

            {/* Single-open accordion (existing convention), chevron only, initially collapsed */}
            <div className="mt-8 space-y-3">
              {FAQS.map((faq, i) => {
                const open = faqOpen === i;
                return (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200">
                    <h3>
                      <button
                        type="button"
                        id={`faq-question-${i}`}
                        onClick={() => setFaqOpen(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${i}`}
                        className="w-full min-h-[56px] text-left px-5 py-4 flex items-center justify-between gap-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <span className={`${T.faqQ} flex-1 min-w-0`}>{faq.q}</span>
                        <svg
                          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B"
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      aria-hidden={!open}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className={`${T.body} px-5 pb-5`}>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════ SECTION 10 — CLOSING CTA ════════════ */}
        <section className={`${GUTTER} pt-6 pb-10 md:pt-9 md:pb-14`}>
          <div className={`${TEXT_WIDTH} text-center`}>
            <p className={T.closing}>
              A recovery plan built by a physical therapist, ready to follow at home.
            </p>
            <button
              type="button"
              onClick={() => goToForm("form_bottom", "footer_free_plan")}
              className={`${PRIMARY_BUTTON} w-full sm:w-auto mt-6 shadow-sm`}
            >
              Start My Free Recovery Plan →
            </button>
            <p className={`${T.note} mt-3`}>No credit card required.</p>
          </div>
        </section>
      </main>

      {/* Quiet legal footer */}
      <footer className={`border-t border-slate-200 bg-white py-6 ${GUTTER} text-center`}>
        <p className={`${T.legal} text-slate-400`}>&copy; {new Date().getFullYear()} The Foot Capacity System</p>
        <p className={`${T.legal} text-slate-400 mt-1`}>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          {" "}&middot;{" "}
          <a href="/terms-of-service" className="hover:underline">Terms</a>
          {" "}&middot;{" "}
          <a href="/contact" className="hover:underline">Contact</a>
        </p>
      </footer>
    </div>
  );
}
