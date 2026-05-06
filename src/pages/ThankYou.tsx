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
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 relative rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-900 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue/90 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-blue transition-colors hover:scale-105 transform duration-200">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="ml-1">
                                            <path d="M8 5V19L19 12L8 5Z" fill="hsl(0 0% 100%)" />
                                        </svg>
                                    </div>
                                    <p className="text-primary-foreground/80 font-body text-base md:text-lg">
                                        Watch Welcome Message
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center"
                    >
                        <p className="text-muted-foreground text-lg mb-6 font-body">
                            Ready to access your program?
                        </p>
                        <a
                            href="https://whop.com/login/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="cta-button text-lg">
                                Login to Patient Portal
                                <ExternalLink className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default ThankYou;
