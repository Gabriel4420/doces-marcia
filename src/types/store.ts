import { Address, User } from "@/types/checkout";

export type States = {
  user: User;
  address: Address;
};

export type Actions = {
  setUser: (user: States["user"]) => void;
  setAddress: (address: States["address"]) => void;
}; 