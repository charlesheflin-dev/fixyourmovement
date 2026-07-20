import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check } from "lucide-react";
import logo from "@/assets/logo.png";
import headshot from "@/assets/dj-head-2.jpg";
import receiptPreview from "@/assets/receipt-provider-preview.png";
import UserJourneyCarousel from "@/components/UserJourneyCarousel";

const CHECKOUT_URL = "/checkout";

export default function HsaFsa() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <main>

        {/* SECTION 1 — HERO */}
        <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3.5 mb-8">
                <img src={logo} alt="The Foot Capacity System" className="h-[34px] md:h-[42px] w-auto shrink-0" />
                <span className="text-slate-900 font-bold text-base md:text-lg leading-tight tracking-tight whitespace-nowrap">The Foot Capacity System</span>
              </div>

              <h1 className="font-display text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-snug mb-5">
                Using Your HSA or FSA with the Foot Capacity System
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-5">
                Learn how HSA and FSA reimbursement typically works, what documentation you'll receive, and what to expect before and after your purchase.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Whether you're considering Lifetime Access or the Monthly Recovery Plan, this page answers the questions we hear most often and explains the process in plain English.
              </p>

              <div className="mb-8">
                <p className="text-slate-500 text-base leading-relaxed mb-1">Already know what you need?</p>
                <a
                  href={CHECKOUT_URL}
                  target="_self"
                  rel="noopener noreferrer"
                  onClick={() => window.gtag?.('event', 'checkout_click', { event_category: 'conversion', event_label: 'hsa_hero' })}
                  className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  View Membership Options →
                </a>
              </div>

              <div className="bg-slate-50 rounded-xl p-5">
                <p className="text-slate-900 font-semibold text-sm mb-1">Important</p>
                <p className="text-slate-600 text-base leading-relaxed mb-2">
                  Every HSA and FSA plan is different.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Your HSA or FSA administrator—not the Foot Capacity System—determines eligibility and reimbursement.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 — CAN I USE MY HSA OR FSA */}
        <section className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Can I Use My HSA or FSA?
              </h2>
              <p className="font-display text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-6">
                Yes, you may be able to.
              </p>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>Many HSA and FSA plans reimburse qualified healthcare expenses, depending on your individual plan.</p>
                <p>The Foot Capacity System was developed and is overseen by a licensed physical therapist and provides structured rehabilitation for foot and ankle conditions.</p>
                <p>Every purchase includes your Receipt &amp; Provider Information PDF, emailed to you automatically after purchase.</p>
                <p>Eligibility and reimbursement decisions are always made by your HSA or FSA administrator according to your individual plan.</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 mt-8">
                <p className="text-blue-700 font-semibold text-sm mb-1">Good to Know</p>
                <p className="text-slate-600 text-base leading-relaxed mb-2">
                  You don't necessarily have to pay using your HSA or FSA card.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Many plans allow you to purchase first using another payment method and submit your documentation later for reimbursement.
                </p>
              </div>

            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — YOUR RECEIPT & PROVIDER INFORMATION PDF */}
        <section id="documentation" className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Your Receipt &amp; Provider Information PDF
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-10">
                <p>Every Foot Capacity System membership includes a Receipt &amp; Provider Information PDF delivered automatically after purchase.</p>
                <p>This document combines your purchase receipt with additional provider information that some HSA and FSA administrators may request during the reimbursement process.</p>
                <p>Because every plan is different, documentation requirements can vary. We created this resource to help simplify that process whenever additional information is requested.</p>
              </div>

              <div className="flex justify-center mb-10">
                <img
                  src={receiptPreview}
                  alt="Sample Receipt & Provider Information PDF showing purchaser information, payment details, receipt number, licensed physical therapist credentials, NPI, Louisiana Physical Therapy License, and a detailed service description."
                  className="w-full max-w-[648px] rounded-2xl border border-slate-200 shadow-sm"
                />
              </div>

              <p className="text-slate-500 text-sm italic text-center max-w-xl mx-auto mb-10">
                Example of the Receipt &amp; Provider Information PDF every member receives automatically after purchase. Sample purchaser information shown; your document will contain your own purchase and payment details.
              </p>

              <h3 className="font-display text-xl font-bold text-slate-900 mb-4">What You'll Receive</h3>
              <div className="bg-white rounded-2xl p-7 mb-12">
                <ul className="space-y-3">
                  {[
                    "Purchase receipt",
                    "Provider information",
                    "Licensed physical therapist credentials",
                    "National Provider Identifier (NPI)",
                    "Louisiana Physical Therapy License information",
                    "Program details that may assist with reimbursement requests",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-900 mb-6">Why This Document Is Different</h3>
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-1 bg-white rounded-2xl p-7">
                  <p className="font-bold text-slate-900 text-lg mb-4">Typical Online Receipt</p>
                  <ul className="space-y-3">
                    {["Purchase confirmation", "Transaction amount", "Payment information", "Limited provider details"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-slate-300 shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 bg-blue-50 rounded-2xl p-7">
                  <p className="font-bold text-blue-600 text-lg mb-4">Your Receipt &amp; Provider Information PDF</p>
                  <ul className="space-y-3">
                    {["Purchase confirmation", "Transaction amount", "Provider information", "Licensed physical therapist credentials", "National Provider Identifier (NPI)", "Louisiana Physical Therapy License", "Program information", "Organized for reimbursement documentation"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — HOW THE REIMBURSEMENT PROCESS TYPICALLY WORKS */}
        <section id="how-reimbursement-works" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                How the Reimbursement Process Typically Works
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-12">
                <p>Most reimbursement requests follow a similar process.</p>
                <p>Although every HSA and FSA administrator has different requirements, these four steps represent the process many members experience.</p>
              </div>

              <div className="flex flex-col md:flex-row md:gap-6">
                {[
                  { n: "1", title: "Purchase the Foot Capacity System", body: "Purchase your Foot Capacity System membership." },
                  { n: "2", title: "Receive Your Receipt & Provider Information PDF", body: "Receive your Receipt & Provider Information PDF automatically by email." },
                  { n: "3", title: "Submit Your Request", body: "Submit your documentation according to your HSA or FSA administrator's reimbursement process." },
                  { n: "4", title: "Administrator Review", body: "Your administrator reviews the submission and determines reimbursement based on your individual plan." },
                ].map((step) => (
                  <div
                    key={step.n}
                    className="flex-1 py-6 md:py-0 md:px-5 border-t md:border-t-0 md:border-l border-slate-200 first:border-t-0 first:md:border-l-0 first:md:pl-0 last:md:pr-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-4">{step.n}</div>
                    <p className="font-semibold text-slate-900 text-base mb-2">{step.title}</p>
                    <p className="text-slate-600 text-base leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl p-5 mt-12">
                <p className="text-slate-900 font-semibold text-sm mb-1">Important</p>
                <p className="text-slate-600 text-base leading-relaxed mb-2">
                  The Foot Capacity System automatically provides your documentation after purchase.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Your HSA or FSA administrator determines reimbursement eligibility and any documentation requirements.
                </p>
              </div>

            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — DEVELOPED BY A LICENSED PHYSICAL THERAPIST */}
        <section id="meet-the-pt" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-8">
                Developed by a Licensed Physical Therapist
              </h2>

              <div className="flex flex-col md:flex-row gap-8 md:items-start mb-8">
                <img
                  src={headshot}
                  alt="Dr. Jonathan Schutza, PT, DPT, Cert. DN"
                  className="w-full max-w-[300px] h-auto rounded-2xl shrink-0 mx-auto md:mx-0"
                />
                <div className="text-slate-600 text-lg leading-relaxed">
                  <p className="font-bold text-slate-900 text-xl mb-3">Dr. Jonathan Schutza, PT, DPT, Cert. DN</p>
                  <p className="mb-4">Dr. Jonathan Schutza is a licensed physical therapist and Doctor of Physical Therapy who specializes in evidence-based rehabilitation of foot and ankle conditions.</p>
                  <p>He developed the Foot Capacity System and oversees its educational content and ongoing development.</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-blue-700 font-semibold text-sm mb-1">Good to Know</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Your Receipt &amp; Provider Information PDF includes Dr. Jonathan's National Provider Identifier (NPI) and Louisiana Physical Therapy License information because some HSA and FSA administrators may request these details during reimbursement review.
                </p>
              </div>

            </motion.div>
          </div>
        </section>

        {/* SECTION 6 — REAL PROGRESS INSIDE THE FOOT CAPACITY SYSTEM */}
        <section id="member-progress" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Real Progress Inside the Foot Capacity System
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>Recovery looks different for everyone.</p>
                <p>Some members experience meaningful improvements within weeks, while others make steady progress over a longer period. The Foot Capacity System helps members track that progress over time rather than relying on guesswork.</p>
                <p>Below are examples of real member progress recorded inside the Foot Capacity System.</p>
              </div>
            </motion.div>

            <div className="my-8">
              <UserJourneyCarousel />
            </div>

            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Every recovery journey is different. Individual results vary based on many factors, including consistency, starting point, and individual circumstances.
            </p>

            <a
              href={CHECKOUT_URL}
              target="_self"
              rel="noopener noreferrer"
              onClick={() => window.gtag?.('event', 'checkout_click', { event_category: 'conversion', event_label: 'hsa_progress' })}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Get Lifetime Access →
            </a>
          </div>
        </section>

        {/* SECTION 7 — WHY SOME MEMBERS USE THEIR HSA OR FSA */}
        <section className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
                Why Some Members Use Their HSA or FSA
              </h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-8">
                <p>Many members choose to use HSA or FSA funds because these accounts are specifically designed to help pay for qualified healthcare expenses using pre-tax dollars.</p>
                <p>Depending on your individual tax situation and benefits plan, this may reduce your overall out-of-pocket cost compared to paying with after-tax income.</p>
                <p>Every person's situation is different, so consult your benefits administrator or tax professional if you have questions.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-7 mb-8">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Example Only</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Someone in a 24% combined federal and state tax bracket using HSA or FSA funds for a $397 Lifetime Access membership could see approximately $95 in tax savings. This is an illustration only. Actual savings vary based on your individual tax situation and your HSA or FSA plan.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <p className="text-blue-700 font-semibold text-sm mb-1">Good to Know</p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Potential savings come from your individual HSA or FSA plan and tax situation—not from a Foot Capacity System discount.
                </p>
              </div>

            </motion.div>
          </div>
        </section>

        {/* SECTION 8 — COMMON SITUATIONS */}
        <section id="common-situations" className="py-10 md:py-14 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-6">
              Common Situations
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Every HSA and FSA administrator has its own reimbursement process. Here are answers to some of the situations people ask us about most often.
            </p>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="situation-1" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">HSA or FSA card declined?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">A declined HSA or FSA card doesn't necessarily mean your purchase isn't eligible for reimbursement. Many plans allow you to purchase using another payment method and request reimbursement afterward. Follow your administrator's reimbursement process for your individual plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-2" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Paid with a personal credit card?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Many HSA and FSA plans allow reimbursement after you've already completed your purchase. Your reimbursement documentation is designed to support that reimbursement request.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-3" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Lost your reimbursement documentation?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">No problem. Contact the Foot Capacity System support team and we'll help you obtain another copy of your Receipt &amp; Provider Information PDF.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-4" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Administrator requested more information?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Contact us first. We'll review the request with you and provide any additional documentation we reasonably can. Some documentation may need to come from your own treating healthcare provider if your administrator requires it.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="situation-5" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Reimbursement request wasn't approved?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Every administrator has different reimbursement requirements. If your administrator explains why your request wasn't approved, let us know. We'll review the reason with you and determine whether additional documentation may be available.</AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="bg-blue-50 rounded-xl p-5 mt-8">
              <p className="text-blue-700 font-semibold text-sm mb-1">Need Help?</p>
              <p className="text-slate-600 text-base leading-relaxed">
                If your HSA or FSA administrator requests additional documentation or you have questions about your purchase, contact us before submitting your reimbursement request. We're happy to help however we can.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 9 — FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-2xl md:text-[2rem] font-bold text-slate-900 leading-snug mb-8">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-1">Before You Purchase</h3>
              <AccordionItem value="faq-1" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Should I contact my administrator before purchasing?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">You don't have to, but you're always welcome to contact your HSA or FSA administrator if you'd like to better understand your individual plan's reimbursement process.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What information should I have ready?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">The most helpful information is simply knowing how your administrator handles reimbursement requests. Every Foot Capacity System purchase includes your Receipt &amp; Provider Information PDF to support that process.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I share this page with my HSA or FSA administrator?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Yes. This page explains the reimbursement documentation you'll receive and how the process generally works.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What documentation will I receive after purchase?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Immediately after purchase you'll receive your Receipt &amp; Provider Information PDF by email. This document includes purchaser information, payment details, provider credentials, receipt information, and a detailed service description.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 border-t border-slate-200 pt-5 md:pt-8 mb-1">Eligibility</h3>
              <AccordionItem value="faq-5" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I use my HSA?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Many HSA plans reimburse qualified healthcare expenses. Your administrator determines eligibility according to your individual plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I use my FSA?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Many FSA plans reimburse qualified healthcare expenses. Your administrator determines eligibility according to your individual plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-7" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Who decides eligibility?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Your HSA or FSA administrator. The Foot Capacity System cannot approve or deny reimbursement.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Does the Foot Capacity System guarantee reimbursement?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">No. Reimbursement decisions are made solely by your HSA or FSA administrator.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 border-t border-slate-200 pt-5 md:pt-8 mb-1">Purchasing</h3>
              <AccordionItem value="faq-9" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Do I have to use my HSA or FSA card?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">No. Many plans allow reimbursement after purchase.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-10" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I pay with my personal credit card?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Yes. Many administrators allow reimbursement after you've already completed your purchase.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-11" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Does Lifetime Access differ from the Monthly Recovery Plan?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Eligibility decisions are made by your administrator according to your individual benefits plan.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-12" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I submit my reimbursement request later?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Submission deadlines vary by administrator. Follow your individual plan's reimbursement requirements.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 border-t border-slate-200 pt-5 md:pt-8 mb-1">Documentation</h3>
              <AccordionItem value="faq-13" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What is included?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Your Receipt &amp; Provider Information PDF includes purchaser information, payment information, receipt number, payment reference, provider credentials, NPI, Louisiana Physical Therapy License, and a detailed service description.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-14" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Why is Dr. Jonathan's information included?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Some administrators request provider information when reviewing reimbursement requests. Your documentation identifies the licensed physical therapist who developed and oversees the Foot Capacity System.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-15" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What is an NPI?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">An NPI is a National Provider Identifier assigned to healthcare providers in the United States.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-16" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Why is a physical therapy license included?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Some administrators request provider credentials during reimbursement review.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-17" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Can I obtain another copy?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Yes. Contact the Foot Capacity System support team and we'll help you obtain another copy.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 border-t border-slate-200 pt-5 md:pt-8 mb-1">Reimbursement</h3>
              <AccordionItem value="faq-18" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">How do I request reimbursement?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Submit your reimbursement documentation according to the instructions provided by your HSA or FSA administrator.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-19" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">How long does reimbursement usually take?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Processing times vary by administrator.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-20" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">What if additional documentation is requested?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Contact us first. We'll review the request and provide any additional documentation we reasonably can.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-21" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Why do I receive more than a standard receipt?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Healthcare reimbursement requests often require more information than a standard online purchase receipt. That's why every purchase includes a professionally prepared Receipt &amp; Provider Information PDF.</AccordionContent>
              </AccordionItem>

              <h3 className="font-display text-lg font-bold text-slate-900 border-t border-slate-200 pt-5 md:pt-8 mb-1">Support</h3>
              <AccordionItem value="faq-22" className="border-b border-slate-200 pb-1">
                <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline py-4">Who should I contact?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5">Questions about reimbursement decisions should be directed to your HSA or FSA administrator. Questions about your purchase or documentation should be directed to the Foot Capacity System support team.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* FINAL SECTION — READY WHEN YOU ARE */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-blue-600 text-[14px] font-semibold uppercase tracking-[0.08em] mb-4">Invest in Your Recovery with Confidence</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-bold text-slate-900 leading-tight mb-6">
                Ready When You Are.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Whether you choose Lifetime Access or the Monthly Recovery Plan, you'll automatically receive your Receipt &amp; Provider Information PDF after purchase, along with full access to the Foot Capacity System.
              </p>

              <p className="text-slate-900 font-semibold text-base mb-4">Everything You'll Receive</p>
              <ul className="space-y-3 mb-10">
                {[
                  "Full access to the Foot Capacity System",
                  "Your Receipt & Provider Information PDF delivered automatically by email",
                  "Evidence-based rehabilitation guidance developed by a licensed physical therapist",
                  "Lifetime updates with the Lifetime Membership",
                  "Monthly Recovery Plan option available",
                  "30-Day Money-Back Guarantee",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://fixyourmovement.com/checkout?source=hsa"
                target="_self"
                rel="noopener noreferrer"
                onClick={() => window.gtag?.('event', 'checkout_click', { event_category: 'conversion', event_label: 'hsa_final' })}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-5 rounded-xl text-xl transition-colors"
                data-source="hsa"
              >
                Choose My Membership →
              </a>

              <p className="text-slate-500 text-base leading-relaxed mt-6">
                Compare Lifetime Access and the Monthly Recovery Plan, then choose the option that fits your recovery journey.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mt-4">
                Questions before you purchase? We're happy to help. Contact us anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FOOTER DISCLAIMER */}
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-slate-900 font-semibold text-sm mb-2">Important Information</p>
            <div className="space-y-3 text-slate-500 text-sm leading-relaxed">
              <p>The Foot Capacity System cannot determine HSA or FSA eligibility or reimbursement.</p>
              <p>Eligibility, documentation requirements, and reimbursement decisions are determined solely by your HSA or FSA administrator and your individual benefits plan.</p>
              <p>This page is provided for educational purposes and should not be considered medical, legal, tax, insurance, or financial advice.</p>
            </div>
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
            <a href="https://app.fixyourmovement.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Patient App</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
