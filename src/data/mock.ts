import { CreditCard, Music, Radio, ShoppingBag, Star, Zap, Activity, Clock, Shield } from "lucide-react";

export const userProfile = {
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

export const transactions = [
  { id: "tx-1", type: "charge", amount: 2000, date: "15.02.2024", status: "completed", description: "Charged Zer via Credit Card" },
  { id: "tx-2", type: "spend", amount: -450, date: "10.02.2024", status: "completed", description: "Purchased Silver Playlist Upgrade" },
  { id: "tx-3", type: "cashback", amount: 36, date: "10.02.2024", status: "completed", description: "Cashback from Playlist" },
  { id: "tx-4", type: "spend", amount: -1200, date: "28.01.2024", status: "completed", description: "Partner Shop: Kurdish Crafts" },
  { id: "tx-5", type: "cashback", amount: 120, date: "28.01.2024", status: "completed", description: "Cashback from Shop" },
  { id: "tx-6", type: "charge", amount: 500, date: "05.01.2024", status: "completed", description: "Bronze Stream — Auto Charge" },
];

export const billingHistory = [
  { id: "INV-2024-001", title: "Gold Pack — 1000 Zer", date: "15.02.2024", amount: "€49.99", zer: 1000, type: "Standard Pack" },
  { id: "INV-2024-002", title: "Educated Plan — Monthly", date: "01.02.2024", amount: "€9.99", zer: 0, type: "Plan Upgrade" },
  { id: "INV-2024-003", title: "Silver Playlist Upgrade", date: "10.01.2024", amount: "700 Zer", zer: 700, type: "Playlist" },
  { id: "INV-2024-004", title: "Bronze Stream", date: "05.01.2024", amount: "150 Zer", zer: 150, type: "Streaming" },
];

export const plans = [
  {
    id: "cultivated",
    name: "Cultivated",
    priceMonthly: 0,
    priceYearly: 0,
    zerPrice: 0,
    color: "from-slate-600 to-slate-700",
    iconColor: "text-slate-300",
    description: "Ji bo destpêkirinê, mûzîka bingehîn û civakê bixwaze.",
    features: ["Follow Users", "Enjoy Music", "Enjoy Videos", "Standard Wallet", "Get cashback", "and more"],
    recommended: false,
  },
  {
    id: "educated",
    name: "Educated",
    priceMonthly: 9.99,
    priceYearly: 99.99,
    zerPrice: 1000,
    color: "from-primary to-yellow-500",
    iconColor: "text-primary",
    description: "Bê reklam, kalîteya bilind û taybetmendiyên pêşketî ji bo hevberdanan.",
    features: ["Follow Users", "Enjoy Music", "Enjoy Videos", "Create Channel", "Text Comments", "Voice Comment", "Business Wallet", "Get cashback", "and more"],
    recommended: true,
  },
  {
    id: "academic",
    name: "Academic",
    priceMonthly: 19.99,
    priceYearly: 199.99,
    zerPrice: 2000,
    color: "from-indigo-600 to-purple-700",
    iconColor: "text-indigo-300",
    description: "Hemû taybetmendî + piştgiriya pêşîn, API û ewlehiya pêşketî.",
    features: ["Follow Users", "Enjoy Music", "Enjoy Videos", "Create Channel", "Text Comments", "Voice Comment", "Business Wallet", "Get cashback", "and more"],
    recommended: false,
  }
];

export const partnerShops = [
  {
    id: "ps-1", name: "Zilan Traditional Wear", initials: "ZT", category: "Fashion", region: "Duhok",
    rating: 4.8, cashback: 12, isOpen: true, followers: "14.2K", orders: "3.1K",
    review: "Cilên kurdî yên rast û xweşik — kalîteya bilind! 🫶",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop"
  },
  {
    id: "ps-2", name: "Rona Cafe & Books", initials: "RC", category: "Cafe", region: "Erbil",
    rating: 4.9, cashback: 8, isOpen: true, followers: "9.8K", orders: "1.8K",
    review: "Atmosfera xweş û kahvê ya bêhempa 👌",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80&fit=crop"
  },
  {
    id: "ps-3", name: "Zagros Electronics", initials: "ZE", category: "Tech", region: "Sulaymaniyah",
    rating: 4.5, cashback: 5, isOpen: false, followers: "6.3K", orders: "950",
    review: "Bihayên baş û şandina bilez, spas! ⚡",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&q=80&fit=crop"
  },
  {
    id: "ps-4", name: "Diyar Arts & Culture", initials: "DA", category: "Art", region: "Diyarbakir",
    rating: 5.0, cashback: 15, isOpen: true, followers: "21.5K", orders: "4.4K",
    review: "Xebatên hunerî yên binecih û rengîn — hezdikim! 🎨",
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=600&q=80&fit=crop"
  },
  {
    id: "ps-5", name: "Kurdish Spice Co.", initials: "KS", category: "Groceries", region: "Erbil",
    rating: 4.7, cashback: 10, isOpen: true, followers: "11.0K", orders: "2.6K",
    review: "Bîhna biharatan a rastî malê dianin! 🌶️",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80&fit=crop"
  },
  {
    id: "ps-6", name: "Newroz Fitness", initials: "NF", category: "Health", region: "Duhok",
    rating: 4.6, cashback: 7, isOpen: true, followers: "7.7K", orders: "1.2K",
    review: "Rahênerên pisporî û amûrên nûjen 💪",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop"
  },
];

export const playlistUpgrades = [
  {
    id: "pu-1",
    name: "Bronze Playlist",
    tier: "Bronze",
    songs: 50,
    zerCost: 1000,
    cashback: 5,
    popular: false,
    color: "from-amber-700 to-amber-600",
    badgeColor: "bg-amber-600/20 text-amber-400 border-amber-500/30",
    glow: "shadow-amber-500/10",
  },
  {
    id: "pu-2",
    name: "Silver Playlist",
    tier: "Silver",
    songs: 75,
    zerCost: 1000,
    cashback: 5,
    popular: true,
    color: "from-slate-500 to-zinc-400",
    badgeColor: "bg-slate-500/20 text-slate-300 border-slate-400/30",
    glow: "shadow-slate-400/10",
  },
  {
    id: "pu-3",
    name: "Gold Playlist",
    tier: "Gold",
    songs: 100,
    zerCost: 1000,
    cashback: 5,
    popular: false,
    color: "from-yellow-600 to-amber-400",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    glow: "shadow-yellow-500/10",
  },
];

export const streamingUpgrades = [
  {
    id: "su-1",
    name: "Bronze Stream",
    tier: "Bronze",
    minutes: 60,
    zerCost: 500,
    cashback: 5,
    popular: false,
    color: "from-amber-700 to-amber-600",
    badgeColor: "bg-amber-600/20 text-amber-400 border-amber-500/30",
    glow: "shadow-amber-500/10",
  },
  {
    id: "su-2",
    name: "Silver Stream",
    tier: "Silver",
    minutes: 120,
    zerCost: 900,
    cashback: 5,
    popular: true,
    color: "from-slate-500 to-zinc-400",
    badgeColor: "bg-slate-500/20 text-slate-300 border-slate-400/30",
    glow: "shadow-slate-400/10",
  },
  {
    id: "su-3",
    name: "Gold Stream",
    tier: "Gold",
    minutes: 180,
    zerCost: 1200,
    cashback: 5,
    popular: false,
    color: "from-yellow-600 to-amber-400",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    glow: "shadow-yellow-500/10",
  },
];

export const zerPackages = [
  {
    id: "zp-1",
    name: "Bronze Pack",
    tier: "Bronze",
    zerAmount: 1000,
    eurPrice: 4.99,
    helper: "Ji bo destpêkirinê",
    color: "from-amber-700 to-amber-600",
    glow: "shadow-amber-500/20",
    popular: false,
  },
  {
    id: "zp-2",
    name: "Silver Pack",
    tier: "Silver",
    zerAmount: 5000,
    eurPrice: 19.99,
    helper: "Herî populer ya bikarhêneran",
    color: "from-slate-500 to-zinc-400",
    glow: "shadow-slate-400/20",
    popular: true,
  },
  {
    id: "zp-3",
    name: "Gold Pack",
    tier: "Gold",
    zerAmount: 15000,
    eurPrice: 49.99,
    helper: "Ji bo bikarhênerên aktîf",
    color: "from-yellow-600 to-amber-400",
    glow: "shadow-yellow-500/20",
    popular: false,
  },
];

export const businessPackages = [
  {
    id: "bp-1",
    name: "Titanium Pack",
    tier: "Titanium",
    zerAmount: 50000,
    eurPrice: 149.99,
    helper: "Ji bo karsaziyên biçûk",
    color: "from-blue-700 to-indigo-600",
    glow: "shadow-blue-500/20",
    popular: false,
  },
  {
    id: "bp-2",
    name: "Platinum Pack",
    tier: "Platinum",
    zerAmount: 150000,
    eurPrice: 399.99,
    helper: "Ji bo karsaziyên navîn",
    color: "from-violet-700 to-purple-600",
    glow: "shadow-violet-500/20",
    popular: true,
  },
  {
    id: "bp-3",
    name: "Rhodium Pack",
    tier: "Rhodium",
    zerAmount: 500000,
    eurPrice: 999.99,
    helper: "Ji bo karsaziyên mezin",
    color: "from-teal-700 to-emerald-600",
    glow: "shadow-teal-500/20",
    popular: false,
  },
];

export const playlists = [
  { id: "pl-1", title: "Kurdish Classics", tracks: 45, curator: "YekBûn Music", cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&q=80&fit=crop" },
  { id: "pl-2", title: "Modern Pop Hits", tracks: 120, curator: "DJ Rania", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80&fit=crop" },
  { id: "pl-3", title: "Traditional Halay", tracks: 85, curator: "YekBûn Culture", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&q=80&fit=crop" },
  { id: "pl-4", title: "Acoustic Evenings", tracks: 30, curator: "Azad S.", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80&fit=crop" },
];

export const feedPosts = [
  {
    id: "fp-1",
    user: { name: "Miran", handle: "@miran_ro", avatar: "https://images.unsplash.com/photo-1527615020922-3c670eed3407?w=80&q=80&fit=crop", verified: true },
    location: "Rojava · Qamişlo",
    content: "Çiyayên me yên spehî — tu cih wek Kurdistan nîne 🏔️",
    image: "https://images.unsplash.com/photo-1706608545819-286054c30d89?w=480&q=80&fit=crop",
    likes: 1240, comments: 0, views: 3, reactions: 0, time: "2s ago",
  },
  {
    id: "fp-2",
    user: { name: "Sara K.", handle: "@sara_k", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop", verified: true },
    location: "Duhok",
    content: "Wow, ev wêne zehf xweşin! 🤩🏼",
    image: "https://images.unsplash.com/photo-1654776028235-c23c046650f5?w=480&q=80&fit=crop",
    likes: 9300, comments: 2, views: 42, reactions: 8, time: "1h ago",
  },
  {
    id: "fp-3",
    user: { name: "Hozan D.", handle: "@hozan_d", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop", verified: true },
    location: "Hewlêr · Kurdistan",
    content: "Newroz pîroz be! Ji hemû Kurdên cîhanê re 🌱🔥",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=480&q=80&fit=crop",
    likes: 5400, comments: 17, views: 128, reactions: 34, time: "3h ago",
  },
  {
    id: "fp-4",
    user: { name: "Zilan W.", handle: "@zilan_w", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&fit=crop", verified: false },
    location: "Diyarbakır",
    content: "Xwarina kurdî ya roja îro — Dolma û Biryani 🫕",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=480&q=80&fit=crop",
    likes: 2870, comments: 11, views: 74, reactions: 22, time: "5h ago",
  },
  {
    id: "fp-5",
    user: { name: "Perwer A.", handle: "@perwer_a", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&fit=crop", verified: true },
    location: "Stockholm · Swêd",
    content: "Welatê min ji dûr. Kurdistan her di dilê min de 🌍❤️",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=480&q=80&fit=crop",
    likes: 7100, comments: 38, views: 310, reactions: 51, time: "8h ago",
  },
  {
    id: "fp-6",
    user: { name: "Roza M.", handle: "@roza_m", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop", verified: true },
    location: "Silêmanî",
    content: "Muzîka kurdî ya şevê — Şivan Perwer bêdawî 🎵✨",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&q=80&fit=crop",
    likes: 4200, comments: 9, views: 89, reactions: 15, time: "12h ago",
  },
];

export const musicTracks = [
  { id: "mt-1", title: "Ey Reqîb", artist: "Şivan Perwer", album: "Kurdish Anthems", duration: "4:32", plays: "2.4M", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/%C5%9Eivan_Perwer.jpg/500px-%C5%9Eivan_Perwer.jpg", genre: "Folk", trending: true },
  { id: "mt-2", title: "Newroz", artist: "Ciwan Haco", album: "Eternal Spring", duration: "3:58", plays: "1.8M", cover: "https://upload.wikimedia.org/wikipedia/commons/d/da/Ciwan_Haco.png", genre: "Pop", trending: false },
  { id: "mt-3", title: "Kurdistan", artist: "Hasan Zirak", album: "Legends of Kurdistan", duration: "5:14", plays: "3.1M", cover: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Hassanzirak-kurdish_singer_%282%29.png", genre: "Classic", trending: true },
  { id: "mt-4", title: "Delale", artist: "Aynur Doğan", album: "Voice of the Mountains", duration: "4:07", plays: "987K", cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Aynur_Dogan.jpg/500px-Aynur_Dogan.jpg", genre: "World", trending: false },
];

export const artists = [
  { id: "ar-1", name: "Şivan Perwer", genre: "Kurdish Folk", followers: "4.2M", tracks: 230, verified: true, featured: true, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/%C5%9Eivan_Perwer.jpg/500px-%C5%9Eivan_Perwer.jpg", country: "Kurdistan" },
  { id: "ar-2", name: "Aynur Doğan", genre: "World / Folk", followers: "1.8M", tracks: 98, verified: true, featured: false, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Aynur_Dogan.jpg/500px-Aynur_Dogan.jpg", country: "Kurdistan" },
  { id: "ar-3", name: "Ciwan Haco", genre: "Pop / Romantic", followers: "2.6M", tracks: 165, verified: true, featured: false, image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Ciwan_Haco.png", country: "Syria" },
  { id: "ar-4", name: "Hozan Diyar", genre: "Kurdish Rock", followers: "890K", tracks: 74, verified: true, featured: false, image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Diyar_%28cropped%29.jpg", country: "Kurdistan" },
];

export const polls = [
  { id: "poll-1", question: "Xwarina Kurdî ya Herî Baş?", cover: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop", participants: 1842, active: true, leading: { option: "Dolma", percent: 45 }, options: [{ label: "Dolma", votes: 820 }, { label: "Kebab", votes: 612 }, { label: "Biryani", votes: 410 }] },
  { id: "poll-2", question: "Demsala Bijare ya Te?", cover: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80&fit=crop", participants: 2310, active: true, leading: { option: "Biharê", percent: 42 }, options: [{ label: "Biharê", votes: 980 }, { label: "Havîn", votes: 760 }, { label: "Zivistan", votes: 570 }] },
  { id: "poll-3", question: "Bajarê Kurdistanê yê Herî Xweş?", cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80&fit=crop", participants: 3870, active: true, leading: { option: "Hewlêr", percent: 38 }, options: [{ label: "Hewlêr", votes: 1480 }, { label: "Silêmanî", votes: 1210 }, { label: "Duhok", votes: 680 }, { label: "Qamişlo", votes: 500 }] },
  { id: "poll-4", question: "Hunermendê Kurdî yê Herî Populer?", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&fit=crop", participants: 5120, active: true, leading: { option: "Şivan Perwer", percent: 54 }, options: [{ label: "Şivan Perwer", votes: 2760 }, { label: "Aynur Doğan", votes: 1240 }, { label: "Ciwan Haco", votes: 820 }] },
];
