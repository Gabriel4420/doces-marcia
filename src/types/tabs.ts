import { Product } from "./product";

export interface Category {
  id: string;
  name: string;
}

export type Tabs = Array<{
  title: string;
  value: string;
  products: Product[];
}>;

export type Tab = {
  title: string;
  value: string;
  products: Product[];
};

export type CardProductProperties = {
  item: Product;
};

export interface CategoryTabProducts {
  id: string;
  category: string;
  image: string;
  name: string;
  price: number;
} 