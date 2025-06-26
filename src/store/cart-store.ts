import { Cart } from "@/types/cart";
import { Product } from "@/types/product";
import { create } from "zustand";

type States = {
  cart: Cart[];
};

type Actions = {
  upsertCartItem: (product: Product, quantity: number) => void;
  removeCartItem: (productId: string) => void;
  clearCart: () => void;
};

const initialState: States = {
  cart: [],
};

function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
}

export const useCartStore = create<States & Actions>((set, get) => ({
  ...initialState,
  upsertCartItem: (product, quantity) => {
    if (!isLoggedIn()) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      window.location.href = "/login";
      return;
    }
    set((state) => {
      let newCart = state.cart;

      let productIndex = newCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (productIndex < 0) {
        newCart.push({ product, quantity: 0 });
        productIndex = newCart.findIndex(
          (item) => item.product.id === product.id
        );
      }

      newCart[productIndex].quantity += quantity;

      if (newCart[productIndex].quantity <= 0) {
        newCart = newCart.filter((item) => item.product.id !== product.id);
      }

      return { ...state, cart: newCart };
    });
  },
  removeCartItem: (productId) => {
    if (!isLoggedIn()) {
      alert("Você precisa estar logado para remover itens do carrinho.");
      window.location.href = "/login";
      return;
    }
    set((state) => {
      let newCart = state.cart;

      let productIndex = newCart.findIndex(
        (item) => item.product.id === productId
      );

      if (productIndex >= 0) {
        newCart = newCart.filter((item) => item.product.id !== productId);
      }

      return { ...state, cart: newCart };
    });
  },
  clearCart: () => {
    if (!isLoggedIn()) {
      alert("Você precisa estar logado para limpar o carrinho.");
      window.location.href = "/login";
      return;
    }
    set((state) => {
      let newCart = state.cart;

      newCart = [];

      return { ...state, cart: newCart };
    });
  },
}));
