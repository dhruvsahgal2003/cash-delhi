import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

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

export default function Events() {
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-5xl lg:text-6xl font-light mb-6 text-foreground" data-testid="text-events-title">
                Upcoming Events
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed" data-testid="text-events-subtitle">
                Join us for unforgettable experiences
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : events.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-20">
                <Calendar className="w-24 h-24 text-muted-foreground/40 mx-auto mb-6" />
                <h2 className="font-serif text-3xl mb-4 text-foreground" data-testid="text-no-events-title">
                  No Upcoming Events
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto" data-testid="text-no-events-description">
                  We're planning something spectacular. Follow us on Instagram to stay updated!
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <AnimatedSection key={event.id} delay={index * 0.1}>
                  <Card
                    className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer group"
                    data-testid={`card-event-${event.id}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          data-testid={`img-event-${event.id}`}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <Calendar className="w-16 h-16 text-primary/40" />
                        </div>
                      )}
                      <div
                        className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm"
                        data-testid={`badge-event-date-${event.id}`}
                      >
                        {event.date}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3
                        className="font-serif text-2xl mb-3 text-foreground group-hover:text-primary transition-colors"
                        data-testid={`text-event-title-${event.id}`}
                      >
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        <span data-testid={`text-event-venue-${event.id}`}>{event.venue}</span>
                      </div>
                      
                      {event.description && (
                        <p className="text-foreground/70 leading-relaxed line-clamp-3" data-testid={`text-event-description-${event.id}`}>
                          {event.description}
                        </p>
                      )}
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
