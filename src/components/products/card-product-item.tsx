"use client";

import { Button } from "@/components/ui/button";
import { CardProductProperties } from "@/types/tabs";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const getCategories = async () => {
  const res = await fetch("/api/categories");
  const data = await res.json();
  return data;
};

export const ProductItem = ({ item }: CardProductProperties) => {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);
  const category = categories.find((c: any) => c.id === item.categoryId);

  // Função para abrir WhatsApp com mensagem personalizada
  const handleWhatsapp = () => {
    const phone = "5517991271906"; // Número atualizado
    const message = `Olá! Gostaria de saber mais sobre o ${category?.name}: ${item.name}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 md:h-40 object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base mb-2 line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center justify-end">
          <Button
            onClick={handleWhatsapp}
            className="bg-pink-500 hover:bg-pink-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};
