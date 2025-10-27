import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function Founder() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="font-serif text-5xl lg:text-6xl font-light mb-6 text-foreground" data-testid="text-founder-title">
                Meet the Founder
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed" data-testid="text-founder-subtitle">
                The visionary behind Delhi's most exclusive experiences
              </p>
            </div>
          </AnimatedSection>

          {/* Founder Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <AnimatedSection delay={0.2}>
              <div className="lg:col-span-2">
                <div className="relative rounded-md overflow-hidden aspect-[3/4] mb-8">
                  {/* Placeholder for founder image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-5xl font-serif text-primary">YA</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <h2 className="font-serif text-3xl mb-2 text-foreground" data-testid="text-founder-name">
                    Yuvraj Ahuja
                  </h2>
                  <p className="text-lg text-primary mb-6" data-testid="text-founder-role">
                    Founder & Chief Experience Officer
                  </p>
                  <div className="flex gap-3 justify-center lg:justify-start">
                    <a
                      href="https://instagram.com/cash.delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-founder-instagram"
                    >
                      <Button variant="outline" size="icon" data-testid="button-founder-instagram">
                        <Instagram className="w-4 h-4" />
                      </Button>
                    </a>
                    <a href="mailto:contact@cashdelhi.com" data-testid="link-founder-email">
                      <Button variant="outline" size="icon" data-testid="button-founder-email">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl mb-4 text-foreground" data-testid="text-founder-bio-title">
                    Crafting Experiences, Building Legacies
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-6" data-testid="text-founder-bio-1">
                    Yuvraj Ahuja isn't just an event organizer—he's a curator of unforgettable moments. With a passion for luxury, innovation, and impeccable attention to detail, Yuvraj has established Cash Delhi as the go-to name for premium events and exclusive takeovers in Delhi.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-6" data-testid="text-founder-bio-2">
                    His journey began with a simple vision: to transform the way people celebrate. From intimate gatherings to grand-scale productions, Yuvraj's approach combines creativity with precision, ensuring every event is a masterpiece.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-founder-bio-3">
                    What sets Yuvraj apart is his relentless commitment to excellence. He doesn't just meet expectations—he exceeds them. Whether it's securing exclusive venues, orchestrating seamless logistics, or creating buzz-worthy PR campaigns, Yuvraj's expertise turns dreams into reality.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6 py-4 bg-card/50 rounded-r-md">
                  <blockquote className="text-xl lg:text-2xl font-light italic text-foreground/90 mb-3" data-testid="text-founder-quote">
                    "Every event is an opportunity to create something extraordinary. We don't just organize parties—we craft experiences that people remember for a lifetime."
                  </blockquote>
                  <p className="text-sm text-muted-foreground">— Yuvraj Ahuja</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl lg:text-5xl font-light mb-8 text-center text-foreground" data-testid="text-philosophy-title">
                The Cash Delhi Philosophy
              </h2>
              <div className="space-y-6">
                <div className="p-8 bg-background rounded-md border border-border">
                  <h3 className="font-serif text-2xl mb-3 text-primary">Innovation First</h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Yuvraj believes in pushing boundaries. Every event is an opportunity to try something new, whether it's an unconventional venue, a unique theme, or cutting-edge entertainment.
                  </p>
                </div>
                <div className="p-8 bg-background rounded-md border border-border">
                  <h3 className="font-serif text-2xl mb-3 text-primary">Client-Centric Approach</h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Your vision is the priority. Yuvraj works closely with clients to understand their goals, preferences, and style, ensuring every detail aligns with their expectations.
                  </p>
                </div>
                <div className="p-8 bg-background rounded-md border border-border">
                  <h3 className="font-serif text-2xl mb-3 text-primary">Uncompromising Quality</h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    From the smallest detail to the grandest gesture, Yuvraj's commitment to quality is unwavering. Mediocrity is not an option—only excellence will do.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-vision-title">
              Looking Ahead
            </h2>
            <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed mb-8" data-testid="text-vision-description">
              Under Yuvraj's leadership, Cash Delhi continues to redefine luxury event management in Delhi and beyond. With an ever-growing network of premium partners and a reputation for flawless execution, the future is bright—and it's going to be unforgettable.
            </p>
            <p className="text-2xl font-serif font-light text-primary" data-testid="text-vision-tagline">
              Join us on this journey of creating magic, one event at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
