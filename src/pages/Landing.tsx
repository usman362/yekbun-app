import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Music, Video, ShoppingBag, 
  Coins, Sparkles, Globe, Download, Heart,
  Activity, Star, Zap, Users, Bell,
  TrendingUp, Eye,
  Play, MessageCircle, ThumbsUp, BadgeCheck, Headphones, Radio, Mic2,
  Check, UserPlus, Tv, Megaphone, Wallet, Mic, LayoutGrid,
  Utensils, ChevronRight, CalendarDays, PartyPopper, MapPin, Quote, Gift, Store
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { plans, zerPackages } from "@/data/mock"; // static product data — backend wiring deferred
import {
  usePartnerShops,
  useLandingArtists,
  useLandingMusic,
  useLandingPollsRich,
  useLandingFeedRich,
} from "@/hooks/use-landing";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Landing() {
  const [musicTab, setMusicTab] = useState<"trending" | "artists" | "songs">("trending");
  // Each hook returns the EXACT same shape as the original mock import — JSX unchanged.
  // Backend powers them when available; otherwise the polished mock data is returned so the
  // marketing landing never renders a blank slate.
  const partnerShops = usePartnerShops();
  const musicTracks = useLandingMusic();
  const artists = useLandingArtists();
  const polls = useLandingPollsRich();
  const feedPosts = useLandingFeedRich();

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />

      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">

        {/* ── Background video texture ── */}
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.60] pointer-events-none saturate-[0.45] scale-105">
          <source src={"/images/hero-bg.mp4"} type="video/mp4" />
        </video>

        {/* ── Cinematic gradient overlays — minimal, just edges ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/55 via-transparent to-zinc-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent pointer-events-none" />

        {/* ── Animated glow orbs ── */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.38, 0.55, 0.38] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.26, 0.40, 0.26] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(100px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.24, 0.38, 0.24] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", filter: "blur(90px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.20, 0.32, 0.20] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] left-[45%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)", filter: "blur(70px)" }}
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-8 md:pt-28 md:pb-10">
          <div className="grid lg:grid-cols-[46%_54%] gap-6 lg:gap-4 items-center">

            {/* ──────────────────────── LEFT: COPY */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Headline */}
              <h1 className="text-[56px] sm:text-[68px] lg:text-[76px] xl:text-[88px] font-black tracking-[-0.03em] mb-5 leading-[1.0] text-white">
                Çand Yekbike,<br/>
                <span style={{ background: "linear-gradient(135deg,#f5c518 0%,#f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Cîhan Bigihîne.
                </span>
              </h1>

              <p className="text-[17px] text-white/50 mb-10 leading-[1.7] max-w-[420px] font-light tracking-wide">
                Platforma Kurdî ya yekem — mûzîk, çand,<br className="hidden sm:block" /> civak û bazarên ortakî di yek cih de.
              </p>

              {/* Store buttons — clean minimal style */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex gap-3 mb-10"
              >
                {/* App Store */}
                <motion.a href="#"
                  onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-white text-zinc-900 rounded-xl px-5 py-3 hover:bg-white/90 transition-all duration-200 shadow-lg shadow-black/30 outline-none focus:outline-none"
                >
                  <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <p className="text-zinc-500 text-[9px] font-semibold uppercase tracking-widest leading-none">Download on the</p>
                    <p className="text-zinc-900 font-bold text-[14px] leading-snug">App Store</p>
                  </div>
                </motion.a>
                {/* Google Play */}
                <motion.a href="#"
                  onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-zinc-800 border border-white/10 text-white rounded-xl px-5 py-3 hover:bg-zinc-700 transition-all duration-200 shadow-lg shadow-black/30 outline-none focus:outline-none"
                >
                  <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.76c.28.15.6.19.93.1l12.19-7.02-2.62-2.62-10.5 9.54z" fill="#EA4335"/>
                    <path d="M21.54 10.27L18.8 8.7l-2.95 2.95 2.95 2.95 2.77-1.6c.79-.46.79-1.67-.03-2.13z" fill="#FBBC04"/>
                    <path d="M3.18.24C2.87.13 2.53.18 2.25.37L14.24 12.4l2.61-2.61L3.18.24z" fill="#4285F4"/>
                    <path d="M2.25.37C1.93.6 1.75 1 1.75 1.53v20.94c0 .53.18.93.5 1.16l.93.47L14.24 12.4 2.25.37z" fill="#34A853"/>
                  </svg>
                  <div>
                    <p className="text-white/40 text-[9px] font-semibold uppercase tracking-widest leading-none">Get it on</p>
                    <p className="text-white font-bold text-[14px] leading-snug">Google Play</p>
                  </div>
                </motion.a>
              </motion.div>

              {/* Social proof — avatars + stars + review count */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                {/* Stacked avatars */}
                <div className="flex items-center">
                  {[
                    "https://i.pravatar.cc/40?img=47",
                    "https://i.pravatar.cc/40?img=32",
                    "https://i.pravatar.cc/40?img=12",
                    "https://i.pravatar.cc/40?img=57",
                    "https://i.pravatar.cc/40?img=25",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full object-cover border-2 border-zinc-950 select-none"
                      style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: i }}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-white/10" />

                {/* Stars + score + count */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={s <= 4 ? "#f5c518" : "url(#half)"}>
                        <defs>
                          <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="90%" stopColor="#f5c518"/>
                            <stop offset="90%" stopColor="#f5c518" stopOpacity="0.25"/>
                          </linearGradient>
                        </defs>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="text-white font-bold text-sm ml-1">4.9</span>
                  </div>
                  <p className="text-white/35 text-xs tracking-wide">2,400+ nirxandin</p>
                </div>
              </motion.div>

            </motion.div>

            {/* ──────────────────────── RIGHT: ECOSYSTEM VISUAL */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative flex items-center justify-center lg:min-h-[640px]"
            >
              {/* Ambient glow layer */}
              <motion.div
                animate={{ opacity: [0.30, 0.60, 0.30], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(245,197,24,0.18) 0%, rgba(249,115,22,0.08) 55%, transparent 80%)", filter: "blur(60px)" }}
              />

              {/* ── Phone mockup — subtle outer glow atmosphere ── */}
              <div className="absolute inset-0 pointer-events-none z-[1]"
                style={{ background: "radial-gradient(ellipse 70% 65% at 55% 50%, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />

              {/* ── Fixed-size inner ecosystem container (720 × 600px) ── */}
              <div className="relative" style={{ width: "min(720px, 100%)", height: "600px" }}>

                {/* ─── PHONE MOCKUP — center focal element ─── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.2 },
                    scale: { duration: 0.8, delay: 0.2 },
                    y: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 },
                  }}
                  className="absolute z-20 pointer-events-none select-none inset-0 flex items-center justify-center"
                >
                  {/* Gold glow behind phone */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 90% 70% at 50% 55%, rgba(245,197,24,0.20) 0%, rgba(249,115,22,0.08) 55%, transparent 80%)", filter: "blur(30px)" }} />
                  <img
                    src={"/images/Black1.png"}
                    alt="YekBûn App"
                    className="relative w-full h-full"
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                      filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.80)) drop-shadow(0 0 30px rgba(245,197,24,0.15))",
                    }}
                  />
                </motion.div>

                {/* ─── ZER WALLET — top left, outside phone ─── */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: -16 }} animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ top: "30px", left: "-85px" }}
                >
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut", delay: 0.2 }}
                    className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-4 py-3.5 w-[152px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(245,197,24,0.10)" }}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="h-7 w-7 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg,#f5c518,#f97316)" }}>
                        <img src={"/images/currency.svg"} alt="Zer" className="h-4 w-4" style={{ filter: "brightness(0)" }} />
                      </div>
                      <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wide">Cêbika Zer</p>
                    </div>
                    <p className="text-white font-extrabold text-xl leading-none mb-1">5,230</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold" style={{ color: "#f5c518" }}>Zer</span>
                      <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-0.5">
                        <TrendingUp className="h-2.5 w-2.5" /> +8.2%
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ─── SOCIAL POST — top center-right, above phone ─── */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ top: "-14px", left: "calc(50% - 80px)" }}
                >
                  <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                    className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl p-3 w-[172px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-[10px] shrink-0">M</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-[11px] leading-tight">Miran R.</p>
                        <p className="text-white/35 text-[9px]">Rojava · 2s</p>
                      </div>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md shrink-0" style={{ background: "rgba(16,185,129,0.18)", color: "#10b981" }}>Ewle</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-white/35 text-[10px]"><Heart className="h-3 w-3 text-red-400 fill-red-400/60" /> 1.2K</span>
                      <span className="flex items-center gap-1 text-white/35 text-[10px]"><MessageCircle className="h-3 w-3 text-blue-400" /> 84</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ─── LIVE STREAM — top right, outside phone ─── */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -16 }} animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ top: "24px", right: "-38px" }}
                >
                  <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 7.2, ease: "easeInOut", delay: 1 }}
                    className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl overflow-hidden w-[148px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(239,68,68,0.12)" }}>
                    {/* Live thumbnail */}
                    <div className="relative h-[62px] bg-gradient-to-br from-red-900/60 to-zinc-800 flex items-center justify-center">
                      <Video className="h-6 w-6 text-white/25" />
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 rounded-full px-1.5 py-0.5">
                        <motion.span className="h-1.5 w-1.5 rounded-full bg-white"
                          animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                        <span className="text-white text-[8px] font-bold">LIVE</span>
                      </div>
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-white font-semibold text-[10px] leading-tight mb-1">Şeva Dengê Kurdî</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-white/40 text-[9px]">
                          <Eye className="h-2.5 w-2.5" /> 14.2K
                        </span>
                        <span className="flex items-center gap-1 text-white/40 text-[9px]">
                          <Heart className="h-2.5 w-2.5 text-red-400 fill-red-400/50" /> 3.1K
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ─── MUSIC PLAYER — left middle, outside phone ─── */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ top: "40%", left: "-85px" }}
                >
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl p-3.5 w-[152px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(245,197,24,0.08)" }}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-yellow-600 to-orange-700 flex items-center justify-center shrink-0">
                        <Music className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-[11px] truncate leading-snug">Ey Reqîb</p>
                        <p className="text-white/45 text-[9px] truncate">Şivan Perwer</p>
                        <p className="text-[9px] font-medium" style={{ color: "#f5c518" }}>Kurdish Folk</p>
                      </div>
                    </div>
                    <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-2">
                      <motion.div animate={{ width: ["30%", "72%", "30%"] }} transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
                        className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#f5c518,#f97316)" }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-[9px]">1:32</span>
                      <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="h-5 w-5 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#f5c518,#f97316)" }}>
                        <Play className="h-2.5 w-2.5 text-black fill-black" />
                      </motion.div>
                      <span className="text-white/30 text-[9px]">4:32</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ─── ARTIST CARD — right middle, outside phone ─── */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ top: "35%", right: "-38px" }}
                >
                  <motion.div animate={{ y: [0, -9, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl p-3.5 w-[136px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)" }}>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                          <Mic2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg,#f5c518,#f97316)" }}>
                          <BadgeCheck className="h-2.5 w-2.5 text-black" />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-bold text-[11px] leading-tight">Şivan Perwer</p>
                        <p className="text-white/40 text-[9px]">Dengbêj</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-2.5 w-2.5 text-primary/60" />
                        <span className="text-white/50 text-[9px] font-medium">2.4M şopîner</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ─── NEW FOLLOWER — bottom left, outside phone ─── */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 16 }} animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ bottom: "52px", left: "-85px" }}
                >
                  <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 0.4 }}
                    className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-3.5 py-3 w-[155px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(168,85,247,0.10)" }}>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">L</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-[10px] leading-tight">Layla K.</p>
                        <p className="text-white/40 text-[9px]">nû şopîner bû</p>
                      </div>
                      <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(168,85,247,0.20)" }}>
                        <UserPlus className="h-2.5 w-2.5 text-purple-400" />
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1">
                      <div className="flex -space-x-1">
                        {["bg-yellow-500","bg-blue-500","bg-pink-500"].map((c,i) => (
                          <div key={i} className={`h-3.5 w-3.5 rounded-full ${c} border border-zinc-900`} />
                        ))}
                      </div>
                      <span className="text-white/30 text-[9px]">+2,847 şopîner</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ─── NOTIFICATION — bottom center, below phone ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ bottom: "-14px", left: "calc(50% - 105px)" }}
                >
                  <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.8 }}
                    className="flex items-center gap-3 bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-4 py-2.5"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)" }}>
                    <div className="relative h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(245,197,24,0.15)" }}>
                      <Bell className="h-3.5 w-3.5 text-primary" />
                      <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: "rgba(245,197,24,0.25)" }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-[11px] leading-tight">Trending Niha 🔥</p>
                      <p className="text-white/40 text-[9px]">Stranên Nû • 2min berê</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ─── COMMUNITY POLL — bottom right, outside phone ─── */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 16 }} animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.55 }}
                  className="absolute z-30"
                  style={{ bottom: "46px", right: "-38px" }}
                >
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 6.4, ease: "easeInOut", delay: 1.2 }}
                    className="bg-zinc-900/95 backdrop-blur-2xl border border-white/8 rounded-2xl px-3.5 py-3 w-[150px]"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(59,130,246,0.10)" }}>
                    <p className="text-white/50 text-[9px] font-semibold uppercase tracking-widest mb-1.5">Dengdayîn</p>
                    <p className="text-white font-bold text-[11px] leading-snug mb-3">Straneya baştirîn a Kurdî?</p>
                    {[
                      { label: "Ey Reqîb", pct: 62, color: "#f5c518" },
                      { label: "Keleşîn", pct: 28, color: "#3b82f6" },
                    ].map((opt, i) => (
                      <div key={i} className="mb-1.5">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-white/60 text-[9px]">{opt.label}</span>
                          <span className="text-[9px] font-bold" style={{ color: opt.color }}>{opt.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} animate={{ width: `${opt.pct}%` }}
                            transition={{ duration: 1.2, delay: 0.7 + i * 0.1 }}
                            className="h-full rounded-full" style={{ background: opt.color }} />
                        </div>
                      </div>
                    ))}
                    <p className="text-white/25 text-[9px] mt-2">3,420 deng</p>
                  </motion.div>
                </motion.div>

              </div>{/* end inner ecosystem */}
            </motion.div>
          </div>

        </div>

        {/* ── Bottom shadow fade — blends hero into next section ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-[220px] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(9,9,11,0.60) 45%, rgba(9,9,11,0.92) 75%, rgb(9,9,11) 100%)" }} />

        {/* ── Bottom feature ticker ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden">
          <div className="border-t border-white/6 bg-background/70 backdrop-blur-sm py-3.5">
            <div className="flex items-center gap-0 animate-[ticker_28s_linear_infinite]" style={{ width: "max-content" }}>
              {[
                { icon: "♪", label: "Mûzîka Kurdî" },
                { icon: "◈", label: "ZerCash Rewards" },
                { icon: "◉", label: "Civaka Cîhanî" },
                { icon: "▣", label: "Bazarên Kurdî" },
                { icon: "♪", label: "Dengbêj & Stranbêj" },
                { icon: "◈", label: "Video HD" },
                { icon: "◉", label: "Çand Kurdî" },
                { icon: "▣", label: "500K+ Endam" },
                { icon: "♪", label: "Stranên Folk" },
                { icon: "◈", label: "Podcast Kurdî" },
                { icon: "◉", label: "Live Events" },
                { icon: "▣", label: "Fîlimên Kurdî" },
                { icon: "♪", label: "Mûzîka Kurdî" },
                { icon: "◈", label: "ZerCash Rewards" },
                { icon: "◉", label: "Civaka Cîhanî" },
                { icon: "▣", label: "Bazarên Kurdî" },
                { icon: "♪", label: "Dengbêj & Stranbêj" },
                { icon: "◈", label: "Video HD" },
                { icon: "◉", label: "Çand Kurdî" },
                { icon: "▣", label: "500K+ Endam" },
                { icon: "♪", label: "Stranên Folk" },
                { icon: "◈", label: "Podcast Kurdî" },
                { icon: "◉", label: "Live Events" },
                { icon: "▣", label: "Fîlimên Kurdî" },
              ].map(({ icon, label }, i) => (
                <span key={i} className="flex items-center gap-4 px-6 text-sm font-medium text-foreground/35 whitespace-nowrap">
                  <span className="text-primary/50 text-xs">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 1.6 CONTENT CARDS — Kurdish Culture, Music, Community ──────── */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary text-sm font-semibold">Platforma YekBûn</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Her Tişt Di <span className="text-gradient-primary">Yek Cih</span> de
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mûzîk, çand, xwarin, civak û bazarên Kurdî — hemû li yek platformê kom bûne.
            </p>
          </motion.div>

          {/* Card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {([
              {
                icon: Mic2,
                label: "Dengbêj & Hunermend",
                category: "Mûzîk",
                desc: "Şivan Perwer, Ahmet Kaya, Daxaz û hezaran hunermendên Kurdî yên navdar.",
                accent: "#f5c518",
                border: "hover:border-yellow-400/40",
                badge: "bg-yellow-500/80",
                img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: Music,
                label: "Mûzîka Kurdî",
                category: "Stranan",
                desc: "50,000+ stran — folk, pop, trap û dengbêjiya kevnar bi kalîteya HD.",
                accent: "#f97316",
                border: "hover:border-orange-400/40",
                badge: "bg-orange-500/80",
                img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: Utensils,
                label: "Xwarina Kurdî",
                category: "Çêj & Tam",
                desc: "Reçeteyên kevnar — dolmeyên Kurdî, kebab, paçe û şîraniyên cîhanê.",
                accent: "#ef4444",
                border: "hover:border-red-400/40",
                badge: "bg-red-500/80",
                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: Globe,
                label: "Çand & Dîrok",
                category: "Çand",
                desc: "Ji Newrozê heta Serjimêriyê — mîrasa dewlemend a Kurdistanê keşf bike.",
                accent: "#06b6d4",
                border: "hover:border-cyan-400/40",
                badge: "bg-cyan-600/80",
                img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1607802347849-e0224ff66e47?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: PartyPopper,
                label: "Newroz & Pîrozbahî",
                category: "Şahî",
                desc: "Şahiyên Newrozê, cejna Kurdistanê û bûyerên cîhanê bi hev re pîroz bike.",
                accent: "#ec4899",
                border: "hover:border-pink-400/40",
                badge: "bg-pink-500/80",
                img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: Activity,
                label: "Xwarina Civakî",
                category: "Civak",
                desc: "Kêf, bûyer û ronahiyên jiyana xwe bi civaka Kurdî ya cîhanê re parve bike.",
                accent: "#3b82f6",
                border: "hover:border-blue-400/40",
                badge: "bg-blue-500/80",
                img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1527615020922-3c670eed3407?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: ShoppingBag,
                label: "Bazarên Kurdî",
                category: "Bazar",
                desc: "Ji kincên kevneşopî heta teknolojiyê — karsaziyên Kurdî li yek derê.",
                accent: "#10b981",
                border: "hover:border-emerald-400/40",
                badge: "bg-emerald-600/80",
                img: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: Tv,
                label: "Vîdyo & TV",
                category: "Vîdyo",
                desc: "Kanalên Kurdî, bernameya kurdî, nûçe û bernameyên çandî.",
                accent: "#8b5cf6",
                border: "hover:border-violet-400/40",
                badge: "bg-violet-600/80",
                img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1715228892452-f6a2c4ff500d?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: Coins,
                label: "Cêbika Zer",
                category: "ZerCash",
                desc: "Her kirîn, heya %15 Zer vedigere. Bişkojka dravê Kurdistanê.",
                accent: "#f5c518",
                border: "hover:border-yellow-400/40",
                badge: "bg-yellow-500/80",
                img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1645469151759-f8be6933ac73?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: Headphones,
                label: "Podcast Kurdî",
                category: "Podcast",
                desc: "Gotarên zanyarî, çîroka dîrokê û nûçeyên rojane bi dengê Kurdî.",
                accent: "#a855f7",
                border: "hover:border-purple-400/40",
                badge: "bg-purple-600/80",
                img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: CalendarDays,
                label: "Bûyer & Rojên Taybet",
                category: "Bûyer",
                desc: "Dawetên Kurdî, şahiyên neteweyî û bîranînên dîrokî.",
                accent: "#14b8a6",
                border: "hover:border-teal-400/40",
                badge: "bg-teal-600/80",
                img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1603231320943-42ee5e9c049c?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
              {
                icon: BadgeCheck,
                label: "Kanalên Wergirtî",
                category: "Verified",
                desc: "Naveroka bijarte ji hunermendên, têkçûyên medya û saziyên Kurdî yên naskirî.",
                accent: "#06b6d4",
                border: "hover:border-sky-400/40",
                badge: "bg-sky-600/80",
                img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=700&q=85&fit=crop",
                fallback: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=700&q=85&fit=crop",
                href: "/dashboard",
              },
            ] as const).map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                whileHover={{ y: -8 }}
                className="cursor-pointer"
              >
                <Link to={cat.href} className="block outline-none focus-visible:outline-none">
                  <div className={cn(
                    "group h-full rounded-2xl overflow-hidden border border-white/8 bg-zinc-900",
                    "shadow-sm hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/50",
                    "transition-all duration-300",
                    cat.border
                  )}>
                    {/* Image zone */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={cat.img}
                        alt={cat.label}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = cat.fallback; }}
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                      />
                      {/* Gradient overlay — readable bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {/* Category badge — top left */}
                      <div className={cn(
                        "absolute top-3 left-3 flex items-center gap-1.5 backdrop-blur-md rounded-full px-2.5 py-1",
                        cat.badge
                      )}>
                        <cat.icon className="h-3 w-3 text-white" />
                        <span className="text-white text-[10px] font-bold tracking-wide uppercase">{cat.category}</span>
                      </div>
                      {/* Hover arrow — top right */}
                      <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                        <ChevronRight className="h-3.5 w-3.5 text-white" />
                      </div>
                      {/* Title overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-3.5 pb-3">
                        <p className="text-white font-bold text-sm leading-snug">{cat.label}</p>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="p-4">
                      <p className="text-slate-500 dark:text-white/50 text-[13px] leading-relaxed mb-3">{cat.desc}</p>
                      <div className="flex items-center gap-1 font-semibold text-sm transition-all duration-200"
                        style={{ color: cat.accent }}>
                        Bêje Zêdetir
                        <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURES GRID ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-4 bg-primary/20 text-primary border-transparent text-sm py-1.5 px-4">
              <Sparkles className="h-3.5 w-3.5 mr-2" /> Her Tişt Li Yek Derê
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Ji bo Kurdên Seranserê Cîhanê</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              YekBûn platforma yekem e ku Kurdên cîhanê bi mûzîk, civak û çand ve girê dide.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Activity, title: "Xwarina Civakî",
                desc: "Kêf û bûyerên xwe bi civaka Kurdî ya cîhanê parve bike.",
                color: "text-blue-400", bg: "bg-blue-500/15",
                img: "https://images.unsplash.com/photo-1627987469780-fc77d8c9a586?w=700&q=80&fit=crop",
              },
              {
                icon: Music, title: "Mûzîka Kurdî",
                desc: "Hezaran stranên Kurdî bêyî reklam û bi kalîteya bilind bibihîze.",
                color: "text-primary", bg: "bg-primary/15",
                img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=700&q=80&fit=crop",
              },
              {
                icon: Coins, title: "Cêbika Zer",
                desc: "Zerên xwe ji bo planan, mûzîkê û bazaran bikar bîne.",
                color: "text-amber-400", bg: "bg-amber-500/15",
                img: "https://images.unsplash.com/photo-1645469151759-f8be6933ac73?w=700&q=80&fit=crop",
              },
              {
                icon: Video, title: "Kanalên Vîdyoyê",
                desc: "Çand, nûçe û bernameyên Kurdî temaşe bike.",
                color: "text-purple-400", bg: "bg-purple-500/15",
                img: "https://images.unsplash.com/photo-1715228892452-f6a2c4ff500d?w=700&q=80&fit=crop",
              },
              {
                icon: ShoppingBag, title: "Bazarên Hevkar",
                desc: "Heya 15% ZerCash ji bazarên Kurdî yên bijare bistîne.",
                color: "text-green-400", bg: "bg-green-500/15",
                img: "https://images.unsplash.com/photo-1756361946154-f0ef47a6da45?w=700&q=80&fit=crop",
              },
              {
                icon: Globe, title: "Navenda Çandê",
                desc: "Dîrok, kevneşopî û çîrokên herêmên Kurdistanê keşf bike.",
                color: "text-cyan-400", bg: "bg-cyan-500/15",
                img: "https://images.unsplash.com/photo-1607802347849-e0224ff66e47?w=700&q=80&fit=crop",
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 bg-zinc-900/80 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group h-full flex flex-col">
                  {/* Image section */}
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <img
                      src={feat.img}
                      alt={feat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Icon badge floating at bottom-left of image */}
                    <div className={cn("absolute bottom-3 left-4 h-10 w-10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm", feat.bg)}>
                      <feat.icon className={cn("h-5 w-5", feat.color)} />
                    </div>
                  </div>
                  {/* Text section */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-base mb-1.5">{feat.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{feat.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. SOCIAL FEEDS ──────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="mb-10">
            <Badge className="mb-3 bg-primary/20 text-primary border-transparent">
              <Activity className="h-3.5 w-3.5 mr-1.5" /> Xwarina Civakî
            </Badge>
            <h2 className="text-4xl font-bold">Ji Civakê — Rasterast</h2>
          </div>

          {/* Full-bleed portrait cards — app-style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {feedPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5, ease: "easeOut" }}
                className="relative rounded-[1.5rem] overflow-hidden cursor-pointer group shadow-xl shadow-black/30"
                style={{ aspectRatio: "9/16" }}
              >
                {/* Full-bleed background photo */}
                <img
                  src={post.image!}
                  alt={post.content}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Top gradient — for header readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent pointer-events-none" />
                {/* Bottom gradient — for caption readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                {/* ── Top-left: user row (no pill — flat overlay) */}
                <div className="absolute top-4 left-4 flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-white/30"
                    />
                  </div>
                  <div className="leading-tight">
                    <div className="flex items-center gap-1">
                      <span className="text-white text-sm font-bold leading-none drop-shadow">{post.user.name}</span>
                      {post.user.verified && (
                        <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-white/60 text-[11px] mt-0.5 leading-none">{post.location}</p>
                  </div>
                </div>

                {/* ── Right side: vertical action stack */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
                  {[
                    { Icon: () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, count: post.views },
                    { Icon: () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2"><path d="M11 4H4a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2v-3"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, count: post.likes > 999 ? `${(post.likes/1000).toFixed(1)}k` : post.likes },
                    { Icon: () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, count: post.comments },
                    { Icon: () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>, count: post.reactions },
                  ].map((action, j) => (
                    <div key={j} className="flex flex-col items-center gap-0.5">
                      <button className="h-8 w-8 rounded-full bg-black/35 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 shadow-md">
                        <action.Icon />
                      </button>
                      <span className="text-white text-[10px] font-semibold leading-none">{action.count}</span>
                    </div>
                  ))}
                </div>

                {/* ── Bottom: caption + time */}
                <div className="absolute bottom-0 left-0 right-12 p-4">
                  <p className="text-white text-xs font-medium leading-snug line-clamp-2 drop-shadow">{post.content}</p>
                  <p className="text-white/45 text-[10px] mt-1.5 leading-none">{post.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. POLLS / SURVEYS ───────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(245,197,24,0.07) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="mb-10">
            <Badge className="mb-3 bg-primary/20 text-primary border-transparent">
              <Zap className="h-3.5 w-3.5 mr-1.5" /> Komarên Civakî
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">Dengê Xwe Bide</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {polls.map((poll, i) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -4 }}
              >
                <div className="rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 bg-zinc-900 transition-all duration-300 group cursor-pointer shadow-xl shadow-black/40 hover:shadow-primary/10">

                  {/* Cover image — full-bleed with overlay */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={poll.cover}
                      alt={poll.question}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/30 to-transparent" />

                    {/* ACTIVE badge */}
                    {poll.active && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-emerald-900/40">
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-white"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1.4 }}
                        />
                        ACTIVE
                      </div>
                    )}

                    {/* Participant count — bottom left */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-xs font-semibold">
                      <Users className="h-3.5 w-3.5" />
                      {poll.participants.toLocaleString()}
                    </div>
                  </div>

                  {/* Card body — dark, no gray */}
                  <div className="p-4">
                    <h3 className="font-bold text-[15px] text-white mb-4 leading-snug">{poll.question}</h3>

                    {/* Leading option + animated progress bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">🏅</span>
                          <span className="text-sm font-bold text-white">{poll.leading.option}</span>
                        </div>
                        <span className="text-sm font-extrabold text-primary">{poll.leading.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${poll.leading.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.09 + 0.3, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #f5c518, #f97316)" }}
                        />
                      </div>
                    </div>

                    {/* Option chips — gold-tinted, no gray */}
                    <div className="flex flex-wrap gap-1.5">
                      {poll.options.map((opt, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                          style={{
                            background: j === 0 ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.05)",
                            borderColor: j === 0 ? "rgba(245,197,24,0.3)" : "rgba(255,255,255,0.08)",
                            color: j === 0 ? "#f5c518" : "rgba(255,255,255,0.5)",
                          }}
                        >
                          {opt.label} <span className="opacity-70">{opt.votes.toLocaleString()}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. MUSIC — UNIFIED TABBED SECTION ──────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute left-0 bottom-0 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(100px)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-transparent">
              <Headphones className="h-3.5 w-3.5 mr-1.5" /> Hunermendên Kurd
            </Badge>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">Stranên Kurdî</h2>
                <p className="text-muted-foreground mt-2 text-base">Muzîk, dengbêj û stranên herî populer ên Kurdistanê</p>
              </div>

              {/* ── Pill Tabs ── */}
              <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-foreground/5 border border-foreground/10 shrink-0">
                {(["trending", "artists", "songs"] as const).map((tab) => {
                  const labels = { trending: "Trending", artists: "Hunermend", songs: "Stran" };
                  const icons = { trending: TrendingUp, artists: Mic2, songs: Music };
                  const Icon = icons[tab];
                  const isActive = musicTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setMusicTab(tab)}
                      className={cn(
                        "relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-250",
                        isActive ? "text-black" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="music-tab-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      <Icon className="h-3.5 w-3.5 relative z-10" />
                      <span className="relative z-10">{labels[tab]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── Tab Content ── */}
          <AnimatePresence mode="wait">

            {/* ── TRENDING tab ── mix of songs + artists */}
            {musicTab === "trending" && (
              <motion.div
                key="trending"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* First 4 tracks — 1 clean row */}
                  {musicTracks.slice(0, 4).map((track, i) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div className="rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 bg-zinc-900 shadow-xl shadow-black/40 h-full">
                        <div className="relative aspect-square overflow-hidden">
                          <img src={track.cover} alt={track.title}
                            className="w-full h-full object-cover object-top group-hover:scale-107 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="h-14 w-14 rounded-full flex items-center justify-center shadow-2xl"
                              style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                              <Play className="h-6 w-6 text-black fill-black ml-1" />
                            </div>
                          </div>
                          {track.trending && (
                            <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full text-black"
                              style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                              <TrendingUp className="h-3 w-3" /> Trending
                            </div>
                          )}
                          <div className="absolute bottom-3 right-3 text-xs text-white/75 font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {track.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="font-bold text-base text-white truncate">{track.title}</h4>
                              <p className="text-sm text-white/50 truncate">{track.artist}</p>
                            </div>
                            <button className="text-white/30 hover:text-primary transition-colors shrink-0 mt-0.5">
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
                            <span className="text-[11px] text-white/40 border border-white/10 rounded-full px-2.5 py-0.5">
                              {track.genre}
                            </span>
                            <span className="text-xs text-white/40 flex items-center gap-1">
                              <Radio className="h-3 w-3" /> {track.plays}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── ARTISTS tab ── */}
            {musicTab === "artists" && (
              <motion.div
                key="artists"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {artists.map((artist, i) => (
                    <motion.div
                      key={artist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div className={cn(
                        "rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 cursor-pointer bg-zinc-900 shadow-xl shadow-black/40",
                        artist.featured && "ring-1 ring-primary/30"
                      )}>
                        <div className="relative h-64 overflow-hidden">
                          <img src={artist.image} alt={artist.name}
                            className="w-full h-full object-cover object-top group-hover:scale-107 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/30 to-transparent" />
                          {artist.featured && (
                            <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full text-black"
                              style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                              <Star className="h-3 w-3 fill-black" /> Taybet
                            </div>
                          )}
                          <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full text-black shadow-lg"
                              style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                              Bişopîne
                            </span>
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-bold text-white text-lg truncate">{artist.name}</h3>
                              {artist.verified && <BadgeCheck className="h-5 w-5 text-primary shrink-0" />}
                            </div>
                            <p className="text-white/55 text-sm">{artist.genre}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-lg font-bold text-white">{artist.followers}</p>
                              <p className="text-xs text-white/40">Şopîner</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-lg font-bold text-white">{artist.tracks}</p>
                              <p className="text-xs text-white/40">Stran</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SONGS tab ── */}
            {musicTab === "songs" && (
              <motion.div
                key="songs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {musicTracks.map((track, i) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div className="rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 bg-zinc-900 shadow-xl shadow-black/40">
                        <div className="relative aspect-square overflow-hidden">
                          <img src={track.cover} alt={track.title}
                            className="w-full h-full object-cover object-top group-hover:scale-107 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="h-14 w-14 rounded-full flex items-center justify-center shadow-2xl"
                              style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                              <Play className="h-6 w-6 text-black fill-black ml-1" />
                            </div>
                          </div>
                          {track.trending && (
                            <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full text-black"
                              style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                              <TrendingUp className="h-3 w-3" /> Germ
                            </div>
                          )}
                          <div className="absolute bottom-3 right-3 text-xs text-white/75 font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {track.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="min-w-0">
                              <h4 className="font-bold text-base text-white truncate">{track.title}</h4>
                              <p className="text-sm text-white/50 truncate">{track.artist}</p>
                            </div>
                            <button className="text-white/30 hover:text-primary transition-colors shrink-0 mt-0.5">
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
                            <span className="text-[11px] text-white/40 border border-white/10 rounded-full px-2.5 py-0.5">{track.genre}</span>
                            <span className="text-xs text-white/40 flex items-center gap-1">
                              <Radio className="h-3 w-3" /> {track.plays}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ─── 5.5 FOOD & LIFESTYLE ────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-orange-500/6 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <Badge className="mb-3 bg-orange-500/20 text-orange-400 border-transparent">
                <Utensils className="h-3.5 w-3.5 mr-1.5" /> Xwarina Kurdî
              </Badge>
              <h2 className="text-4xl font-bold mb-3">Tam û Têr — Çêja Kurdistanê</h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Xwarinên kevneşopî yên Kurdistanê keşf bike û ji bazarên herêmî sipariş bide.
              </p>
            </div>
            <Link to="/dashboard/partner-shops">
              <Button variant="ghost" className="group shrink-0">
                Hemû Xwarin <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Dolma", region: "Silêmanî", category: "Xwarina Sereke", rating: 4.9, img: "https://images.unsplash.com/photo-1756361946964-f835b200d5d2?w=700&q=80&fit=crop", shop: "Mêrgê Restaurant", cashback: 8 },
              { name: "Kebabê Kurdî", region: "Hewlêr", category: "Grill", rating: 4.8, img: "https://images.unsplash.com/photo-1630492094331-acce817be26a?w=700&q=80&fit=crop", shop: "Xanî Kebab", cashback: 10 },
              { name: "Biryanî", region: "Silêmanî", category: "Xwarina Taybet", rating: 4.9, img: "https://images.unsplash.com/photo-1756361946154-f0ef47a6da45?w=700&q=80&fit=crop", shop: "Baxçê Biryani", cashback: 7 },
              { name: "Şêranî & Paklawa", region: "Duhok", category: "Şîrînahî", rating: 4.7, img: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=700&q=80&fit=crop", shop: "Dûkan Şêranî", cashback: 5 },
              { name: "Çorba Lincan", region: "Çolemêrg", category: "Şorbayê", rating: 4.6, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&q=80&fit=crop", shop: "Mala Dêrinê", cashback: 6 },
              { name: "Kibbeh", region: "Bakur", category: "Meze", rating: 4.8, img: "https://images.unsplash.com/photo-1758573644102-5d19eda25f62?w=700&q=80&fit=crop", shop: "Qesra Rojava", cashback: 9 },
            ].map((food, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 border-white/10 hover:border-orange-500/30 bg-zinc-900/80 shadow-sm">
                  <div className="h-48 relative overflow-hidden">
                    <img src={food.img} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-orange-500/80 text-white border-transparent text-xs backdrop-blur-sm shadow-md">
                      {food.category}
                    </Badge>
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm shadow">
                      +{food.cashback}% Zerkash
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
                      <Star className="h-3 w-3 text-amber-400 fill-current" />
                      <span className="text-xs text-white font-semibold">{food.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-0.5">{food.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{food.shop} · {food.region}</p>
                    <Button variant="outline" size="sm" className="w-full border-white/10 hover:border-orange-500/50 hover:text-orange-400 text-sm">
                      Sipariş Bide
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5.7 CULTURE, GREETINGS & COMMUNITY ─────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)", filter: "blur(100px)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="mb-10">
            <Badge className="mb-3 bg-green-500/20 text-green-400 border-transparent">
              <Globe className="h-3.5 w-3.5 mr-1.5" /> Çand û Civak
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">Jiyan û Bûyer — Bi Hev Re</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                tag: "🌸 Newroz 2026", type: "Pîrozbahî", title: "Newrozê Pîroz Be!",
                desc: "Sala nû ya Kurdî bi xweşî û bêhna biharê were.",
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Newroz_Kurdistan.jpg/500px-Newroz_Kurdistan.jpg",
                accent: "#22c55e",
              },
              {
                tag: "🏔️ Mîras", type: "Çand & Dîrok", title: "Çiyayên Zagrosa",
                desc: "Dîroka çiyayên Kurdistanê û çanda gelê me keşf bike.",
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Zagros_1992.jpg/500px-Zagros_1992.jpg",
                accent: "#f59e0b",
              },
              {
                tag: "🎵 Konsêr", type: "Bûyer", title: "Şeva Dengê Kurdî",
                desc: "Şivan Perwer — Konsêra mezin li Berlînê û Stenbolê.",
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Newroz_Istanbul%284%29.jpg/500px-Newroz_Istanbul%284%29.jpg",
                accent: "#a855f7",
              },
              {
                tag: "💛 21ê Adarê", type: "Roja Neteweyî", title: "Roja Kurdistanê",
                desc: "Bi hev re bibînin û bi hev re pîroz bikin.",
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Iranian_Kurds_celebrating_Nowruz.jpg/500px-Iranian_Kurds_celebrating_Nowruz.jpg",
                accent: "#f5c518",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group h-full flex flex-col bg-zinc-900 shadow-xl shadow-black/40"
                  style={{ "--accent": item.accent } as React.CSSProperties}>
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/15 text-white bg-black/50">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: item.accent }}>{item.type}</p>
                    <h3 className="font-bold text-base text-white mb-2 leading-snug">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed flex-1">{item.desc}</p>
                    <button className="mt-4 flex items-center gap-1 text-xs font-semibold transition-colors" style={{ color: item.accent }}>
                      Bêje Zêdetir <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 6. PARTNER SHOPS ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)", filter: "blur(100px)" }} />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,197,24,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <Badge className="mb-3 bg-primary/20 text-primary border-transparent">
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5" /> Bazarên Hevkar
              </Badge>
              <h2 className="text-4xl font-bold text-foreground">Bikire — Zerkash Bistîne</h2>
            </div>
            <Link to="/dashboard/partner-shops" className="hidden sm:block">
              <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group">
                Hemû Bazar <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerShops.slice(0, 4).map((shop, i) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <div className="rounded-3xl overflow-hidden bg-zinc-900 border border-white/8 hover:border-primary/35 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">

                  {/* ── Cover image ── */}
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                      src={shop.image} alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/30 to-transparent" />

                    {/* Category badge — top left */}
                    <div className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm text-white border border-white/15">
                      {shop.category}
                    </div>

                    {/* OPEN / CLOSED badge — top right */}
                    <div className={cn(
                      "absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border",
                      shop.isOpen
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-red-500/20 text-red-300 border-red-500/30"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", shop.isOpen ? "bg-emerald-400" : "bg-red-400")} />
                      {shop.isOpen ? "Vekirî" : "Girtî"}
                    </div>

                    {/* Cashback badge — bottom left */}
                    <div className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-black shadow-lg"
                      style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                      {shop.cashback}% ZerCash
                    </div>

                    {/* Shop avatar — bottom right, inside image */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <div className="h-9 w-9 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-black text-black shadow-lg backdrop-blur-sm"
                        style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                        {shop.initials}
                      </div>
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="p-4 flex flex-col flex-1">

                    {/* Shop name + location */}
                    <div className="mb-3">
                      <h3 className="font-bold text-white text-base leading-tight truncate">{shop.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5 text-white/45 text-xs">
                        <MapPin className="h-3 w-3" /> {shop.region}
                      </div>
                    </div>

                    {/* Social proof row */}
                    <div className="flex items-center gap-3 text-xs mb-3">
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="h-3 w-3 fill-amber-400" /> {shop.rating}
                      </div>
                      <div className="w-px h-3 bg-white/15" />
                      <div className="flex items-center gap-1 text-white/50">
                        <Users className="h-3 w-3" /> {shop.followers}
                      </div>
                      <div className="w-px h-3 bg-white/15" />
                      <div className="flex items-center gap-1 text-white/50">
                        <ShoppingBag className="h-3 w-3" /> {shop.orders}
                      </div>
                    </div>

                    {/* Review preview */}
                    <div className="rounded-xl bg-white/[0.04] border border-white/8 px-3 py-2 mb-4 flex items-start gap-2">
                      <Quote className="h-3 w-3 text-primary/60 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-white/55 leading-snug line-clamp-2">{shop.review}</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
                        style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}
                      >
                        Biçe Bazarê
                      </button>
                      <button className="h-9 w-9 rounded-xl flex items-center justify-center border border-white/12 hover:border-primary/40 text-white/40 hover:text-primary transition-all duration-200 shrink-0">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. ZER ECONOMY — BUBBLE ECOSYSTEM ────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-background">

        {/* ── Deep section background glows ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 60% at 28% 50%, rgba(245,197,24,0.09) 0%, transparent 65%)" }} />
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)", filter: "blur(120px)" }} />
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)", filter: "blur(100px)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center">

            {/* ══ LEFT: ZER BUBBLE ECOSYSTEM ══════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="order-2 lg:order-1 flex items-center justify-center"
            >
              {/* Stage: 600px square, scales responsively */}
              <div className="relative w-full max-w-[600px] aspect-square select-none">

                {/* ── Layered background glow behind central bubble ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(245,197,24,0.22) 0%, rgba(249,115,22,0.10) 40%, transparent 70%)", filter: "blur(32px)" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 65%)", filter: "blur(60px)" }} />

                {/* ── SVG: orbit rings + connection lines ── */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" fill="none">
                  {/* Inner ring */}
                  <circle cx="300" cy="300" r="100" stroke="rgba(245,197,24,0.08)" strokeWidth="1" strokeDasharray="3 8" />
                  {/* Outer orbit ring */}
                  <circle cx="300" cy="300" r="210" stroke="rgba(245,197,24,0.07)" strokeWidth="1" strokeDasharray="5 12" />
                  {/* Outermost ring */}
                  <circle cx="300" cy="300" r="270" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 16" />

                  {/* Connection lines — each with its own color */}
                  {[
                    { x2: 510, y2: 300, stroke: "rgba(245,197,24,0.30)" },   /* Bazar — gold */
                    { x2: 448, y2: 152, stroke: "rgba(236,72,153,0.28)" },   /* Diyarî — pink */
                    { x2: 300, y2:  90, stroke: "rgba(59,130,246,0.28)" },   /* Mûzîk — blue */
                    { x2: 152, y2: 152, stroke: "rgba(249,115,22,0.28)" },   /* Like — orange */
                    { x2:  90, y2: 300, stroke: "rgba(34,197,94,0.28)"  },   /* Stream — green */
                    { x2: 152, y2: 448, stroke: "rgba(251,191,36,0.28)" },   /* Cashback — amber */
                    { x2: 300, y2: 510, stroke: "rgba(251,146,60,0.28)" },   /* Xwarin — warm */
                    { x2: 448, y2: 448, stroke: "rgba(168,85,247,0.28)" },   /* Playlist — purple */
                  ].map(({ x2, y2, stroke }, i) => (
                    <motion.line key={i}
                      x1={300} y1={300} x2={x2} y2={y2}
                      stroke={stroke}
                      strokeWidth="1.5"
                      strokeDasharray="6 9"
                      animate={{ opacity: [0.4, 1, 0.4], strokeDashoffset: [0, -30] }}
                      transition={{ repeat: Infinity, duration: 3.5 + i * 0.3, delay: i * 0.35, ease: "linear" }}
                    />
                  ))}

                  {/* Center glow dots on the lines (small circles where line meets center) */}
                  <circle cx="300" cy="300" r="4" fill="rgba(245,197,24,0.5)" />
                </svg>

                {/* ── Central Zer Wallet Bubble ── */}
                <motion.div
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[148px] h-[148px] rounded-full flex flex-col items-center justify-center z-20 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #fde047 0%, #f5c518 35%, #f97316 100%)",
                    boxShadow: "0 0 60px rgba(245,197,24,0.65), 0 0 120px rgba(245,197,24,0.25), 0 0 200px rgba(249,115,22,0.12), inset 0 2px 0 rgba(255,255,255,0.35)",
                  }}
                >
                  {/* Inner highlight ring */}
                  <div className="absolute inset-[6px] rounded-full border border-white/25 pointer-events-none" />
                  <img src={"/images/currency.svg"} alt="Zer" className="h-10 w-10 mb-1 drop-shadow-sm" style={{ filter: "brightness(0)" }} />
                  <p className="text-black font-black text-[15px] leading-none tracking-tight">Zer</p>
                  <p className="text-black/60 text-[11px] mt-0.5 font-bold">5,230</p>
                </motion.div>

                {/* ── 8 Orbiting use-case bubbles ── */}
                {([
                  { icon: Store,      label: "Bazar",    tooltip: "Bi Zer bikirine",   color: "#f5c518", bg: "rgba(245,197,24,0.14)", border: "rgba(245,197,24,0.45)",  x: "85%",   y: "50%",   floatY: -10, dur: 5.4, delay: 0   },
                  { icon: Gift,       label: "Diyarî",   tooltip: "Diyarî bişîne",      color: "#ec4899", bg: "rgba(236,72,153,0.14)", border: "rgba(236,72,153,0.45)",  x: "74.7%", y: "25.3%", floatY: 9,   dur: 6.1, delay: 0.5 },
                  { icon: Music,      label: "Mûzîk",    tooltip: "Mûzîkê vekin",       color: "#3b82f6", bg: "rgba(59,130,246,0.14)", border: "rgba(59,130,246,0.45)",  x: "50%",   y: "15%",   floatY: -9,  dur: 5.8, delay: 1   },
                  { icon: Heart,      label: "Like",     tooltip: "Piştgirî bike",      color: "#f97316", bg: "rgba(249,115,22,0.14)", border: "rgba(249,115,22,0.45)",  x: "25.3%", y: "25.3%", floatY: 10,  dur: 6.5, delay: 1.5 },
                  { icon: Radio,      label: "Stream",   tooltip: "Radyo û streaming",  color: "#22c55e", bg: "rgba(34,197,94,0.14)",  border: "rgba(34,197,94,0.45)",   x: "15%",   y: "50%",   floatY: -8,  dur: 5.2, delay: 2   },
                  { icon: Coins,      label: "Cashback", tooltip: "ZerCash bistîne",    color: "#fbbf24", bg: "rgba(251,191,36,0.14)", border: "rgba(251,191,36,0.45)",  x: "25.3%", y: "74.7%", floatY: 9,   dur: 6.8, delay: 2.5 },
                  { icon: Utensils,   label: "Xwarin",   tooltip: "Xwarin ferman bike", color: "#fb923c", bg: "rgba(251,146,60,0.14)", border: "rgba(251,146,60,0.45)",  x: "50%",   y: "85%",   floatY: -10, dur: 5.5, delay: 3   },
                  { icon: Headphones, label: "Playlist", tooltip: "Playlist ava bike",  color: "#a855f7", bg: "rgba(168,85,247,0.14)", border: "rgba(168,85,247,0.45)",  x: "74.7%", y: "74.7%", floatY: 8,   dur: 6.3, delay: 3.5 },
                ] as const).map(({ icon: Icon, label, tooltip, color, bg, border, x, y, floatY, dur, delay }, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, floatY, 0] }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                    transition={{
                      opacity: { duration: 0.3, delay: i * 0.07 },
                      scale:   { duration: 0.35, delay: i * 0.07, type: "spring", stiffness: 180 },
                      y:       { repeat: Infinity, duration: dur, ease: "easeInOut", delay: delay * 0.4 },
                    }}
                    className="absolute flex flex-col items-center gap-2 cursor-pointer group z-10"
                    style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 border border-white/10 text-white/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                      {tooltip}
                    </div>

                    {/* Bubble */}
                    <div
                      className="w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: bg,
                        border: `2px solid ${border}`,
                        boxShadow: `0 0 0 0 ${color}33`,
                      }}
                    >
                      {/* Inner glow ring on hover */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `0 0 24px ${color}60, 0 0 48px ${color}30, inset 0 0 16px ${color}20` }} />
                      <Icon className="h-7 w-7 relative z-10" style={{ color }} />
                    </div>

                    <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{label}</span>
                  </motion.div>
                ))}

              </div>
            </motion.div>

            {/* ══ RIGHT: CONTENT ══════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <Badge className="mb-6 bg-primary/15 text-primary border-primary/20 py-1.5 px-4 text-sm">
                <img src={"/images/currency.svg"} alt="Zer" className="h-3.5 w-3.5 mr-1.5" /> Zer Economy
              </Badge>

              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-foreground">
                Zer di Jiyana<br />
                <span style={{ background: "linear-gradient(135deg, #f5c518, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Te de
                </span>
              </h2>

              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md">
                Zer bikar bîne ji bo xwarin, kêf, mûzîk, cil û bazaran. Her kirînek ZerCash wekî xelat tîne — li çi derê, di her demê de.
              </p>

              <ul className="space-y-6 mb-12">
                {[
                  { icon: ShoppingBag, title: "Bazarên Partner",  desc: "Li 200+ dikananên hevkar bi Zer bide.",      color: "#f5c518", bg: "rgba(245,197,24,0.12)" },
                  { icon: Headphones,  title: "Mûzîka Premium",   desc: "Stranên bê reklam û kanalên taybetî veke.",  color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
                  { icon: Zap,         title: "Xelatên ZerCash",  desc: "Heya 15% cashback ji her kirînekê bistîne.", color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
                ].map((ft, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-105"
                      style={{ background: ft.bg }}>
                      <ft.icon className="h-6 w-6" style={{ color: ft.color }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{ft.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ft.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <Link to="/charge-zer">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-2.5 px-10 py-4 rounded-2xl text-base font-bold text-black shadow-2xl shadow-primary/30 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #f5c518 0%, #e6a800 60%, #f97316 100%)" }}
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity rounded-2xl" />
                  <Coins className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Zer Bikar bîne</span>
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 8. CHARGE ZER ────────────────────────────────────────────────── */}
      <section id="charge-zer" className="py-28 relative overflow-hidden bg-background scroll-mt-24">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-transparent">Cêbika Zer</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Charge Zer</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Zerê xwe dagirtî bike û taybetmendiyên premium yên YekBûn veke.
            </p>
          </motion.div>

          {/* ── Package cards ── */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                pkg: zerPackages[0],
                emoji: "🥉",
                accentColor: "#cd7f32",
                glowColor: "rgba(205,127,50,0.18)",
                borderColor: "rgba(205,127,50,0.30)",
                priceColor: "#d97706",
                icons: [
                  { Icon: Music, bg: "bg-amber-500/15", color: "text-amber-400" },
                  { Icon: ShoppingBag, bg: "bg-orange-500/15", color: "text-orange-400" },
                  { Icon: Star, bg: "bg-yellow-500/15", color: "text-yellow-400" },
                  { Icon: Headphones, bg: "bg-amber-600/15", color: "text-amber-500" },
                  { Icon: Zap, bg: "bg-orange-600/15", color: "text-orange-500" },
                ],
              },
              {
                pkg: zerPackages[1],
                emoji: "🥈",
                accentColor: "#a8b2bc",
                glowColor: "rgba(168,178,188,0.15)",
                borderColor: "rgba(168,178,188,0.30)",
                priceColor: "#94a3b8",
                popular: true,
                icons: [
                  { Icon: Music, bg: "bg-slate-500/15", color: "text-slate-300" },
                  { Icon: ShoppingBag, bg: "bg-slate-400/15", color: "text-slate-400" },
                  { Icon: Star, bg: "bg-blue-500/15", color: "text-blue-400" },
                  { Icon: Headphones, bg: "bg-slate-600/15", color: "text-slate-300" },
                  { Icon: Video, bg: "bg-indigo-500/15", color: "text-indigo-400" },
                ],
              },
              {
                pkg: zerPackages[2],
                emoji: "🥇",
                accentColor: "#f5c518",
                glowColor: "rgba(245,197,24,0.20)",
                borderColor: "rgba(245,197,24,0.35)",
                priceColor: "#f5c518",
                icons: [
                  { Icon: Music, bg: "bg-yellow-500/15", color: "text-yellow-400" },
                  { Icon: ShoppingBag, bg: "bg-amber-500/15", color: "text-amber-400" },
                  { Icon: Star, bg: "bg-yellow-400/15", color: "text-yellow-300" },
                  { Icon: Headphones, bg: "bg-orange-500/15", color: "text-orange-400" },
                  { Icon: Coins, bg: "bg-yellow-600/15", color: "text-yellow-500" },
                ],
              },
            ].map(({ pkg, emoji, accentColor, glowColor, borderColor, priceColor, popular, icons }, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative rounded-3xl flex flex-col overflow-visible",
                  popular && "ring-2 ring-primary/50 scale-[1.03] z-10"
                )}
                style={{
                  background: "hsl(var(--card))",
                  border: `1px solid ${borderColor}`,
                  boxShadow: popular
                    ? `0 0 60px ${glowColor}, 0 20px 40px rgba(0,0,0,0.15)`
                    : `0 0 40px ${glowColor}, 0 8px 24px rgba(0,0,0,0.08)`,
                }}
              >
                {/* Popular badge */}
                {popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-primary/30 whitespace-nowrap text-black"
                      style={{ background: "linear-gradient(135deg, #f5c518, #f97316)" }}>
                      ★ Herî Populer
                    </span>
                  </div>
                )}

                <div className={cn("p-7 flex flex-col flex-1", popular && "pt-9")}>

                  {/* ── Card top row ── */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl leading-none">{emoji}</div>
                      <div>
                        <p className="font-bold text-base leading-tight text-foreground">{pkg.tier}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{pkg.helper}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">Bihayê</p>
                      <p className="font-extrabold text-base" style={{ color: accentColor }}>
                        €{pkg.eurPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* ── Zer amount ── */}
                  <div className="flex items-center gap-3 mb-4">
                    <img src={"/images/currency.svg"} alt="Zer"
                      className="h-9 w-9 shrink-0" style={{ filter: `drop-shadow(0 0 8px ${accentColor}80)` }} />
                    <span className="text-5xl font-black tracking-tight" style={{ color: priceColor }}>
                      {pkg.zerAmount.toLocaleString("de-DE")}
                    </span>
                  </div>

                  {/* ── Description ── */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    Zer platforma YekBûn ya pereyê virtual e — taybetmendiyên premium, nûvekirina hesabê, û tiştên dîjîtal veke.
                  </p>

                  {/* ── Divider ── */}
                  <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)` }} />

                  {/* ── Feature icons ── */}
                  <div className="flex items-center gap-2 mb-6">
                    {icons.map(({ Icon, bg, color }, j) => (
                      <div key={j} className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", bg)}>
                        <Icon className={cn("h-4 w-4", color)} />
                      </div>
                    ))}
                  </div>

                  {/* ── CTA button ── */}
                  <button
                    className={cn(
                      "w-full h-12 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]",
                      popular && "shadow-lg shadow-primary/25"
                    )}
                    style={{
                      background: popular
                        ? "linear-gradient(135deg,#f5c518,#f97316)"
                        : `${glowColor}`,
                      border: `1px solid ${borderColor}`,
                      color: popular ? "#000" : accentColor,
                    }}
                  >
                    <Coins className="h-4 w-4" />
                    Zer Bikire
                  </button>

                </div>
              </motion.div>
            ))}
          </div>

          {/* ── What is Zercash ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm p-10 md:p-14"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-3">ZerCash çi ye?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                ZerCash sîstema xelatê ya YekBûn e — her kirîn, her nûvekirin û her çalakî Zerê vedigerîne cêbika te.
                ZerCash mîna Zerê asayî bikar bîne.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  Icon: Zap,
                  bg: "from-blue-500/20 to-blue-600/10",
                  iconColor: "text-blue-400",
                  iconBg: "bg-blue-500/15",
                  title: "Gihîştina Yekser",
                  desc: "Taybetmendiyên premium yekser veke",
                },
                {
                  Icon: ShieldCheck,
                  bg: "from-emerald-500/20 to-emerald-600/10",
                  iconColor: "text-emerald-400",
                  iconBg: "bg-emerald-500/15",
                  title: "Ewlekariya Bankê",
                  desc: "Hemû kirîn bi ewlekariya asta bankê têne kirin",
                },
                {
                  Icon: Coins,
                  bg: "from-amber-500/20 to-amber-600/10",
                  iconColor: "text-amber-400",
                  iconBg: "bg-amber-500/15",
                  title: "Cashback Werbigire",
                  desc: "Heya 15% cashback ji her kirîna hevkarê",
                },
              ].map(({ Icon, bg, iconColor, iconBg, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={cn("rounded-2xl p-6 bg-gradient-to-br border border-border/40", bg)}
                >
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4", iconBg)}>
                    <Icon className={cn("h-6 w-6", iconColor)} />
                  </div>
                  <p className="font-bold text-base mb-1.5">{title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── 9. PRICING ───────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 relative overflow-hidden bg-background scroll-mt-24">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-transparent">Planan</Badge>
            <h2 className="text-4xl font-bold mb-4">Rêya Xwe Hilbijêre</h2>
            <p className="text-lg text-muted-foreground">Plana ku ji jiyana te re guncan e hilbijêre. Her dem bi Zer nûve bike.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {[
              {
                ...plans[0],
                accent: "text-green-500",
                dot: "bg-green-500",
                checkColor: "text-green-500",
                status: "Bigihîje Belaş",
                icons: [
                  { Icon: UserPlus, bg: "bg-red-500/15", color: "text-red-400" },
                  { Icon: Music, bg: "bg-orange-500/15", color: "text-orange-400" },
                  { Icon: Video, bg: "bg-red-600/15", color: "text-red-500" },
                  { Icon: Coins, bg: "bg-amber-500/15", color: "text-amber-400" },
                  { Icon: ShoppingBag, bg: "bg-pink-500/15", color: "text-pink-400" },
                ],
              },
              {
                ...plans[1],
                accent: "text-primary",
                dot: "bg-primary",
                checkColor: "text-primary",
                status: "Herî Populer",
                icons: [
                  { Icon: UserPlus, bg: "bg-red-500/15", color: "text-red-400" },
                  { Icon: Music, bg: "bg-orange-500/15", color: "text-orange-400" },
                  { Icon: Video, bg: "bg-red-600/15", color: "text-red-500" },
                  { Icon: Megaphone, bg: "bg-yellow-500/15", color: "text-yellow-400" },
                  { Icon: MessageCircle, bg: "bg-yellow-600/15", color: "text-yellow-500" },
                  { Icon: Mic, bg: "bg-amber-500/15", color: "text-amber-400" },
                  { Icon: Wallet, bg: "bg-orange-600/15", color: "text-orange-500" },
                  { Icon: Coins, bg: "bg-amber-400/15", color: "text-amber-300" },
                ],
              },
              {
                ...plans[2],
                accent: "text-cyan-400",
                dot: "bg-cyan-400",
                checkColor: "text-cyan-400",
                status: "VIP Bigihîje",
                icons: [
                  { Icon: UserPlus, bg: "bg-red-500/15", color: "text-red-400" },
                  { Icon: Music, bg: "bg-orange-500/15", color: "text-orange-400" },
                  { Icon: Video, bg: "bg-red-600/15", color: "text-red-500" },
                  { Icon: Megaphone, bg: "bg-yellow-500/15", color: "text-yellow-400" },
                  { Icon: MessageCircle, bg: "bg-yellow-600/15", color: "text-yellow-500" },
                  { Icon: Mic, bg: "bg-amber-500/15", color: "text-amber-400" },
                  { Icon: Wallet, bg: "bg-green-600/15", color: "text-green-500" },
                  { Icon: Coins, bg: "bg-green-400/15", color: "text-green-400" },
                  { Icon: Radio, bg: "bg-cyan-500/15", color: "text-cyan-400" },
                  { Icon: Star, bg: "bg-cyan-600/15", color: "text-cyan-500" },
                ],
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative rounded-3xl p-7 border flex flex-col transition-all duration-300",
                  plan.recommended
                    ? "bg-card border-primary/50 shadow-2xl shadow-primary/10 lg:-translate-y-3"
                    : "bg-card/60 border-border hover:border-primary/30"
                )}
              >
                {/* Recommended glow */}
                {plan.recommended && (
                  <div className="absolute inset-0 rounded-3xl bg-primary/5 pointer-events-none" />
                )}

                {/* ── Card header ── */}
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏴</span>
                    <div>
                      <p className="font-bold text-base leading-tight">{plan.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={cn("h-1.5 w-1.5 rounded-full", plan.dot)} />
                        <span className={cn("text-xs font-medium", plan.accent)}>{plan.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Price ── */}
                <div className="mb-4 relative z-10">
                  <div className="flex items-end gap-1 mb-2">
                    <img src={"/images/currency.svg"} alt="Zer" className="h-8 w-8 mb-0.5" />
                    <span className="text-5xl font-extrabold leading-none">
                      {plan.priceMonthly === 0 ? "0" : plan.priceMonthly.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground text-sm mb-1 ml-0.5">/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>

                {/* ── Feature icon grid ── */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {plan.icons.map(({ Icon, bg, color }, j) => (
                    <div key={j} className={cn("h-10 w-10 rounded-xl flex items-center justify-center", bg)}>
                      <Icon className={cn("h-4.5 w-4.5", color)} style={{ height: "18px", width: "18px" }} />
                    </div>
                  ))}
                </div>

                {/* ── Feature list ── */}
                <ul className="space-y-2.5 mb-7 flex-1 relative z-10">
                  {plan.features.map((ft, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check className={cn("h-4 w-4 shrink-0", plan.checkColor)} />
                      <span>{ft}</span>
                    </li>
                  ))}
                </ul>

                {/* ── CTA ── */}
                <Link to={plan.priceMonthly === 0 ? "/register" : "/upgrade-account"} className="relative z-10">
                  <Button
                    variant={plan.recommended ? "default" : "outline"}
                    className={cn(
                      "w-full h-11 rounded-xl text-sm font-semibold",
                      plan.recommended ? "shadow-lg shadow-primary/20" : "border-border"
                    )}
                  >
                    {plan.priceMonthly === 0 ? "Belaş Dest Pê Bike" : "Plana Nûve Bike"}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/15 blur-[100px] rounded-full" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-transparent py-1.5 px-4 text-sm">Her der heye</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">YekBûn App Saz Bike</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            YekBûn bi rêbaza serîlêdana webê ya pêşkeftî (PWA) li ser amûra xwe bi leza bilind û ewlehî dixebite.
          </p>
          <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-xl shadow-primary/20 group">
            <Download className="mr-3 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            App Saz Bike
          </Button>
        </div>
      </section>

      {/* ─── 11. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-transparent">Pirsên Gelemperî</Badge>
            <h2 className="text-3xl font-bold">Pirsên Pir Têne Kirin</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-1" className="border border-border rounded-2xl px-6 bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">Zer çi ye û çawa werdigire?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                Zer pereyê fermî yê platforma YekBûn e. Tu dikarî bi kadroya krediyê an ji firoşgehên erkdar Zer bikire. Zer ji bo nûvekirina planan, mûzîka premium û kirîna ji bazarên hevkar tê bikaranîn.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border rounded-2xl px-6 bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">ZerCash çawa dixebite?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                ZerCash sîstema xelatê ya me ye. Her gava tu li bazarek hevkar mişterî bikî an nûvekirinan bikî, rêjeyek (heya 15%) vedigerê cêbika te wekî ZerCash. Tu dikarî ZerCash mîna Zerê asayî bikar bînî.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border rounded-2xl px-6 bg-card/50">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">Ma ez dikarim plana xwe her dem biguhezim?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                Erê! Tu dikarî di her wextê de di navbera planên Cultivated, Educated û Academic de biguhezî. Ger bi Zer nûve bikî, taybetmendiyên nû yên nû yekser vedibin.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}
