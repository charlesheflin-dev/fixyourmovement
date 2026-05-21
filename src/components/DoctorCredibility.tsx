import { motion } from "framer-motion";

const DoctorCredibility = () => {
    return (
        <section className="py-8 md:py-6">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row">

                        {/* Left: headshot + social buttons */}
                        <div className="lg:w-2/5 p-8 md:p-12 flex flex-col items-center justify-center gap-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50">
                            <img
                                src="/images/dr-jonathan-schutza-headshot.png"
                                alt="Dr. Jonathan Schutza, PT, DPT"
                                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                                loading="lazy"
                            />
                            
                            <a
                                href="https://www.instagram.com/dr.schutza.pt/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full max-w-[220px] hover:opacity-80 transition-opacity"
                            >
                                <img
                                    src="/images/follow-on-instagram.png"
                                    alt="Follow on Instagram"
                                    className="w-full rounded-xl"
                                    loading="lazy"
                                />
                            </a>
                            
                            <a
                                href="https://www.facebook.com/share/18vGC5rzP8/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full max-w-[220px] hover:opacity-80 transition-opacity"
                            >
                                <img
                                    src="/images/follow-on-facebook.png"
                                    alt="Follow on Facebook"
                                    className="w-full rounded-xl"
                                    loading="lazy"
                                />
                            </a>
                        </div>

                        {/* Right: text */}
                        <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                                Built by a Doctor<br />of Physical Therapy
                            </h2>
                            <div className="w-10 h-0.5 bg-blue-600 mb-6" />
                            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                                <p>
                                    <span className="text-blue-600 font-semibold">Dr. Jonathan Schutza, PT, DPT</span> is a licensed physical therapist specializing in biomechanics-driven rehabilitation for chronic foot pain.
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DoctorCredibility;
