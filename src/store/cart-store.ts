import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface States {
  cart: CartItem[];
}

type Actions = {
  upsertCartItem: (product: Product, quantity: number) => void;
  removeCartItem: (productId: number) => void;
  clearCart: () => void;
};

const initialState: States = {
  cart: [],
};

// Função para verificar se o usuário está logado usando o contexto
const checkAuthStatus = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
};

// Função para limpar itens com quantidade zero ou menor
const cleanCart = (cart: CartItem[]): CartItem[] => {
  return cart.filter((item) => item.quantity > 0);
};

export const useCartStore = create<States & Actions>((set, get) => ({
  ...initialState,
  upsertCartItem: (product, quantity) => {
    if (!checkAuthStatus()) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      window.location.href = "/login";
      return;
    }
    set((state) => {
      let newCart = state.cart;

      let productIndex = newCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (productIndex >= 0) {
        newCart[productIndex].quantity += quantity;
      } else {
        newCart.push({ product, quantity });
      }

      // Limpar itens com quantidade zero ou menor
      newCart = cleanCart(newCart);

      return { ...state, cart: newCart };
    });
  },
  removeCartItem: (productId: number) => {
    if (!checkAuthStatus()) {
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
    if (!checkAuthStatus()) {
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
