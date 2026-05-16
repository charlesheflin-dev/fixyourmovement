import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

// Import testimonial images
import testimonial1 from "@/assets/testimonials/1.jpg";
import testimonial2 from "@/assets/testimonials/2.jpg";
import testimonial3 from "@/assets/testimonials/3.jpg";
import testimonial4 from "@/assets/testimonials/4.jpg";
import testimonial5 from "@/assets/testimonials/5.jpg";
import testimonial6 from "@/assets/testimonials/6.jpg";
import testimonial7 from "@/assets/testimonials/7.jpg";
import testimonial8 from "@/assets/testimonials/8.jpg";
import testimonial9 from "@/assets/testimonials/9.jpg";

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
                    className="text-center mb-12"
                >
                    <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
                        For Many People, Recovery Means Getting Parts Of Their Life Back
                    </h2>
                    <p className="text-muted-foreground text-lg font-body">
                        Recurring foot and ankle pain affects far more than just movement.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-3xl mx-auto text-center space-y-4 text-lg text-muted-foreground font-body leading-relaxed mb-8"
                >
                    <p>
                        When pain keeps returning, people often begin changing the way they live without even realizing it. They walk less. Exercise less. Travel less. Avoid activities they used to enjoy. And slowly lose confidence in what their body can comfortably handle.
                    </p>
                    <p>
                        That's why the goal is not simply temporary symptom relief. The goal is helping people move through life with more confidence, more consistency, and less fear of constantly triggering another setback.
                    </p>
                    <p>
                        Here are a few examples of what people have shared after using The Foot Capacity System:
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
