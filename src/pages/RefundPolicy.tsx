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
                    <p className="text-muted-foreground font-body mb-10">Last updated: March 12, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <p>
                            We stand behind the Foot Capacity System with a 60 day satisfaction guarantee. If you are not satisfied with your results, you may request a full refund within 60 days of your original purchase, subject to the eligibility requirements below.
                        </p>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Eligibility Requirements
                            </h2>
                            <p className="mb-4">
                                To qualify for a refund, you must demonstrate a reasonable and good faith effort to follow the program. This includes meeting all of the following minimum criteria:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>At least 14 separate days of platform usage</li>
                                <li>Completion of at least 2 core phases or program segments</li>
                                <li>Submission of at least 20 total logged entries including pain scores or activity tracking</li>
                                <li>Use of the system over a minimum span of 14 days</li>
                            </ul>
                            <p>
                                These requirements are designed to ensure the system was meaningfully used.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                How to Request a Refund
                            </h2>
                            <p className="mb-4">
                                To request a refund, contact: contact@fixyourmovement.com. You may be required to provide:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>A brief explanation of your experience</li>
                                <li>Confirmation of usage based on your account activity</li>
                            </ul>
                            <p>
                                We may verify eligibility using internal usage data.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Important Conditions
                            </h2>
                            <p className="mb-4">
                                Requests must be submitted within 60 days of purchase
                            </p>
                            <p className="mb-4">
                                Refunds are limited to one per customer
                            </p>
                            <p className="mb-4">
                                Refunds will not be granted in cases of:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Failure to meet minimum usage requirements</li>
                                <li>Minimal, inconsistent, or non-existent participation</li>
                                <li>Abuse of the guarantee</li>
                                <li>Fraudulent or repetitive requests</li>
                            </ul>
                            <p>
                                Access to the program may be revoked upon refund. This guarantee is intended for users who actively engage with the program.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Termination
                            </h2>
                            <p className="mb-4">
                                We may suspend or terminate access at any time if:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>You violate these Terms</li>
                                <li>You misuse the Services</li>
                                <li>Your behavior is harmful to the platform or other users</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Governing Law
                            </h2>
                            <p>
                                These Terms shall be governed by the laws of the United States and the State of Louisiana, without regard to conflict of law principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Changes to Terms
                            </h2>
                            <p>
                                We may update these Terms at any time. Continued use constitutes acceptance.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-slate-200">
                            <p>For questions, contact: contact@fixyourmovement.com</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;