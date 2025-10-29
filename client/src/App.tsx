import { useEffect, useState, useRef } from "react";
import { useQuery, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Sparkles,
  Users,
  Calendar,
  Target,
  Heart,
  Award,
  MapPin,
  Instagram,
  Mail,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AnimatedSection } from "@/components/AnimatedSection";
import { events as eventsSchema } from "../../shared/schema";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

type Event = typeof eventsSchema.$inferSelect;

function App() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery<Event[]>({
    queryKey: ["events"],
  });

  const featuredEvent = events[0];
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    form.reset();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin">
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          </Route>
          <Route path="/">
            <div className="dark font-serif">
              <motion.video 
                autoPlay 
                loop 
                muted 
                className="fixed top-0 left-0 w-screen h-screen object-cover"
                style={{ scale, transform: 'scale(1.0)' }}
              >
                <source src="/background.mp4" type="video/mp4" />
              </motion.video>
              <Navigation />
              <main className="relative z-10">
                <section className="h-screen w-full flex flex-col items-center justify-center text-center text-white relative -mt-20">
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 p-6 flex flex-col items-center">
                        <motion.img
                            src="/logo.png"
                            alt="Cash Delhi Logo"
                            className="w-64 md:w-80 mb-8 mx-auto mt-12"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1.2 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <a href="https://instagram.com/cash.delhi" target="_blank" rel="noopener noreferrer">
                                <Button 
                                    variant="outline" 
                                    className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 px-6 py-4 text-md"
                                >
                                    Follow Us
                                </Button>
                            </a>
                            <a href="#events">
                                <Button 
                                    variant="default"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 px-6 py-4 text-md"
                                >
                                    Events
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </section>
                {/* Home Section */}
                <section id="home" className="py-24 lg:py-32 px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto">
                    <AnimatedSection>
                      <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-what-we-do-title">
                          Elevating Experiences
                        </h2>
                        <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-what-we-do-subtitle">
                          From exclusive events to luxury takeovers, we create moments that last forever
                        </p>
                      </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                      <AnimatedSection delay={0.2}>
                        <Card className="p-8 text-center bg-card/80 backdrop-blur-sm hover-elevate transition-transform duration-300" data-testid="card-service-events">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-normal mb-4 text-foreground">Exclusive Events</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Curating unforgettable celebrations that blend sophistication with excitement
                          </p>
                        </Card>
                      </AnimatedSection>

                      <AnimatedSection delay={0.4}>
                        <Card className="p-8 text-center bg-card/80 backdrop-blur-sm hover-elevate transition-transform duration-300" data-testid="card-service-pr">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-normal mb-4 text-foreground">PR Excellence</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Building connections and creating buzz for the most sought-after experiences
                          </p>
                        </Card>
                      </AnimatedSection>

                      <AnimatedSection delay={0.6}>
                        <Card className="p-8 text-center bg-card/80 backdrop-blur-sm hover-elevate transition-transform duration-300" data-testid="card-service-takeovers">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-normal mb-4 text-foreground">Luxury Takeovers</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Transforming venues into extraordinary spaces for premium experiences
                          </p>
                        </Card>
                      </AnimatedSection>
                    </div>
                  </div>
                </section>

                {/* Events Section */}
                <section id="events" className="py-12 px-6 lg:px-8 pb-32 bg-background/80 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                          <Card key={i} className="overflow-hidden bg-card/80 backdrop-blur-sm">
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
                          <h2 className="text-3xl mb-4 text-foreground" data-testid="text-no-events-title">
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
                              className="overflow-hidden bg-card/80 backdrop-blur-sm hover-elevate transition-all duration-300 cursor-pointer group"
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
                                  className="text-2xl mb-3 text-foreground group-hover:text-primary transition-colors"
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

                {/* About Section */}
                <section id="about" className="py-20 px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <AnimatedSection>
                        <div>
                          <h2 className="text-4xl lg:text-5xl font-light mb-6 text-foreground" data-testid="text-mission-title">
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
                          <div className="p-8 bg-background/80 backdrop-blur-sm rounded-md border border-border hover-elevate transition-all duration-300">
                            <Target className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl mb-2 text-foreground">Vision</h3>
                            <p className="text-sm text-muted-foreground">Leading Delhi's luxury event scene</p>
                          </div>
                          <div className="p-8 bg-background/80 backdrop-blur-sm rounded-md border border-border hover-elevate transition-all duration-300">
                            <Sparkles className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl mb-2 text-foreground">Excellence</h3>
                            <p className="text-sm text-muted-foreground">Uncompromising quality in every detail</p>
                          </div>
                          <div className="p-8 bg-background/80 backdrop-blur-sm rounded-md border border-border hover-elevate transition-all duration-300">
                            <Heart className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl mb-2 text-foreground">Passion</h3>
                            <p className="text-sm text-muted-foreground">Dedicated to creating magic</p>
                          </div>
                          <div className="p-8 bg-background/80 backdrop-blur-sm rounded-md border border-border hover-elevate transition-all duration-300">
                            <Award className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl mb-2 text-foreground">Premium</h3>
                            <p className="text-sm text-muted-foreground">Exclusive experiences only</p>
                          </div>
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>
                </section>

                {/* Story Section */}
                <section id="story" className="py-20 px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
                  <div className="max-w-5xl mx-auto">
                    <div className="space-y-16">
                      <AnimatedSection delay={0.2}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                          <div className="order-2 lg:order-1">
                            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop" alt="A luxurious event setting" className="rounded-lg object-cover w-full h-80" />
                          </div>
                          <div className="order-1 lg:order-2">
                            <div className="text-5xl text-primary mb-4">The Beginning</div>
                            <h2 className="text-3xl mb-4 text-foreground" data-testid="text-beginning-title">
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
                            <div className="text-5xl text-primary mb-4">The Growth</div>
                            <h2 className="text-3xl mb-4 text-foreground" data-testid="text-growth-title">
                              Building Momentum
                            </h2>
                            <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-growth-description">
                              Word spread quickly. What started as small, intimate gatherings soon evolved into larger-scale events. Cash Delhi became known for pushing boundaries, securing exclusive venues, and delivering experiences that exceeded expectations. Our reputation grew, and so did our ambitions.
                            </p>
                          </div>
                          <div>
                            <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1974&auto=format&fit=crop" alt="People enjoying a party" className="rounded-lg object-cover w-full h-80" />
                          </div>
                        </div>
                      </AnimatedSection>

                      <AnimatedSection delay={0.6}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                          <div className="order-2 lg:order-1">
                            <img src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop" alt="A vibrant nightclub" className="rounded-lg object-cover w-full h-80" />
                          </div>
                          <div className="order-1 lg:order-2">
                            <div className="text-5xl text-primary mb-4">Today</div>
                            <h2 className="text-3xl mb-4 text-foreground" data-testid="text-today-title">
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

                {/* Founder Section */}
                <section id="founder" className="py-20 px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto">
                    <AnimatedSection>
                      <div className="text-center max-w-4xl mx-auto mb-16">
                        <h1 className="text-5xl lg:text-6xl font-light mb-6 text-foreground" data-testid="text-founder-title">
                          Meet the Team
                        </h1>
                        <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed" data-testid="text-founder-subtitle">
                          The visionary behind Delhi's most exclusive experiences
                        </p>
                      </div>
                    </AnimatedSection>

                    {/* Founder Profile */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <AnimatedSection delay={0.2}>
                        <div className="w-full max-w-[300px] mx-auto lg:mx-0">
                          <div className="relative rounded-lg overflow-hidden aspect-[3/4] mb-8">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="Founder Yuvraj Ahuja" className="object-cover w-full h-full" />
                          </div>
                          <div className="text-center lg:text-left">
                            <h2 className="text-3xl mb-2 text-foreground" data-testid="text-founder-name">
                              Yuvraj Ahuja
                            </h2>
                            <p className="text-lg text-primary mb-6" data-testid="text-founder-role">
                              Founder
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
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-2xl lg:text-3xl mb-4 text-foreground" data-testid="text-founder-bio-title">
                              Crafting Experiences, Building Legacies
                            </h3>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-6" data-testid="text-founder-bio-1">
                              Yuvraj Ahuja isn't just an event organizer—he's a curator of unforgettable moments.
                            </p>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-6" data-testid="text-founder-bio-2">
                              His journey began with a simple vision.
                            </p>
                            <p className="text-lg text-foreground/80 leading-relaxed" data-testid="text-founder-bio-3">
                              What sets Yuvraj apart is his relentless commitment to excellence.
                            </p>
                          </div>

                          <div className="border-l-4 border-primary pl-6 py-4 bg-card/50 backdrop-blur-sm rounded-r-md">
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

                {/* Contact Section */}
                <section id="contact" className="pb-32 px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Contact Info */}
                      <AnimatedSection delay={0.2}>
                        <div className="space-y-8">
                          <div>
                            <h2 className="text-3xl mb-6 text-foreground" data-testid="text-contact-info-title">
                              Contact Information
                            </h2>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-8" data-testid="text-contact-info-description">
                              Ready to elevate your next event? Reach out to us and let's start planning an unforgettable experience.
                            </p>
                          </div>

                          <div className="space-y-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Instagram className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold mb-1 text-foreground" data-testid="text-instagram-label">Instagram</h3>
                                <a
                                  href="https://instagram.com/cash.delhi"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover-elevate inline-block"
                                  data-testid="link-contact-instagram"
                                >
                                  @cash.delhi
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold mb-1 text-foreground" data-testid="text-email-label">Email</h3>
                                <a
                                  href="mailto:contact@cashdelhi.com"
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                  data-testid="link-contact-email"
                                >
                                  contact@cashdelhi.com
                                </a>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold mb-1 text-foreground" data-testid="text-location-label">Location</h3>
                                <p className="text-muted-foreground" data-testid="text-location">Delhi, India</p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-8">
                            <h3 className="text-xl mb-4 text-foreground" data-testid="text-follow-title">Follow Our Journey</h3>
                            <p className="text-muted-foreground mb-4" data-testid="text-follow-description">
                              Stay updated with our latest events and exclusive experiences
                            </p>
                            <a
                              href="https://instagram.com/cash.delhi"
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid="link-follow-instagram"
                            >
                              <Button variant="outline" className="gap-2" data-testid="button-follow-instagram">
                                <Instagram className="w-4 h-4" />
                                Follow on Instagram
                              </Button>
                            </a>
                          </div>
                        </div>
                      </AnimatedSection>

                      {/* Contact Form */}
                      <AnimatedSection delay={0.4}>
                        <Card className="p-8 bg-card/80 backdrop-blur-sm">
                          <h2 className="text-3xl mb-6 text-foreground" data-testid="text-form-title">
                            Send Us a Message
                          </h2>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name *</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Your name"
                                        data-testid="input-name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        data-testid="input-email"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        data-testid="input-phone"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Message *</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Tell us about your event..."
                                        rows={6}
                                        data-testid="input-message"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                                data-testid="button-submit"
                              >
                                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                              </Button>
                            </form>
                          </Form>
                        </Card>
                      </AnimatedSection>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </Route>
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
