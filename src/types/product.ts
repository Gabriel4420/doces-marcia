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
