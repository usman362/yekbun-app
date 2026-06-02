import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, Mail, ChevronLeft, Shield, RefreshCw,
  CheckCircle2, Heart, MessageCircle, Play, Pause, Music2,
  Users, Store, Globe, Headphones, Bell
} from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOtpSend, useOtpVerify } from "@/hooks/use-auth";
import { toast } from "sonner";

/* ─── Slide animation ─────────────────────────────────────────── */
const SLIDE = {
  initial: (d: number) => ({ opacity: 0, x: d * 32 }),
  animate: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: -d * 32 }),
};

/* ─── OTP Box ─────────────────────────────────────────────────── */
function OtpBox({
  value, inputRef, onChange, onKeyDown, onPaste, index,
}: {
  value: string;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (v: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void;
  index: number;
}) {
  const filled = !!value;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.05 }}
      className="relative flex-1"
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        className={cn(
          "w-full aspect-square max-h-[64px] text-center text-2xl font-extrabold rounded-2xl outline-none transition-all duration-200 select-none border-2",
          "bg-slate-100 border-slate-200 text-slate-900",
          "dark:bg-zinc-800/80 dark:border-zinc-600 dark:text-white",
          filled && "border-primary bg-primary/8 dark:bg-primary/15 dark:border-primary shadow-md shadow-primary/20",
          "focus:border-primary focus:bg-primary/5 focus:ring-4 focus:ring-primary/15 focus:shadow-lg focus:shadow-primary/10",
          "dark:focus:border-primary dark:focus:bg-primary/10 dark:focus:ring-primary/20"
        )}
      />
      {filled && (
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-primary"
        />
      )}
    </motion.div>
  );
}

/* ─── Resend Timer ─────────────────────────────────────────────── */
function ResendTimer({ onResend }: { onResend: () => void }) {
  const [secs, setSecs] = useState(30);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (secs <= 0) { setReady(true); return; }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);
  function handle() { setSecs(30); setReady(false); onResend(); }
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm text-muted-foreground">Kod nehat?</span>
      {ready ? (
        <motion.button
          type="button" onClick={handle}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Dîsa bişîne
        </motion.button>
      ) : (
        <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
          <RefreshCw className="h-3 w-3 text-primary animate-spin" style={{ animationDuration: "2s" }} />
          <span className="text-primary text-xs font-bold tabular-nums">{secs}s</span>
        </div>
      )}
    </div>
  );
}

/* ─── Music Card (inline, left of phone) ─────────────────────── */
function MusicCard() {
  const [playing, setPlaying] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
        className="w-[190px] bg-black/55 backdrop-blur-2xl border border-white/15 rounded-2xl p-3.5 shadow-2xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-11 w-11 rounded-xl overflow-hidden shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&q=80&fit=crop"
              alt="music" className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[12px] font-bold truncate">Ey Reqîb</p>
            <p className="text-white/55 text-[10px] truncate">Şivan Perwer</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Music2 className="h-2.5 w-2.5 text-primary/80" />
              <span className="text-primary text-[9px] font-semibold">Kurdish Folk</span>
            </div>
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/40 shrink-0"
          >
            {playing
              ? <Pause className="h-3 w-3 text-black fill-black" />
              : <Play  className="h-3 w-3 text-black fill-black" />}
          </button>
        </div>
        <div className="mt-2.5">
          <div className="h-1 w-full rounded-full bg-white/15 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={playing ? { width: ["35%", "68%", "35%"] } : { width: "68%" }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-white/40 text-[9px]">1:32</span>
            <span className="text-white/40 text-[9px]">4:32</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Feed Post Card (inline, right of phone) ────────────────── */
function FeedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.75, duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="w-[168px] bg-black/55 backdrop-blur-2xl border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="h-24 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1706608545819-286054c30d89?w=400&q=80&fit=crop"
            alt="post" className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <div className="h-4 w-4 rounded-full overflow-hidden border border-white/40">
              <img src="https://images.unsplash.com/photo-1527615020922-3c670eed3407?w=60&q=80&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-white text-[9px] font-bold">Miran R.</p>
          </div>
          <div className="absolute top-1.5 right-1.5">
            <Badge label="🌿 Rojava" />
          </div>
        </div>
        <div className="p-2.5">
          <p className="text-white/80 text-[10px] leading-relaxed mb-1.5">
            Çiyayên me yên spehî 🏔️
          </p>
          <div className="flex items-center gap-2.5">
            <span className="text-white/50 text-[9px] flex items-center gap-0.5">
              <Heart className="h-2.5 w-2.5 fill-current text-red-400" /> 1.2K
            </span>
            <span className="text-white/50 text-[9px] flex items-center gap-0.5">
              <MessageCircle className="h-2.5 w-2.5" /> 84
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Top Badge ───────────────────────────────────────────────── */
function TopBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 shadow-xl"
    >
      <div className="h-2 w-2 rounded-full bg-green-400 shrink-0 animate-pulse" />
      <span className="text-white text-[12px] font-semibold whitespace-nowrap">500K+ endamên çalak</span>
    </motion.div>
  );
}

