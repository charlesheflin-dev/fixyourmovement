import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, ArrowRight, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export default function FCSNewsletterJoin() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <header className="px-6 py-5 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FCS" className="h-8 w-auto" />
            <span className="text-slate-900 font-bold text-base leading-tight tracking-tight">The Foot Capacity System</span>
          </div>
        </div>
      </header>

      {/* MAIN — above fold two column layout */}
      <main className="flex-1 px-6 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">

            {/* LEFT COLUMN — copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:w-1/2 mb-10 lg:mb-0"
            >
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-5">Free Newsletter</p>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-5">
                Practical foot recovery guidance — delivered to your inbox.
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Join people working through chronic foot and heel pain who want clearer guidance, more consistency, and less second-guessing. No fluff — just practical content from Dr. Jonathan Schutza, PT, DPT.
              </p>

              {/* What you'll receive */}
              <div className="space-y-4 mb-8">
                {[
                  { label: "Helpful foot therapy guidance", desc: "Evidence-based tips and techniques you can actually use at home." },
                  { label: "Step-by-step instructions", desc: "Clear, structured exercises and progressions explained simply." },
                  { label: "Free PDFs and guides", desc: "Downloadable resources to support your recovery between emails." },
                  { label: "Flare-up support", desc: "What to do when pain spikes — so setbacks don't become restarts." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={17} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">{item.label}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Doctor credibility */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <img
                  src="/images/dr-jonathan-schutza-headshot.png"
                  alt="Dr. Jonathan Schutza"
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm shrink-0"
                />
                <p className="text-slate-500 text-sm leading-relaxed">
                  Written by <span className="text-slate-900 font-semibold">Dr. Jonathan Schutza, PT, DPT</span> — physical therapist specializing in chronic foot and ankle recovery.
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN — form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

                {/* Form header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-blue-600" />
                  </div>
                  <p className="text-slate-900 font-bold text-xl">Join the newsletter</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-7">
                  Free. No spam. Unsubscribe any time.
                </p>

                {/* Aweber form */}
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
                    Join The Newsletter <ArrowRight size={18} />
                  </button>

                  {/* Trust */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <ShieldCheck size={13} className="text-blue-500 shrink-0" />
                    <p className="text-slate-400 text-xs">We respect your privacy. Unsubscribe any time.</p>
                  </div>

                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} The Foot Capacity System. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <a href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-slate-600 transition-colors">Refund Policy</a>
            <a href="/eula" className="hover:text-slate-600 transition-colors">EULA</a>
            <a href="/contact" className="hover:text-slate-600 transition-colors">Contact</a>
            <a href="https://members.fixyourmovement.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Patient App</a>
          </div>
        </div>
      </footer>

    </div>
  );
}