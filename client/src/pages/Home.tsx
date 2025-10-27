import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Sparkles, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";
import { Card } from "@/components/ui/card";

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

export default function Home() {
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const featuredEvent = events[0];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* What We Do Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-what-we-do-title">
                Elevating Experiences
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-what-we-do-subtitle">
                From exclusive events to luxury takeovers, we create moments that last forever
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <AnimatedSection delay={0.2}>
              <Card className="p-8 text-center hover-elevate transition-transform duration-300" data-testid="card-service-events">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-normal mb-4 text-foreground">Exclusive Events</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Curating unforgettable celebrations that blend sophistication with excitement
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Card className="p-8 text-center hover-elevate transition-transform duration-300" data-testid="card-service-pr">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-normal mb-4 text-foreground">PR Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building connections and creating buzz for the most sought-after experiences
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <Card className="p-8 text-center hover-elevate transition-transform duration-300" data-testid="card-service-takeovers">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-normal mb-4 text-foreground">Luxury Takeovers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transforming venues into extraordinary spaces for premium experiences
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="py-24 lg:py-32 px-6 lg:px-8 bg-card">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-upcoming-title">
                  Next Experience
                </h2>
                <p className="text-lg lg:text-xl text-muted-foreground" data-testid="text-upcoming-subtitle">
                  Don't miss what's coming
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-96 lg:h-[500px] rounded-md overflow-hidden">
                  {featuredEvent.imageUrl ? (
                    <img
                      src={featuredEvent.imageUrl}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-event-${featuredEvent.id}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Calendar className="w-24 h-24 text-primary/40" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-3xl lg:text-4xl font-light mb-4 text-foreground" data-testid={`text-event-title-${featuredEvent.id}`}>
                    {featuredEvent.title}
                  </h3>
                  <p className="text-xl lg:text-2xl text-primary mb-4 font-light" data-testid={`text-event-date-${featuredEvent.id}`}>
                    {featuredEvent.date}
                  </p>
                  <p className="text-lg text-muted-foreground mb-6" data-testid={`text-event-venue-${featuredEvent.id}`}>
                    {featuredEvent.venue}
                  </p>
                  {featuredEvent.description && (
                    <p className="text-base text-foreground/80 mb-8 leading-relaxed" data-testid={`text-event-description-${featuredEvent.id}`}>
                      {featuredEvent.description}
                    </p>
                  )}
                  <Link href="/events" data-testid="link-view-all-events">
                    <Button variant="default" size="lg" data-testid="button-view-all-events">
                      View All Events
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-cta-title">
              Ready to Create Magic?
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-12" data-testid="text-cta-subtitle">
              Let's make your next event an unforgettable experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" data-testid="link-get-in-touch">
                <Button variant="default" size="lg" className="w-full sm:w-auto" data-testid="button-get-in-touch">
                  Get In Touch
                </Button>
              </Link>
              <Link href="/events" data-testid="link-see-events">
                <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-see-events">
                  See Our Events
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
