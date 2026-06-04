import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "@/lib/api";

/**
 * Public-facing CMS hooks. Mirror the three admin sections (pages / translations /
 * media slots) and read from the matching public endpoints exposed by the backend.
 *
 * Each hook returns either a real value resolved against the freshly-fetched CMS
 * payload OR a `fallback` you provide. Pages/components keep their existing
 * hardcoded strings as the fallback — that way the UI never goes blank if the API
 * is unreachable or the admin hasn't customized that field yet.
 */

/* ── Pages: hardcoded copy per page ──────────────────────────────────────── */

interface PagesResponse {
  pages: Record<string, Record<string, string>>;
}

export function useCmsPages() {
  return useQuery({
    queryKey: ["cms", "pages"],
    queryFn: () => api.get("/cms/pages").then(r => (r.data?.data?.pages ?? {}) as PagesResponse["pages"]),
    staleTime: 60_000,
    // Even if the API errors out, callers can still render their fallback string —
    // we suppress thrown errors at the query layer.
    retry: 1,
  });
}

/**
 * Read a single page-scoped key (e.g. `useCmsText("landing", "hero.title", "Discover Kurdistan")`).
 * The fallback is returned until the API responds AND when the admin hasn't set a value.
 */
export function useCmsText(pageId: string, key: string, fallback: string): string {
  const { data } = useCmsPages();
  return data?.[pageId]?.[key] ?? fallback;
}

/* ── Translations: per-key per-language overrides ────────────────────────── */

type Overrides = Record<string, Record<string, string>>;

export function useCmsTranslations() {
  return useQuery({
    queryKey: ["cms", "translations"],
    queryFn: () =>
      api.get("/cms/translations").then(r => (r.data?.data?.overrides ?? {}) as Overrides),
    staleTime: 60_000,
    retry: 1,
  });
}

/**
 * Look up the override for a translation key for the current language.
 * Falls back to the supplied default (typically the bundled i18n string).
 */
export function useCmsTranslation(key: string, lang: string, fallback: string): string {
  const { data } = useCmsTranslations();
  return data?.[key]?.[lang] ?? fallback;
}

/* ── Media slots: admin-replaceable banners / logos / promos ─────────────── */

interface MediaResponse { slots: Record<string, string> }

export function useCmsMedia() {
  return useQuery({
    queryKey: ["cms", "media"],
    queryFn: () =>
      api.get("/cms/media").then(r => (r.data?.data?.slots ?? {}) as MediaResponse["slots"]),
    staleTime: 5 * 60_000, // images change infrequently
    retry: 1,
  });
}

/**
 * Resolve a named media slot to a usable image URL, falling back to a bundled
 * default when the admin hasn't replaced the slot yet.
 *
 *   const heroUrl = useMediaSlot("landing.hero", "/images/hero-bg.mp4");
 */
export function useMediaSlot(slot: string, fallback: string): string {
  const { data } = useCmsMedia();
  return useMemo(() => data?.[slot] || fallback, [data, slot, fallback]);
}
