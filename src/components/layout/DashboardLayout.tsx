import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, ShoppingCart, CreditCard, User, Settings, LogOut, ChevronDown, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Footer } from "@/components/layout/Footer";
import { useCurrentUser } from "@/hooks/use-current-user";
import { TOKEN_KEY } from "@/lib/api";
import { USER_CACHE_KEY } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";
import { AutoLogoutModal } from "@/components/AutoLogoutModal";

const WARNING_SECONDS = 30;

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  // Adapter: returns the same shape the old `userProfile` mock had, so JSX below
  // continues to read `userProfile.plan / .avatar / .name / .email` unchanged.
  const userProfile = useCurrentUser();
  const [scrolled, setScrolled]       = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [countdown, setCountdown]     = useState(WARNING_SECONDS);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  

  /* ── Scroll detection for header shadow ── */
  useEffect(() => {
    const el = document.getElementById("dashboard-scroll");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 10);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  /* ── Inactivity timer ── */
  const stopCountdown = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = null;
  }, []);

  const startCountdown = useCallback(() => {
    setCountdown(WARNING_SECONDS);
    setShowLogoutModal(true);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { stopCountdown(); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, [stopCountdown]);

  const resetTimerRef = useRef<() => void>(() => {});

  const handleStay = useCallback(() => {
    stopCountdown();
    setShowLogoutModal(false);
    setCountdown(WARNING_SECONDS);
    resetTimerRef.current();
  }, [stopCountdown]);

  const handleLogout = useCallback(() => {
    stopCountdown();
    setShowLogoutModal(false);
    // Clear auth so the user is truly signed out — token + cached profile both go.
    // Destination stays "/" (landing) to match the original UI behaviour.
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_CACHE_KEY);
    navigate("/");
  }, [stopCountdown, navigate]);

  const { resetTimer } = useInactivityTimer({
    timeoutMs: 15 * 60 * 1000,
    warningMs: WARNING_SECONDS * 1000,
    onWarning: startCountdown,
    onLogout: handleLogout,
    onReset: () => {
      if (showLogoutModal) {
        stopCountdown();
        setShowLogoutModal(false);
        setCountdown(WARNING_SECONDS);
      }
    },
  });
  resetTimerRef.current = resetTimer;

  useEffect(() => () => stopCountdown(), [stopCountdown]);



  return (
    <div className="dashboard-wrapper flex flex-col h-screen bg-background overflow-hidden">
      {/* ── TOP HEADER ─────────────────────────────────────── */}
      <header className={cn(
        "shrink-0 z-40 transition-all duration-300",
        "bg-background/95 backdrop-blur-xl border-b border-border/50",
        scrolled && "shadow-md shadow-black/10 dark:shadow-black/30"
      )}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group mr-auto">
            <img
              src="/images/logo.svg"
              alt="YekBûn"
              className="h-8 w-8 object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-8 w-16 rounded-full relative flex items-center px-1 transition-colors border border-border/50"
            style={{ background: theme === "dark" ? "hsl(var(--secondary))" : "hsl(var(--secondary))" }}
          >
            <span className={cn(
              "h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
              theme === "dark" ? "translate-x-8 bg-primary" : "translate-x-0 bg-primary"
            )}>
              {theme === "dark" ? <Moon className="h-3.5 w-3.5 text-primary-foreground" /> : <Sun className="h-3.5 w-3.5 text-primary-foreground" />}
            </span>
          </button>

          {/* Plan badge */}
          <Link
            to="/dashboard/plans"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Crown className="h-3.5 w-3.5" />
            {userProfile.plan} Plan
          </Link>

          {/* Billing */}
          <Link to="/dashboard/wallet" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <CreditCard className="h-4 w-4" />
            <span className="font-medium">Billing</span>
          </Link>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-secondary transition-colors outline-none">
                <Avatar className="h-8 w-8 border-2 border-primary/30">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">AK</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 mt-1">
              <div className="flex items-center gap-3 p-3 border-b border-border/50">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="text-xs font-bold">AK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{userProfile.name}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer">
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ── PAGE CONTENT ───────────────────────────────────── */}
      <main
        id="dashboard-scroll"
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
        <Footer />
      </main>

      <AutoLogoutModal
        open={showLogoutModal}
        countdown={countdown}
        onStay={handleStay}
        onLogout={handleLogout}
      />
    </div>
  );
}
