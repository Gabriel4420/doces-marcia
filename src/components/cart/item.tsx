"use client";
import { useState } from "react";
import { CartItem as CartItemType } from "@/types/cart";
import { CartItemQuantity } from "./item-quantity";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { upsertCartItem, removeCartItem } = useCartStore();

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleIncrement = () => {
    upsertCartItem(item.item.product, 1);
  };

  const handleDecrement = () => {
    if (item.item.quantity > 1) {
      upsertCartItem(item.item.product, -1);
    } else {
      removeCartItem(item.item.product.id);
    }
  };

  const handleRemove = () => {
    removeCartItem(item.item.product.id);
  };

  return (
    <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <img
        src={item.item.product.image}
        alt={item.item.product.name}
        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
        loading="lazy"
        onClick={handleImageClick}
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 dark:text-white text-sm md:text-base truncate">
          {item.item.product.name}
        </h4>
        <p className="text-pink-500 font-bold text-sm md:text-base">
          R$ {item.item.product.price.toFixed(2)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          onClick={handleDecrement}
          size="sm"
          variant="outline"
          className="w-6 h-6 md:w-8 md:h-8 p-0"
          aria-label="Diminuir quantidade"
        >
          <Minus className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        
        <span className="text-sm md:text-base font-medium min-w-[20px] text-center">
          {item.item.quantity}
        </span>
        
        <Button
          onClick={handleIncrement}
          size="sm"
          variant="outline"
          className="w-6 h-6 md:w-8 md:h-8 p-0"
          aria-label="Aumentar quantidade"
        >
          <Plus className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        
        <Button
          onClick={handleRemove}
          size="sm"
          variant="ghost"
          className="w-6 h-6 md:w-8 md:h-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          aria-label="Remover item"
        >
          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black/85 bg-opacity-50"
        >
          <div className="relative transparent p-4 rounded-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-sm bg-red-800 text-white px-2 hover:bg-red-500 py-1 rounded-full"
            >
              X
            </button>
            <img
              src={item.item.product.image}
              alt={item.item.product.name}
              className="max-w-full max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
