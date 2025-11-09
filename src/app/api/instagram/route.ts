import { NextRequest } from "next/server";

export const runtime = "nodejs";

type InstagramMedia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
  caption?: string;
  like_count?: number;
};

type CacheEntry = { data: InstagramMedia[]; ts: number };
const IG_CACHE_KEY = "__IG_CACHE_MEDIA__";

function getCache(): CacheEntry | null {
  try {
    const cache = (globalThis as any)[IG_CACHE_KEY] as CacheEntry | undefined;
    if (!cache) return null;
    return cache;
  } catch {
    return null;
  }
}

function setCache(entry: CacheEntry) {
  try {
    (globalThis as any)[IG_CACHE_KEY] = entry;
  } catch {
    // ignore
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit") ?? 18);
  const force = url.searchParams.get("force") === "true";

  const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return new Response(
      JSON.stringify({ error: "INSTAGRAM_ACCESS_TOKEN não configurado" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const twelveHoursMs = 24 * 60 * 60 * 1000; // 24h
  const cached = getCache();
  if (cached && !force && Date.now() - cached.ts < twelveHoursMs) {
    return new Response(JSON.stringify({ data: cached.data, cached: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  }

  try {
    const fields = [
      "id",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "caption",
      "like_count", // pode não estar disponível dependendo do tipo de conta/app
    ].join(",");

    const apiUrl = `https://graph.instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID}/media?fields=${fields}&access_token=${token}&limit=${limit}`;
    const igRes = await fetch(apiUrl, { next: { revalidate: 86400 } });
    if (!igRes.ok) {
      const text = await igRes.text();
      return new Response(
        JSON.stringify({ error: "Falha ao consultar o Instagram", details: text }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }
    const json = await igRes.json();
    const data = (json.data ?? []) as InstagramMedia[];

    // normaliza: para CAROUSEL_ALBUM, usa thumbnail_url ou media_url
    const normalized: InstagramMedia[] = data
      .filter((m) => m.media_type !== "VIDEO") // opcional: filtrar vídeos para grid de fotos
      .map((m) => ({
        ...m,
        media_url: m.media_url || m.thumbnail_url || m.permalink,
      }));

    setCache({ data: normalized, ts: Date.now() });
    return new Response(JSON.stringify({ data: normalized, cached: false }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Instagram indisponível", details: String(e?.message ?? e) }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}