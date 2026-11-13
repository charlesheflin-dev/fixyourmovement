import logo from "@/assets/logo.png";
import {
  RED_FLAG_CONTACT_SOON,
  RED_FLAG_CONTACT_SOON_HEADING,
  RED_FLAG_EMERGENCY_LINE,
  RED_FLAG_INTRO,
  RED_FLAG_SECTION_HEADING,
  RED_FLAG_URGENT_CARE,
  RED_FLAG_URGENT_HEADING,
} from "@/lib/redFlags";

// Public red-flag page (Dr. Schutza Q14 = yes, 2026-11-13). Playbook §6 headings, intro and
// both lists, word for word, plus the approved A-1 emergency line under the urgent list.
// No sales CTA. Meta Pixel is suppressed on this path (src/lib/metaPixel.ts isSensitivePath).
// Head (title/description/canonical) is set at the edge: functions/when-to-get-seen-in-person.js.
export default function WhenToGetSeenInPerson() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>
        <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center gap-3.5 mb-10">
              <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
              <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
            </div>

            <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
              {RED_FLAG_SECTION_HEADING}
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10">
              {RED_FLAG_INTRO}
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 leading-snug mb-4">
              {RED_FLAG_URGENT_HEADING}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-base leading-relaxed">
              {RED_FLAG_URGENT_CARE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 mb-10 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-slate-900 text-base font-semibold leading-relaxed">
              {RED_FLAG_EMERGENCY_LINE}
            </p>

            <h2 className="font-display text-2xl font-bold text-slate-900 leading-snug mb-4">
              {RED_FLAG_CONTACT_SOON_HEADING}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-base leading-relaxed mb-10">
              {RED_FLAG_CONTACT_SOON.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The app is not a diagnosis tool and does not replace an in-person medical evaluation.
            </p>
            <p className="text-sm flex flex-wrap gap-x-6 gap-y-2">
              <a href="/dr-jonathan-schutza" className="text-blue-600 font-semibold hover:underline">About Dr. Jonathan Schutza, PT, DPT</a>
              <a href="/foot-capacity-system" className="text-blue-600 font-semibold hover:underline">How the Foot Capacity System works</a>
            </p>
          </div>
        </section>
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
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
        <p className="max-w-5xl mx-auto px-6 mt-4 text-slate-400 text-xs text-center md:text-left">
          This program is for educational purposes and is not a substitute for personalized medical advice. Consult your healthcare provider before beginning any exercise program.
        </p>
      </footer>
    </div>
  );
}
