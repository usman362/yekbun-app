import { Link } from "react-router-dom";

const sections = [
  {
    title: "YekBûn — Sections",
    links: [
      { label: "Contact us", href: "#" },
      { label: "News & Feeds", href: "#" },
      { label: "Multimedia & Stream", href: "#" },
      { label: "Culture & History", href: "#" },
      { label: "Services & Ads", href: "#" },
      { label: "E-Commerce & Shops", href: "#" },
    ],
  },
  {
    title: "YekBûn — Policy & Terms",
    links: [
      { label: "YekBûn Legal Notice", href: "#" },
      { label: "YekBûn Terms & Conditions", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo.svg" alt="YekBûn" className="h-10 w-10" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              YekBûn Platform, developed by YekBûn.app, is an innovative platform designed for Kurdish-focused social, multimedia, cultural, and digital engagement.
            </p>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-muted-foreground/50">›</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get the App */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              Get the App
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-foreground text-background rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity w-fit"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-70">Get it on</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-foreground text-background rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity w-fit"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.71,19.5C17.88,20.5 17,21.4 15.66,21.41C14.32,21.42 13.87,20.6 12.37,20.6C10.87,20.6 10.37,21.37 9.1,21.41C7.79,21.46 6.8,20.39 5.96,19.39C4.25,17.35 2.94,13.65 4.72,11.04C5.6,9.76 6.96,8.95 8.43,8.93C9.71,8.91 10.93,9.82 11.71,9.82C12.5,9.82 13.97,8.72 15.5,8.88C16.16,8.91 17.83,9.15 18.89,10.72C18.79,10.78 16.67,12 16.7,14.58C16.73,17.67 19.43,18.69 19.47,18.7C19.44,18.78 19.07,19.94 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" /></svg>
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-70">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Copyright © {new Date().getFullYear()} <a href="https://yekbun.app" className="text-primary hover:underline">yekbun.app</a>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">YekBûn Legal Notice</a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-foreground transition-colors">YekBûn Terms & Condition</a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-foreground transition-colors">Contact YekBûn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
