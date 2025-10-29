import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Instagram, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { path: "#home", label: "Home" },
    { path: "#about", label: "About Us" },
    { path: "#story", label: "Our Story" },
    { path: "#events", label: "Events" },
    { path: "#founder", label: "Founder" },
    { path: "#contact", label: "Contact" },
  ];

  const activeId = useScrollSpy(
    navLinks.map((link) => `section${link.path}`),
    { rootMargin: "-50% 0px -50% 0px" }
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div />
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.path} href={link.path} data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span
                    className={`text-sm font-medium tracking-wide uppercase cursor-pointer transition-colors hover-elevate px-3 py-2 ${
                      activeId === link.path.substring(1) ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
              <a
                href="https://instagram.com/cash.delhi"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
              >
                <Button variant="outline" size="icon" data-testid="button-instagram">
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>
              
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover-elevate active-elevate-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md lg:hidden" data-testid="mobile-menu">
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-serif font-light cursor-pointer transition-colors hover-elevate px-4 py-2 ${
                    activeId === link.path.substring(1) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </a>
            ))}
            <a
              href="https://instagram.com/cash.delhi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="mobile-link-instagram"
            >
              <Button variant="outline" size="lg" className="gap-2" data-testid="mobile-button-instagram">
                <Instagram className="w-5 h-5" />
                Follow Us
              </Button>
            </a>
            
          </div>
        </div>
      )}
    </>
  );
}
