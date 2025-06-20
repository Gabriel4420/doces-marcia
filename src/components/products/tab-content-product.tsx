"use client";
import { TabsContent } from "@radix-ui/react-tabs";
import { ProductItem } from "./card-product-item";
import { ErrorHandler } from "@/helpers/errorHandlers";

export const TabContentProduct = ({ tabs }: any) => {
  return (
    <>
      {tabs.map((categoryTab: any) => (
        <TabsContent key={categoryTab.value} value={categoryTab.value}>
          <div
            key={categoryTab.value}
            className="grid gap-5 grid-cols-2 cel:grid-cols-1 cel2:grid-cols-2 md:grid-cols-4 mt-10"
          >
            {categoryTab.products.length > 0 &&
              categoryTab.products.map((val: any) => (
                <ProductItem key={val.value} item={val} />
              ))}
          </div>
          {categoryTab.products.length === 0 && (
            <div className="flex flex-col items-center justify-center ">
              <ErrorHandler
                products={categoryTab.products}
                title={categoryTab.title}
                value={categoryTab.value}
              />
            </div>
          )}
        </TabsContent>
      ))}
    </>
  );
};
