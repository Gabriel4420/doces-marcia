export type Product = {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
};

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
  id: number,
  category: string,
  image: string,
  name: string,
  price: number

}
