"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/theme-toggle";
import { SidebarAdmin } from "@/components/admin/sidebar-admin";
import { TabSelectorAdmin } from "@/components/admin/tab-selector-admin";
import { ProductListAdmin } from "@/components/admin/product-list-admin";
import { CategoryListAdmin } from "@/components/admin/category-list-admin";
import { TestimonialListAdmin } from "@/components/admin/testimonial-list-admin";
import { ProductModal } from "@/components/admin/modals/product-modal";
import { CategoryModal } from "@/components/admin/modals/category-modal";
import { TestimonialModal } from "@/components/admin/modals/testimonial-modal";
import { DebugInfo } from "@/components/admin/debug-info";
import { AdminProvider, useAdmin } from "@/contexts/admin-context";

function AdminContent() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { tab, loading, fetchProducts, fetchCategories, fetchTestimonials } = useAdmin();

  // Redirecionamento se não estiver logado
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  // Buscar dados ao montar
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchTestimonials();
  }, [fetchProducts, fetchCategories, fetchTestimonials]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 animate-fade-in">
        <div className="w-full max-w-md space-y-4 animate-zoom-in">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 flex relative">
      <SidebarAdmin />
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-start md:ml-60 p-4 md:p-10 w-full min-h-screen">
        {/* Botão flutuante de tema */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <ModeToggle />
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <TabSelectorAdmin />
          {tab === "Produtos" && <ProductListAdmin />}
          {tab === "Categorias" && <CategoryListAdmin />}
          {tab === "Depoimentos" && <TestimonialListAdmin />}
          
          
        </div>
      </main>
      
      {/* Modais */}
      <ProductModal />
      <CategoryModal />
      <TestimonialModal />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
} 