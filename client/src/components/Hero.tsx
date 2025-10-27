import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          data-testid="video-hero"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-luxury-nightclub-party-9247/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-5xl"
        >
          <motion.h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            data-testid="text-hero-title"
          >
            <span className="text-primary">Cash</span>
            <span className="text-white">Delhi</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            data-testid="text-hero-tagline"
          >
            Events | PR | Luxury Takeovers
          </motion.p>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            data-testid="text-hero-subtitle"
          >
            Crafting unforgettable experiences in town
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer hover-elevate active-elevate-2 p-3 rounded-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.6,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          data-testid="button-scroll-indicator"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 text-white/80" />
        </motion.button>
      </div>
    </div>
  );
}
