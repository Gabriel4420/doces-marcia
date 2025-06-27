"use client";

import { Button } from "@/components/ui/button";
import { CardProductProperties } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus } from "lucide-react";

export const ProductItem = ({ item }: CardProductProperties) => {
  const { cart, upsertCartItem, removeCartItem } = useCartStore();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  // Função local para obter a quantidade do item no carrinho
  const getItemQuantity = (productId: number) => {
    const found = cart.find((cartItem) => cartItem.product.id === productId);
    return found ? found.quantity : 0;
  };

  const quantity = getItemQuantity(item.id);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login necessário",
        description: "Faça login para adicionar produtos ao carrinho.",
        variant: "destructive",
      });
      return;
    }
    upsertCartItem(item, 1);
    toast({
      title: "Produto adicionado!",
      description: `${item.name} foi adicionado ao carrinho.`,
    });
  };

  const handleRemoveFromCart = () => {
    removeCartItem(item.id);
    toast({
      title: "Produto removido",
      description: `${item.name} foi removido do carrinho.`,
    });
  };

  const handleIncrement = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login necessário",
        description: "Faça login para adicionar produtos ao carrinho.",
        variant: "destructive",
      });
      return;
    }
    upsertCartItem(item, 1);
  };

  const handleDecrement = () => {
    upsertCartItem(item, -1);
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
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs md:text-sm font-bold px-2 py-1 rounded-full">
          R$ {item.price.toFixed(2)}
        </div>
      </div>

      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base mb-2 line-clamp-2">
          {item.name}
        </h3>


        <div className="flex items-center justify-between">
          <span className="text-pink-500 font-bold text-sm md:text-base">
            R$ {item.price.toFixed(2)}
          </span>

          {quantity === 0 ? (
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-pink-500 hover:bg-pink-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
            >
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Adicionar
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleDecrement}
                size="sm"
                variant="outline"
                className="w-6 h-6 md:w-8 md:h-8 p-0"
              >
                <Minus className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              <span className="text-sm md:text-base font-medium min-w-[20px] text-center">
                {quantity}
              </span>
              <Button
                onClick={handleIncrement}
                size="sm"
                variant="outline"
                className="w-6 h-6 md:w-8 md:h-8 p-0"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
