"use client";
import { useState } from "react";
import { CartItem } from "@/types/cart";
import { CartItemQuantity } from "./item-quantity";

export const CartProductItem = ({ item }: CartItem) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-5">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-14 h-14 rounded-lg object-contain transform transition-transform duration-300 hover:scale-110 cursor-zoom-in"
        onClick={handleImageClick}
      />
      <div className="flex-1">
        <h2 className="text-lg font-medium">{item.product.name}</h2>
        <p className="text-gray-300 font-thin relative">
          <span className="bg-red-500 text-white rounded-full text-xs flex justify-center items-center font-bold absolute size-4 -top-7 -left-8">
            {item.quantity}
          </span>
          R$ {item.product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex-1">
        <CartItemQuantity cartItem={item} />
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
              src={item.product.image}
              alt={item.product.name}
              className="max-w-full max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
