import { Address, CheckoutUser } from "@/types/checkout";
import { create } from "zustand";

type States = {
  user: CheckoutUser;
  address: Address;
};

type Actions = {
  setUser: (user: States["user"]) => void;
  setAddress: (address: States["address"]) => void;
};

const initialState: States = {
  user: {
    name: "",
    documentId: "",
    phone: "",
    email: "",
  },
  address: {
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    zipCode: "",
  },
};

export const useCheckoutStore = create<States & Actions>((set) => ({
  ...initialState,
  setUser: (user) => set((state) => ({ ...state, user })),
  setAddress: (address) => set((state) => ({ ...state, address })),
}));
