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
                    <p className="text-slate-700 text-sm font-semibold uppercase tracking-widest mb-2">Foot Capacity System — Back At It Physical Therapy, LLC</p>
                    <p className="text-muted-foreground font-body mb-10">Effective Date: June 25, 2026</p>

                    <div className="space-y-8 font-body text-lg text-muted-foreground leading-relaxed">
                        <p>
                            This End User License Agreement ("Agreement" or "EULA") is a legal agreement between you and Back At It Physical Therapy, LLC, doing business as Foot Capacity System ("Foot Capacity System," "we," "our," or "us"), governing your access to and use of the Foot Capacity System mobile application, website, software, educational content, rehabilitation tools, artificial intelligence-assisted features, progress tracking tools, and related digital services (collectively, the "Platform").
                        </p>
                        <p>
                            By downloading, installing, accessing, purchasing, or using the Platform, you acknowledge that you have read, understood, and agree to be bound by this Agreement. If you do not agree to this Agreement, you must not access or use the Platform.
                        </p>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                1. Definitions
                            </h2>
                            <p className="mb-3"><span className="font-semibold text-primary">Platform</span> means the Foot Capacity System mobile application, website, software, educational content, rehabilitation programs, assessments, progress tracking tools, AI-assisted features, and related digital services.</p>
                            <p className="mb-3"><span className="font-semibold text-primary">User</span> means the individual who downloads, purchases, accesses, or uses the Platform.</p>
                            <p><span className="font-semibold text-primary">Content</span> means all videos, exercise demonstrations, graphics, text, educational materials, assessments, algorithms, software, documentation, trademarks, logos, and other materials made available through the Platform.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                2. License Grant
                            </h2>
                            <p>
                                Subject to your compliance with this Agreement, Back At It Physical Therapy, LLC grants you a limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Platform solely for your own personal, non-commercial use. This license does not transfer ownership of the Platform or any intellectual property rights. All rights not expressly granted in this Agreement are reserved.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                3. Permitted Use
                            </h2>
                            <p>
                                You may use the Platform solely for your own personal rehabilitation, education, progress tracking, and related lawful purposes. You agree to use the Platform in accordance with this Agreement, our Terms of Service, and all applicable laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                4. Prohibited Uses
                            </h2>
                            <p className="mb-3">You may not:</p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Copy, reproduce, distribute, sublicense, lease, rent, sell, or commercially exploit any portion of the Platform or its Content</li>
                                <li>Reverse engineer, decompile, disassemble, or attempt to discover the source code, algorithms, or underlying technology of the Platform</li>
                                <li>Remove or alter copyright, trademark, or proprietary notices</li>
                                <li>Share your account credentials or permit another individual to access the Platform using your account</li>
                                <li>Use the Platform for unlawful purposes or in any manner that interferes with its operation, security, or availability</li>
                                <li>Circumvent security features or access restrictions</li>
                                <li>Upload malicious software, viruses, or harmful code</li>
                            </ul>
                            <p>Violation of these restrictions may result in immediate suspension or termination of your license.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                5. Platform Description
                            </h2>
                            <p className="mb-4">
                                Foot Capacity System is a therapist-supported digital musculoskeletal rehabilitation platform designed to help individuals manage and recover from foot and ankle conditions through structured rehabilitation guidance, progress monitoring, educational content, symptom tracking, AI-assisted progression support, and related digital services.
                            </p>
                            <p>
                                The Platform is intended to assist users in organizing and supporting their rehabilitation journey. The Platform is intended to supplement, not replace, individualized medical evaluation, diagnosis, treatment, or professional healthcare services.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                6. Educational Purpose and No Medical Advice
                            </h2>
                            <p className="mb-4">
                                The Platform is designed to provide educational information, rehabilitation support, progress tracking, exercise guidance, and related digital tools intended to assist users in managing their rehabilitation. The Platform is provided for educational and self-directed rehabilitation support purposes only.
                            </p>
                            <p className="mb-3">Nothing within the Platform constitutes or should be interpreted as:</p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Medical advice</li>
                                <li>A medical diagnosis</li>
                                <li>Individualized treatment</li>
                                <li>Physical therapy services</li>
                                <li>A substitute for care provided by a licensed healthcare professional</li>
                                <li>A guarantee of recovery or specific clinical outcomes</li>
                            </ul>
                            <p className="mb-4">
                                Participation in any exercise, rehabilitation, or physical activity involves inherent risks, including the possibility of worsening symptoms or injury. You are solely responsible for determining whether participation is appropriate for your individual circumstances.
                            </p>
                            <p className="mb-4">
                                You should consult a qualified healthcare provider before beginning any rehabilitation or exercise program, particularly if you have severe or worsening pain, recent surgery, significant swelling, neurological symptoms, loss of sensation, balance problems, or any other condition that may affect your ability to exercise safely.
                            </p>
                            <p>
                                If you experience severe pain, chest pain, difficulty breathing, sudden weakness, loss of sensation, signs of infection, or any other medical emergency, discontinue use of the Platform immediately and seek appropriate medical care.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                7. No Physician-Patient or Physical Therapist-Patient Relationship
                            </h2>
                            <p>
                                Your use of the Platform does not establish a physician-patient relationship, physical therapist-patient relationship, or any other healthcare provider relationship with Dr. Jonathan Schutza, Back At It Physical Therapy, LLC, or any member of the Foot Capacity System team. The Platform is self-directed. Any communication you receive from Foot Capacity System is educational or informational in nature and should not be interpreted as individualized medical advice or treatment.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                8. AI-Assisted Features
                            </h2>
                            <p className="mb-4">
                                The Platform may use automated algorithms, predictive models, and artificial intelligence technologies to assist with rehabilitation guidance, exercise progression, symptom trend analysis, recovery pattern recognition, adherence support, therapist decision support, and overall platform improvement. AI-assisted recommendations are generated using user-provided information, platform algorithms, and other available data within the Platform.
                            </p>
                            <p>
                                These recommendations are intended to support educational guidance and rehabilitation planning. They are not a substitute for professional medical judgment, diagnosis, or treatment. Because artificial intelligence systems have inherent limitations, recommendations may occasionally be incomplete, inaccurate, delayed, or inappropriate for your individual circumstances. You remain solely responsible for all decisions regarding your health, physical activity, and participation in rehabilitation.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                9. User Responsibilities
                            </h2>
                            <p className="mb-3">By using the Platform, you acknowledge and agree that you are responsible for:</p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Using the Platform in accordance with this Agreement</li>
                                <li>Providing accurate account and rehabilitation information</li>
                                <li>Performing exercises safely and within your own capabilities</li>
                                <li>Monitoring your symptoms and physical response to activity</li>
                                <li>Discontinuing any activity that causes concerning pain or worsening symptoms</li>
                                <li>Seeking medical evaluation whenever appropriate</li>
                                <li>Maintaining the confidentiality of your account credentials</li>
                            </ul>
                            <p>You acknowledge that individual rehabilitation outcomes vary and depend upon numerous factors beyond the control of Foot Capacity System.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                10. Platform Updates
                            </h2>
                            <p>
                                To improve functionality, security, performance, regulatory compliance, and user experience, the Platform may automatically deploy software updates, bug fixes, security patches, feature enhancements, and other modifications. Some updates may modify, replace, or discontinue existing features. By continuing to use the Platform after updates become available, you agree to receive and use those updates as part of the licensed software.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                11. Privacy, Data Collection, and Refunds
                            </h2>
                            <p>
                                Collection, use, storage, protection, and processing of your information are governed by the Foot Capacity System Privacy Policy, which is incorporated into this Agreement by reference. Refund eligibility is governed by the Foot Capacity System Refund Policy in effect at the time of your purchase. By using the Platform, you acknowledge that you have reviewed and agree to both the Privacy Policy and the Refund Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                12. Intellectual Property
                            </h2>
                            <p className="mb-4">
                                The Platform, including all software, source code, artificial intelligence models, algorithms, rehabilitation methodologies, assessments, exercise progressions, videos, graphics, text, logos, trademarks, documentation, databases, educational materials, and all other Content made available through the Platform, are owned by Back At It Physical Therapy, LLC, doing business as Foot Capacity System, or its licensors, and are protected by applicable intellectual property laws.
                            </p>
                            <p>
                                This Agreement grants you a limited license to use the Platform. It does not transfer ownership of the Platform or any intellectual property rights. You may not copy, reproduce, modify, distribute, publish, create derivative works from, reverse engineer, decompile, disassemble, commercially exploit, or otherwise use any portion of the Platform except as expressly permitted by this Agreement. All rights not expressly granted are reserved.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                13. Disclaimer of Warranties
                            </h2>
                            <p className="mb-4">
                                THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. To the fullest extent permitted by applicable law, Back At It Physical Therapy, LLC disclaims all warranties, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, availability, reliability, and uninterrupted operation.
                            </p>
                            <p className="mb-3">We do not warrant or guarantee that:</p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>The Platform will produce any particular rehabilitation, medical, or functional outcome</li>
                                <li>Pain will decrease or resolve</li>
                                <li>Recovery will occur within any specific timeframe</li>
                                <li>Recommendations will be appropriate for every individual</li>
                                <li>The Platform will always be available or operate without interruption</li>
                                <li>The Platform will be free from errors, defects, bugs, viruses, or other harmful components</li>
                            </ul>
                            <p>Every individual's condition, response to rehabilitation, and recovery experience is different. Your use of the Platform is entirely voluntary and at your own risk.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                14. Limitation of Liability
                            </h2>
                            <p className="mb-4">
                                To the fullest extent permitted by applicable law, Back At It Physical Therapy, LLC, doing business as Foot Capacity System, Dr. Jonathan Schutza, our affiliates, employees, contractors, licensors, service providers, successors, and assigns shall not be liable for any direct, indirect, incidental, consequential, special, exemplary, punitive, or similar damages arising out of or relating to your access to or use of the Platform, your inability to access or use the Platform, reliance upon educational content or AI-assisted recommendations, exercise participation or rehabilitation activities, pain, injury, aggravation of symptoms, or other physical outcomes, unauthorized access to your account or data, Platform interruptions, technical failures, or software defects, or third-party products or services.
                            </p>
                            <p>
                                To the fullest extent permitted by law, our total liability arising from your use of the Platform shall not exceed the total amount you paid to Back At It Physical Therapy, LLC for access to the Platform during the twelve (12) months immediately preceding the event giving rise to the claim.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                15. Indemnification
                            </h2>
                            <p className="mb-3">
                                You agree to defend, indemnify, and hold harmless Back At It Physical Therapy, LLC, doing business as Foot Capacity System, Dr. Jonathan Schutza, our affiliates, employees, contractors, licensors, service providers, successors, and assigns from and against any claims, demands, liabilities, damages, losses, costs, or expenses, including reasonable attorneys' fees, arising out of or relating to:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Your use of the Platform</li>
                                <li>Your violation of this Agreement</li>
                                <li>Your violation of applicable law</li>
                                <li>Information you submit through the Platform</li>
                                <li>Your infringement of another person's rights</li>
                                <li>Your misuse of the Platform or its Content</li>
                            </ul>
                            <p>This obligation survives termination of this Agreement.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                16. Termination
                            </h2>
                            <p>
                                Back At It Physical Therapy, LLC may suspend, restrict, or terminate your license to access the Platform at any time if you violate this Agreement, misuse the Platform, fail to satisfy applicable payment obligations, or engage in conduct that creates legal, operational, or security risks. Upon termination, your license to use the Platform immediately ends. Sections relating to Intellectual Property, Disclaimer of Warranties, Limitation of Liability, Indemnification, Governing Law, and any provision that by its nature is intended to survive termination shall remain in effect.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                17. Governing Law
                            </h2>
                            <p>
                                This Agreement shall be governed by and interpreted in accordance with the laws of the State of Louisiana, without regard to its conflict of law principles. Any legal action arising from or relating to this Agreement or your use of the Platform shall be brought exclusively in the state or federal courts located in Louisiana, unless applicable law requires otherwise. By using the Platform, you consent to the jurisdiction of those courts.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                18. Changes to this Agreement
                            </h2>
                            <p>
                                We may revise this End User License Agreement from time to time to reflect changes in the Platform, technology, legal requirements, or business practices. When changes are made, the revised Agreement will be posted with an updated Effective Date. Your continued use of the Platform after the revised Agreement becomes effective constitutes your acceptance of those changes. If you do not agree to the revised Agreement, you must discontinue use of the Platform.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-slate-200">
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                19. Contact Information
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

export default EULA;