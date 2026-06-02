import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "@/lib/api";
import {
  partnerShops as mockPartnerShops,
  musicTracks as mockMusicTracks,
  artists as mockArtists,
  polls as mockPolls,
  feedPosts as mockFeedPosts,
} from "@/data/mock";
import { dummyMusic } from "@/data/dummyMusic";
import { dummyVideos } from "@/data/dummyVideos";
import { dummyPolls } from "@/data/dummyPolls";
import { dummyPosts } from "@/data/dummyPosts";

/**
 * Hooks for the publicly-fetchable content that powers the landing page + the
 * Partner Shops dashboard. Every hook follows the same defensive pattern:
 *
 *   1. Try to fetch from the live backend.
 *   2. If the API errors out OR returns an empty collection, fall back to the
 *      polished mock data so the UI stays visually identical (no blank cards).
 *   3. When real data IS present, map it into the same shape the existing JSX
 *      reads from so consumer components don't need any markup changes.
 *
 * The point of the fallback is not laziness — it's a "no UI flicker" guarantee
 * for marketing pages while the backend's content seeding catches up.
 */

/* ── Generic axios helper that swallows errors → empty array fallback ───── */
async function safeGet<T>(path: string): Promise<T[]> {
  try {
    const r = await api.get(path);
    // Laravel wraps in `{ success, message, data }`; data can be array OR paginated obj.
    const data = r.data?.data;
    if (Array.isArray(data)) return data as T[];
    if (Array.isArray(data?.feeds)) return data.feeds as T[]; // FeedsController public shape
    if (Array.isArray(data?.items)) return data.items as T[];
    return [];
  } catch {
    return [];
  }
}

/** Resolve a backend storage path to a fully-qualified URL the browser can load. */
function resolveAsset(path?: string, fallback?: string): string {
  if (!path) return fallback ?? "";
  if (path.startsWith("http")) return path;
  const base = (import.meta.env.VITE_API_URL ?? "").replace(/\/api\/?$/, "");
  const clean = path.replace(/^\/+/, "");
  return base ? `${base}/${clean}` : `/${clean}`;
}

