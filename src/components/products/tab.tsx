"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorHandler } from "@/helpers/errorHandlers";
import { ProductItem } from "./card-product-item";
import { useEffect, useState } from "react";

export const ProductsTab = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products"),
      ]);
      const categoriesData = await catRes.json();
      const productsData = await prodRes.json();
      setCategories(categoriesData);
      setProducts(productsData);
      setSelectedTab(categoriesData[0]?.name || "");
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="w-full max-w-6xl mx-auto px-1 xs:px-2 sm:px-4 py-10 text-center">Carregando produtos...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-1 xs:px-2 sm:px-4">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 px-2 md:gap-4 mb-6 md:mb-8">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.name}
              value={cat.name}
              className="text-xs shadow-md md:text-sm lg:text-base font-medium px-2 md:px-4 py-2 md:py-3 dark:data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:bg-pink-500 dark:data-[state=inactive]:bg-slate-600"
            >
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((cat) => (
          <TabsContent key={cat.name} value={cat.name} className="mt-24 md:mt-0">
            <div className="grid gap-3 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.filter((p) => p.category === cat.name).length > 0 ? (
                products
                  .filter((p) => p.category === cat.name)
                  .map((val, index) => <ProductItem key={val.id || index} item={val} />)
              ) : (
                <div className="flex flex-col items-center justify-center py-8 md:py-12">
                  <ErrorHandler products={[]} title={cat.name} value={cat.name} />
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
