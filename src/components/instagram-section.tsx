"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Instagram, Heart } from "lucide-react";

type InstagramMedia = {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp?: string;
  caption?: string;
  like_count?: number;
};

export function InstagramSection() {
  const [items, setItems] = useState<InstagramMedia[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMedia = async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/instagram?limit=18${force ? "&force=true" : ""}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Falha ao buscar Instagram");
      }
      const json = await res.json();
      setItems(json.data || []);
    } catch (e: any) {
      setError("Instagram indisponível no momento. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(false);
  }, []);

  return (
    <section id="instagram" className="py-10 md:py-14" aria-labelledby="instagram-title">
      <div className="w-full max-w-6xl mx-auto px-1 xs:px-2 sm:px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h2 id="instagram-title" className="text-2xl md:text-3xl lg:text-4xl font-bold dark:text-white text-gray-800">
              Nosso <span className="text-pink-500">Instagram</span>
            </h2>
            <p className="text-sm md:text-base dark:text-gray-300 text-gray-600">Acompanhe nossas últimas publicações.</p>
          </div>
          <Button onClick={() => fetchMedia(true)} className="bg-pink-600 hover:bg-pink-700 text-white">Atualizar</Button>
        </div>

        {loading && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {Array.from({ length: 18 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-8">
            <p className="text-gray-700 dark:text-gray-300 mb-3">{error}</p>
            <a
              href="https://www.instagram.com/deliciasdamarcia_rp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              Abrir perfil no Instagram
            </a>
          </div>
        )}

        {!loading && !error && items && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {items.map((m) => (
              <a
                key={m.id}
                href={m.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg"
                aria-label="Abrir publicação no Instagram"
              >
                <img
                  src={m.media_url}
                  alt={m.caption || "Publicação do Instagram"}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {/* Ícone Instagram no canto */}
                <div className="absolute top-2 left-2 p-1 rounded bg-black/40 text-white">
                  <Instagram className="w-4 h-4" />
                </div>
                {/* Overlay de hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                {/* Likes (se disponível) */}
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{typeof m.like_count === "number" ? m.like_count : ""}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}