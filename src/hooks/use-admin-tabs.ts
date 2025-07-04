import { useState } from "react";

export function useAdminTabs(defaultTab: string = "Produtos") {
  const TABS = ["Produtos", "Categorias", "Depoimentos"];
  const [tab, setTab] = useState<string>(defaultTab);
  return { tab, setTab, TABS };
} 