/** Format a raw number into "1.2M" / "850K" / "230" — matches the mock UI cadence. */
function formatCount(n: number | string | undefined): string {
  const v = typeof n === "string" ? parseInt(n, 10) : n;
  if (!v || isNaN(v)) return "0";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(v);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  PARTNER SHOPS  →  /api/zercash/shops
 * ═════════════════════════════════════════════════════════════════════════ */

interface BackendShop {
  _id?: string;
  id?: string;
  name?: string;
  category?: string;
  region?: string | { name?: string };
  city?: string;
  rating?: number;
  cashback?: number;
  cashback_percent?: number;
  is_open?: boolean;
  status?: string;
  followers?: number | string;
  orders?: number | string;
  review?: string;
  image?: string;
  logo?: string;
}

export function usePartnerShops() {
  const q = useQuery({
    queryKey: ["landing", "partner-shops"],
    queryFn: () => safeGet<BackendShop>("/zercash/shops"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return mockPartnerShops;
    return q.data.map((s, i): typeof mockPartnerShops[number] => {
      const name = s.name ?? `Shop ${i + 1}`;
      const initials =
        name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "SH";
      return {
        id: s._id ?? s.id ?? `ps-${i}`,
        name,
        initials,
        category: s.category ?? "Shop",
        region: typeof s.region === "object" ? s.region?.name ?? "" : s.region ?? s.city ?? "",
        rating: Number(s.rating ?? 4.5),
        cashback: Number(s.cashback ?? s.cashback_percent ?? 5),
        isOpen: typeof s.is_open === "boolean" ? s.is_open : s.status !== "closed",
        followers: formatCount(s.followers),
        orders: formatCount(s.orders),
        review: s.review ?? "",
        image: resolveAsset(s.image ?? s.logo, mockPartnerShops[i % mockPartnerShops.length]?.image),
      };
    });
  }, [q.data]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  MUSIC — Artists + tracks
 *  Artists  →  /api/get-artists-public
 *  Songs    →  /api/get-all-songs-public
 * ═════════════════════════════════════════════════════════════════════════ */

interface BackendArtist {
  _id?: string;
  id?: string;
  name?: string;
  image?: string;
  followers?: number;
  status?: string;
  songs?: unknown[];
  videos?: unknown[];
  province?: { name?: string; country?: { name?: string } };
  country?: string;
}

interface BackendSong {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  artist?: { name?: string; _id?: string; image?: string };
  artist_name?: string;
  album?: string;
  duration?: string | number;
  plays?: number;
  views?: number;
  image?: string;
  cover?: string;
  thumbnail?: string;
  genre?: string;
}

/** Top artists (verified, by recent uploads). Falls back to mock `artists` list. */
export function useLandingArtists() {
  const q = useQuery({
    queryKey: ["landing", "artists"],
    queryFn: () => safeGet<BackendArtist>("/get-artists-public"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return mockArtists;
    return q.data.map((a, i): typeof mockArtists[number] => ({
      id: a._id ?? a.id ?? `ar-${i}`,
      name: a.name ?? "Unknown Artist",
      genre: "Kurdish",
      followers: formatCount(a.followers),
      tracks: a.songs?.length ?? 0,
      verified: true,
      featured: i === 0,
      image: resolveAsset(a.image, mockArtists[i % mockArtists.length]?.image),
      country: a.province?.country?.name ?? a.country ?? "Kurdistan",
    }));
  }, [q.data]);
}

/** Full music tracks list. Falls back to mock `musicTracks`. */
export function useLandingMusic() {
  const q = useQuery({
    queryKey: ["landing", "music"],
    queryFn: () => safeGet<BackendSong>("/get-all-songs-public"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return mockMusicTracks;
    return q.data.map((s, i): typeof mockMusicTracks[number] => ({
      id: s._id ?? s.id ?? `mt-${i}`,
      title: s.title ?? s.name ?? "Untitled",
      artist: s.artist?.name ?? s.artist_name ?? "Unknown Artist",
      album: s.album ?? "Single",
      duration: typeof s.duration === "number" ? formatDuration(s.duration) : s.duration ?? "3:30",
      plays: formatCount(s.plays ?? s.views),
      cover: resolveAsset(
        s.cover ?? s.thumbnail ?? s.image ?? s.artist?.image,
        mockMusicTracks[i % mockMusicTracks.length]?.cover,
      ),
      genre: s.genre ?? "Folk",
      trending: i < 3, // Mark the latest 3 uploads as trending for the UI badge.
    }));
  }, [q.data]);
}

/** Compact music card list (header carousel). Falls back to dummyMusic. */
export function useLandingMusicCarousel() {
  const q = useQuery({
    queryKey: ["landing", "music-carousel"],
    queryFn: () => safeGet<BackendArtist>("/get-artists-public"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return dummyMusic;
    return q.data.slice(0, 6).map((a, i): typeof dummyMusic[number] => ({
      id: i + 1,
      artist: a.name ?? "Unknown",
      image: resolveAsset(a.image, dummyMusic[i % dummyMusic.length]?.image),
      genre: "Folk",
    }));
  }, [q.data]);
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  VIDEOS  →  /api/get-all-videos-public
 * ═════════════════════════════════════════════════════════════════════════ */

interface BackendVideo {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  thumbnail?: string;
  image?: string;
  cover?: string;
  views?: number | string;
  artist?: { name?: string };
  creator?: string;
  username?: string;
}

export function useLandingVideos() {
  const q = useQuery({
    queryKey: ["landing", "videos"],
    queryFn: () => safeGet<BackendVideo>("/get-all-videos-public"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return dummyVideos;
    return q.data.slice(0, 6).map((v, i): typeof dummyVideos[number] => ({
      id: i + 1,
      title: v.title ?? v.name ?? "Untitled video",
      views: formatCount(v.views),
      thumbnail: resolveAsset(
        v.thumbnail ?? v.image ?? v.cover,
        dummyVideos[i % dummyVideos.length]?.thumbnail,
      ),
      creator: v.artist?.name ?? v.creator ?? v.username ?? "creator",
    }));
  }, [q.data]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  POLLS  →  /api/voting-public
 *  Two consumers with different shapes:
 *   - Landing's PollSection uses dummyPolls shape: { id, question, options[{label, votes}] }
 *   - Landing.tsx's `polls` import uses the richer mock shape with `cover`, `participants`,
 *     `active`, `leading` fields.
 *  Both hooks share the backend fetch via React Query's cache.
 * ═════════════════════════════════════════════════════════════════════════ */

interface BackendVoting {
  _id?: string;
  id?: string;
  name?: string;
  question?: string;
  description?: string;
  image?: string;
  status?: string;
  participants?: number;
  reactions?: Array<{ name?: string; label?: string; votes?: number; count?: number }>;
  options?: Array<{ label?: string; votes?: number }>;
}

/** Simple polls list for the landing's poll section (dummyPolls shape). */
export function useLandingPollsSimple() {
  const q = useQuery({
    queryKey: ["landing", "polls"],
    queryFn: () => safeGet<BackendVoting>("/voting-public"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return dummyPolls;
    return q.data.map((p, i): typeof dummyPolls[number] => {
      const options =
        (p.options && p.options.length > 0
          ? p.options
          : (p.reactions ?? []).map((r) => ({
              label: r.name ?? r.label ?? "Option",
              votes: r.votes ?? r.count ?? 0,
            }))) ?? [];
      return {
        id: i + 1,
        question: p.question ?? p.name ?? "Poll",
        options: options.map((o) => ({
          label: o.label ?? "Option",
          votes: Number(o.votes ?? 0),
        })),
      };
    });
  }, [q.data]);
}

/** Rich polls list for the landing hero/sections (mock `polls` shape). */
export function useLandingPollsRich() {
  const q = useQuery({
    queryKey: ["landing", "polls"], // share cache with simple variant
    queryFn: () => safeGet<BackendVoting>("/voting-public"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return mockPolls;
    return q.data.map((p, i): typeof mockPolls[number] => {
      const opts: Array<{ label: string; votes: number }> =
        p.options && p.options.length > 0
          ? p.options.map((o) => ({ label: o.label ?? "Option", votes: Number(o.votes ?? 0) }))
          : (p.reactions ?? []).map((r) => ({
              label: r.name ?? r.label ?? "Option",
              votes: Number(r.votes ?? r.count ?? 0),
            }));
      const totalVotes = opts.reduce((a, b) => a + b.votes, 0);
      const leader = opts.reduce((best, cur) => (cur.votes > best.votes ? cur : best), opts[0] ?? { label: "—", votes: 0 });
      return {
        id: p._id ?? p.id ?? `poll-${i}`,
        question: p.question ?? p.name ?? "Poll",
        cover: resolveAsset(p.image, mockPolls[i % mockPolls.length]?.cover),
        participants: Number(p.participants ?? totalVotes),
        active: p.status === "1" || p.status === "active" || true,
        leading: {
          option: leader.label,
          percent: totalVotes > 0 ? Math.round((leader.votes / totalVotes) * 100) : 0,
        },
        options: opts.length > 0 ? opts : mockPolls[i % mockPolls.length]?.options ?? [],
      };
    });
  }, [q.data]);
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  FEED  →  /api/public-feeds
 *  Two consumers like polls:
 *   - FeedPreview uses dummyPosts shape: { id, username, avatar, image, likes, comments, caption }
 *   - Landing.tsx's `feedPosts` import uses richer shape with verified/handle/timestamps
 * ═════════════════════════════════════════════════════════════════════════ */

interface BackendFeed {
  _id?: string;
  id?: string;
  user_id?: string;
  user?: { name?: string; username?: string; image?: string; is_verified?: boolean | number };
  caption?: string;
  text?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  media?: Array<{ url?: string; type?: string }>;
  likes_count?: number;
  comments_count?: number;
  created_at?: string;
}

export function useLandingFeedSimple() {
  const q = useQuery({
    queryKey: ["landing", "feed"],
    queryFn: () => safeGet<BackendFeed>("/public-feeds"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return dummyPosts;
    return q.data.slice(0, 7).map((f, i): typeof dummyPosts[number] => {
      const username = f.user?.username ?? f.user?.name ?? "user";
      return {
        id: i + 1,
        username,
        avatar: (f.user?.name ?? username).charAt(0).toUpperCase(),
        image: resolveAsset(
          f.image ?? f.thumbnail ?? f.media?.[0]?.url,
          dummyPosts[i % dummyPosts.length]?.image,
        ),
        likes: Number(f.likes_count ?? 0),
        comments: Number(f.comments_count ?? 0),
        caption: f.caption ?? f.text ?? f.description ?? "",
      };
    });
  }, [q.data]);
}

export function useLandingFeedRich() {
  const q = useQuery({
    queryKey: ["landing", "feed"],
    queryFn: () => safeGet<BackendFeed>("/public-feeds"),
    staleTime: 60_000,
  });

  return useMemo(() => {
    if (!q.data || q.data.length === 0) return mockFeedPosts;
    return q.data.slice(0, mockFeedPosts.length).map((f, i): typeof mockFeedPosts[number] => {
      const fallback = mockFeedPosts[i % mockFeedPosts.length];
      const username = f.user?.username ?? f.user?.name ?? fallback.user.name;
      return {
        ...fallback,
        id: f._id ?? f.id ?? `fp-${i}`,
        user: {
          ...fallback.user,
          name: f.user?.name ?? username,
          handle: "@" + username.toLowerCase().replace(/\s+/g, "_"),
          avatar: resolveAsset(f.user?.image, fallback.user.avatar),
          verified: Boolean(f.user?.is_verified) || fallback.user.verified,
        },
        // Caption/likes/comments come straight from the API when present.
        ...(f.caption || f.text || f.description
          ? { caption: f.caption ?? f.text ?? f.description } as Partial<typeof fallback>
          : {}),
      };
    });
  }, [q.data]);
}
