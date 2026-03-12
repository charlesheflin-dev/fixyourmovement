import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-16 md:pt-36 md:pb-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                        Contact
                    </h1>
                    <p className="text-muted-foreground font-body text-lg mb-10 leading-relaxed">
                        Have a question about The Foot Capacity System? We're here to help.
                    </p>

                    <div className="section-card p-8 md:p-12 border-t-4 border-sage">
                        <h2 className="font-display text-xl md:text-2xl text-primary font-semibold mb-6">
                            Get in Touch
                        </h2>
                        <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                            <p>
                                For questions about the program, your purchase, or anything else, reach out directly:
                            </p>
                            <div className="flex items-center gap-3 mt-6">
                                <span className="text-foreground font-medium">Email:</span>
                                <a
                                    href="mailto:contact@fixyourmovement.com"
                                    className="text-sage hover:text-primary transition-colors font-medium text-xl"
                                >
                                    contact@fixyourmovement.com
                                </a>
                            </div>
                            <p className="mt-6 text-base">
                                We aim to respond to all inquiries within 1–2 business days.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
