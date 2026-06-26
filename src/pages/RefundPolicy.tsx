import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                        Refund Policy
                    </h1>
                    <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-2">Foot Capacity System — Back At It Physical Therapy, LLC</p>
                    <p className="text-muted-foreground font-body mb-10">Effective Date: June 25, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-1">
                                Walk Pain Free, Or It's Free
                            </h2>
                            <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-4">30-Day Money-Back Guarantee</p>
                            <p className="mb-4">
                                Back At It Physical Therapy, LLC, doing business as Foot Capacity System, stands behind the Foot Capacity System and wants you to feel confident giving it a genuine try.
                            </p>
                            <p className="mb-4">
                                Try Foot Capacity System for 30 days. If, after giving Foot Capacity System a genuine try, you decide it is not the right fit for you, simply email us within 30 days of your original purchase and we'll refund your purchase price.
                            </p>
                            <p className="mb-4">No complicated forms. No hoops to jump through.</p>
                            <p>
                                We built this system because we believe people deserve a more structured, less overwhelming approach to recovery. We want you to feel confident giving the platform a real opportunity to help.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Refund Request Process
                            </h2>
                            <p className="mb-4">
                                To request a refund, contact: <span className="font-semibold">contact@fixyourmovement.com</span>
                            </p>
                            <p className="mb-2">Please include:</p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>The email address used for your purchase</li>
                                <li>The original purchase date (if known)</li>
                                <li>A brief explanation of your experience</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Important Conditions
                            </h2>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Refund requests must be submitted within 30 days of the original purchase date</li>
                                <li>Refunds are limited to one per customer</li>
                                <li>Approved refunds will be issued to the original payment method whenever reasonably possible</li>
                                <li>Access to the program may be revoked after a refund has been processed</li>
                                <li>We reserve the right to deny refunds in cases of fraudulent activity, abuse of this Refund Policy, or repeated refund requests associated with multiple purchases or accounts</li>
                                <li>Refunds apply only to purchases made directly from Foot Capacity System or FixYourMovement.com. Purchases made through authorized third-party marketplaces or providers are subject to the refund policies of those providers, where applicable</li>
                            </ul>
                            <p className="mt-4">
                                This guarantee is intended to support genuine users who give the system a fair opportunity while protecting the integrity of the platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Termination
                            </h2>
                            <p>
                                We may suspend or terminate access to the program if you violate our Terms of Service, misuse the platform or its content, or engage in activity that is harmful to the platform or other users.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Governing Law
                            </h2>
                            <p>
                                This Refund Policy shall be governed by and interpreted in accordance with the laws of the State of Louisiana, without regard to its conflict of law principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Changes to This Refund Policy
                            </h2>
                            <p>
                                We may update this Refund Policy periodically. When changes are made, the revised version will be posted with an updated 'Last Updated' date. Continued use of the platform after changes become effective constitutes acceptance of the revised Refund Policy.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-slate-200">
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Contact
                            </h2>
                            <p className="mb-1">Back At It Physical Therapy, LLC</p>
                            <p className="mb-1">Doing Business As Foot Capacity System</p>
                            <p>Email: <span className="font-semibold">contact@fixyourmovement.com</span></p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;