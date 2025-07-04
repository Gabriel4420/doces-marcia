import { LogOut, Menu, ShoppingCart, Folder, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useAdmin } from "@/contexts/admin-context";

export function SidebarAdmin() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { tab, setTab, TABS, sidebarOpen, setSidebarOpen } = useAdmin();

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 py-8 px-4 fixed left-0 top-0 z-40 shadow-lg">
        <div className="flex flex-col items-center mb-10">
          <img src="/images/logo.jpg" alt="Logo" className="w-32 h-32 rounded-full border-4 border-pink-200 shadow mb-2" />
          <h2 className="text-lg font-bold text-pink-600 text-center font-pacifico">Delicias da Márcia</h2>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-300 mt-1">usuário: {user?.name}</span>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {TABS.map((t) => (
            <button
              key={t}
              className={`flex items-center gap-3 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-base group
                ${tab === t ? 'bg-pink-600 text-white shadow' : 'bg-white dark:bg-gray-700 text-pink-600 dark:text-white border border-pink-100 dark:border-gray-700 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-700'}`}
              onClick={() => setTab(t)}
              type="button"
            >
              {t === "Produtos" && <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              {t === "Categorias" && <Folder className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              {t === "Depoimentos" && <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              <span>{t}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => { logout(); router.push("/login"); }}
          className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors border border-red-200 dark:border-red-700"
        >
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </aside>
      {/* Sidebar Mobile Drawer */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-full bg-white dark:bg-gray-800 border border-pink-200 dark:border-gray-700 shadow">
          <Menu className="w-6 h-6 text-pink-600" />
        </button>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <aside className="w-64 bg-white dark:bg-gray-800 h-full flex flex-col py-8 px-4 animate-zoom-in relative">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-2 right-2 p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-white"><span className="text-lg">×</span></button>
            <div className="flex flex-col items-center mb-10">
              <img src="/images/author-dona-marcia-delicias-da-marcia.jpg" alt="Logo" className="w-16 h-16 rounded-full border-4 border-pink-200 shadow mb-2" />
              <h2 className="text-lg font-bold text-pink-600 text-center font-pacifico">Doces da Márcia</h2>
              <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">{user?.name}</span>
            </div>
            <nav className="flex flex-col gap-2 flex-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  className={`flex items-center gap-3 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-base group
                    ${tab === t ? 'bg-pink-600 text-white shadow' : 'bg-white dark:bg-gray-700 text-pink-600 dark:text-white border border-pink-100 dark:border-gray-700 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-700'}`}
                  onClick={() => { setTab(t); setSidebarOpen(false); }}
                  type="button"
                >
                  {t === "Produtos" && <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  {t === "Categorias" && <Folder className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  {t === "Depoimentos" && <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  <span>{t}</span>
                </button>
              ))}
            </nav>
            <button
              onClick={() => { setSidebarOpen(false); logout(); router.push("/login"); }}
              className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors border border-red-200 dark:border-red-700"
            >
              <LogOut className="w-5 h-5" /> Sair
            </button>
          </aside>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </>
  );
} 