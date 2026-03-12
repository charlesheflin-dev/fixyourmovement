import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

const DoctorCredibility = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="section-card p-8 md:p-12 border-t-4 border-sage"
                >
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center">
                            <Stethoscope className="w-7 h-7 text-sage" />
                        </div>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl text-primary mb-6 text-center">
                        Built by a Doctor of Physical Therapy
                    </h2>

                    <div className="space-y-4 text-lg text-muted-foreground font-body leading-relaxed">
                        <p>
                            <strong className="text-foreground">Dr. Jonathan Schutza, PT, DPT</strong> is a licensed physical therapist specializing in biomechanics-driven rehabilitation for chronic foot pain.
                        </p>
                        <p>
                            His approach focuses on rebuilding tissue capacity through structured movement, progressive loading, and strength development.
                        </p>
                        <p>
                            Instead of relying on passive treatments or repeated clinic visits, he teaches patients how to restore strength and resilience so their bodies can handle real life again.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DoctorCredibility;
