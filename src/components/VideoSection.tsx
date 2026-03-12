import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <section id="video" className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
            Watch this short presentation from Dr. Jonathan
          </h2>
          <p className="text-muted-foreground text-lg">
            Learn why most treatments only give temporary relief — and what actually works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="video-container aspect-video"
        >
          {/* Placeholder for VSL video embed */}
          <div className="w-full h-full flex items-center justify-center bg-navy-deep relative">
            <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-navy-deep flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-coral/90 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:bg-coral transition-colors hover:scale-105 transform duration-200">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M8 5V19L19 12L8 5Z" fill="hsl(40, 33%, 96%)" />
                  </svg>
                </div>
                <p className="text-primary-foreground/80 font-body text-lg">
                  14-minute presentation
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a href="#pricing" className="cta-button text-xl">
            Get the Foot Capacity System — $247
          </a>
          <p className="mt-4 text-muted-foreground text-base">
            One-time investment · Lifetime access · No recurring fees
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
