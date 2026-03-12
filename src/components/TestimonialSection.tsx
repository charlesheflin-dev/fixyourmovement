import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "I had plantar fasciitis for over a year. I tried orthotics, stretching, and rest. This was the first time someone explained why the pain kept coming back. The progression finally made sense.",
    },
    {
        quote: "I was afraid to walk long distances because my heel would flare up later. After following the system consistently, I started trusting my foot again.",
    },
    {
        quote: "Instead of guessing what exercises to do, I finally had a clear plan.",
    },
];

const TestimonialSection = () => {
    return (
        <section className="py-8 md:py-12 bg-sage-light/30">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
                        What People Notice When They Rebuild Capacity
                    </h2>
                    <p className="text-muted-foreground text-lg font-body">
                        Freely shared testimonials
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="section-card p-6 md:p-8 relative"
                        >
                            <div className="absolute top-4 left-4 opacity-10">
                                <Quote className="w-8 h-8 text-sage" />
                            </div>
                            <p className="text-foreground font-body text-lg leading-relaxed italic pt-4">
                                "{testimonial.quote}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
