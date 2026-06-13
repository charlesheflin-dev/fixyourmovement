import { useState, useEffect } from "react";

// ─── Constants ──────────────────────────────────────────────────────────────────
const CREATE_TRIAL_PROFILE_URL = "https://zsdmnapwxlimktqrnmii.supabase.co/functions/v1/create-trial-profile";
const WORKER_URL = "https://fcs-archetype-worker.charles-heflin.workers.dev";
const INSTALL_URL = "https://app.fixyourmovement.com/install";
const VIDEO_ID = "b37100f8162e1ab91cf86c9e284447da";
const VIDEO_THUMBNAIL_ID = "0a87b6a7-6fb2-48dc-9e26-aa5c134c0200";

// ─── useIsMobile ────────────────────────────────────────────────────────────────
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

// ─── QR Code ────────────────────────────────────────────────────────────────────
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

// ─── Main component ─────────────────────────────────────────────────────────────
export default function DownloadApp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [objectionOpen, setObjectionOpen] = useState<number | null>(null);

  const isMobile = useIsMobile();

  // ── Step 1: Form submit — AWeber only, no install email yet ─────────────────
  const handleFormSubmit = async () => {
    if (!name.trim() || !email.trim()) return;
    setFormLoading(true);
    setFormError("");

    const cleanEmail = email.trim().replace(/ /g, "+").toLowerCase();
    const cleanName = name.trim();

    // Subscribe + tag in AWeber — non-fatal
    try {
      await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          name: cleanName,
          checkout_tag: "trial_accepted",
        }),
      });
    } catch {
      // Non-fatal — proceed regardless
    }

    setFormLoading(false);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  // ── Step 2: Send install email — creates trial profile + fires Resend email ──
  const handleSendEmail = async () => {
    if (emailSent || emailLoading) return;
    setEmailLoading(true);

    const cleanEmail = email.trim().replace(/ /g, "+").toLowerCase();

    try {
      await fetch(CREATE_TRIAL_PROFILE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
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
      <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
        <main className="max-w-2xl mx-auto px-6 py-8">

          <div style={{ paddingTop: "32px" }}>
            <Pill>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Free 7-Day Trial
            </Pill>

            <h1 className="text-3xl font-extrabold text-slate-900 text-center leading-tight mb-3">
              See How Your Foot Responds<br />In The Next 7 Days.
            </h1>
            <p className="text-slate-500 text-base text-center leading-relaxed mb-5 max-w-sm mx-auto">
              No credit card. No commitment. A clear daily plan and a way to track whether it's working.
            </p>

            <div className="flex justify-center gap-6 mb-8">
              <div className="flex items-center gap-1.5"><Check /><span className="text-slate-600 text-sm">No credit card</span></div>
              <div className="flex items-center gap-1.5"><Check /><span className="text-slate-600 text-sm">Cancel anytime</span></div>
            </div>

            {/* Opt-in form */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
              <p className="text-slate-900 font-bold text-base text-center mb-1">Start Your Free Trial</p>
              <p className="text-slate-500 text-sm text-center mb-5">Enter your details to access the download page.</p>

              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && name && email) handleFormSubmit(); }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {formError && (
                <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{formError}</p>
              )}

              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={!name.trim() || !email.trim() || formLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-xl transition-colors"
              >
                {formLoading ? "One moment…" : "START MY FREE 7-DAY TRIAL →"}
              </button>

              <p className="text-center text-slate-400 text-xs mt-3">
                No spam. No obligation. Unsubscribe anytime.
              </p>
            </div>

            {/* Problem section — above the fold on opt-in page */}
            <div className="mb-8">
              <h2 className="text-xl font-extrabold text-slate-900 text-center leading-tight mb-5">
                Most People Are One Missing Piece Away.
              </h2>
              <div className="space-y-3 mb-5">
                {[
                  "You've tried things. Some helped. None of it stuck.",
                  "You don't know if what you're doing is making it better or worse.",
                  "Every flare-up feels like starting over.",
                ].map((line, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 px-5 py-4">
                    <p className="text-slate-800 text-sm font-semibold leading-snug">"{line}"</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-sm text-center leading-relaxed max-w-xs mx-auto">
                The problem usually isn't effort. It's not having a clear process to follow.
              </p>
            </div>

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

  // ── STEP 2: DOWNLOAD PAGE ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="max-w-2xl mx-auto px-6 py-8">

        {/* ── SECTION 1 — HERO + INSTALL CTA ─────────────────────── */}

        <div style={{ paddingTop: "32px" }}>
          <Pill>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Free 7-Day Trial
          </Pill>

          <h1 className="text-3xl font-extrabold text-slate-900 text-center leading-tight mb-3">
            See How Your Foot Responds<br />In The Next 7 Days.
          </h1>
          <p className="text-slate-500 text-base text-center leading-relaxed mb-5 max-w-sm mx-auto">
            No credit card. No commitment. A clear daily plan and a way to track whether it's working.
          </p>

          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-1.5"><Check /><span className="text-slate-600 text-sm">No credit card</span></div>
            <div className="flex items-center gap-1.5"><Check /><span className="text-slate-600 text-sm">Cancel anytime</span></div>
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

        {/* ── PRICING TRANSPARENCY ────────────────────────────────── */}

        <div className="bg-slate-50 rounded-2xl border border-slate-200 px-5 py-5 mb-8">
          <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-3">What Happens After 7 Days?</p>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            After your trial, you'll see two simple options inside the app. No automatic charges — nothing happens unless you choose to continue.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <p className="text-slate-700 text-sm leading-relaxed">
                <span className="font-semibold text-slate-900">$397 one-time</span> — full 12-week program, lifetime access
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <p className="text-slate-700 text-sm leading-relaxed">
                <span className="font-semibold text-slate-900">$157/month × 3 payments</span> — same program, spread out
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-4 leading-relaxed">
            No card required to start. If you decide it's not for you, you just don't continue.
          </p>
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
              src={`https://customer-hene8ngxxo3eajlj.cloudflarestream.com/${VIDEO_ID}/iframe`}
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
                backgroundImage: `url(https://imagedelivery.net/ZUbdF1A6bMNaR2l0OC84jw/${VIDEO_THUMBNAIL_ID}/public)`,
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
            Start Today. See What 7 Days Does.
          </h2>
          <p className="text-slate-500 text-sm text-center leading-snug mb-6 max-w-xs mx-auto">
            About 10–15 minutes per day. No credit card. No commitment.
          </p>

          {isMobile ? (
            <a
              href={INSTALL_URL}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base text-center py-4 rounded-xl transition-colors mb-4"
            >
              INSTALL THE APP — START FREE →
            </a>
          ) : (
            <div className="mb-6">
              <QRCode url={INSTALL_URL} />
            </div>
          )}

          <p className="text-center text-slate-500 text-sm leading-relaxed max-w-xs mx-auto mb-8">
            You can cancel anytime. The trial exists because we're confident in what happens in the first week.
          </p>

          {/* Send install instructions by email */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 px-5 py-5 text-center">
            <p className="text-slate-600 text-sm mb-4">
              Want the install link sent to <span className="font-semibold text-slate-900">{email}</span>?
            </p>
            {emailSent ? (
              <div className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-green-700 text-sm font-semibold">Install link sent — check your inbox.</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={emailLoading}
                className="w-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-sm py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {emailLoading ? "Sending…" : "Send the Download Instructions to My Email"}
              </button>
            )}
          </div>
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