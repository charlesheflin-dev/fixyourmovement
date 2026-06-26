import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-2">Foot Capacity System — Back At It Physical Therapy, LLC</p>
                    <p className="text-muted-foreground font-body mb-10">Effective Date: June 25, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <p>
                            Back At It Physical Therapy, LLC, doing business as Foot Capacity System ("Foot Capacity System," "we," "our," or "us"), respects your privacy and is committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices available to you when using our website, mobile application, and related services (collectively, the "Platform"). By accessing or using the Platform, you agree to the practices described in this Privacy Policy.
                        </p>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                1. HIPAA Position
                            </h2>
                            <p className="mb-4">
                                Foot Capacity System is currently designed as a direct-to-consumer rehabilitation and wellness platform. At this time, Foot Capacity System is not operating as a HIPAA Covered Entity or Business Associate. Unless otherwise required by applicable law or a separate written agreement, information submitted through the Platform is handled according to this Privacy Policy and is not intended to be treated as protected health information (PHI) under HIPAA.
                            </p>
                            <p>
                                Please do not upload medical records or other sensitive healthcare documents through the Platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                2. Information We Collect
                            </h2>
                            <p className="mb-3"><span className="font-semibold text-primary">Account Information:</span> Name, email address, account preferences, and login information.</p>
                            <p className="mb-3"><span className="font-semibold text-primary">Recovery Information:</span> Daily pain ratings, FAAM results when applicable, exercise completion, exercise adherence, recovery progression, flare-up reports, activity tolerance, user-entered notes, progress history, and other self-reported rehabilitation information.</p>
                            <p><span className="font-semibold text-primary">Technical Information:</span> Device type, operating system, browser information, IP address, session activity, usage analytics, crash reports, and platform interaction data.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                3. How We Use Information
                            </h2>
                            <p className="mb-3">We may use information to operate and maintain the Platform, deliver personalized rehabilitation guidance, track recovery progress, generate reports, improve user experience, improve AI-assisted features, monitor reliability, respond to support requests, communicate service updates, conduct analytics, and meet legal obligations.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                4. AI-Assisted Features
                            </h2>
                            <p>
                                Foot Capacity System may use automated algorithms, predictive models, and artificial intelligence technologies to assist with personalized rehabilitation recommendations, exercise progression, symptom trend analysis, recovery pattern recognition, adherence optimization, therapist decision support, and product improvement. AI-generated recommendations are intended to support, not replace, professional clinical judgment.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                5. Therapist Review and Internal Alerts
                            </h2>
                            <p>
                                User-entered information may generate internal alerts that may be reviewed by Dr. Jonathan Schutza or authorized members of the Foot Capacity System team. Review is discretionary, not guaranteed, not continuous, and should not be relied upon for emergency or urgent medical care.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                6. Research, Analytics, and Product Development
                            </h2>
                            <p className="mb-3">
                                Foot Capacity System may use de-identified or aggregated information to improve the Platform, develop new features, evaluate outcomes, conduct analytics, develop AI models, support scientific research, publications, grant applications, rehabilitation protocols, and quality improvement initiatives. Information used for these purposes will be de-identified or aggregated so that it is not reasonably capable of identifying individual users.
                            </p>
                            <p>
                                Foot Capacity System will never publicly identify an individual's progress, testimonial, or recovery story without that individual's separate permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                7. Cookies and Analytics
                            </h2>
                            <p>
                                We may use cookies and similar technologies to authenticate users, remember preferences, improve performance, measure usage, analyze traffic, evaluate marketing effectiveness, and improve user experience. Third-party analytics providers may collect information regarding Platform use.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                8. Information Sharing
                            </h2>
                            <p>
                                We do not sell your personal information. We may share information with trusted service providers, payment processors, cloud hosting providers, analytics providers, customer support providers, authentication providers, AI infrastructure providers, when required by law, or to protect legal rights or investigate fraud or security issues.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                9. Business Transfers
                            </h2>
                            <p>
                                If Back At It Physical Therapy, LLC, doing business as Foot Capacity System, is involved in a merger, acquisition, financing, restructuring, sale of assets, or similar business transaction, user information may be transferred as part of that transaction, subject to this Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                10. Data Security
                            </h2>
                            <p>
                                We use reasonable administrative, technical, and physical safeguards designed to protect personal information. No method of electronic transmission or storage can be guaranteed to be completely secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                11. Data Retention
                            </h2>
                            <p>
                                We retain information only as long as reasonably necessary to provide services, improve the Platform, meet legal obligations, resolve disputes, prevent fraud, maintain system security, preserve research integrity, and support de-identified analytics and product development.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                12. Your Rights
                            </h2>
                            <p className="mb-3">
                                Subject to applicable law, you may request access, correction, deletion, or removal of your personal information where applicable, or stop using the Platform at any time. Personally identifiable information will be deleted or anonymized where reasonably practicable. De-identified or aggregated information may be retained for analytics, research, product improvement, and legal compliance.
                            </p>
                            <p>
                                Requests may be sent to contact@fixyourmovement.com.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                13. International Users
                            </h2>
                            <p>
                                If you access the Platform from outside the United States, you understand that your information may be transferred to and processed in the United States.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                14. Children's Privacy
                            </h2>
                            <p>
                                The Platform is not intended for individuals under 18. If we become aware that personal information has been collected from a child under 18 without appropriate authorization, we will take reasonable steps to delete that information.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                15. Do Not Track Signals
                            </h2>
                            <p>
                                Because there is currently no universally accepted standard for responding to Do Not Track signals, Foot Capacity System does not currently respond to them.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                16. Changes to This Privacy Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy periodically. Revised versions will be posted with an updated Last Updated date. Continued use constitutes acceptance of the revised Privacy Policy.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-slate-200">
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                17. Contact Information
                            </h2>
                            <p className="mb-1">Back At It Physical Therapy, LLC</p>
                            <p className="mb-1">Doing Business As Foot Capacity System</p>
                            <p>Email: contact@fixyourmovement.com</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;