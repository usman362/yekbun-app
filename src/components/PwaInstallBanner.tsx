import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pwa-banner-dismissed")) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Show banner after short delay regardless of prompt support
    const timer = setTimeout(() => setVisible(true), 2000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setVisible(false);
      setDeferredPrompt(null);
    } else {
      // Fallback: guide user to use browser install
      alert("Öffne das Browser-Menü und wähle 'Zum Startbildschirm hinzufügen' um die App zu installieren.");
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("pwa-banner-dismissed", "true");
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg shadow-black/10 dark:shadow-black/30">
          <img
            src="/images/logo.svg"
            alt="YekBûn"
            className="h-10 w-10 shrink-0 rounded-xl"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">
              Install YekBûn App
            </p>
            <p className="text-xs text-muted-foreground leading-snug">
              Download on your device for quick access
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleInstall}
            className="shrink-0 rounded-full gap-1.5 px-4"
          >
            <Download className="h-3.5 w-3.5" />
            Install
          </Button>
          <button
            onClick={handleDismiss}
            className="shrink-0 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}