import { getAllProducts } from "@/services/product";
import { Tabs } from "@/types/tabs";

export async function getTabs(): Promise<Tabs> {
  const products = await getAllProducts();
  return [
    {
      title: "Sushi",
      value: "sushi",
      products: products.filter((x) => x.category === "sushi"),
    },
    {
      title: "Temaki",
      value: "temaki",
      products: products.filter((x) => x.category === "temaki"),
    },
    {
      title: "Combinados",
      value: "pack",
      products: products.filter((x) => x.category === "pack"),
    },
    {
      title: "Bebidas",
      value: "beverage",
      products: products.filter((x) => x.category === "beverage"),
    },
  ];
}


