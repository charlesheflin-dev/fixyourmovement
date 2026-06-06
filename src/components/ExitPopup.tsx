import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const ELIGIBLE_ROUTES = ["/", "/walkthrough"];
const SESSION_KEY = "fcs_exit_popup_dismissed";
const WALKTHROUGH_HREF = "/walkthrough";

export default function ExitPopup() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const lastClickedHref = useRef<string>("");

  const isEligible = ELIGIBLE_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isEligible) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor) lastClickedHref.current = anchor.getAttribute("href") || "";
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 20) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
      if (lastClickedHref.current.includes(WALKTHROUGH_HREF)) return;
      setVisible(true);
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEligible]);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(10,20,40,0.72)" }}
      onClick={dismiss}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-5 pb-4" style={{ background: "#0a1f44" }}>
          <button
            onClick={dismiss}
            className="absolute top-3 right-4 text-slate-400 hover:text-white text-xl leading-none transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#7fa8d4" }}>
            Before you go
          </p>
          <p className="text-white text-xl font-bold leading-snug mb-1">
            The next step isn't more guessing.
          </p>
          <p className="text-sm" style={{ color: "#93b8d8" }}>
            It's understanding where you are right now.
          </p>
        </div>

        {/* Benefits strip */}
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4a6fa5" }}>
            After completing the assessments, you'll discover:
          </p>
          <div className="grid grid-cols-5 gap-2 text-center">
            {[
              { icon: "🔍", label: "Which recovery profile fits your situation" },
              { icon: "🐢", label: "What may be slowing your progress" },
              { icon: "↔️", label: "Why certain advice hasn't worked for you" },
              { icon: "📈", label: "How your symptoms compare to your function level" },
              { icon: "✅", label: "What to focus on next" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-xl mb-1">{item.icon}</div>
                <p className="text-xs leading-tight text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA block */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center gap-4" style={{ background: "#0d2550" }}>
          <p className="text-white text-sm leading-relaxed flex-1">
            Take the Recovery Profile Assessment and the Foot and Ankle Ability Measure now and get personalized insights based on you.
          </p>
          
            <a href="/lp/take-assessment"
            className="flex-shrink-0 text-white font-bold text-sm rounded-xl px-5 py-3 flex items-center gap-2 whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ background: "#e8531a" }}
            onClick={dismiss}
          >
            Start my assessments →
          </a>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-4 gap-2 px-6 py-3 border-t border-slate-100">
          {[
            { label: "Personalized to you", sub: "Not one-size-fits-all" },
            { label: "100% private", sub: "Secure & confidential" },
            { label: "Trusted by thousands", sub: "Proven framework" },
            { label: "No obligation", sub: "Just clarity" },
          ].map((badge, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-blue-600 mt-0.5 text-xs">✓</span>
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-tight">{badge.label}</p>
                <p className="text-xs text-slate-400 leading-tight">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}