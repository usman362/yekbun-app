import { Link } from "react-router-dom";
import { ChevronRight, Download } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    }
  };
  const currentYear = new Date().getFullYear();

  const sections = [
    { label: "Contact us", href: "/contact" },
    { label: "News & Feeds", href: "/" },
    { label: "Multimedia & Stream", href: "/" },
    { label: "Culture & History", href: "/" },
    { label: "Services & Ads", href: "/" },
    { label: "E-Commerce & Shops", href: "/" },
  ];

  const legal = [
    { label: "YekBûn Legal Notice", href: "/legal-notice" },
    { label: "YekBûn Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-card border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 w-fit">
              <img
                src="/images/logo.svg"
                alt="YekBûn Logo"
                className="h-9 w-9 object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              YekBûn Platform, developed by YekBûn.app, is an innovative platform designed for Kurdish-focused social, multimedia, cultural, and digital engagement.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-1">
              YEKBÛN — SECTIONS
            </h4>
            <div className="h-0.5 w-8 bg-primary rounded-full mb-5" />
            <ul className="space-y-3">
              {sections.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy & Terms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-1">
              YEKBÛN — POLICY & TERMS
            </h4>
            <div className="h-0.5 w-8 bg-primary rounded-full mb-5" />
            <ul className="space-y-3">
              {legal.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get the App */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-1">
              GET THE APP
            </h4>
            <div className="h-0.5 w-8 bg-primary rounded-full mb-5" />
            <div className="flex flex-col gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-3 bg-foreground text-background rounded-xl px-4 py-3 hover:opacity-90 transition-opacity w-fit outline-none"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.38.21.82.23 1.24 0L15.46 12 4.42.24C4 .01 3.56.03 3.18.24A1.5 1.5 0 002.5 1.5v21a1.5 1.5 0 00.68 1.26z"/>
                  <path d="M20.5 10.5l-2.94-1.69L15.46 12l2.1 2.19L20.5 12.5a1.5 1.5 0 000-2z"/>
                  <path d="M4.42.24l11.04 11.76-2.1 2.19L4.42 23.76 15.46 12 4.42.24z" opacity=".5"/>
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] opacity-70 uppercase tracking-wider">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-3 bg-foreground text-background rounded-xl px-4 py-3 hover:opacity-90 transition-opacity w-fit outline-none"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] opacity-70 uppercase tracking-wider">Download on the</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Copyright © {currentYear}{" "}
            <a href="https://yekbun.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              yekbun.app
            </a>
            . All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap justify-center sm:justify-end">
            <Link to="/legal-notice" className="hover:text-primary transition-colors">YekBûn Legal Notice</Link>
            <span className="opacity-30">|</span>
            <Link to="/terms" className="hover:text-primary transition-colors">YekBûn Terms & Condition</Link>
            <span className="opacity-30">|</span>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact YekBûn</Link>
            {isInstallable && (
              <>
                <span className="opacity-30">|</span>
                <button
                  onClick={handleInstall}
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Download className="h-3 w-3" />
                  App installieren
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
