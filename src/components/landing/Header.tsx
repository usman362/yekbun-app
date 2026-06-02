import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
  { label: "Login", href: "#login" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <a href="#home" className="text-2xl font-extrabold tracking-tight">
          <span className="gradient-gold-text">YekBun</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link to="/dashboard">
            <Button className="gradient-gold text-primary-foreground font-semibold rounded-full px-6 hover:opacity-90 transition-opacity">
              Open App
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden glass border-t border-border animate-fade-in">
          <div className="flex flex-col gap-3 px-6 py-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {l.label}
              </a>
            ))}
            <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
              <Button className="gradient-gold text-primary-foreground font-semibold rounded-full w-full mt-2">
                Open App
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
