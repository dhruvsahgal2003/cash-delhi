import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Heart, Sparkles, Target } from "lucide-react";

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

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-5xl lg:text-6xl font-light mb-6 text-foreground" data-testid="text-about-title">
                About Cash Delhi
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed" data-testid="text-about-intro">
                Where luxury meets unforgettable moments. We don't just organize events—we craft experiences that define Delhi's nightlife and celebration culture.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-mission-title">
                  Our Mission
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6" data-testid="text-mission-description">
                  At Cash Delhi, we believe every celebration deserves to be extraordinary. Our mission is to transform ordinary gatherings into extraordinary experiences, blending sophistication, excitement, and impeccable attention to detail.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-mission-description-2">
                  We specialize in creating moments that resonate long after the night ends—whether it's an exclusive nightclub takeover, a high-profile PR event, or an intimate luxury celebration.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 bg-background rounded-md border border-border hover-elevate transition-all duration-300">
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-serif text-xl mb-2 text-foreground">Vision</h3>
                  <p className="text-sm text-muted-foreground">Leading Delhi's luxury event scene</p>
                </div>
                <div className="p-8 bg-background rounded-md border border-border hover-elevate transition-all duration-300">
                  <Sparkles className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-serif text-xl mb-2 text-foreground">Excellence</h3>
                  <p className="text-sm text-muted-foreground">Uncompromising quality in every detail</p>
                </div>
                <div className="p-8 bg-background rounded-md border border-border hover-elevate transition-all duration-300">
                  <Heart className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-serif text-xl mb-2 text-foreground">Passion</h3>
                  <p className="text-sm text-muted-foreground">Dedicated to creating magic</p>
                </div>
                <div className="p-8 bg-background rounded-md border border-border hover-elevate transition-all duration-300">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-serif text-xl mb-2 text-foreground">Premium</h3>
                  <p className="text-sm text-muted-foreground">Exclusive experiences only</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-sets-apart-title">
                What Sets Us Apart
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-sets-apart-subtitle">
                We don't follow trends—we set them
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="text-5xl font-serif text-primary mb-4">01</div>
                <h3 className="font-serif text-2xl mb-4 text-foreground">Exclusive Access</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Partnerships with Delhi's most prestigious venues and brands, giving you access to experiences money can't usually buy.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="text-center">
                <div className="text-5xl font-serif text-primary mb-4">02</div>
                <h3 className="font-serif text-2xl mb-4 text-foreground">Personalized Touch</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every event is tailored to your vision. No cookie-cutter experiences—only bespoke celebrations that reflect your style.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="text-center">
                <div className="text-5xl font-serif text-primary mb-4">03</div>
                <h3 className="font-serif text-2xl mb-4 text-foreground">Flawless Execution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From concept to completion, our team handles every detail with precision, so you can focus on enjoying the moment.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl lg:text-5xl font-light mb-8 text-foreground" data-testid="text-expertise-title">
                Our Expertise
              </h2>
              <div className="text-left space-y-8">
                <div>
                  <h3 className="font-serif text-2xl mb-3 text-primary">Events</h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    From intimate gatherings to large-scale celebrations, we orchestrate events that leave lasting impressions. Birthdays, anniversaries, corporate galas—we do it all with style.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3 text-primary">PR & Marketing</h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Building buzz and creating connections. Our PR services ensure your event gets the attention it deserves, with strategic promotion across social media and exclusive networks.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3 text-primary">Luxury Takeovers</h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Transform entire venues into your personal playground. Our luxury takeovers give you complete control over some of Delhi's most coveted spaces for an experience unlike any other.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
