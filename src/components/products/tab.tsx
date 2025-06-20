import { TabsList } from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/helpers/queryTabProducts";
import { ErrorHandler } from "@/helpers/errorHandlers";
import { ProductItem } from "./card-product-item";
import { TabContentProduct } from "./tab-content-product";

export const ProductsTab = async () => {
  return (
    <Tabs defaultValue="sushi">
      <TabsList className="flex gap-2">
        {tabs.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="dark:data-[state=active]:bg-[#10ae79] data-[state=active]:text-white data-[state=active]:bg-[#10ae79] dark:data-[state=inactive]:bg-slate-400 light:shadow-lg flex-1"
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((categoryTab: any) => (
        <TabsContent key={categoryTab.value} value={categoryTab.value}>
          <div
          
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
    </Tabs>
  );
};
