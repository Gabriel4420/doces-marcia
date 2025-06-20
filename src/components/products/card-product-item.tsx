"use client";

import { CardProductProperties } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RocketIcon } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export const ProductItem = ({ item }: CardProductProperties) => {
  const { toast } = useToast();
  const {upsertCartItem} = useCartStore(state => state)

  const handleAddToCart = () => {
      upsertCartItem(item,1);

    toast({
      title: `Seu carrinho foi atualizado 🛒`,
      description: `${item.name} foi adicionado ao carrinho com sucesso!`,
      variant: "default",
    });
  };
  return (
    <div>
      <div className="rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="mt-3 flex-flex-col gap-2">
        <h3 className="text-lg font-medium">{item.name}</h3>
        <p className="text-gray-500">R$ {item.price.toFixed(2)}</p>
        <Button
          variant="outline"
          onClick={handleAddToCart}
          className="w-full mt-2 hover:bg-green-500"
        >
          <RocketIcon className="mr-2 h-4 w-4 " />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
};
