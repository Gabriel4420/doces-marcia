import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/admin-context";

export function TabSelectorAdmin() {
  const { tab, setTab, TABS } = useAdmin();

  return (
    <div className="flex gap-2 mb-6 md:hidden justify-center">
      {TABS.map((t) => (
        <Button
          key={t}
          className={tab === t ? "bg-pink-600 text-white" : "bg-white text-pink-600 border border-pink-600"}
          onClick={() => setTab(t)}
          type="button"
        >
          {t}
        </Button>
      ))}
    </div>
  );
} 