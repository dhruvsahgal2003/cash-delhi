import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Instagram, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

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

export default function Contact() {
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-5xl lg:text-6xl font-light mb-6 text-foreground" data-testid="text-contact-title">
                Get In Touch
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed" data-testid="text-contact-subtitle">
                Let's create something extraordinary together
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-3xl mb-6 text-foreground" data-testid="text-contact-info-title">
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
                  <h3 className="font-serif text-xl mb-4 text-foreground" data-testid="text-follow-title">Follow Our Journey</h3>
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
              <Card className="lg:col-span-3 p-8">
                <h2 className="font-serif text-3xl mb-6 text-foreground" data-testid="text-form-title">
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
    </div>
  );
}
