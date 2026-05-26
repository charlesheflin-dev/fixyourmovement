import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                        Refund Policy and Guarantee
                    </h1>
                    <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-2">Foot Capacity System</p>
                    <p className="text-muted-foreground font-body mb-10">Last Updated: March 12, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-1">
                                Walk Pain Free, Or It's Free
                            </h2>
                            <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-4">30-Day Guarantee</p>
                            <p>
                                Try the Foot Capacity System for 30 days. If you do not feel the program is right for you, email us within 30 days of your original purchase and we'll refund your investment. No complicated forms. No hoops to jump through. We built this system because we genuinely believe people need a more structured, less overwhelming approach to recovery. We want you to feel confident giving it a real try.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Refund Request Process
                            </h2>
                            <p className="mb-4">
                                To request a refund, contact: <span className="font-semibold">contact@fixyourmovement.com</span>
                            </p>
                            <p>
                                Please include: the email address used at purchase, and a brief explanation of your experience.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Important Conditions
                            </h2>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Refund requests must be submitted within 30 days of the original purchase date</li>
                                <li>Refunds are limited to one per customer</li>
                                <li>Access to the program may be revoked upon refund</li>
                                <li>We reserve the right to deny refunds in cases of fraudulent activity, abuse of the refund policy, or repeated refund requests associated with multiple purchases or accounts</li>
                                <li>This guarantee is intended to support genuine users who give the system a real attempt.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Termination
                            </h2>
                            <p>
                                We may suspend or terminate access to the program at any time if you violate our Terms of Service, misuse the platform or content, or your activity is harmful to the platform or other users.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Governing Law
                            </h2>
                            <p>
                                This Refund Policy shall be governed by the laws of the State of Louisiana, without regard to conflict of law principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Changes to This Policy
                            </h2>
                            <p>
                                We may update this Refund Policy at any time. Continued use of the platform constitutes acceptance of any changes.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-slate-200">
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Contact
                            </h2>
                            <p>For questions regarding this policy, contact: <span className="font-semibold">contact@fixyourmovement.com</span></p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;