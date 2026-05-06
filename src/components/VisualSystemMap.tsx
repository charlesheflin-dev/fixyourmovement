import { motion } from "framer-motion";
import programImage from "@/assets/12-week-program.png";

const VisualSystemMap = () => {
    return (
        <section className="py-8 md:py-12 bg-slate-100/30">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
                        The 12-Week Recovery System
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="section-card p-6 md:p-8"
                >
                    <img
                        src={programImage}
                        alt="12-Week Foot Capacity System Program Map"
                        className="w-full h-auto rounded-lg"
                    />
                    <p className="text-center text-muted-foreground text-lg mt-6 font-body leading-relaxed">
                        A step-by-step rehabilitation progression designed to rebuild strength, restore load tolerance, and help your body handle everyday activity again.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default VisualSystemMap;
