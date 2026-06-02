import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Pricing",         href: "/pricing",          icon: "◈" },
  { name: "Charge Zer",      href: "/charge-zer",       icon: "⚡" },
  { name: "Upgrade account", href: "/upgrade-account",  icon: "↑" },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const scrollMap: Record<string, string> = {
    "/upgrade-account": "pricing",
    "/charge-zer": "charge-zer",
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    const targetId = scrollMap[href];
    if (!targetId) return;
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: "72px" }}>

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group">
            <div className="relative">
              <img
                src="/images/logo.svg"
                alt="YekBûn"
                className="h-9 w-9 object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* Right pill — desktop */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center rounded-full bg-white/[0.08] dark:bg-white/[0.08] bg-black/[0.06] backdrop-blur-xl border border-black/10 dark:border-white/[0.14] shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
            style={{
              padding: "6px 6px 6px 16px",
              gap: "4px",
            }}
          >
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link key={link.href} to={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  <span className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
                    active
                      ? "bg-black/[0.1] dark:bg-white/[0.14] text-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
                  )}>
                    <span className="text-[11px] opacity-60">{link.icon}</span>
                    {link.name}
                  </span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-black/[0.15] dark:bg-white/[0.15] mx-1" />

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 outline-none">
                  <Globe className="h-3.5 w-3.5" />
                  <span>EN</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem>🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem>🏴 Kurdish</DropdownMenuItem>
                <DropdownMenuItem>🇩🇪 Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center h-8 w-8 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 outline-none relative"
              aria-label="Toggle theme"
            >
              <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>

            {/* Log in */}
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-white ml-1"
                style={{
                  background: "linear-gradient(135deg, #f5c518 0%, #f97316 100%)",
                  boxShadow: "0 4px 18px rgba(245,197,24,0.35)",
                }}
              >
                Log in
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="h-9 w-9 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] flex flex-col bg-zinc-950 border-white/10">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2.5 text-white">
                    <img src="/images/logo.svg" alt="Logo" className="h-8 w-8" />
                    YekBûn
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link) => (
                    <Link key={link.href} to={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                      <span className={cn(
                        "flex items-center gap-2 text-base font-medium px-3 py-2.5 rounded-lg transition-colors cursor-pointer",
                        location.pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-white/[0.08] text-white/60 hover:text-white"
                      )}>
                        <span className="text-[13px] opacity-60">{link.icon}</span>
                        {link.name}
                      </span>
                    </Link>
                  ))}
                  <div className="h-px bg-white/10 my-3" />
                  <Link to="/login">
                    <Button className="w-full h-11 text-base font-bold text-black"
                      style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline" className="w-full h-11 text-base mt-1 border-white/[0.15] text-white hover:bg-white/[0.08]">
                      Open App
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
