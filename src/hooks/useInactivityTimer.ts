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

  const clearTimers = useCallback(() => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimers();
    warningShownRef.current = false;
    onReset?.();

    warningTimerRef.current = setTimeout(() => {
      warningShownRef.current = true;
      onWarning();

      logoutTimerRef.current = setTimeout(() => {
        onLogout();
      }, warningMs);
    }, timeoutMs - warningMs);
  }, [clearTimers, onWarning, onLogout, onReset, timeoutMs, warningMs]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];

    const handleActivity = () => {
      if (!warningShownRef.current) {
        resetTimer();
      }
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
