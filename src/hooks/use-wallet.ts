import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

/**
 * Hooks for the user-facing wallet APIs. Shapes mirror the Laravel responses so
 * downstream components don't need to translate field names. If the user is unauthed
 * the request returns 401, the axios interceptor clears the token + redirects to /login,
 * so consumer components only need to handle `isLoading` and `isError`.
 */

/* ── Shared row shapes ────────────────────────────────────────────────────────── */

export interface DepositRow {
  id: string;
  title: string;
  cb_id: string;
  date: string;
  amount: number;
  type: "income";
  currency: string;
  /** Stable icon name from backend: 'welcome_bonus' | 'cashback' | 'recharge'. */
  icon: string;
  status_color: string;
}

export interface CashbackEarnedRow {
  id: string;
  merchant: string;
  cb_id: string;
  date: string;
  amount: number;          // purchase amount that earned the cashback
  currency: string;
  cashback_percent: number;
  cashback_amount: number; // actual cashback credited
  icon: string;
  category: string;
}

export interface MyCashbackRow {
  id: string;
  title: string;
  cb_id: string;
  date: string;
  amount: number;
  currency: string;
  status: string;       // "pending" | "completed" | ...
  status_color: string; // hex chip color
  icon: string;
}

export interface TransactionRow {
  id: string;
  merchant: string;
  cb_id: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
  status_color: string;
  icon: string;
  category: string;
}

/* ── Chart bucket shapes ──────────────────────────────────────────────────────── */

export interface WeeklyBucket {
  day: string;       // 'S'|'M'|'T'|'W'|'T'|'F'|'S'
  date: string;      // YYYY-MM-DD
  amount: number;
  is_today: boolean;
}

export interface MonthlyBucket {
  month: string;     // 'Jan'|'Feb'|...
  amount: number;
}

export interface YearlyBucket {
  year: string;      // '2024'|'2025'|...
  amount: number;
}

export interface ChartSeries {
  weekly: WeeklyBucket[];
  monthly: MonthlyBucket[];
  yearly: YearlyBucket[];
}

/* ── Dashboard response ──────────────────────────────────────────────────────── */

export interface WalletDashboard {
  wallet_id: string;
  wallet_type: string;
  currency: string;
  balance: number;
  zer_balance: number;
  cashback_balance: number;
  cashback_percent: number;
  expire_at: string | null;
  summary: { deposits: number; cashbacks: number; expenses: number };
  chart: ChartSeries;
  deposits: DepositRow[];
  latest_cashbacks: CashbackEarnedRow[];
  my_cashbacks: MyCashbackRow[];
  latest_transactions: TransactionRow[];
}

/**
 * The "wallet not active" shape — Laravel returns 403 with this body when the user has
 * no wallet yet OR their wallet status isn't activated. The axios interceptor only
 * intercepts 401s, so 403 bubbles up here and we expose `wallet_status` to the UI so
 * it can render an empty/CTA state instead of fake data.
 */
export interface WalletInactivePayload {
  has_wallet: boolean;
  wallet_status: string | null;
}

export function useWalletDashboard() {
  return useQuery({
    queryKey: ["wallet", "dashboard"],
    queryFn: async () => {
      try {
        const r = await api.get("/wallet/dashboard");
        return { kind: "ok" as const, data: r.data.data as WalletDashboard };
      } catch (err: unknown) {
        // 403 = wallet not active — surface the partial payload instead of throwing so
        // the page can render a "create wallet" CTA without React Query going into error state.
        const e = err as { response?: { status?: number; data?: { data?: WalletInactivePayload } } };
        if (e.response?.status === 403 && e.response?.data?.data) {
          return { kind: "inactive" as const, data: e.response.data.data };
        }
        throw err;
      }
    },
    staleTime: 30_000,
  });
}

/* ── Payments page (chart + 3 lists) ──────────────────────────────────────────── */

export interface WalletPaymentsResponse {
  currency: string;
  chart: ChartSeries; // overall
  deposits: {
    chart: ChartSeries;
    items: DepositRow[];
  };
  latest_cashbacks: {
    chart: ChartSeries;
    items: CashbackEarnedRow[];
  };
  latest_transactions: {
    chart: ChartSeries;
    items: TransactionRow[];
  };
}

export function useWalletPayments() {
  return useQuery({
    queryKey: ["wallet", "payments"],
    queryFn: () =>
      api.get("/wallet/payments").then((r) => r.data.data as WalletPaymentsResponse),
    staleTime: 30_000,
  });
}
