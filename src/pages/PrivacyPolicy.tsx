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
                    <p className="text-muted-foreground font-body mb-10">Last updated: March 12, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <p>
                            This Privacy Policy explains how Foot Capacity System collects, uses, and protects your information. By using the platform, you agree to this policy.
                        </p>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                HIPAA Positioning
                            </h2>
                            <p className="mb-4">
                                Foot Capacity System is not a Covered Entity or Business Associate under HIPAA. We do not maintain medical records
                            </p>
                            <p className="mb-4">
                                Data collected is not treated as protected health information
                            </p>
                            <p>
                                You should not submit sensitive medical records through the platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Information We Collect
                            </h2>

                            <h3 className="font-display text-lg text-primary font-semibold mb-3">
                                3.1 Account Information
                            </h3>
                            <p className="mb-3">
                                Name, Email address.
                            </p>

                            <h3 className="font-display text-lg text-primary font-semibold mb-3">
                                3.2 User-Entered Data
                            </h3>
                            <p className="mb-3">
                                Pain scores, Activity logs, Progress tracking inputs. This data may relate to your physical condition but is user-generated and self-reported.
                            </p>

                            <h3 className="font-display text-lg text-primary font-semibold mb-3">
                                3.3 Automatically Collected Data
                            </h3>
                            <p>
                                Device type, Usage behavior, Interaction data.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                How We Use Information
                            </h2>
                            <p className="mb-3">We use data to:</p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Provide and operate the platform</li>
                                <li>Generate AI-assisted progression guidance</li>
                                <li>Monitor system performance</li>
                                <li>Identify potential pain spikes for internal review</li>
                                <li>Improve user experience</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Alerts and Internal Review
                            </h2>
                            <p className="mb-4">
                                User-entered data may trigger internal alerts. These alerts may be reviewed by Dr. Jonathan
                            </p>
                            <p className="mb-4">
                                Review is not guaranteed or real-time
                            </p>
                            <p>
                                Any outreach is discretionary and informational.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Data Sharing
                            </h2>
                            <p className="mb-4">
                                We do not sell your information. We may share data:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>With service providers supporting platform operations</li>
                                <li>If required by law</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Data Security
                            </h2>
                            <p>
                                We implement reasonable safeguards to protect your data. No system is completely secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Data Retention
                            </h2>
                            <p className="mb-4">
                                We retain data only as needed to:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Provide services</li>
                                <li>Improve the platform</li>
                                <li>Meet legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Your Rights
                            </h2>
                            <p className="mb-4">
                                You may:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Request account deletion</li>
                                <li>Stop using the platform at any time</li>
                            </ul>
                            <p>
                                Contact us to request data removal.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Children's Privacy
                            </h2>
                            <p>
                                The platform is not intended for individuals under 18.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Changes to This Policy
                            </h2>
                            <p>
                                We may update this policy at any time. Continued use constitutes acceptance.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-slate-200">
                            <p>contact@fixyourmovement.com</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
