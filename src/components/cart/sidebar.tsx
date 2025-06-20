"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { RocketIcon } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { CartProductItem } from "./item";
import { CheckoutDialog } from "@/components/checkout/dialog";

export const CartSidebar = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { cart } = useCartStore((state) => state);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.quantity * item.product.price;
  });
  return (
    <Sheet>
      <SheetTrigger
        className={`relative flex items-center gap-x-2 border-[#757c84] ${
          isHovered || (isOpen && "border-green-500")
        } hover:border-green-500 border rounded-md p-2`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cart"
        aria-describedby="cart-button"
      >
        <RocketIcon className="mr-2 h-4 w-4" />
        <p>Carrinho</p>
        {cart.length > 0 && (
          <div
            className={`absolute size-4 ${
              isHovered ? "bg-green-800" : "bg-red-500"
            } text-white rounded-full -right-2 -top-1 `}
          >
            <p className="text-xs flex justify-center items-center">
              {cart.map((item) => item.quantity).reduce((a, b) => a + b, 0)}
            </p>
          </div>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm"
        setIsOpen={setIsOpen}
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            Carrinho de compras
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-y-4">
          {cart.map((item) => {
            return <CartProductItem key={item.product.id} item={item} />;
          })}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center text-xs">
          <div>Subtotal:</div>
          <div className="font-semibold">R$ {subtotal.toFixed(2)}</div>
        </div>
        <Separator className="my-4" />
        <div className="text-center">
          <button
            onClick={() => setCheckoutOpen(true)}
            disabled={cart.length == 0}
            className="bg-slate-800 hover:bg-green-500 capitalize hover:transition-colors flex items-center justify-center  text-xs text-white rounded-md px-4 py-2 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            <RocketIcon className="mr-2 h-4 w-4" />
            Finalizar compra
          </button>
        </div>

        {checkoutOpen && <CheckoutDialog checkoutOpen={checkoutOpen} setCheckoutOpen={setCheckoutOpen} />}
      </SheetContent>
    </Sheet>
  );
};
