import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api, { TOKEN_KEY } from "@/lib/api";

/**
 * Auth hooks for the end-user web app.
 *
 * The Laravel `/api/login` endpoint requires email + password + device_imei. Web
 * browsers don't have a real IMEI, so we generate a stable per-browser ID, persist it
 * in localStorage, and resend it on every login. This lets the server treat the web
 * session as a recognised "device" without forcing IMEI verification flows.
 */

const DEVICE_IMEI_KEY = "yekbun_device_imei";
export const USER_CACHE_KEY = "yekbun_user_cache";

/** Stable per-browser pseudo-IMEI — created lazily, persisted in localStorage. */
function getOrCreateDeviceImei(): string {
  let imei = localStorage.getItem(DEVICE_IMEI_KEY);
  if (!imei) {
    // 15-digit string, prefixed "web" so it's obvious in the DB this came from the web app.
    imei = "web-" + Math.random().toString(36).slice(2, 14) + Date.now().toString(36).slice(-4);
    localStorage.setItem(DEVICE_IMEI_KEY, imei);
  }
  return imei;
}

export interface CurrentUser {
  _id: string;
  id?: string;
  name?: string;
  username?: string;
  email: string;
  image?: string;
  level?: number;
  user_type?: string;
  subscription_type?: string;
  // Wallet/KYC embedded by /auth/me (if backend exposes that endpoint) — otherwise
  // these stay undefined and we rely on /wallet/dashboard for live wallet state.
  wallet?: Record<string, unknown>;
  kyc?: Record<string, unknown>;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  access_token?: string;
  user?: CurrentUser;
  userDetails?: CurrentUser;
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => {
      const device_imei = getOrCreateDeviceImei();
      const res = await api.post("/login", { email, password, device_imei });
      // Laravel wraps responses in `{ success, message, data }`. The actual token may live
      // under data.token / data.access_token depending on the endpoint variant.
      const data = (res.data?.data ?? res.data) as LoginResponse;
      const token = data.token ?? data.access_token;
      if (!token) {
        throw new Error("Login succeeded but no token was returned by the server.");
      }
      localStorage.setItem(TOKEN_KEY, token);
      // Cache the user payload so useCurrentUser can hydrate without an extra round-trip.
      // The login response embeds `user.wallet` / `user.kyc` (see AuthController::login) so
      // the dashboard can render correct identity + balances immediately on first paint.
      if (data.user) {
        try { localStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user)); } catch {}
      }
      return data;
    },
    onSuccess: () => {
      // Force any cached queries to refetch with the new auth context.
      qc.invalidateQueries();
    },
  });
}

/* ── Passwordless OTP login (powers the yekbun.app Login UI) ─────────────────
 * The UI is unchanged — it just calls these two mutations:
 *   1. Step 1: useOtpSend({ email })   → emails a 6-digit code, returns {dev_code?} in debug.
 *   2. Step 2: useOtpVerify({ email, otp }) → returns the same {user, token} shape as useLogin
 *      and stores them in localStorage, so the rest of the app (wallet hooks, useCurrentUser)
 *      keeps working with no further changes.
 */

interface OtpSendResponse {
  email: string;
  /** Present only when `APP_DEBUG=true` on the server — lets devs skip the inbox. */
  dev_code?: string;
}

export function useOtpSend() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const res = await api.post("/otp-login/send", { email });
      return (res.data?.data ?? res.data) as OtpSendResponse;
    },
  });
}

export function useOtpVerify() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const res = await api.post("/otp-login/verify", { email, otp });
      const data = (res.data?.data ?? res.data) as LoginResponse;
      const token = data.token ?? data.access_token;
      if (!token) {
        throw new Error("Verification succeeded but no token was returned by the server.");
      }
      localStorage.setItem(TOKEN_KEY, token);
      if (data.user) {
        try { localStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user)); } catch {}
      }
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_CACHE_KEY);
    qc.clear();
    window.location.href = "/login";
  };
}

/**
 * Lightweight "am I logged in?" check. Doesn't hit the server — just reads the token
 * presence. Use this for route guards and conditional UI; use useWalletDashboard()
 * or other API hooks for the actual data (they'll 401 + redirect if the token is stale).
 */
export function useIsAuthenticated() {
  return useQuery({
    queryKey: ["auth", "is-authenticated"],
    queryFn: () => !!localStorage.getItem(TOKEN_KEY),
    staleTime: Infinity,
  });
}
