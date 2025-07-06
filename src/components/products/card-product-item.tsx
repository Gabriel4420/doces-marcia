"use client";

import { Button } from "@/components/ui/button";
import { CardProductProperties } from "@/types/tabs";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

const getCategories = async () => {
  const res = await fetch("/api/categories");
  const data = await res.json();
  return data;
};

export const ProductItem = ({ item }: CardProductProperties) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState<'center' | string>('center');
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);
  const category = categories.find((c: any) => c.id === item.categoryId);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  // Função para abrir WhatsApp com mensagem personalizada
  const handleWhatsapp = () => {
    const phone = "5517991271906"; // Número atualizado
    const message = `Olá! Gostaria de saber mais sobre o ${category?.name}: ${item.name}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Fechar modal ao clicar fora da imagem
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setZoom(1);
    }
  };

  // Zoom dinâmico com scroll localizado
  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setZoom((prev) => {
      let next = prev + (e.deltaY < 0 ? 0.15 : -0.15);
      if (next < 1) next = 1;
      if (next > 3) next = 3;
      return next;
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center">
        <div className="relative w-full flex justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-32 md:h-40 object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105"
            loading="lazy"
            style={{ maxWidth: 220 }}
            onClick={() => setShowModal(true)}
          />
        </div>
        <div className="p-3 md:p-4 w-full flex flex-col items-center">
          <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base mb-2 line-clamp-2 text-center">
            {item.name}
          </h3>
          <div className="flex items-center justify-center w-full">
            <Button
              onClick={handleWhatsapp}
              className="bg-pink-500 hover:bg-pink-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 flex items-center justify-center w-full max-w-[180px]"
            >
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in"
          onClick={handleModalClick}
        >
          <div className="relative max-w-lg w-full flex flex-col items-center">
            <button
              className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
              onClick={() => { setShowModal(false); setZoom(1); }}
              aria-label="Fechar"
            >
              <X className="w-6 h-6 text-pink-600" />
            </button>
            <img
              src={item.image}
              alt={item.name}
              className="rounded-xl shadow-lg max-h-[80vh] object-contain bg-white transition-transform duration-200"
              style={{ maxWidth: "90vw", transform: `scale(${zoom})`, transformOrigin: zoomOrigin }}
              onWheel={handleWheel}
              draggable={false}
              onMouseMove={e => {
                if (zoom > 1) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomOrigin(`${x}% ${y}%`);
                }
              }}
            />
            <span className="mt-2 text-white text-center font-semibold text-lg drop-shadow">{item.name}</span>
            {zoom > 1 && (
              <button
                className="mt-4 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium shadow transition-colors z-50"
                onClick={() => setZoom(1)}
              >
                Voltar tamanho original
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
