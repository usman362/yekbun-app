import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose
} from "@/components/ui/drawer";
import {
  partnerShops,
  transactions
} from "@/data/mock";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  usePlans,
  usePlaylistUpgrades,
  useStreamingUpgrades,
  useZerPackages,
  useBusinessPackages,
  useCashbackRules,
} from "@/hooks/use-zercash";
import { useCheckout, type PaymentMethod } from "@/hooks/use-checkout";
import { useInvoices, invoiceDownloadUrl } from "@/hooks/use-invoices";
import { toast } from "sonner";
import {
  Star, ShoppingCart, Trash2, Check, Plus, Minus, Heart,
  Wallet, Coins, TrendingUp, Clock, CreditCard, Landmark, Store,
  Music, Radio, Package, Briefcase, Receipt, ChevronRight, Download,
  Zap, Shield, BadgeCheck, RotateCcw, X, Lock, Tag
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────
interface CartItem {
  id: string;
  name: string;
  type: "plan" | "playlist" | "stream" | "zer" | "business";
  price: string;
  priceValue: number;
  priceUnit: "zer" | "eur";
  cashback?: number;
  qty: number;
  img?: string;
}

// ── Section Header ─────────────────────────────────────────────────
function SectionHeader({
  icon: Icon, title, subtitle, iconColor = "text-primary",
}: {
  icon: React.ElementType; title: string; subtitle?: string; iconColor?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10", iconColor === "text-primary" ? "bg-primary/10" : "bg-current/10")}>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Tier Badge Icon ────────────────────────────────────────────────
function TierIcon({ tier, size = "lg" }: { tier: string; size?: "sm" | "lg" }) {
  const s = size === "lg" ? "text-4xl" : "text-2xl";
  const map: Record<string, string> = {
    Bronze: "🥉", Silver: "🥈", Gold: "🥇",
    Titanium: "🔷", Platinum: "💎", Rhodium: "✨",
    Cultivated: "🌱", Educated: "📘", Academic: "🎓",
  };
  return <span className={s}>{map[tier] ?? "📦"}</span>;
}

// ── Add-to-Cart button ─────────────────────────────────────────────
function AddToCartBtn({
  inCart, onClick, small,
}: {
  inCart: boolean; onClick: () => void; small?: boolean;
}) {
  return (
    <Button
      size={small ? "sm" : "default"}
      onClick={onClick}
      className={cn(
        "gap-2 transition-all duration-200 w-full",
        inCart
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
      )}
    >
      {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      {inCart ? "Di Sepetê de" : "Add To Cart"}
    </Button>
  );
}

// ══════════════════════════════════════════════════════════════════
export default function DashboardOverview() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [billingToggle, setBillingToggle] = useState<"monthly" | "yearly">("monthly");
  const [autoCharge, setAutoCharge] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("balance");
  const isMobile = useIsMobile();
  // Identical shape to the old `userProfile` mock — keeps JSX (avatar, plan, balances) intact.
  const userProfile = useCurrentUser();
  const checkoutMut = useCheckout();
  const { data: invoiceData } = useInvoices();
  const billingHistory = invoiceData?.rows ?? [];
  const invoiceTotalLabel = (() => {
    const f = invoiceData?.totalFiat ?? 0;
    const z = invoiceData?.totalZer ?? 0;
    const parts = [];
    if (f > 0) parts.push(`€${f.toFixed(2)}`);
    if (z > 0) parts.push(`${z} Zer`);
    return parts.join(" + ") || "€0.00";
  })();

  /** Pay button handler — POSTs the current cart to /api/checkout. */
  const handleCheckout = async () => {
    if (cart.length === 0 || checkoutMut.isPending) return;
    try {
      const result = await checkoutMut.mutateAsync({
        items: cart.map(c => ({ product_id: c.id, qty: c.qty || 1 })),
        payment_method: paymentMethod as PaymentMethod,
      });
      toast.success(
        result.order.status === "COMPLETED"
          ? `Order ${result.order.order_number} completed!`
          : `Order ${result.order.order_number} placed — awaiting payment.`
      );
      setCart([]);
      setCartOpen(false);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      toast.error(e.response?.data?.message ?? "Checkout failed.");
    }
  };
  // Same shape as the legacy mocks — JSX (plan grid, playlist/streaming/zer/business
  // cards, etc.) is unchanged. Each hook backend-first with mock fallback.
  const plans = usePlans();
  const playlistUpgrades = usePlaylistUpgrades();
  const streamingUpgrades = useStreamingUpgrades();
  const zerPackages = useZerPackages();
  const businessPackages = useBusinessPackages();
  const cashbackRulesQ = useCashbackRules();

  // Mirror the backend's BuildsZercashCartLines cashback logic so the cart preview
  // matches exactly what checkout will credit (fixed vs percent, min-purchase).
  const cbRuleForType = (type: CartItem["type"]) => {
    const id = ({ playlist: "playlist", stream: "streaming", plan: "upgrade", zer: "zer_package", business: "zer_package" } as Record<string, string>)[type];
    return (cashbackRulesQ.data ?? []).find((r) => r.id === id);
  };
  const itemCashbackZer = (item: CartItem) => {
    if (item.priceUnit !== "zer") return 0;
    const amount = item.priceValue * item.qty;
    const rule = cbRuleForType(item.type);
    if (rule) {
      if (amount < rule.min_purchase) return 0;
      return rule.kind === "fixed" ? rule.value : (amount * rule.value) / 100;
    }
    return item.cashback ? (amount * item.cashback) / 100 : 0;
  };
  const itemCashbackLabel = (item: CartItem): string | null => {
    const rule = cbRuleForType(item.type);
    if (rule) {
      if (rule.value <= 0) return null;
      return rule.kind === "fixed" ? `${rule.value} Zer CB` : `${rule.value}% CB`;
    }
    return item.cashback ? `${item.cashback}% CB` : null;
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const isInCart = (id: string) => cart.some((i) => i.id === id);

  const cartTotal = cart.reduce((sum, item) => {
    if (item.priceUnit === "eur") return sum + item.priceValue;
    return sum;
  }, 0);
  const cartZerTotal = cart.reduce((sum, item) => {
    if (item.priceUnit === "zer") return sum + item.priceValue;
    return sum;
  }, 0);
  const cashbackTotal = cart.reduce((sum, item) => sum + itemCashbackZer(item), 0);

  const toggleAutoCharge = (id: string) =>
    setAutoCharge((prev) => ({ ...prev, [id]: !prev[id] }));

  const fade = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: i * 0.06, duration: 0.35 },
  });

  // ── Cart content (shared between sidebar & drawer) ──
  const cartContent = (
    <div className="pb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 border border-primary/20">
            <ShoppingCart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-foreground leading-none">My Cart</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">{cart.length === 0 ? "Vala ye" : `${cart.length} tişt hilbijartî`}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "h-7 min-w-[28px] px-2 rounded-full flex items-center justify-center text-xs font-extrabold transition-all",
            cart.length > 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border/50"
          )}>
            {cart.length}
          </div>
          {cart.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCart([])}
              className="h-7 w-7 rounded-full flex items-center justify-center text-destructive bg-destructive/10 border border-destructive/20"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Items / empty */}
      {cart.length === 0 ? (
        <div className="py-12 px-5 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4 bg-secondary border border-border/50">
            <ShoppingCart className="h-7 w-7 text-muted-foreground/40" />
          </div>
          <p className="font-semibold text-muted-foreground text-sm">Sepeta te vala ye</p>
          <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed max-w-[220px]">Pakêt an plan hilbijêre û lê zêde bike</p>
        </div>
      ) : (
        <>
          <div>
            <AnimatePresence>
              {cart.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className={cn("flex items-center gap-3 px-5 py-3.5", idx < cart.length - 1 && "border-b border-border/40")}
                >
                  <div className="h-12 w-12 rounded-2xl shrink-0 flex items-center justify-center text-xl bg-primary/10 border border-primary/15">
                    <TierIcon tier={item.name.split(" ")[0]} size="sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate leading-tight">{item.name}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-[10px] rounded-full px-2 py-0.5 font-semibold capitalize text-muted-foreground bg-secondary">{item.type}</span>
                      {itemCashbackLabel(item) && (
                        <span className="text-[10px] rounded-full px-2 py-0.5 font-bold flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20">
                          <TrendingUp className="h-2.5 w-2.5" />{itemCashbackLabel(item)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <p className="font-extrabold text-sm text-primary">{item.price}</p>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="h-7 w-7 rounded-full flex items-center justify-center text-destructive bg-destructive/10 border border-destructive/20"
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Payment Details */}
          <div className="px-5 py-4 border-t border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-wider">Detayên Dayinê</h3>
            </div>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="font-semibold text-xs text-foreground">{item.price}</span>
                </div>
              ))}
              {cashbackTotal > 0 && (
                <>
                  <div className="h-px bg-border/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-medium">
                      <TrendingUp className="h-3 w-3" /> Cashback
                    </span>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">−{Math.round(cashbackTotal).toLocaleString()} Zer</span>
                  </div>
                </>
              )}
              <div className="h-px bg-border/50" />
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-sm text-foreground">Bi Tevahî</span>
                <div className="text-right flex items-center gap-2">
                  {cartZerTotal > 0 && <span className="font-extrabold text-sm text-primary">₮ {cartZerTotal.toLocaleString()}</span>}
                  {cartTotal > 0 && <span className="font-extrabold text-sm text-foreground">€{cartTotal.toFixed(2)}</span>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Payment Methods */}
      {cart.length > 0 && (
        <>
          <div className="px-5 pt-5 pb-4 border-t border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-wider">Awayê Dayinê</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "balance", icon: Wallet, label: "Zercash", desc: `₮ ${userProfile.zerBalance.toLocaleString()} berdest`, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", selBorder: "border-amber-500/50", selBg: "bg-amber-500/10" },
              ].map((method) => {
                const selected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "relative rounded-xl p-3 flex items-center gap-2.5 text-left transition-all duration-200 border",
                      selected ? cn(method.selBorder, method.selBg) : "border-border/50 bg-secondary/50"
                    )}
                  >
                    {selected && (
                      <div className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full flex items-center justify-center bg-green-500">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center border shrink-0", method.bg, method.border)}>
                      <method.icon className={cn("h-3.5 w-3.5", method.color)} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs leading-tight text-foreground">{method.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{method.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="px-5 pb-5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={checkoutMut.isPending}
              onClick={handleCheckout}
              className="w-full h-[52px] rounded-2xl font-extrabold text-[15px] flex items-center justify-center gap-3 bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Zap className="h-5 w-5" />
              {checkoutMut.isPending ? "Pêvajo..." : `Bidin Pêş — ${cart.length} tişt`}
            </motion.button>
            <div className="flex items-center justify-center gap-4 mt-3">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Shield className="h-3 w-3 text-green-500" /> SSL</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><RotateCcw className="h-3 w-3 text-blue-500" /> Vegera Azad</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Zap className="h-3 w-3 text-amber-500" /> Instant</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex h-full relative">

        {/* ════ LEFT: Products (own scroller) ════ */}
        <div className="flex-1 min-w-0 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <div className="max-w-[1000px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-8 sm:space-y-10 pb-24 md:pb-16">

        {/* ══ 1. UNIFIED PROFILE + BALANCE ════════════════════════════════ */}
        <motion.div {...fade(0)}>
          <div
            className="rounded-2xl overflow-hidden shadow-xl relative"
            style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)" }}
          >
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute -left-8 -bottom-12 h-48 w-48 rounded-full bg-blue-500/8 blur-3xl" />

            <div className="relative z-10 p-6">
              {/* Top bar: logo + plan badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <img src="/images/logo.svg" alt="YekBûn" className="h-7 w-7" />
                  <span className="font-bold text-white text-base tracking-wide">YekBûn</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[11px] font-bold px-3">
                  {userProfile.plan}
                </Badge>
              </div>

              {/* Main content: profile left, balance right */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-end">
                {/* Profile side */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="h-14 w-14 rounded-xl overflow-hidden border-2 border-white/15 shadow-lg shrink-0">
                    <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <p className="font-bold text-lg text-white leading-tight">{userProfile.name}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">✓ Çalak</span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">{userProfile.region}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5">
                        <TierIcon tier={userProfile.plan} size="sm" />
                        <span className="text-xs font-semibold text-white/70">{userProfile.plan}</span>
                      </div>
                      <span className="text-white/20">·</span>
                      <span className="text-xs text-white/50">{userProfile.planRenewal}</span>
                    </div>
                  </div>
                </div>

                {/* Balance side */}
                <div className="flex-1 min-w-0 lg:text-right">
                  <p className="text-white/40 text-[9px] font-medium uppercase tracking-widest mb-1">Moza Zer</p>
                  <div className="flex items-end gap-2 lg:justify-end mb-4">
                    <img src="/images/currency.svg" alt="Zer" className="h-8 w-8 mb-0.5" />
                    <span className="text-white text-4xl font-extrabold leading-none">
                      {userProfile.zerBalance.toLocaleString()}
                    </span>
                    <span className="text-white/35 text-sm mb-0.5 ml-1">Zer</span>
                  </div>
                  <div className="flex items-center gap-2.5 lg:justify-end flex-wrap">
                    <div className="rounded-lg bg-white/8 border border-white/10 px-3 py-1.5 flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                      <div>
                        <p className="text-white/35 text-[8px] uppercase tracking-widest">ZerCash</p>
                        <p className="text-white font-bold text-xs">{userProfile.zerCash.toLocaleString()} <span className="text-green-400">5%</span></p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/8 border border-white/10 px-3 py-1.5">
                      <p className="text-white/35 text-[8px] uppercase tracking-widest">Bal. Berdest</p>
                      <p className="text-white font-bold text-xs">₮ {(userProfile.zerBalance - 500).toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-white/8 border border-white/10 px-3 py-1.5">
                      <p className="text-white/35 text-[8px] uppercase tracking-widest">Karta Zer</p>
                      <p className="text-white/70 font-mono text-xs tracking-widest">•••• 9214</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══ 2. PARTNER SHOPS ══════════════════════════════════════════════ */}
        <motion.section {...fade(2)}>
          <SectionHeader icon={Store} title="Bazarên Hevkar" subtitle="Di bazarên bijare de ZerCash bistîne" iconColor="text-orange-400" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerShops.map((shop, i) => (
              <motion.div key={shop.id} {...fade(i)}>
                <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  {/* Image */}
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[10px] px-3 py-1 rounded-md font-extrabold uppercase tracking-wider text-black bg-yellow-400 shadow-md">
                        {shop.category}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="h-9 w-9 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                        {shop.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-sm text-foreground leading-tight truncate">{shop.name}</p>
                          <BadgeCheck className="h-4 w-4 text-green-500 shrink-0" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5">
                          <span>🌿 {shop.region}</span>
                          <span>·</span>
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-foreground">{shop.rating}</span>
                          <span className="text-muted-foreground">({shop.orders})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-[10px] px-2.5 py-1 rounded-md font-extrabold uppercase",
                        shop.isOpen
                          ? "text-white bg-green-500"
                          : "text-white bg-red-500"
                      )}>
                        {shop.isOpen ? "SHOP OPEN" : "CLOSED"}
                      </span>
                      <div className="flex items-center gap-1 text-rose-500 text-xs font-bold">
                        <Heart className="h-3.5 w-3.5 fill-current" /> {shop.followers}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ══ 3. CHOOSE YOUR PLAN ══════════════════════════════════════════ */}
        <motion.section {...fade(3)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <SectionHeader icon={Shield} title="Planê Xwe Hilbijêre" subtitle="Planê mehane yan salane hilbijêre" iconColor="text-indigo-400" />
            {/* Toggle */}
            <div className="flex items-center gap-1 bg-secondary rounded-full p-1 shrink-0">
              {(["monthly", "yearly"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setBillingToggle(opt)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200",
                    billingToggle === opt
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {opt === "monthly" ? "Mehane" : "Salane"}
                  {opt === "yearly" && <span className="ml-1.5 text-[10px] font-bold text-green-400">−17%</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {plans.map((plan, i) => {
              const price = billingToggle === "monthly" ? plan.priceMonthly : plan.priceYearly;
              const isCurrent = plan.name === userProfile.plan;
              const inCart = isInCart(`plan-${plan.id}`);
              return (
                <motion.div key={plan.id} {...fade(i)} className={cn(plan.recommended && "relative")}>
                  {plan.recommended && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
                      <Badge className="bg-primary text-primary-foreground shadow-lg shadow-primary/30 px-4">⭐ Herî Populer</Badge>
                    </div>
                  )}
                  <div className={cn(
                    "rounded-3xl border p-6 h-full flex flex-col transition-all duration-300 shadow-sm",
                    plan.recommended
                      ? "border-primary/40 bg-primary/5 hover:shadow-xl hover:shadow-primary/10"
                      : "border-border/40 bg-card hover:border-primary/30 hover:shadow-lg"
                  )}>
                    {/* Plan icon */}
                    <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-4 text-3xl", `bg-gradient-to-br ${plan.color}`)}>
                      <TierIcon tier={plan.name} size="sm" />
                    </div>

                    {isCurrent && (
                      <Badge className="self-start mb-3 bg-green-500/15 text-green-400 border border-green-500/30 text-xs">
                        ✓ Plana Niha
                      </Badge>
                    )}

                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-5">
                      {price === 0 ? (
                        <div className="flex items-end gap-1">
                          <span className="text-3xl font-extrabold text-foreground">Belaş</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-end gap-1">
                            <span className="text-3xl font-extrabold text-foreground">€{price}</span>
                            <span className="text-muted-foreground text-sm mb-1">/{billingToggle === "monthly" ? "meh" : "sal"}</span>
                          </div>
                          <p className="text-xs text-primary mt-1 flex items-center gap-1">
                            <Coins className="h-3 w-3" /> {plan.zerPrice.toLocaleString()} Zer / meh
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {plan.features.slice(0, 5).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-green-500 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>

                    {isCurrent ? (
                      <Button variant="outline" className="w-full" disabled>Plana Aktîf</Button>
                    ) : (
                      <AddToCartBtn
                        inCart={inCart}
                        onClick={() => addToCart({
                          id: `plan-${plan.id}`,
                          name: `${plan.name} Plan`,
                          type: "plan",
                          price: price === 0 ? "Belaş" : `€${price}`,
                          priceValue: price,
                          priceUnit: "eur",
                          qty: 1,
                        })}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ══ 4. UPGRADE MUSIC PLAYLIST ═══════════════════════════════════ */}
        <motion.section {...fade(4)}>
          <SectionHeader icon={Music} title="Mûzîka Playlist Nûve Bike" subtitle="Hejmara stranên xwe zêde bike" iconColor="text-blue-400" />
          <div className="grid sm:grid-cols-3 gap-5">
            {playlistUpgrades.map((pkg, i) => {
              const inCart = isInCart(pkg.id);
              const svgName = `${pkg.tier}_Playlist.svg`;
              return (
                <motion.div key={pkg.id} {...fade(i)}>
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex flex-col">
                    {/* SVG image — clip overflow to avoid duplicate badge from SVG artwork */}
                    <div className="relative overflow-hidden">
                      <img
                        src={`/images/cards/${svgName}`}
                        alt={pkg.name}
                        className="w-full block scale-[1.08] origin-bottom"
                        style={{ aspectRatio: "282/188", objectFit: "fill" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="px-4 pt-4 pb-2">
                      <h3 className="font-extrabold text-lg text-foreground">{pkg.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Playlist Songs</p>
                          <p className="font-bold text-base text-foreground">{pkg.songs} Songs</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Price</p>
                          <p className="font-bold text-base text-primary">₹ {pkg.zerCost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-4 pb-4 pt-2 flex flex-col gap-3 mt-auto">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addToCart({
                          id: pkg.id, name: pkg.name, type: "playlist",
                          price: `${pkg.zerCost.toLocaleString()} Zer`,
                          priceValue: pkg.zerCost, priceUnit: "zer",
                          cashback: pkg.cashback, qty: 1,
                        })}
                        className={cn(
                          "w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200",
                          inCart
                            ? "bg-green-600 text-white shadow-md shadow-green-600/30"
                            : "bg-green-500 text-white shadow-md shadow-green-500/25 hover:bg-green-600"
                        )}
                      >
                        {inCart ? <><Check className="h-4 w-4" /> Di Sepetê de</> : <><ShoppingCart className="h-4 w-4" /> Add To Cart</>}
                      </motion.button>
                      <div className="flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-secondary/30 py-2 px-3">
                        <span className="text-xs text-muted-foreground font-medium">Auto Charge</span>
                        <button
                          onClick={() => toggleAutoCharge(pkg.id)}
                          className="h-6 w-11 rounded-full transition-all duration-300 relative shrink-0"
                          style={{ background: autoCharge[pkg.id] ? "#22c55e" : "hsl(var(--muted))" }}
                        >
                          <span className={cn(
                            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300",
                            autoCharge[pkg.id] ? "translate-x-5" : "translate-x-0"
                          )} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ══ 5. STREAMING MINUTES ═══════════════════════════════════════ */}
        <motion.section {...fade(5)}>
          <SectionHeader icon={Radio} title="Kanalên Weşanê" subtitle="Deqeyan zêde bike û bêbir guhdarî bike" iconColor="text-purple-400" />
          <div className="grid sm:grid-cols-3 gap-5">
            {streamingUpgrades.map((pkg, i) => {
              const inCart = isInCart(pkg.id);
              const svgName = `${pkg.tier}_Stream.svg`;
              return (
                <motion.div key={pkg.id} {...fade(i)}>
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex flex-col">
                    {/* SVG image — clip overflow to avoid duplicate badge */}
                    <div className="relative overflow-hidden">
                      <img
                        src={`/images/cards/${svgName}`}
                        alt={pkg.name}
                        className="w-full block scale-[1.08] origin-bottom"
                        style={{ aspectRatio: "282/188", objectFit: "fill" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="px-4 pt-4 pb-2">
                      <h3 className="font-extrabold text-lg text-foreground">{pkg.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Minute</p>
                          <p className="font-bold text-base text-foreground">{pkg.minutes} Min</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Price</p>
                          <p className="font-bold text-base text-primary">₹ {pkg.zerCost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-4 pb-4 pt-2 flex flex-col gap-3 mt-auto">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addToCart({
                          id: pkg.id, name: pkg.name, type: "stream",
                          price: `${pkg.zerCost.toLocaleString()} Zer`,
                          priceValue: pkg.zerCost, priceUnit: "zer",
                          cashback: pkg.cashback, qty: 1,
                        })}
                        className={cn(
                          "w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200",
                          inCart
                            ? "bg-green-600 text-white shadow-md shadow-green-600/30"
                            : "bg-green-500 text-white shadow-md shadow-green-500/25 hover:bg-green-600"
                        )}
                      >
                        {inCart ? <><Check className="h-4 w-4" /> Di Sepetê de</> : <><ShoppingCart className="h-4 w-4" /> Add To Cart</>}
                      </motion.button>
                      <div className="flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-secondary/30 py-2 px-3">
                        <span className="text-xs text-muted-foreground font-medium">Auto Charge</span>
                        <button
                          onClick={() => toggleAutoCharge(pkg.id)}
                          className="h-6 w-11 rounded-full transition-all duration-300 relative shrink-0"
                          style={{ background: autoCharge[pkg.id] ? "#22c55e" : "hsl(var(--muted))" }}
                        >
                          <span className={cn(
                            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300",
                            autoCharge[pkg.id] ? "translate-x-5" : "translate-x-0"
                          )} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ══ 6. STANDARD ZER PACKAGES ════════════════════════════════════ */}
        <motion.section {...fade(6)}>
          <SectionHeader icon={Package} title="Pakêtên Standard Zer" subtitle="Moza xwe ya Zer zêde bike" iconColor="text-amber-400" />
          <div className="grid sm:grid-cols-3 gap-5">
            {zerPackages.map((pkg, i) => {
              const inCart = isInCart(pkg.id);
              const svgMap: Record<string, string> = { Bronze: "Standard_-_Bronze_Packges.svg", Silver: "Standard_-_SliverPackges.svg", Gold: "Standard_-_GoldPackges.svg" };
              return (
                <motion.div key={pkg.id} {...fade(i)}>
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex flex-col">
                    <div className="overflow-hidden">
                      <img src={`/images/cards/${svgMap[pkg.tier] ?? "Standard_-_Bronze_Packges.svg"}`} alt={pkg.name} className="w-full block" style={{ aspectRatio: "282/188", objectFit: "fill" }} />
                    </div>
                    <div className="px-4 pt-4 pb-2">
                      <h3 className="font-extrabold text-lg text-foreground">{pkg.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Zer</p>
                          <p className="font-bold text-base text-primary">₹ {pkg.zerAmount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Price</p>
                          <p className="font-bold text-base text-foreground">€ {pkg.eurPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{pkg.helper}</p>
                    </div>
                    <div className="px-4 pb-4 pt-2 mt-auto">
                      <motion.button whileTap={{ scale: 0.97 }} onClick={() => addToCart({ id: pkg.id, name: pkg.name, type: "zer", price: `€${pkg.eurPrice}`, priceValue: pkg.eurPrice, priceUnit: "eur", qty: 1 })}
                        className={cn("w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200", inCart ? "bg-green-600 text-white shadow-md shadow-green-600/30" : "bg-green-500 text-white shadow-md shadow-green-500/25 hover:bg-green-600")}
                      >
                        {inCart ? <><Check className="h-4 w-4" /> Di Sepetê de</> : <><ShoppingCart className="h-4 w-4" /> Add To Cart</>}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ══ 7. BUSINESS ZER PACKAGES ════════════════════════════════════ */}
        <motion.section {...fade(7)}>
          <SectionHeader icon={Briefcase} title="Pakêtên Karsazî Zer" subtitle="Karsaziya xwe ya Kurdî bigihîne astê bilind" iconColor="text-violet-400" />
          <div className="grid sm:grid-cols-3 gap-5">
            {businessPackages.map((pkg, i) => {
              const inCart = isInCart(pkg.id);
              const svgMap: Record<string, string> = { Titanium: "Standard_-_SliverPackges.svg", Platinum: "Standard_-_GoldPackges.svg", Diamond: "Standard_-_Bronze_Packges.svg" };
              return (
                <motion.div key={pkg.id} {...fade(i)}>
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex flex-col">
                    <div className="overflow-hidden">
                      <img src={`/images/cards/${svgMap[pkg.tier] ?? "Standard_-_Bronze_Packges.svg"}`} alt={pkg.name} className="w-full block" style={{ aspectRatio: "282/188", objectFit: "fill" }} />
                    </div>
                    <div className="px-4 pt-4 pb-2">
                      <h3 className="font-extrabold text-lg text-foreground">{pkg.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Zer</p>
                          <p className="font-bold text-base text-primary">₹ {pkg.zerAmount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Price</p>
                          <p className="font-bold text-base text-foreground">€ {pkg.eurPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{pkg.helper}</p>
                    </div>
                    <div className="px-4 pb-4 pt-2 mt-auto">
                      <motion.button whileTap={{ scale: 0.97 }} onClick={() => addToCart({ id: pkg.id, name: pkg.name, type: "business", price: `€${pkg.eurPrice}`, priceValue: pkg.eurPrice, priceUnit: "eur", qty: 1 })}
                        className={cn("w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200", inCart ? "bg-green-600 text-white shadow-md shadow-green-600/30" : "bg-green-500 text-white shadow-md shadow-green-500/25 hover:bg-green-600")}
                      >
                        {inCart ? <><Check className="h-4 w-4" /> Di Sepetê de</> : <><ShoppingCart className="h-4 w-4" /> Add To Cart</>}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>



        {/* ══ 8. BILLING HISTORY ════════════════════════════════════════════ */}
        <motion.section {...fade(8)}>
          <SectionHeader icon={Receipt} title="Dîroka Dayinê" subtitle="Kirîn û bikaranîna te ya borî" iconColor="text-slate-500" />
          <div className="rounded-3xl border border-border/40 bg-card overflow-hidden shadow-sm">
            {/* Desktop table header */}
            <div className="hidden sm:grid grid-cols-4 px-5 py-3 border-b border-border/40 bg-secondary/50">
              {["Têkilî", "Dîrok", "Jimareya Fatûrê", "Buhayê"].map((h) => (
                <p key={h} className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</p>
              ))}
            </div>
            <div className="divide-y divide-border/40">
              {billingHistory.map((bill, i) => (
                <motion.div key={bill.id} {...fade(i)} className="sm:grid sm:grid-cols-4 sm:items-center px-5 py-4 hover:bg-secondary/50 transition-colors space-y-1 sm:space-y-0">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{bill.title}</p>
                    <Badge variant="secondary" className="mt-1 text-[10px] px-2">{bill.type}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Clock className="h-3.5 w-3.5 shrink-0" /> {bill.date}
                  </div>
                  <p className="text-muted-foreground text-sm font-mono hidden sm:block">{bill.id}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{bill.amount}</span>
                    <Badge className="bg-green-500/15 text-green-500 border-green-500/30 text-[10px]">✓</Badge>
                    {/* Download invoice PDF (public link, no token) — testing button */}
                    <a
                      href={invoiceDownloadUrl(bill.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download invoice"
                      className="ml-auto sm:ml-1 inline-flex items-center justify-center h-7 w-7 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-border/40 bg-secondary/50 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Bi tevahî xerckirî</p>
              <p className="font-bold text-foreground">{invoiceTotalLabel}</p>
            </div>
          </div>
        </motion.section>

          </div>
        </div>
        {/* ════ END LEFT COLUMN ════ */}

        {/* ════ RIGHT: Cart Sidebar — desktop only ════ */}
        <div className="hidden md:flex flex-col w-[340px] lg:w-[400px] shrink-0 overflow-y-auto border-l border-border/50 bg-card" style={{ scrollbarWidth: "none" }}>
          {cartContent}
        </div>

        {/* ════ Mobile: Floating cart button + Drawer ════ */}
        {isMobile && (
          <>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center md:hidden"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </motion.button>

            <Drawer open={cartOpen} onOpenChange={setCartOpen}>
              <DrawerContent className="max-h-[85vh]">
                <DrawerHeader className="sr-only">
                  <DrawerTitle>Cart</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                  {cartContent}
                </div>
              </DrawerContent>
            </Drawer>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
