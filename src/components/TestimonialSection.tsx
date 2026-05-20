import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

// Import testimonial images
import testimonial1 from "@/assets/testimonials/1B.jpg";
import testimonial2 from "@/assets/testimonials/2B.jpg";
import testimonial3 from "@/assets/testimonials/3B.jpg";
import testimonial4 from "@/assets/testimonials/4B.jpg";
import testimonial5 from "@/assets/testimonials/5B.jpg";
import testimonial6 from "@/assets/testimonials/6B.jpg";
import testimonial7 from "@/assets/testimonials/7B.jpg";
import testimonial8 from "@/assets/testimonials/8B.jpg";
import testimonial9 from "@/assets/testimonials/9B.jpg";

const testimonialImages = [
    testimonial1,
    testimonial2,
    testimonial3,
    testimonial4,
    testimonial5,
    testimonial6,
    testimonial7,
    testimonial8,
    testimonial9,
];

const TestimonialSection = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            if (!isHovered) {
                api.scrollNext();
            }
        }, 3000); // Auto-scroll every 3 seconds

        return () => clearInterval(interval);
    }, [api, isHovered]);

    return (
        <section className="py-8 md:py-6 bg-slate-100/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Top: text left, photos right */}
                        <div className="flex flex-col lg:flex-row">
                            {/* Left: text */}
                            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                                <div className="w-8 h-0.5 bg-blue-600 mb-6" />
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                                    For Many People, Recovery Means{" "}
                                    <span className="text-blue-600">Getting Parts Of Their Life Back.</span>
                                </h2>
                                <p className="text-slate-500 text-base leading-relaxed mb-6">
                                    Recurring foot and ankle pain affects more than just movement— it affects <span className="text-blue-600 font-medium">life.</span>
                                </p>
                                <div className="w-full h-px bg-slate-200 mb-6" />
                                <p className="text-slate-700 text-base leading-relaxed font-medium">
                                    The goal isn't just temporary relief. It's helping you move through life with more{" "}
                                    <span className="text-blue-600">confidence</span>,{" "}
                                    <span className="text-blue-600">consistency</span>, and{" "}
                                    <span className="text-blue-600">less fear</span> of setbacks.
                                </p>
                            </div>

                            {/* Right: 3 person photo cards */}
                            <div className="lg:w-3/5 p-6 lg:p-8">
                                <div className="grid grid-cols-3 gap-3 h-full">
                                    <div className="flex flex-col items-center gap-3">
                                        <img src="/images/person1.png" alt="Move with confidence" className="w-full rounded-2xl object-cover" />
                                        <p className="font-semibold text-slate-900 text-sm text-center">Move With Confidence</p>
                                        <p className="text-slate-500 text-xs text-center leading-relaxed">Walk, exercise, and enjoy daily activities with less hesitation.</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <img src="/images/person2.png" alt="Live more freely" className="w-full rounded-2xl object-cover" />
                                        <p className="font-semibold text-slate-900 text-sm text-center">Live More Freely</p>
                                        <p className="text-slate-500 text-xs text-center leading-relaxed">Travel, explore, and stay active without holding back.</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <img src="/images/person3.png" alt="Get back to what matters" className="w-full rounded-2xl object-cover" />
                                        <p className="font-semibold text-slate-900 text-sm text-center">Get Back To What Matters</p>
                                        <p className="text-slate-500 text-xs text-center leading-relaxed">Spend more time doing the things you love with the people you love.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: 3 checkmark callouts */}
                        <div className="border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3 p-5">
                                <div className="bg-blue-50 rounded-full p-2 shrink-0">
                                    <CheckCircle size={16} className="text-blue-600" />
                                </div>
                                <p className="font-semibold text-slate-900 text-sm">Less fear of setbacks.</p>
                            </div>
                            <div className="flex items-center gap-3 p-5">
                                <div className="bg-green-50 rounded-full p-2 shrink-0">
                                    <CheckCircle size={16} className="text-green-600" />
                                </div>
                                <p className="font-semibold text-slate-900 text-sm">More consistency in daily life.</p>
                            </div>
                            <div className="flex items-center gap-3 p-5">
                                <div className="bg-purple-50 rounded-full p-2 shrink-0">
                                    <CheckCircle size={16} className="text-purple-600" />
                                </div>
                                <p className="font-semibold text-slate-900 text-sm">More confidence in your body.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="max-w-3xl mx-auto mb-8"
                >
                    <img
                      src="/images/patient-experiences.png"
                      alt="Patient experiences with The Foot Capacity System"
                      className="w-full rounded-2xl"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-6xl mx-auto"
                >
                    <div
                        className="w-full"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onTouchStart={() => setIsHovered(true)}
                        onTouchEnd={() => setIsHovered(false)}
                    >
                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {testimonialImages.map((image, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                                    >
                                        <div className="p-1">
                                            <div className="section-card overflow-hidden">
                                                <img
                                                    src={image}
                                                    alt={`Testimonial ${index + 1}`}
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto text-center text-lg text-muted-foreground font-body italic mt-8"
                >
                    <p>
                        Most people are not lacking effort. They're lacking a system they can actually stay consistent with long enough to move forward.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialSection;
