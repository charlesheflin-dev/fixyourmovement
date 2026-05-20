import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

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
    testimonial1, testimonial2, testimonial3,
    testimonial4, testimonial5, testimonial6,
    testimonial7, testimonial8, testimonial9,
];

const WalkthroughTestimonialSection = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!api) return;
        const interval = setInterval(() => {
            if (!isHovered) api.scrollNext();
        }, 3000);
        return () => clearInterval(interval);
    }, [api, isHovered]);

    return (
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        What People Often Notice First
                    </h2>
                    <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                        Here's what people say about their experience using the system to guide their recovery and build lasting progress.
                    </p>
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
                            opts={{ align: "start", loop: true }}
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
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center justify-center gap-2 mt-8 text-slate-400 text-xs"
                >
                    <ShieldCheck size={16} className="text-blue-400 shrink-0" />
                    <p>Individual results vary. These stories reflect real experiences but may not be typical for everyone.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default WalkthroughTestimonialSection;
