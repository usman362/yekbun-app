import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "@/lib/api";
import {
  plans as mockPlans,
  playlistUpgrades as mockPlaylistUpgrades,
  streamingUpgrades as mockStreamingUpgrades,
  zerPackages as mockZerPackages,
  businessPackages as mockBusinessPackages,
} from "@/data/mock";

/**
 * Hooks for the Zercash product catalogue + the admin-managed cashback rules &
 * country availability matrix. All endpoints are PUBLIC (no auth required) so the
 * landing / pricing pages can render them server-side-style on first paint.
 *
 * Defensive pattern (matches use-landing.ts): every hook returns the SAME shape as
 * the legacy mock array, with the mock as a fallback when the backend either
 * returns nothing or errors. Pages can swap their import line and the rest of the
 * JSX continues to work unchanged.
 */

/* ── Shared helpers ────────────────────────────────────────────────────────── */

async function safeGet<T>(path: string, params?: Record<string, unknown>): Promise<T[]> {
  try {
    const r = await api.get(path, { params });
    const data = r.data?.data;
    if (Array.isArray(data)) return data as T[];
    if (Array.isArray(data?.items)) return data.items as T[];
    return [];
  } catch {
    return [];
  }
}

function num(v: unknown, fallback = 0): number {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : fallback;
}

/* ── Backend product shape ─────────────────────────────────────────────────── *
 * Field names match the actual `zercash_products` MongoDB documents exactly —
 * see ProductsAdminController::defaultProducts() in the backend repo. Notably:
 *   - `zer_amount`        — price in Zêr (used by all package categories)
 *   - `fiat_amount`       — price in EUR/USD (used by plans + zer packages)
 *   - `songs_count`       — also stores the MINUTE count for streaming products
 *                            (backend re-uses this field — quirky but real)
 *   - `cashback_percent`  — cashback %age on the product
 *   - `features`          — bullet list for plan cards
 *   - `badge`             — plan-card chip text ("Current access" / "Manage access")
 */
interface BackendProduct {
  _id?: string;
  id?: string;
  category?: string;
  name?: string;
  description?: string;
  badge?: string;
  zer_amount?: number | string;
  fiat_amount?: number | string;
  fiat_currency?: string;
  cashback_percent?: number | string;
  songs_count?: number | string;
  features?: string[];
  status?: string;
  sort_order?: number;
  /** Playlist already unlocked by a past purchase (backend flag). */
  owned?: boolean;
}

/**
 * The full products list, fetched once and grouped by category in memo. Keeping
 * a single fetch + client-side split is cheaper than 5 separate API calls and
 * keeps React Query's cache tidy.
 */
