import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Instagram, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/founder", label: "Meet the Founder" },
    { path: "/story", label: "Our Story" },
    { path: "/events", label: "Upcoming Events" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" data-testid="link-home">
              <h1 className="font-serif text-2xl lg:text-3xl font-light tracking-wide hover-elevate cursor-pointer">
                <span className="text-primary">Cash</span>
                <span className="text-foreground">Delhi</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span
                    className={`text-sm font-medium tracking-wide uppercase cursor-pointer transition-colors hover-elevate px-3 py-2 ${
                      location === link.path ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
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
              {isAuthenticated && (
                <Link href="/admin" data-testid="link-admin">
                  <Button variant="default" size="sm" data-testid="button-admin">
                    Admin
                  </Button>
                </Link>
              )}
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
              <Link
                key={link.path}
                href={link.path}
                data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-serif font-light cursor-pointer transition-colors hover-elevate px-4 py-2 ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
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
            {isAuthenticated && (
              <Link href="/admin" data-testid="mobile-link-admin">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-button-admin"
                >
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
