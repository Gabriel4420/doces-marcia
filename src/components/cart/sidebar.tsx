"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "./item";
import { useCartStore } from "@/store/cart-store";
import { useAuth } from "@/contexts/auth-context";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutDialog } from "@/components/checkout/dialog";

export const CartSidebar = () => {
  const { cart, clearCart } = useCartStore();
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const itemsWithQuantity = cart.filter(item => item.quantity > 0);
  const router = useRouter();
  const total = itemsWithQuantity.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!isLoggedIn) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Carrinho</span>
          </Button>
        </SheetTrigger>
        <SheetContent setIsOpen={setIsOpen} side="right" className="w-full max-w-[312px] md:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-lg md:text-xl">Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-sm md:text-base">
              Faça login para acessar o carrinho
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {itemsWithQuantity.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemsWithQuantity.length}
            </span>
          )}
          <span className="sr-only">Carrinho</span>
        </Button>
      </SheetTrigger>
      <SheetContent setIsOpen={setIsOpen} side="right" className="w-full max-w-[312px] md:max-w-md flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-lg md:text-xl flex items-center justify-between">
            Carrinho
            {itemsWithQuantity.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearCart}
                className="h-6 w-6"
                aria-label="Limpar carrinho"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {itemsWithQuantity.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-sm md:text-base">
                Seu carrinho está vazio
              </p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {itemsWithQuantity.map((item) => (
                <CartItem key={item.product.id} item={{ item: { product: item.product, quantity: item.quantity } }} />
              ))}
            </div>
          )}
        </div>

        {itemsWithQuantity.length > 0 && (
          <div className="flex-shrink-0 border-t pt-4 space-y-3 md:space-y-4">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-pink-500">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white text-sm md:text-base py-2 md:py-3" onClick={() => setCheckoutOpen(true)}>
              Finalizar Compra
            </Button>
          </div>
        )}
        <CheckoutDialog checkoutOpen={checkoutOpen} setCheckoutOpen={setCheckoutOpen} />
      </SheetContent>
    </Sheet>
  );
};
