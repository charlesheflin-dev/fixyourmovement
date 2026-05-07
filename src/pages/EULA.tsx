import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EULA = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                        End User License Agreement (EULA)
                    </h1>
                    <p className="text-muted-foreground font-body mb-10">Effective date: March 12, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <p>
                            By purchasing, accessing, or using the Foot Capacity System web portal and/or mobile application, you agree to be bound by this End User License Agreement. If you do not agree, you may not access or use the system.
                        </p>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                License Grant
                            </h2>
                            <p className="mb-4">
                                You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the platform for personal, non-commercial use. You may not:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Copy, reproduce, distribute, or resell any content</li>
                                <li>Reverse engineer or replicate the system</li>
                                <li>Share login credentials or allow third-party access</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Description of Service
                            </h2>
                            <p className="mb-4">
                                The Foot Capacity System provides a structured, self-guided digital program that includes:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Video-based foot and ankle rehabilitation exercises</li>
                                <li>Pain tracking and progress logging</li>
                                <li>AI-assisted progression guidance</li>
                                <li>Internal alerting based on user-entered data</li>
                                <li>Optional mobile or web-based access</li>
                            </ul>
                            <p>
                                The system is intended for general wellness, education, and self-directed use.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Not Medical Advice or Medical Care
                            </h2>
                            <p className="mb-4">
                                The Foot Capacity System is not a medical device and does not provide medical advice, diagnosis, or treatment. By using this system, you acknowledge:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>You are participating voluntarily</li>
                                <li>You are responsible for your own health decisions</li>
                                <li>You should consult a licensed healthcare provider before beginning</li>
                            </ul>
                            <p>
                                If you experience severe pain, worsening symptoms, or a medical emergency, discontinue use and seek appropriate medical care.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                No Patient-Provider Relationship
                            </h2>
                            <p className="mb-4">
                                Use of the platform does not establish a doctor-patient or provider-patient relationship with Dr. Jonathan or any affiliated party.
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Platform use is self-directed</li>
                                <li>No individualized medical care is provided</li>
                                <li>Any communication is general and informational</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                No Monitoring or Duty of Care
                            </h2>
                            <p className="mb-4">
                                The Foot Capacity System does not provide real-time monitoring or clinical supervision. You acknowledge:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>User inputs are not continuously monitored</li>
                                <li>Alerts may not be reviewed immediately or at all</li>
                                <li>There is no guarantee of response or follow-up</li>
                                <li>You are solely responsible for seeking medical care when needed</li>
                            </ul>
                            <p>
                                You agree not to rely on the platform for safety, diagnosis, or medical oversight.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Medical Clearance and Assumption of Risk
                            </h2>
                            <p className="mb-4">
                                You represent that:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>You are physically capable of participating in exercise</li>
                                <li>You have obtained medical clearance if necessary</li>
                            </ul>
                            <p className="mb-4">
                                You agree:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Exercise carries inherent risk</li>
                                <li>You will perform all activities at your own risk</li>
                                <li>You will stop if pain exceeds your tolerance</li>
                            </ul>
                            <p>
                                You assume full responsibility for any injury or outcome.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                AI-Guided Progression
                            </h2>
                            <p className="mb-4">
                                The platform may use automated or AI-driven logic to suggest progression, regression, or program adjustments. You acknowledge:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>AI outputs may be inaccurate or incomplete</li>
                                <li>They are not medical advice or clinical judgment</li>
                                <li>You are solely responsible for interpreting and acting on any guidance</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Data Collection and Use
                            </h2>
                            <p className="mb-4">
                                We collect and use limited information necessary to operate the platform, including:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Account information such as name and email</li>
                                <li>User-entered data such as pain scores and activity inputs</li>
                                <li>System usage and interaction data</li>
                            </ul>
                            <p className="mb-4">
                                This data is used to:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Deliver the service</li>
                                <li>Support platform functionality</li>
                                <li>Generate progression guidance</li>
                                <li>Enable internal alerting and review</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                HIPAA and Health Data Positioning
                            </h2>
                            <p className="mb-4">
                                Foot Capacity System is not a Covered Entity or Business Associate under HIPAA.
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Data collected is not maintained as medical records</li>
                                <li>The platform is not intended for the transmission of protected health information</li>
                                <li>Any data you provide is submitted at your discretion</li>
                            </ul>
                            <p>
                                You should not use the platform to submit sensitive medical records or detailed personal health information.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Pain Signal Alerts and Outreach
                            </h2>
                            <p className="mb-4">
                                If user-entered data indicates a significant increase in pain:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>The system may generate an internal alert</li>
                                <li>Dr. Jonathan may, at his discretion, review or initiate outreach</li>
                            </ul>
                            <p className="mb-4">
                                You acknowledge:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Alerts are not guaranteed to be seen or acted upon</li>
                                <li>Outreach is not guaranteed</li>
                                <li>Outreach is informational only</li>
                                <li>It is not based on a full clinical evaluation</li>
                                <li>It does not create a provider relationship or duty of care</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Payments and Access
                            </h2>
                            <p className="mb-4">
                                Access is granted based on your selected purchase.
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Access terms vary by plan</li>
                                <li>Payments are non-refundable unless explicitly stated</li>
                                <li>Guarantees are governed separately from this Agreement</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Termination
                            </h2>
                            <p className="mb-4">
                                We may suspend or terminate access if:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>You violate this Agreement</li>
                                <li>You misuse the platform</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Intellectual Property
                            </h2>
                            <p>
                                All content, systems, and materials are owned by Foot Capacity System and protected by applicable laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Disclaimer of Warranties
                            </h2>
                            <p className="mb-4">
                                The platform is provided as is, without warranties of any kind. We do not guarantee:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Pain relief</li>
                                <li>Recovery outcomes</li>
                                <li>Specific results</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Limitation of Liability
                            </h2>
                            <p>
                                To the maximum extent permitted by law, Foot Capacity System and its affiliates shall not be liable for any injuries, damages, or losses arising from use of the platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Indemnification
                            </h2>
                            <p>
                                You agree to indemnify and hold harmless Foot Capacity System and its affiliates from any claims arising from your use of the platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Modifications
                            </h2>
                            <p>
                                We may update this Agreement at any time. Continued use constitutes acceptance of changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Governing Law
                            </h2>
                            <p>
                                This Agreement shall be governed by the laws of the State of Louisiana.
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

export default EULA;