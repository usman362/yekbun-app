import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

/**
 * Checkout flow — converts a cart into a real backend Order + Transactions.
 *
 * The server re-prices each line against the live product row, so even a stale cart
 * (admin changed a price mid-checkout) settles correctly. Wallet-balance payments are
 * applied atomically server-side; deferred methods leave the order PENDING.
 *
 * Mobile and web use the same endpoint — see Zercash-Mobile-API-Guide.pdf for the
 * documented contract.
 */

export type PaymentMethod = "balance" | "store" | "bank" | "paypal";

export interface CheckoutLine {
  product_id: string;
  qty?: number;
}

interface CheckoutPayload {
  items: CheckoutLine[];
  payment_method: PaymentMethod;
}

export interface OrderLine {
  product_id: string;
  name: string;
  category: string;
  kind: "plan" | "zer_package" | "zer_priced" | "other";
  qty: number;
  zer_amount: number;
  fiat_amount: number;
  currency: string;
  cashback_pct: number;
  cashback_zer: number;
  line_zer: number;
  line_fiat: number;
}

export interface CheckoutResponse {
  order: {
    id: string;
    order_number: string;
    status: "PENDING" | "COMPLETED";
    payment_method: PaymentMethod;
    total_zer: number;
    total_fiat: number;
    cashback_earned: number;
    items: OrderLine[];
    paid_at: string | null;
  };
  wallet: { balance: number; status: string } | null;
  user_type: string | null;
  plan_expires_at: string | null;
}

export function useCheckout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      const res = await api.post("/checkout", payload);
      return (res.data?.data ?? res.data) as CheckoutResponse;
    },
    onSuccess: () => {
      // The wallet view + order history both need to refetch — invalidate widely
      // rather than micro-managing keys.
      qc.invalidateQueries({ queryKey: ["wallet"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export interface OrderRow {
  _id: string;
  order_number: string;
  status: "PENDING" | "COMPLETED";
  payment_method: PaymentMethod;
  total_zer: number;
  total_fiat: number;
  cashback_earned: number;
  items: OrderLine[];
  created_at: string;
  paid_at: string | null;
}

export function useMyOrders(perPage = 10) {
  return useQuery({
    queryKey: ["orders", perPage],
    queryFn: () =>
      api.get("/orders", { params: { per_page: perPage } }).then(r => r.data.data as {
        items: OrderRow[];
        current_page: number;
        last_page: number;
        total: number;
      }),
    staleTime: 30_000,
  });
}
