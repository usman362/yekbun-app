import { useEffect, useRef, useCallback } from "react";

interface UseInactivityTimerOptions {
  timeoutMs?: number;
  warningMs?: number;
  onWarning: () => void;
  onLogout: () => void;
  onReset?: () => void;
}

export function useInactivityTimer({
  timeoutMs = 15 * 60 * 1000,
  warningMs = 30 * 1000,
  onWarning,
  onLogout,
  onReset,
}: UseInactivityTimerOptions) {
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningShownRef = useRef(false);

  // Keep the latest callbacks + config in a ref so `resetTimer` can stay referentially
  // stable. If it depended on these directly, an inline `onReset` (new function every
  // render) would make `resetTimer` change every render, re-run the mount effect, and
  // restart the timer — so it would never actually elapse and never log the user out.
  const cfgRef = useRef({ onWarning, onLogout, onReset, timeoutMs, warningMs });
  cfgRef.current = { onWarning, onLogout, onReset, timeoutMs, warningMs };

  const clearTimers = useCallback(() => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimers();
    warningShownRef.current = false;
    const cfg = cfgRef.current;
    cfg.onReset?.();

    warningTimerRef.current = setTimeout(() => {
      warningShownRef.current = true;
      cfgRef.current.onWarning();

      logoutTimerRef.current = setTimeout(() => {
        cfgRef.current.onLogout();
      }, cfgRef.current.warningMs);
    }, Math.max(0, cfg.timeoutMs - cfg.warningMs));
  }, [clearTimers]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];

    const handleActivity = () => {
      // While the warning modal is up we don't silently reset — the user must click
      // "Stay" (which calls resetTimer explicitly) or they get logged out.
      if (!warningShownRef.current) resetTimer();
    };

    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));
    resetTimer();

    return () => {
      clearTimers();
      events.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, [resetTimer, clearTimers]);

  return { resetTimer };
}
