import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, CreditCard, ArrowDownToLine, History, AlertCircle, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import {
  useWalletDashboard,
  type DepositRow,
  type CashbackEarnedRow,
  type TransactionRow,
} from "@/hooks/use-wallet";
import { Link } from "react-router-dom";

/**
 * User-facing wallet dashboard. Reads `/api/wallet/dashboard` and renders the live
 * balance / charge presets / transaction history. Falls back to a friendly "wallet
 * not active" CTA when the backend returns the inactive-wallet 403 payload.
 */

type FilterKind = "all" | "charges" | "cashback";

export default function DashboardWallet() {
  const { data, isLoading, isError, refetch } = useWalletDashboard();
  const [filter, setFilter] = useState<FilterKind>("all");

  // Merge the three transaction streams into a single sortable list for the table.
  // Each source already arrives sorted desc by created_at — we keep them in that order
  // and just project to a unified row shape. Filter narrows down on the client.
  const allRows = useMemo(() => {
    if (data?.kind !== "ok") return [] as Array<UnifiedRow>;
    const deposits = data.data.deposits.map(toUnified.fromDeposit);
    const cashbacks = data.data.latest_cashbacks.map(toUnified.fromCashback);
    const txns = data.data.latest_transactions.map(toUnified.fromTransaction);
    return [...deposits, ...cashbacks, ...txns];
  }, [data]);

  const rows = useMemo(() => {
    if (filter === "charges") return allRows.filter((r) => r.type === "deposit");
    if (filter === "cashback") return allRows.filter((r) => r.type === "cashback");
    return allRows;
  }, [allRows, filter]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">My Wallet</h1>
          <p className="text-muted-foreground mt-1">Manage your Zer and ZerCash balances.</p>
        </div>

        {/* Loading skeleton — shown only on first paint before data arrives. */}
        {isLoading && <LoadingState />}

        {/* Fetch errored out (network, 5xx, etc.) — surface a retry button. */}
        {isError && <ErrorState onRetry={() => refetch()} />}

        {/* Wallet not yet activated — backend returned 403 with `has_wallet` payload. */}
        {data?.kind === "inactive" && <WalletInactiveState status={data.data.wallet_status} />}

        {/* Happy path — wallet is activated and we have full data. */}
        {data?.kind === "ok" && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Balance card */}
              <Card className="bg-gradient-to-br from-card to-card border-primary/20 shadow-lg relative overflow-hidden">
                <div className="absolute -right-20 -top-20 bg-primary/10 w-64 h-64 rounded-full blur-3xl" />
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Total {data.data.currency || "Zer"} Balance
                      </p>
                      <h2 className="text-5xl font-bold mt-2 font-display">
                        {Number(data.data.balance).toLocaleString()}
                      </h2>
                    </div>
                    <div className="p-3 bg-primary/20 rounded-xl text-primary">
                      <Wallet className="h-8 w-8" />
                    </div>
                  </div>
                  {/* Secondary balances row */}
                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <BalanceBadge label="Zer" value={data.data.zer_balance} />
                    <BalanceBadge label="Cashback" value={data.data.cashback_balance} accent="emerald" />
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1 shadow-md shadow-primary/20">
                      <CreditCard className="mr-2 h-4 w-4" /> Charge
                    </Button>
                    <Button variant="secondary" className="flex-1 border border-border/50">
                      <ArrowDownToLine className="mr-2 h-4 w-4" /> Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Charge presets card — UI-only for now, gateway integration pending. */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Charge Zer</CardTitle>
                  <CardDescription>Select an amount to charge via credit card</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[500, 1000, 2000, 5000, 10000].map((amt) => (
                      <Button
                        key={amt}
                        variant="outline"
                        className="h-auto py-3 flex flex-col gap-1 border-dashed"
                      >
                        <span className="font-bold text-lg">{amt}</span>
                        <span className="text-xs text-muted-foreground">Zer</span>
                      </Button>
                    ))}
                    <div className="flex items-center justify-center">
                      <Input type="number" placeholder="Custom" className="text-center font-bold" />
                    </div>
                  </div>
                  <Button className="w-full">Continue to Payment</Button>
                </CardContent>
              </Card>
            </div>

            {/* Transaction history table — fed from the merged stream. */}
            <Card className="border-border/50 mt-8">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" /> Transaction History
                  </CardTitle>
                  <CardDescription>Your recent activity across the platform</CardDescription>
                </div>
                <Tabs
                  value={filter}
                  onValueChange={(v) => setFilter(v as FilterKind)}
                  className="w-[400px] hidden sm:block"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="charges">Charges</TabsTrigger>
                    <TabsTrigger value="cashback">Cashback</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border/50 mt-4 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50 border-b border-border/50 text-muted-foreground">
                      <tr>
                        <th className="h-10 px-4 text-left font-medium">Date</th>
                        <th className="h-10 px-4 text-left font-medium">Description</th>
                        <th className="h-10 px-4 text-left font-medium">Type</th>
                        <th className="h-10 px-4 text-right font-medium">Amount</th>
                        <th className="h-10 px-4 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 bg-card">
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-muted-foreground">
                            No transactions yet.
                          </td>
                        </tr>
                      ) : (
                        rows.map((tx) => (
                          <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                            <td className="p-4 align-middle whitespace-nowrap text-muted-foreground">
                              {tx.date}
                            </td>
                            <td className="p-4 align-middle font-medium">{tx.description}</td>
                            <td className="p-4 align-middle capitalize">{tx.type}</td>
                            <td
                              className={`p-4 align-middle text-right font-bold ${
                                tx.amount > 0 ? "text-green-500" : ""
                              }`}
                            >
                              {tx.amount > 0 ? "+" : ""}
                              {tx.amount}
                            </td>
                            <td className="p-4 align-middle text-right">
                              <span
                                className="capitalize text-xs font-semibold px-2 py-1 rounded-full"
                                style={{
                                  color: tx.status_color,
                                  background: tx.status_color + "1A", // ~10% alpha
                                }}
                              >
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ── Small presentational helpers (kept local to this file) ─────────────────── */

function BalanceBadge({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "emerald";
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/40 border border-border/40">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`font-bold ${accent === "emerald" ? "text-emerald-500" : "text-foreground"}`}>
        {Number(value || 0).toLocaleString()}
      </span>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading wallet…
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="border-destructive/40">
      <CardContent className="p-8 text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
        <div>
          <h3 className="font-semibold">Couldn't load your wallet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Check your connection or try again. If this keeps happening, sign out and back in.
          </p>
        </div>
        <Button onClick={onRetry}>Retry</Button>
      </CardContent>
    </Card>
  );
}

function WalletInactiveState({ status }: { status: string | null }) {
  const isPending = status === "pending" || status === "under_review";
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="p-8 text-center space-y-4">
        <Wallet className="h-10 w-10 text-primary mx-auto" />
        <div>
          <h3 className="text-lg font-semibold">
            {isPending ? "Wallet under review" : "Wallet not active yet"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            {isPending
              ? "We're reviewing your wallet request. You'll get a notification as soon as it's activated."
              : status === "rejected"
              ? "Your wallet request was rejected. Please contact support to resubmit."
              : "Set up your wallet to start charging Zer and earning cashback."}
          </p>
        </div>
        {!isPending && status !== "rejected" && (
          <Button asChild>
            <Link to="/dashboard">Set up wallet</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

/* ── Row projection: dashboard returns three streams; merge into a unified shape ── */

interface UnifiedRow {
  id: string;
  date: string;
  description: string;
  type: "deposit" | "cashback" | "expense";
  amount: number;
  status: string;
  status_color: string;
}

const toUnified = {
  fromDeposit: (r: DepositRow): UnifiedRow => ({
    id: r.id,
    date: r.date,
    description: r.title,
    type: "deposit",
    amount: r.amount,
    status: "completed",
    status_color: r.status_color,
  }),
  fromCashback: (r: CashbackEarnedRow): UnifiedRow => ({
    id: "cb-" + r.id,
    date: r.date,
    description: `${r.merchant} cashback (${r.cashback_percent}%)`,
    type: "cashback",
    amount: r.cashback_amount,
    status: "earned",
    status_color: "#22C55E",
  }),
  fromTransaction: (r: TransactionRow): UnifiedRow => ({
    id: "tx-" + r.id,
    date: r.date,
    description: r.merchant,
    type: "expense",
    amount: -Math.abs(r.amount),
    status: r.status,
    status_color: r.status_color,
  }),
};
