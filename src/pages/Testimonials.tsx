import logo from "@/assets/logo.png";
import MemberStories from "@/components/MemberStories";
import { TESTIMONIALS } from "@/data/testimonials";

// Public testimonial wall (Charles 2026-11-16). Content is the shared MemberStories section (all cards
// expanded) over src/data/testimonials.ts; each card carries its source label (SPEC-ai-
// discoverability-fixes item 3). One CTA, the homepage's: a plain anchor to /lp/download with no
// ?source= (SourceCapture's write-once first-source cookie must not be muddied), never /checkout.
// Head (title/description/canonical) is set at the edge: functions/testimonials.js.

const CTA_HREF = "/lp/download";

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <div className="mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 sm:pt-12">
        <a href="/" className="inline-flex items-center gap-3.5">
          <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
          <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
        </a>
      </div>

      <main className="pt-4 pb-6">
        <MemberStories
          headingAs="h1"
          initialCount={TESTIMONIALS.length}
          cta={{ label: "Start My Free Recovery Plan →", href: CTA_HREF }}
        />
        <p className="text-center text-sm px-4 -mt-6 pb-8 bg-slate-50">
          <a href="/foot-capacity-system" className="text-blue-600 font-semibold hover:underline">How the Foot Capacity System works →</a>
        </p>
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
