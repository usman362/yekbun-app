import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

/**
 * Invoice / purchase history (the "Dîroka Dayinê" section).
 *   GET /invoices                  → list (this hook)
 *   GET /invoices/{id}/download    → public PDF (invoiceDownloadUrl)
 */

const CATEGORY_LABEL: Record<string, string> = {
  standard_zer_package: "Standard Pack",
  business_zer_package: "Business Pack",
  choose_your_plan: "Plan Upgrade",
  upgrade_music_playlist: "Playlist",
  streaming_minutes: "Streaming",
};

export interface InvoiceRow {
  id: string;       // invoice_id — used for display + download
  title: string;
  type: string;
  date: string;     // dd.mm.yyyy
  amount: string;   // "€49.99" or "700 Zer"
  status: string;
}

const fmtDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
};

/** Public PDF download URL (no token needed). */
export function invoiceDownloadUrl(id: string): string {
  const base = String(import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  return `${base}/invoices/${id}/download`;
}

export function useInvoices() {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const r = await api.get("/invoices", { params: { per_page: 50 } });
      const d = r.data?.data ?? {};
      const items = (d.items ?? []) as Array<Record<string, unknown>>;

      const rows: InvoiceRow[] = items.map((inv) => {
        const line = (Array.isArray(inv.items) && inv.items[0]) ? inv.items[0] as Record<string, unknown> : {};
        const fiat = Number(inv.total_fiat ?? 0);
        const zer = Number(inv.total_zer ?? 0);
        return {
          id: String(inv.invoice_id ?? inv._id ?? ""),
          title: String(line.name ?? inv.order_number ?? "Purchase"),
          type: CATEGORY_LABEL[String(line.category ?? "")] ?? "Purchase",
          date: fmtDate(String(inv.date ?? inv.created_at ?? "")),
          amount: fiat > 0 ? `€${fiat.toFixed(2)}` : `${zer} Zer`,
          status: String(inv.status ?? "COMPLETED"),
        };
      });

      const totalFiat = items.reduce((s, i) => s + Number(i.total_fiat ?? 0), 0);
      const totalZer = items.reduce((s, i) => s + Number(i.total_zer ?? 0), 0);

      return { rows, totalFiat, totalZer };
    },
    staleTime: 30_000,
  });
}
