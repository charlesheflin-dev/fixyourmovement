import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground font-body mb-10">Last updated: March 12, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <p>
                            These Terms of Service ("Terms") govern your access to and use of the FixYourMovement.com website and any related forms, communications, or services (collectively, the "Site").
                        </p>
                        <p>
                            By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
                        </p>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Use of the Site
                            </h2>
                            <p className="mb-4">
                                The Site is provided for informational and communication purposes only. You agree to use the Site lawfully and not to engage in any activity that could harm, disrupt, or interfere with the operation or security of the Site.
                            </p>
                            <p>
                                You may not attempt to gain unauthorized access to any portion of the Site or its systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                No Guarantees or Professional Advice
                            </h2>
                            <p className="mb-4">
                                Content on the Site is provided for general informational purposes only. Nothing on the Site constitutes financial, legal, business, or professional advice.
                            </p>
                            <p className="mb-4">
                                Any discussions regarding partnerships, revenue share, or monetization are exploratory in nature and do not constitute an offer, guarantee, or commitment unless expressly agreed to in writing by both parties.
                            </p>
                            <p>
                                Results vary based on many factors, including audience dynamics and execution.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Submissions and Communications
                            </h2>
                            <p className="mb-4">
                                By submitting information through the Site, you represent that the information is accurate and that you have the right to share it.
                            </p>
                            <p className="mb-4">
                                Submission of information does not create a partnership, agency, employment, or fiduciary relationship.
                            </p>
                            <p>
                                We reserve the right to decline or discontinue communications at our discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Intellectual Property
                            </h2>
                            <p className="mb-4">
                                All content on the Site, including text, graphics, logos, and layout, is the property of FixYourMovement.com or its licensors and is protected by applicable intellectual property laws.
                            </p>
                            <p>
                                You may not reproduce, distribute, or exploit any Site content without prior written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Third Party Links
                            </h2>
                            <p>
                                The Site may contain links to third party websites. FixYourMovement.com is not responsible for the content, policies, or practices of third party sites.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Limitation of Liability
                            </h2>
                            <p className="mb-4">
                                To the fullest extent permitted by law, FixYourMovement.com shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Site.
                            </p>
                            <p>
                                Use of the Site is at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Indemnification
                            </h2>
                            <p>
                                You agree to indemnify and hold harmless FixYourMovement.com and its team from any claims, damages, or expenses arising from your use of the Site or violation of these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Termination
                            </h2>
                            <p>
                                We may suspend or terminate access to the Site at any time without notice for conduct that we believe violates these Terms or is otherwise harmful.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Governing Law
                            </h2>
                            <p>
                                These Terms are governed by and construed in accordance with the laws of the United States and the applicable state jurisdiction, without regard to conflict of law principles.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-slate-200">
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Contact
                            </h2>
                            <p className="mb-2">For questions regarding these Terms, contact:</p>
                            <p>
                                Email:{" "}
                                <a
                                    href="mailto:contact@fixyourmovement.com"
                                    className="text-blue hover:text-blue-dark transition-colors"
                                >
                                    contact@fixyourmovement.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
