"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTabs } from "@/helpers/queryTabProducts";
import { ErrorHandler } from "@/helpers/errorHandlers";
import { ProductItem } from "./card-product-item";
import { useEffect, useState } from "react";
import { Tabs as TabsType } from "@/types/product";

export const ProductsTab = () => {
  const [tabs, setTabs] = useState<TabsType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTabs().then((data) => {
      setTabs(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="w-full max-w-6xl mx-auto px-4 py-10 text-center">Carregando produtos...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-1 xs:px-2 sm:px-4">
      <Tabs defaultValue="sushi" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 px-2 md:gap-4 mb-6 md:mb-8">
          {tabs.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="text-xs shadow-md md:text-sm lg:text-base font-medium px-2 md:px-4 py-2 md:py-3 dark:data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:bg-pink-500 dark:data-[state=inactive]:bg-slate-600"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map((categoryTab) => (
          <TabsContent key={categoryTab.value} value={categoryTab.value} className="mt-24 md:mt-0">
            <div className="grid gap-3 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categoryTab.products.length > 0 &&
                categoryTab.products.map((val, index) => (
                  <ProductItem key={index} item={val} />
                ))}
            </div>
            {categoryTab.products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 md:py-12">
                <ErrorHandler
                  products={categoryTab.products}
                  title={categoryTab.title}
                  value={categoryTab.value}
                />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
