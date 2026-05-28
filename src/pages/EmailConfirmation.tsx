import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

export default function EmailConfirmation() {
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
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-lg w-full text-center"
        >
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail size={36} className="text-blue-600" />
          </div>

          {/* Eyebrow */}
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">One More Step</p>

          {/* Heading */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-4">
            Check your inbox.
          </h1>

          {/* Subhead */}
          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            We just sent you a confirmation email. Click the link inside to confirm your subscription and get access to everything we promised.
          </p>

          {/* Steps */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-10 text-left space-y-4">
            {[
              "Open the email from The Foot Capacity System",
              "Click the confirmation link inside",
              "You'll be taken back here to get started",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-700 text-base leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Reassurance */}
          <div className="space-y-3 mb-10">
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <CheckCircle size={14} className="text-blue-600 shrink-0" />
              Can't find it? Check your spam or promotions folder.
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <CheckCircle size={14} className="text-blue-600 shrink-0" />
              The email comes from contact@fixyourmovement.com
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <CheckCircle size={14} className="text-blue-600 shrink-0" />
              It should arrive within a minute or two.
            </div>
          </div>

          {/* Soft CTA */}
          <p className="text-slate-400 text-sm mb-3">While you wait —</p>
          
          <a
            href="/walkthrough"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold text-base hover:underline"
          >
            See how the full system works <ArrowRight size={16} />
          </a>
        </motion.div>
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