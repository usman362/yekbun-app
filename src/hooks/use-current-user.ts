import { useMemo } from "react";
import { USER_CACHE_KEY } from "@/hooks/use-auth";
import { useWalletDashboard } from "@/hooks/use-wallet";

/**
 * Returns the logged-in user's profile in the EXACT shape that the old `userProfile`
 * mock had — so existing pages can swap the import without touching any JSX.
 *
 * Sources:
 *   - Identity fields (name / email / region / avatar / plan / joinDate) come from the
 *     cached login response in localStorage.
 *   - Balances (zerBalance / zerCash) come from /wallet/dashboard via useWalletDashboard
 *     so they stay live as the user spends.
 *
 * If the user isn't logged in or the cache is empty, we return the original mock
 * defaults — pages continue to render identically with no flash of empty state.
 */

export interface CurrentUserProfile {
  id: string;
  name: string;
  email: string;
  region: string;
  joinDate: string;
  avatar: string;
  plan: string;
  planRenewal: string;
  zerBalance: number;
  zerCash: number;
}

// Same default values as the legacy `userProfile` mock — used when nobody is logged in
// yet so static pages (eg. /pricing) don't break. Once logged in the real values take over.
const FALLBACK: CurrentUserProfile = {
  id: "USR-0921",
  name: "Ahmad Karimi",
  email: "ahmad.k@example.com",
  region: "Erbil, Kurdistan",
  joinDate: "Oct 2023",
  avatar: "https://images.unsplash.com/photo-1527615020922-3c670eed3407?w=200&q=80&fit=crop&faces",
  plan: "Educated",
  planRenewal: "1 Nîsanê 2026",
  zerBalance: 5200,
  zerCash: 320,
};

interface CachedUser {
  _id?: string;
  id?: string | number;
  user_id?: string;
  name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  image?: string;
  location?: string;
  country?: string;
  city?: string;
  province?: string;
  user_type?: string;
  subscription_type?: string;
  level?: number;
  created_at?: string;
  expired_at?: string;
  wallet?: { balance?: number; zer_balance?: number; cashback_balance?: number };
}

/** Read + parse the cached user blob from localStorage. Returns null on miss / corrupt JSON. */
function readCache(): CachedUser | null {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    return raw ? (JSON.parse(raw) as CachedUser) : null;
  } catch {
    return null;
  }
}

/** Format an ISO timestamp into "Oct 2023" — matches the mock shape exactly. */
function formatJoinDate(iso?: string): string {
  if (!iso) return FALLBACK.joinDate;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return FALLBACK.joinDate;
  }
}

/** Format an ISO timestamp into the "1 Nîsanê 2026" style plan-renewal string. */
function formatRenewal(iso?: string): string {
  if (!iso) return FALLBACK.planRenewal;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return FALLBACK.planRenewal;
  }
}

/** Capitalise "educated" → "Educated"; matches the mock's `plan` field casing. */
function titleCase(s?: string): string {
  if (!s) return FALLBACK.plan;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** Resolve the avatar URL — backend stores a relative path under `images/user/...`. */
function resolveAvatar(image?: string): string {
  if (!image) return FALLBACK.avatar;
  if (image.startsWith("http")) return image;
  // Strip any leading slash so the base URL doesn't double up.
  const base = (import.meta.env.VITE_API_URL ?? "").replace(/\/api\/?$/, "");
  const path = image.replace(/^\/+/, "");
  return base ? `${base}/${path}` : `/${path}`;
}

export function useCurrentUser(): CurrentUserProfile {
  const wallet = useWalletDashboard();

  return useMemo(() => {
    const cached = readCache();
    if (!cached) return FALLBACK;

    // Live balances win when the wallet API succeeded; otherwise fall back to whatever
    // the login response embedded (which is also fresh for first paint).
    const liveBalance =
      wallet.data?.kind === "ok"
        ? wallet.data.data.balance
        : cached.wallet?.balance ?? FALLBACK.zerBalance;
    const liveCashback =
      wallet.data?.kind === "ok"
        ? wallet.data.data.cashback_balance
        : cached.wallet?.cashback_balance ?? FALLBACK.zerCash;

    const fullName = [cached.name, cached.last_name].filter(Boolean).join(" ").trim();
    const region = [cached.city, cached.province ?? cached.country]
      .filter(Boolean)
      .join(", ")
      .trim();

    return {
      id: cached.user_id ?? cached._id ?? String(cached.id ?? FALLBACK.id),
      name: fullName || cached.username || FALLBACK.name,
      email: cached.email ?? FALLBACK.email,
      region: region || cached.location || FALLBACK.region,
      joinDate: formatJoinDate(cached.created_at),
      avatar: resolveAvatar(cached.image),
      plan: titleCase(cached.user_type),
      planRenewal: formatRenewal(cached.expired_at),
      zerBalance: Number(liveBalance ?? 0),
      zerCash: Number(liveCashback ?? 0),
    };
  }, [wallet.data]);
}
