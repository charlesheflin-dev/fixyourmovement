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
                            FixYourMovement.com ("FixYourMovement.com," "we," "us," or "our") respects your privacy and is committed to protecting it through this Privacy Policy.
                        </p>
                        <p>
                            This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, including any related forms, opt-ins, or communications (collectively, the "Site").
                        </p>
                        <p>
                            By using the Site, you agree to the practices described in this policy.
                        </p>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Information We Collect
                            </h2>
                            <p className="mb-4">We may collect information about you in the following ways.</p>

                            <h3 className="font-display text-lg text-primary font-semibold mb-3">
                                Personal Information You Voluntarily Provide
                            </h3>
                            <p className="mb-3">
                                When you fill out a form, subscribe to communications, or contact us, you may provide information such as:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Social media handles</li>
                                <li>Any information you choose to include in messages or submissions</li>
                            </ul>
                            <p className="mb-6">
                                You are not required to provide personal information to browse the Site, but certain features may require it.
                            </p>

                            <h3 className="font-display text-lg text-primary font-semibold mb-3">
                                Automatically Collected Information
                            </h3>
                            <p className="mb-3">
                                When you access the Site, we may automatically collect certain information, including:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>IP address</li>
                                <li>Browser type</li>
                                <li>Device information</li>
                                <li>Pages viewed and time spent on the Site</li>
                                <li>Referring URLs</li>
                            </ul>
                            <p>This data is used for analytics, security, and site optimization.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                How We Use Your Information
                            </h2>
                            <p className="mb-3">We use the information we collect to:</p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Review submissions and assess potential alignment or partnership fit</li>
                                <li>Communicate with you regarding inquiries or requests</li>
                                <li>Send transactional or informational emails</li>
                                <li>Improve the performance and usability of the Site</li>
                                <li>Maintain security and prevent misuse</li>
                            </ul>
                            <p className="text-foreground font-medium">We do not sell your personal information.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Email Communications and CAN SPAM Compliance
                            </h2>
                            <p className="mb-4">
                                If you provide your email address, you may receive communications from us related to your inquiry, submission, or relationship with FixYourMovement.com.
                            </p>
                            <p className="mb-3">
                                In compliance with the Controlling the Assault of Non-Solicited Pornography and Marketing Act of 2003 (CAN SPAM), our emails will:
                            </p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>Clearly identify the sender</li>
                                <li>Include accurate subject lines</li>
                                <li>Include a valid physical or electronic contact method</li>
                                <li>Provide a clear option to opt out of future communications</li>
                            </ul>
                            <p>
                                You may unsubscribe from non-essential communications at any time by following the instructions included in our emails. We honor opt-out requests promptly.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Cookies and Tracking Technologies
                            </h2>
                            <p className="mb-4">
                                We may use cookies or similar technologies to enhance user experience and analyze Site performance.
                            </p>
                            <p>
                                You may choose to disable cookies through your browser settings. Disabling cookies may affect certain functionality of the Site.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Sharing of Information
                            </h2>
                            <p className="mb-3">We may share information only in the following circumstances:</p>
                            <ul className="list-disc pl-8 space-y-2 mb-4">
                                <li>With service providers who assist in operating the Site or communications, under confidentiality obligations</li>
                                <li>To comply with legal requirements, regulations, or lawful requests</li>
                                <li>To protect the rights, property, or safety of FixYourMovement.com, our users, or others</li>
                            </ul>
                            <p>We do not share personal information for third-party marketing purposes.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Data Security
                            </h2>
                            <p>
                                We implement reasonable administrative, technical, and physical safeguards designed to protect your information. However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Data Retention
                            </h2>
                            <p>
                                We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Third Party Links
                            </h2>
                            <p>
                                The Site may contain links to third party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review their privacy policies independently.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Children's Information
                            </h2>
                            <p>
                                The Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Our Principles
                            </h2>
                            <p>
                                FixYourMovement.com operates on principles of discretion, integrity, and respect for trust. We collect only what is necessary, use it responsibly, and avoid practices that compromise privacy for short-term gain.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Changes to This Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be reflected by updating the "Last updated" date at the top of this page.
                            </p>
                        </section>

                        <section className="section-card p-8 md:p-10 border-t-4 border-sage">
                            <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-4">
                                Contact Us
                            </h2>
                            <p className="mb-2">
                                If you have questions about this Privacy Policy or our data practices, you may contact us at:
                            </p>
                            <p className="text-foreground font-medium">Dopamine Marketing</p>
                            <p>
                                Email:{" "}
                                <a
                                    href="mailto:contact@fixyourmovement.com"
                                    className="text-sage hover:text-primary transition-colors"
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

export default PrivacyPolicy;