/* ─── Stats Row ───────────────────────────────────────────────── */
function StatsBadge({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center mb-0.5", color)}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <p className="text-white text-sm font-extrabold">{value}</p>
      <p className="text-white/45 text-[10px]">{label}</p>
    </div>
  );
}

/* ─── Small badge ─────────────────────────────────────────────── */
function Badge({ label }: { label: string }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-2 py-0.5">
      <span className="text-white text-[10px] font-semibold">{label}</span>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */
export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [success, setSuccess] = useState(false);
  const [dir, setDir] = useState(1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP-login network calls — the JSX below is unchanged; we just feed `loading` from
  // the mutation states and call `mutateAsync` from the existing handlers.
  const otpSend = useOtpSend();
  const otpVerify = useOtpVerify();
  const loading = otpSend.isPending || otpVerify.isPending;

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) =>
    a + "•".repeat(Math.max(b.length, 3)) + c
  );

  function goToOtp() {
    setDir(1); setStep("otp");
    setTimeout(() => inputRefs.current[0]?.focus(), 160);
  }
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;
    try {
      const r = await otpSend.mutateAsync({ email: email.trim() });
      // In APP_DEBUG=true mode the server returns the code so devs can skip the inbox.
      if (r.dev_code) {
        toast.success(`Dev code: ${r.dev_code}`, { duration: 8000 });
      } else {
        toast.success("Verification code sent to your email");
      }
      goToOtp();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      toast.error(e.response?.data?.message ?? "Couldn't send code. Try again.");
    }
  }
  function handleOtpChange(i: number, v: string) {
    const char = v.replace(/\D/g, "").slice(-1);
    const next = [...otp]; next[i] = char; setOtp(next);
    if (char && i < 5) inputRefs.current[i + 1]?.focus();
  }
  function handleOtpKey(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputRefs.current[i - 1]?.focus();
  }
  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const next = [...otp]; digits.forEach((d, i) => { next[i] = d; }); setOtp(next);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  }
  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.join("").length < 6 || loading) return;
    try {
      await otpVerify.mutateAsync({ email: email.trim(), otp: otp.join("") });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      toast.error(e.response?.data?.message ?? "Invalid code. Try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  }
  const otpFilled = otp.join("").length === 6;

  return (
    <div className="h-screen flex overflow-hidden">

      {/* ══════════════════════════════════════ LEFT: FORM SIDE */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 lg:p-12 relative overflow-hidden
        bg-gradient-to-br from-amber-50 via-white to-slate-50
        dark:from-zinc-950 dark:via-zinc-900 dark:to-slate-950">

        {/* Ambient blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/6 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        {/* Premium form card */}
        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200/80 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 shadow-2xl shadow-black/8 dark:shadow-black/40 p-8 sm:p-10"
          >
            {/* Logo header */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <img src={"/images/logo.svg"} alt="YekBûn" className="h-9 w-9 group-hover:scale-105 transition-transform" />
                <span className="font-bold text-xl tracking-tight text-foreground">YekBûn</span>
              </Link>
              <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 dark:text-green-400 text-[11px] font-semibold">Ewle</span>
              </div>
            </div>

            <AnimatePresence mode="wait" custom={dir}>

              {/* ─── STEP 1: EMAIL ─────────────────────────────── */}
              {step === "email" && (
                <motion.div key="email" custom={dir} variants={SLIDE}
                  initial="initial" animate="animate" exit="exit"
                  transition={{ duration: 0.26, ease: "easeInOut" }}
                >
                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-7">
                    <div className="h-1.5 w-12 rounded-full bg-primary" />
                    <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-zinc-700" />
                    <span className="ml-auto text-xs text-muted-foreground font-medium">Gav 1/2</span>
                  </div>

                  {/* Headline */}
                  <div className="mb-7">
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                      Xweş hatî 👋
                    </h1>
                    <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">
                      Navnîşana e-nameya xwe binivîse da ku berdewam bikî.
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-5">
                    {/* Email field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" /> E-name
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          placeholder="tu@nimune.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                          autoFocus
                          className={cn(
                            "w-full pl-5 pr-5 rounded-2xl text-[15px] outline-none transition-all duration-200 border-2",
                            "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400",
                            "dark:bg-zinc-800 dark:border-zinc-600 dark:text-white dark:placeholder:text-zinc-500",
                            "focus:border-primary focus:ring-4 focus:ring-primary/12 focus:bg-white dark:focus:bg-zinc-800",
                          )}
                          style={{ height: "52px" }}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.015, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-2xl text-base font-bold text-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/25"
                      style={{
                        height: "52px",
                        background: "linear-gradient(135deg, #f5c518 0%, #e6a800 100%)",
                      }}
                    >
                      Berdewam Bike <ArrowRight className="h-4.5 w-4.5" />
                    </motion.button>
                  </form>

                </motion.div>
              )}

              {/* ─── STEP 2: OTP ───────────────────────────────── */}
              {step === "otp" && (
                <motion.div key="otp" custom={dir} variants={SLIDE}
                  initial="initial" animate="animate" exit="exit"
                  transition={{ duration: 0.26, ease: "easeInOut" }}
                >
                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-1.5 w-12 rounded-full bg-primary" />
                    <div className="h-1.5 w-12 rounded-full bg-primary" />
                    <span className="ml-auto text-xs text-muted-foreground font-medium">Gav 2/2</span>
                  </div>

                  {/* Back */}
                  <button
                    onClick={() => { setDir(-1); setStep("email"); setOtp(["","","","","",""]); }}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
                  >
                    <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    Vegere
                  </button>

                  {/* Icon + heading */}
                  <div className="flex items-start gap-4 mb-7">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-md shadow-primary/10">
                      <Shield className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-foreground tracking-tight leading-tight">
                        Koda Piştrastkirinê
                      </h1>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        Koda 6-jimare ji bo{" "}
                        <span className="font-semibold text-foreground">{maskedEmail || "e-nameya te"}</span>{" "}
                        şandiye.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleOtpSubmit} className="space-y-5">
                    {/* OTP card section */}
                    <div className="rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 p-5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 text-center">
                        Koda yekcar
                      </p>
                      <div className="flex gap-2 sm:gap-3 justify-between">
                        {otp.map((digit, i) => (
                          <OtpBox
                            key={i} index={i} value={digit}
                            inputRef={(el) => { inputRefs.current[i] = el; }}
                            onChange={(v) => handleOtpChange(i, v)}
                            onKeyDown={(e) => handleOtpKey(i, e)}
                            onPaste={i === 0 ? handlePaste : undefined}
                          />
                        ))}
                      </div>
                      {/* Fill indicator */}
                      <div className="mt-4 flex gap-1 justify-center">
                        {otp.map((d, i) => (
                          <motion.div
                            key={i}
                            className="h-1 rounded-full transition-all duration-300"
                            style={{ width: d ? 20 : 8, background: d ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={!otpFilled || loading}
                      whileHover={otpFilled && !loading ? { scale: 1.015, y: -1 } : {}}
                      whileTap={otpFilled && !loading ? { scale: 0.98 } : {}}
                      className={cn(
                        "w-full rounded-2xl text-base font-bold flex items-center justify-center gap-2 transition-all shadow-xl",
                        otpFilled && !loading && !success
                          ? "shadow-primary/25 text-black"
                          : "opacity-55 cursor-not-allowed shadow-none bg-primary text-primary-foreground"
                      )}
                      style={{
                        height: "52px",
                        background: (otpFilled && !loading && !success)
                          ? "linear-gradient(135deg, #f5c518 0%, #e6a800 100%)"
                          : undefined,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {success ? (
                          <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="flex items-center gap-2 text-white">
                            <CheckCircle2 className="h-5 w-5" /> Piştrast bû!
                          </motion.span>
                        ) : loading ? (
                          <motion.div key="spin"
                            className="h-5 w-5 border-2 border-current/30 border-t-current rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                          />
                        ) : (
                          <motion.span key="label" className="flex items-center gap-2">
                            Piştrast Bike û Berdewam Bike <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </form>

                  <div className="mt-5">
                    <ResendTimer onResend={() => { setOtp(["","","","","",""]); otpSend.mutate({ email: email.trim() }); }} />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

          {/* Trust tags below card */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6 mt-6"
          >
            {[
              { icon: Shield, label: "SSL Ewle" },
              { icon: Users, label: "500K+ Endam" },
              { icon: Globe, label: "50+ Welat" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary/60" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════ RIGHT: VISUAL PANEL */}
      <div className="hidden lg:flex flex-col w-[48%] xl:w-[46%] relative overflow-hidden h-screen">

        {/* ── Background: hero video (matches landing page) ── */}
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.60] pointer-events-none saturate-[0.45] scale-105">
          <source src={"/images/hero-bg.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/60 via-zinc-950/30 to-zinc-950/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/30 pointer-events-none" />
        {/* Glow orbs — same palette as hero */}
        <motion.div animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.55, 0.35] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[-8%] left-[5%] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)", filter: "blur(80px)" }} />
        <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.36, 0.22] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          className="absolute top-[25%] right-[-8%] w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(90px)" }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.20, 0.34, 0.20] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[8%] left-[25%] w-[240px] h-[240px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", filter: "blur(85px)" }} />

        {/* ── Flex content column (in document flow) ── */}
        <div className="flex-1 flex flex-col relative z-10 py-8 px-5">

          {/* LEVEL 3 — Top badge */}
          <div className="flex justify-center mb-6">
            <TopBadge />
          </div>

          {/* ── Ecosystem visual — floating cards + phone ── */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative" style={{ width: "min(460px, 100%)", height: "520px" }}>

              {/* Ambient gold glow */}
              <motion.div
                animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 70% 65% at 50% 50%, rgba(245,197,24,0.22) 0%, rgba(249,115,22,0.08) 55%, transparent 80%)", filter: "blur(40px)" }}
              />

              {/* Center: YekBûn logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{ opacity: { duration: 0.7, delay: 0.2 }, scale: { duration: 0.7, delay: 0.2 }, y: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.8 } }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10"
              >
                {/* Layered glow halos */}
                <div className="absolute rounded-full"
                  style={{ width: 220, height: 220, background: "radial-gradient(circle, rgba(245,197,24,0.28) 0%, rgba(249,115,22,0.12) 45%, transparent 75%)", filter: "blur(30px)" }} />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute rounded-full"
                  style={{ width: 140, height: 140, background: "radial-gradient(circle, rgba(245,197,24,0.35) 0%, transparent 70%)", filter: "blur(18px)" }}
                />
                {/* Logo mark */}
                <div className="relative flex flex-col items-center gap-4">
                  <div className="h-28 w-28 rounded-3xl flex items-center justify-center"
                    style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.18)", boxShadow: "0 0 40px rgba(245,197,24,0.2), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                    <img
                      src={"/images/logo.svg"}
                      alt="YekBûn"
                      className="h-20 w-20 drop-shadow-2xl"
                      style={{ filter: "drop-shadow(0 0 18px rgba(245,197,24,0.5))" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-xl tracking-wide" style={{ textShadow: "0 0 20px rgba(245,197,24,0.4)" }}>YekBûn</p>
                    <p className="text-white/35 text-xs mt-0.5">Platforma Kurdî ya Yekem</p>
                  </div>
                </div>
              </motion.div>

              {/* 12 o'clock — Social post (top center) */}
              <motion.div
                initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute z-30"
                style={{ top: "16px", left: "50%", transform: "translateX(-50%)" }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
                  className="flex items-center gap-2.5 bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-4 py-3"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)", minWidth: "200px" }}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <img src="https://i.pravatar.cc/40?img=12" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-white text-xs font-bold truncate">Miran R.</p>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 rounded px-1.5 py-0.5 font-semibold shrink-0">Ewle</span>
                    </div>
                    <p className="text-white/40 text-[10px] mt-0.5">Çiyayên me yên spehî 🏔️</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* 10 o'clock — Music player (top-left) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: -12 }} animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="absolute z-30"
                style={{ top: "108px", left: "0px" }}
              >
                <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 0.6 }}
                  className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl p-3.5"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.7)", width: "190px" }}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=80&q=80&fit=crop" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-bold truncate">Ey Reqîb</p>
                      <p className="text-white/45 text-[10px] truncate">Şivan Perwer</p>
                      <p className="text-primary text-[9px] font-semibold">Kurdish Folk</p>
                    </div>
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Play className="h-3 w-3 text-black fill-black" />
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-white/12 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-primary" animate={{ width: ["32%", "65%", "32%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-white/30 text-[9px]">1:32</span>
                    <span className="text-white/30 text-[9px]">4:32</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* 2 o'clock — Artist card (top-right) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -12 }} animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="absolute z-30"
                style={{ top: "108px", right: "0px" }}
              >
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.4 }}
                  className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl p-3.5"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.7)", width: "165px" }}
                >
                  <div className="h-11 w-11 rounded-xl overflow-hidden mb-2.5 mx-auto border border-white/10"
                    style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Sivan_Perwer.jpg/220px-Sivan_Perwer.jpg" alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white font-bold text-xs text-center">Şivan Perwer</p>
                  <p className="text-white/40 text-[10px] text-center mb-2">Dengbêj</p>
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-3 w-3 text-white/30" />
                    <span className="text-white/45 text-[10px]">2.4M şopîner</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* 6 o'clock — Notification (bottom center) */}
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="absolute z-30"
                style={{ bottom: "16px", left: "50%", transform: "translateX(-50%)" }}
              >
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.8 }}
                  className="flex items-center gap-3 bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-4 py-3"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.7)", minWidth: "200px" }}
                >
                  <div className="relative h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Bell className="h-4 w-4 text-primary" />
                    <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2.2 }}
                      className="absolute inset-0 rounded-full" style={{ background: "rgba(245,197,24,0.25)" }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs leading-tight">Trending Niha 🔥</p>
                    <p className="text-white/40 text-[10px] mt-0.5">Stranên Nû • 2min berê</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* 4 o'clock — Follower alert (bottom-right) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 14 }} animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="absolute z-30"
                style={{ bottom: "108px", right: "0px" }}
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.2 }}
                  className="flex items-center gap-2.5 bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-3.5 py-2.5"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.7)", minWidth: "178px" }}
                >
                  <div className="relative shrink-0">
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20">
                      <img src="https://i.pravatar.cc/40?img=47" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[11px] font-bold">Layla K. <span className="text-primary">+şopî</span></p>
                    <p className="text-white/35 text-[10px]">nû şopîner bû</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* 8 o'clock — ZerCash wallet (bottom-left) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 14 }} animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="absolute z-30"
                style={{ bottom: "108px", left: "0px" }}
              >
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut", delay: 0.3 }}
                  className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-3.5 py-3"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.7)", minWidth: "170px" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                      <img src={"/images/currency.svg"} alt="Zer" className="h-3.5 w-3.5" style={{ filter: "brightness(0)" }} />
                    </div>
                    <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wide">ZerCash</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img src={"/images/currency.svg"} alt="Zer" className="h-4 w-4" />
                    <p className="text-white font-black text-lg leading-none">248.50 Zer</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-emerald-400 text-[10px] font-semibold">▲ +12.4%</span>
                    <span className="text-white/25 text-[10px]">bu ay</span>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

          {/* LEVEL 3 — Bottom stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6"
          >
            <div className="rounded-2xl bg-white/7 backdrop-blur-2xl border border-white/12 px-4 py-3.5">
              <div className="flex items-center justify-around">
                <StatsBadge icon={Users}      value="500K+" label="Endam"  color="bg-blue-600/70" />
                <div className="h-6 w-px bg-white/12" />
                <StatsBadge icon={Store}      value="120+"  label="Bazar"  color="bg-emerald-600/70" />
                <div className="h-6 w-px bg-white/12" />
                <StatsBadge icon={Globe}      value="50+"   label="Welat"  color="bg-violet-600/70" />
                <div className="h-6 w-px bg-white/12" />
                <StatsBadge icon={Headphones} value="2M+"   label="Guhdar" color="bg-primary/80" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
