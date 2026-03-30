import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

const DoctorCredibility = () => {
    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="section-card p-8 md:p-12 border-t-4 border-sage"
                >
                    <h2 className="font-display text-2xl md:text-3xl text-primary mb-8 text-center">
                        Built by a Doctor of Physical Therapy
                    </h2>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="shrink-0 flex flex-col items-center gap-4">
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-sage/30 shadow-lg">
                                <img
                                    src="/bonuses/images/dr-jonathan-schutza.jpg"
                                    alt="Dr. Jonathan Schutza, PT, DPT"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <a href="https://www.instagram.com/dr.schutza.pt/" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/bonuses/images/insta-4.png"
                                    alt="Follow Dr. Schutza on Instagram"
                                    className="h-10 w-auto hover:opacity-80 transition-opacity"
                                    loading="lazy"
                                />
                            </a>
                        </div>

                        <div className="space-y-4 text-lg text-muted-foreground font-body leading-relaxed">
                            <p>
                                <strong className="text-foreground">Dr. Jonathan Schutza, PT, DPT</strong> is a licensed physical therapist specializing in biomechanics-driven rehabilitation for chronic foot pain.
                            </p>
                            <p>
                                His approach focuses on rebuilding tissue capacity through structured movement, progressive loading, and strength development.
                            </p>
                            <p>
                                Passive treatments can help reduce pain, but they are only the beginning. Real recovery happens when the body rebuilds strength and tissue capacity through structured movement and progressive loading.
                            </p>
                            <p>
                                That is the focus of Dr. Schutza's approach.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DoctorCredibility;