function useZercashProductsBucketed() {
  const q = useQuery({
    queryKey: ["zercash", "products"],
    queryFn: () => safeGet<BackendProduct>("/zercash/products"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    const all = q.data ?? [];
    const byCat = (cat: string) => all.filter((p) => p.category === cat);
    return {
      plans:       byCat("choose_your_plan"),
      playlists:   byCat("upgrade_music_playlist"),
      streaming:   byCat("streaming_minutes"),
      standardZer: byCat("standard_zer_package"),
      businessZer: byCat("business_zer_package"),
    };
  }, [q.data]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  PLANS  →  category=choose_your_plan
 *  Mock shape: { id, name, priceMonthly, priceYearly, zerPrice, color,
 *                iconColor, description, features, recommended }
 * ═════════════════════════════════════════════════════════════════════════ */

export function usePlans() {
  const { plans: remote } = useZercashProductsBucketed();

  return useMemo(() => {
    if (!remote || remote.length === 0) return mockPlans;
    return remote.map((p, i): typeof mockPlans[number] => {
      const fallback = mockPlans[i % mockPlans.length];
      // Backend stores plan price in `fiat_amount` (EUR by default). Mock has separate
      // monthly/yearly fields — backend currently models only monthly, so we surface
      // it as both with yearly = monthly*10 (industry-standard 2-months-free pricing).
      const monthly = num(p.fiat_amount, fallback.priceMonthly);
      return {
        id: p.id ?? p._id ?? fallback.id,
        name: p.name ?? fallback.name,
        priceMonthly: monthly,
        priceYearly: monthly > 0 ? Math.round(monthly * 10 * 100) / 100 : fallback.priceYearly,
        zerPrice: num(p.zer_amount, fallback.zerPrice),
        color: fallback.color,         // styling stays mock — backend has no color field
        iconColor: fallback.iconColor, // same
        description: p.description ?? fallback.description,
        features: Array.isArray(p.features) && p.features.length > 0 ? p.features : fallback.features,
        // Mark "Educated" as recommended by default (matches the legacy mock + UI accent).
        recommended: (p.name ?? "").toLowerCase().includes("educated") ? true : fallback.recommended,
      };
    });
  }, [remote]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  PLAYLIST UPGRADES  →  category=upgrade_music_playlist
 *  Mock shape: { id, name, tier, songs, zerCost, cashback, popular, ... }
 * ═════════════════════════════════════════════════════════════════════════ */

export function usePlaylistUpgrades() {
  const { playlists: remote } = useZercashProductsBucketed();

  return useMemo(() => {
    if (!remote || remote.length === 0) return mockPlaylistUpgrades.map((m) => ({ ...m, owned: false }));
    return remote.map((p, i): typeof mockPlaylistUpgrades[number] & { owned: boolean } => {
      const fallback = mockPlaylistUpgrades[i % mockPlaylistUpgrades.length];
      // Derive tier from product name (e.g. "Bronze Playlist" → "Bronze").
      const tier = (p.name ?? "").split(" ")[0] || fallback.tier;
      return {
        ...fallback,
        id: p.id ?? p._id ?? fallback.id,
        name: p.name ?? fallback.name,
        tier,
        songs: num(p.songs_count, fallback.songs),
        zerCost: num(p.zer_amount, fallback.zerCost),
        cashback: num(p.cashback_percent, fallback.cashback),
        // Mark Silver as popular by default to match the existing UI accent.
        popular: tier.toLowerCase() === "silver" ? true : fallback.popular,
        // Already unlocked by a past purchase → card shows an "Owned" state.
        owned: !!p.owned,
      };
    });
  }, [remote]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  STREAMING UPGRADES  →  category=streaming_minutes
 *  Mock shape: { id, name, tier, minutes, zerCost, cashback, popular, ... }
 * ═════════════════════════════════════════════════════════════════════════ */

export function useStreamingUpgrades() {
  const { streaming: remote } = useZercashProductsBucketed();

  return useMemo(() => {
    if (!remote || remote.length === 0) return mockStreamingUpgrades;
    return remote.map((p, i): typeof mockStreamingUpgrades[number] => {
      const fallback = mockStreamingUpgrades[i % mockStreamingUpgrades.length];
      // Backend re-uses `songs_count` for streaming-minute totals — quirky but
      // consistent across the API. Derive tier from name like the playlist hook.
      const tier = (p.name ?? "").split(" ")[0] || fallback.tier;
      return {
        ...fallback,
        id: p.id ?? p._id ?? fallback.id,
        name: p.name ?? fallback.name,
        tier,
        minutes: num(p.songs_count, fallback.minutes),
        zerCost: num(p.zer_amount, fallback.zerCost),
        cashback: num(p.cashback_percent, fallback.cashback),
        popular: tier.toLowerCase() === "silver" ? true : fallback.popular,
      };
    });
  }, [remote]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  ZER PACKAGES (standard)  →  category=standard_zer_package
 *  Mock shape: { id, name, tier, zerAmount, eurPrice, helper, color, ... }
 * ═════════════════════════════════════════════════════════════════════════ */

export function useZerPackages() {
  const { standardZer: remote } = useZercashProductsBucketed();

  return useMemo(() => {
    if (!remote || remote.length === 0) return mockZerPackages;
    return remote.map((p, i): typeof mockZerPackages[number] => {
      const fallback = mockZerPackages[i % mockZerPackages.length];
      const tier = (p.name ?? "").split(" ")[0] || fallback.tier;
      return {
        ...fallback,
        id: p.id ?? p._id ?? fallback.id,
        name: p.name ?? fallback.name,
        tier,
        zerAmount: num(p.zer_amount, fallback.zerAmount),
        eurPrice: num(p.fiat_amount, fallback.eurPrice),
        helper: p.description ?? fallback.helper,
      };
    });
  }, [remote]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  BUSINESS PACKAGES  →  category=business_zer_package
 *  Mock shape: same as zerPackages
 * ═════════════════════════════════════════════════════════════════════════ */

export function useBusinessPackages() {
  const { businessZer: remote } = useZercashProductsBucketed();

  return useMemo(() => {
    if (!remote || remote.length === 0) return mockBusinessPackages;
    return remote.map((p, i): typeof mockBusinessPackages[number] => {
      const fallback = mockBusinessPackages[i % mockBusinessPackages.length];
      // Tier for business is the first word too — "Titanium Pack" → "Titanium" etc.
      const tier = (p.name ?? "").split(" ")[0] || fallback.tier;
      return {
        ...fallback,
        id: p.id ?? p._id ?? fallback.id,
        name: p.name ?? fallback.name,
        tier,
        zerAmount: num(p.zer_amount, fallback.zerAmount),
        eurPrice: num(p.fiat_amount, fallback.eurPrice),
        helper: p.description ?? fallback.helper,
      };
    });
  }, [remote]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  CASHBACK RULES  →  GET /api/zercash/cashback-rules
 *  Backend returns only `enabled=true` rules. Each row drives a "you earn X%
 *  cashback on Y" badge somewhere on the landing / pricing surface.
 * ═════════════════════════════════════════════════════════════════════════ */

export interface CashbackRule {
  id: string;
  title: string;
  description: string;
  /** 'percent' | 'fixed' — controls how `value` is rendered (% suffix vs Zêr currency). */
  kind: "percent" | "fixed";
  value: number;
  min_purchase: number;
  /** Lucide icon name string (e.g. "TrendingUp"). UI resolves via its own map. */
  icon: string;
}

export function useCashbackRules() {
  const q = useQuery({
    queryKey: ["zercash", "cashback-rules"],
    queryFn: () => safeGet<CashbackRule>("/zercash/cashback-rules"),
    staleTime: 5 * 60_000, // changes rarely — admin-managed config
  });

  return q.data ?? [];
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  COUNTRIES  →  GET /api/zercash/countries
 *  Defaults to ONLY active countries (the picker case). Pass `includeAll: true`
 *  to also receive Restricted / Pending rows so the UI can show a
 *  "not available in your region" state.
 * ═════════════════════════════════════════════════════════════════════════ */

export interface ZercashCountry {
  id: string;
  name: string;
  flag: string;
  status: "Active" | "Restricted" | "Pending";
  note: string;
}

export function useZercashCountries(opts: { includeAll?: boolean } = {}) {
  const includeAll = opts.includeAll === true;
  const q = useQuery({
    queryKey: ["zercash", "countries", includeAll],
    queryFn: () =>
      safeGet<ZercashCountry>("/zercash/countries", includeAll ? { include_all: 1 } : undefined),
    staleTime: 5 * 60_000,
  });

  return q.data ?? [];
}
