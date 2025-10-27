import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Story() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-5xl lg:text-6xl font-light mb-6 text-foreground" data-testid="text-story-title">
                Our Story
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed" data-testid="text-story-subtitle">
                From a vision to Delhi's premier luxury event company
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative h-80 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5" />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-5xl font-serif text-primary mb-4">The Beginning</div>
                  <h2 className="font-serif text-3xl mb-4 text-foreground" data-testid="text-beginning-title">
                    A Vision is Born
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-beginning-description">
                    It all started with a simple observation: Delhi deserved better celebrations. The events industry was saturated with mediocrity, lacking the sophistication and creativity that truly memorable experiences require. Yuvraj Ahuja saw an opportunity to change that.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-5xl font-serif text-primary mb-4">The Growth</div>
                  <h2 className="font-serif text-3xl mb-4 text-foreground" data-testid="text-growth-title">
                    Building Momentum
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-growth-description">
                    Word spread quickly. What started as small, intimate gatherings soon evolved into larger-scale events. Cash Delhi became known for pushing boundaries, securing exclusive venues, and delivering experiences that exceeded expectations. Our reputation grew, and so did our ambitions.
                  </p>
                </div>
                <div>
                  <div className="relative h-80 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative h-80 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5" />
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-5xl font-serif text-primary mb-4">Today</div>
                  <h2 className="font-serif text-3xl mb-4 text-foreground" data-testid="text-today-title">
                    Leading the Industry
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-today-description">
                    Today, Cash Delhi stands as a symbol of luxury and excellence in event management. From nightclub takeovers to high-profile PR events, we've become the trusted partner for those who demand nothing but the best. Our journey continues, and the best is yet to come.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-values-title">
                What Drives Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-values-subtitle">
                The principles that guide everything we do
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection delay={0.2}>
              <div className="p-8 bg-background rounded-md border border-border">
                <h3 className="font-serif text-2xl mb-4 text-primary">Passion for Perfection</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We're obsessed with the details. Every element, from the lighting to the music to the guest experience, is meticulously planned and executed to perfection.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="p-8 bg-background rounded-md border border-border">
                <h3 className="font-serif text-2xl mb-4 text-primary">Innovation & Creativity</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We don't follow trends—we set them. Our team is constantly exploring new ideas, concepts, and experiences to keep our events fresh and exciting.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="p-8 bg-background rounded-md border border-border">
                <h3 className="font-serif text-2xl mb-4 text-primary">Trust & Transparency</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Our clients trust us with their most important celebrations. We honor that trust with honest communication, clear expectations, and reliable delivery.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="p-8 bg-background rounded-md border border-border">
                <h3 className="font-serif text-2xl mb-4 text-primary">Community & Connection</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Beyond events, we're building a community of like-minded individuals who appreciate luxury, style, and unforgettable experiences.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20 px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-future-title">
              The Journey Continues
            </h2>
            <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed mb-8" data-testid="text-future-description">
              Our story is far from over. With every event, we're writing new chapters, pushing new boundaries, and creating new memories. The future of luxury event management is bright, and Cash Delhi will be leading the way.
            </p>
            <p className="text-2xl font-serif font-light text-primary italic" data-testid="text-future-tagline">
              This is just the beginning.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
