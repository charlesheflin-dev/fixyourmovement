import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ThankYou = () => {
    return (
        <div className="min-h-screen bg-background">
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
                <div className="container mx-auto px-6 py-4 flex items-center justify-center max-w-6xl">
                    <span className="font-display font-semibold text-lg text-primary">
                        The Foot Capacity System
                    </span>
                </div>
            </header>

            <main className="pt-28 pb-12 md:pt-36 md:pb-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10"
                    >
                        <h1 className="font-display text-3xl md:text-5xl font-bold text-primary mb-4">
                            Thank You
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-body">
                            Please watch your welcome message from Dr. Jonathan
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="video-container aspect-video max-w-3xl mx-auto mb-10"
                    >
                        <iframe
                            src="https://customer-hene8ngxxo3eajlj.cloudflarestream.com/fc14393e8758f53eb9a7bb92fd21f071/iframe?poster=https%3A%2F%2Fimagedelivery.net%2FZUbdF1A6bMNaR2l0OC84jw%2F0a87b6a7-6fb2-48dc-9e26-aa5c134c0200%2Fpublic"
                            className="w-full h-full rounded-xl"
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                            allowFullScreen
                        ></iframe>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center px-4"
                    >
                        <p className="text-muted-foreground text-lg mb-6 font-body">
                            Ready to access your app and get started?
                        </p>
                        <a
                            href="https://members.fixyourmovement.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Button size="lg" className="cta-button text-base w-full box-border">
                            Login for Install Steps
                                <ExternalLink className="ml-2 w-4 h-4 flex-shrink-0" />
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default ThankYou;
