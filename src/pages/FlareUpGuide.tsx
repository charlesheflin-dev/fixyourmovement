import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, FileText, Play, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

export default function FlareUpGuide() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <header className="px-6 py-5 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FCS" className="h-8 w-auto" />
            <span className="text-slate-900 font-bold text-base leading-tight tracking-tight">The Foot Capacity System</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-6 py-14 md:py-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >

            {/* Eyebrow */}
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-5">Free Download</p>

            {/* Heading */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-5">
              The Flare-Up Recovery Guide
            </h1>

            {/* Subhead */}
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              Most people panic when a flare-up hits. They stop everything, lose weeks of progress, and restart from zero — again. This guide was built to help you stop doing that.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              Inside you'll find a clear, step-by-step process for managing flare-ups without losing ground — including pain-reducing walkthrough videos from Dr. Jonathan Schutza, PT, DPT.
            </p>

            {/* What's inside */}
            <div className="bg-slate-50 rounded-2xl p-7 mb-10">
              <p className="text-slate-900 font-semibold text-base mb-5">What's inside the guide:</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={15} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">Step-by-step flare-up protocol</p>
                    <p className="text-slate-500 text-sm leading-relaxed">Exactly what to do — and what to stop doing — the moment pain spikes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Play size={15} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">Pain-reducing walkthrough videos</p>
                    <p className="text-slate-500 text-sm leading-relaxed">Follow along with Dr. Schutza through targeted movements designed to calm pain and keep recovery moving.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={15} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">The mindset shift that changes everything</p>
                    <p className="text-slate-500 text-sm leading-relaxed">Why a flare-up is not a setback — and how to use it to build more capacity, not less.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
              <p className="text-slate-900 font-bold text-xl mb-1">Get instant access — it's free.</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-7">Enter your name and email below. We'll send the guide straight to your inbox.</p>

              {/* Aweber form — hidden inputs preserved, visible elements replaced */}
              <form
                method="post"
                acceptCharset="UTF-8"
                action="https://www.aweber.com/scripts/addlead.pl"
                className="space-y-4"
              >
                {/* Aweber required hidden fields */}
                <input type="hidden" name="meta_web_form_id" value="356574860" />
                <input type="hidden" name="meta_split_id" value="" />
                <input type="hidden" name="listname" value="awlist6958674" />
                <input type="hidden" name="redirect" value="https://fixyourmovement.com/email-confirmation" />
                <input type="hidden" name="meta_redirect_onlist" value="https://www.aweber.com/thankyou-coi.htm?m=text" />
                <input type="hidden" name="meta_adtracking" value="PDF1_Opt_In" />
                <input type="hidden" name="meta_message" value="1" />
                <input type="hidden" name="meta_required" value="name,email" />
                <input type="hidden" name="meta_tooltip" value="" />

                {/* First Name */}
                <div>
                  <label htmlFor="awf_field-118710031" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    First Name
                  </label>
                  <input
                    id="awf_field-118710031"
                    type="text"
                    name="name"
                    placeholder="Your first name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="awf_field-118710032" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="awf_field-118710032"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
                >
                  Send Me The Free Guide <ArrowRight size={18} />
                </button>

                {/* Trust line */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <ShieldCheck size={13} className="text-blue-500 shrink-0" />
                  <p className="text-slate-400 text-xs">No spam. Unsubscribe any time. We respect your privacy.</p>
                </div>

              </form>
            </div>

            {/* Doctor credibility line */}
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-slate-100">
              <img
                src="/images/dr-jonathan-schutza-headshot.png"
                alt="Dr. Jonathan Schutza"
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm shrink-0"
              />
              <p className="text-slate-500 text-sm leading-relaxed">
                Built by <span className="text-slate-900 font-semibold">Dr. Jonathan Schutza, PT, DPT</span> — designed to help people manage flare-ups with more clarity and less panic.
              </p>
            </div>

          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-6 border-t border-slate-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} The Foot Capacity System. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/refund-policy" className="hover:text-slate-600 transition-colors">Refund Policy</a>
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}