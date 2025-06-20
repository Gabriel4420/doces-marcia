import { Product } from "./product";

export type Cart = {

  product: Product;
  quantity: number;
};

export type CartItem = {
  item: Cart;
};


