import logo from "@/assets/logo.png";
import { PERMISSION_LINE, SOURCE_LABEL, TESTIMONIALS, type Testimonial } from "@/data/testimonials";

// Public testimonial wall (Charles 2026-11-16). Every quote comes verbatim from src/data/testimonials.ts,
// which copies text the site already publishes; each card carries its source label (SPEC-ai-
// discoverability-fixes item 3). One CTA, the homepage's: a plain anchor to /lp/download with no
// ?source= (SourceCapture's write-once first-source cookie must not be muddied), never /checkout.
// Head (title/description/canonical) is set at the edge: functions/testimonials.js.

const CTA_HREF = "/lp/download";
const CTA_CLASS =
  "inline-flex min-h-[54px] items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-center text-white text-base sm:text-lg font-bold leading-snug transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

function Paragraph({ text, emphasis }: { text: string; emphasis?: string }) {
  const at = emphasis ? text.indexOf(emphasis) : -1;
  if (!emphasis || at < 0) return <p className="text-slate-700 text-[15px] leading-relaxed">{text}</p>;
  return (
    <p className="text-slate-700 text-[15px] leading-relaxed">
      {text.slice(0, at)}
      <span className="font-semibold text-slate-900">{emphasis}</span>
      {text.slice(at + emphasis.length)}
    </p>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="mb-4 break-inside-avoid rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-blue-600 text-3xl font-bold leading-none mb-3" aria-hidden="true">"</div>
      <blockquote className="space-y-3">
        {t.quote.split("\n\n").map((para, i) => (
          <Paragraph key={i} text={para} emphasis={t.emphasis} />
        ))}
        {t.closing && <p className="text-blue-600 font-bold text-[15px]">{t.closing}</p>}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="w-6 h-0.5 bg-blue-600 shrink-0" />
        <div>
          <p className="text-blue-600 font-semibold text-sm leading-tight">{t.name}</p>
          <p className="text-slate-500 text-xs mt-0.5">{SOURCE_LABEL[t.source]}</p>
        </div>
      </figcaption>
      {t.meta && <p className="text-slate-400 text-xs mt-3">{t.meta}</p>}
    </figure>
  );
}

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <div className="mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 sm:pt-12">
        <a href="/" className="inline-flex items-center gap-3.5">
          <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
          <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
        </a>
      </div>

      <main className="mx-auto w-full max-w-6xl px-4 pt-10 pb-14 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">Member Stories</p>
          <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-4">
            What Members Shared After Following The System
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">{PERMISSION_LINE}</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={CTA_HREF} className={CTA_CLASS}>
            Start My Free Recovery Plan →
          </a>
          <p className="mt-4 text-sm">
            <a href="/foot-capacity-system" className="text-blue-600 font-semibold hover:underline">How the Foot Capacity System works →</a>
          </p>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">
            © {new Date().getFullYear()} The Foot Capacity System. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 justify-center md:justify-end">
            <a href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-slate-600 transition-colors">Refund Policy</a>
            <a href="/eula" className="hover:text-slate-600 transition-colors">EULA</a>
            <a href="/dr-jonathan-schutza" className="hover:text-slate-600 transition-colors">About Dr. Schutza</a>
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
        <p className="max-w-5xl mx-auto px-6 mt-4 text-slate-400 text-xs text-center md:text-left">
          This program is for educational purposes and is not a substitute for personalized medical advice. Consult your healthcare provider before beginning any exercise program.
        </p>
        <p className="max-w-5xl mx-auto px-6 mt-2 text-slate-400 text-xs text-center md:text-left">
          <a href="/when-to-get-seen-in-person" className="underline hover:text-slate-600 transition-colors">When to get seen in person</a>
        </p>
      </footer>
    </div>
  );
}
