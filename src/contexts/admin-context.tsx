"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useAdminTabs } from "@/hooks/use-admin-tabs";
import { useAdminProducts } from "@/hooks/use-admin-products";
import { useAdminCategories } from "@/hooks/use-admin-categories";
import { useAdminTestimonials } from "@/hooks/use-admin-testimonials";
import { useAdminSidebar } from "@/hooks/use-admin-sidebar";
import { AdminContextType } from "@/types/admin";



const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { tab, setTab, TABS } = useAdminTabs();
  const {
    products,
    showProductForm,
    setShowProductForm,
    productData,
    setProductData,
    editProductId,
    setEditProductId,
    imagePreview,
    setImagePreview,
    loading: loadingProducts,
    fetchProducts,
    handleProductSubmit,
    handleEditProduct,
    handleDeleteProduct,
    handleImageChange,
  } = useAdminProducts();
  const {
    categories,
    showCategoryForm,
    setShowCategoryForm,
    categoryName,
    setCategoryName,
    editCategoryId,
    setEditCategoryId,
    loading: loadingCategories,
    fetchCategories,
    handleCategorySubmit,
    handleEditCategory,
    handleDeleteCategory,
  } = useAdminCategories();
  const {
    testimonials,
    showTestimonialForm,
    setShowTestimonialForm,
    testimonialImages,
    setTestimonialImages,
    testimonialPreviews,
    setTestimonialPreviews,
    loading: loadingTestimonials,
    fetchTestimonials,
    handleTestimonialSubmit,
    handleDeleteTestimonial,
    handleTestimonialImageChange,
    handleTestimonialDrop,
  } = useAdminTestimonials();
  const { sidebarOpen, setSidebarOpen } = useAdminSidebar();

  const loading = loadingProducts || loadingCategories || loadingTestimonials;

  const value: AdminContextType = {
    // Tabs
    tab,
    setTab,
    TABS,
    
    // Products
    products,
    showProductForm,
    setShowProductForm,
    productData,
    setProductData,
    editProductId,
    setEditProductId,
    imagePreview,
    setImagePreview,
    loadingProducts,
    fetchProducts,
    handleProductSubmit,
    handleEditProduct,
    handleDeleteProduct,
    handleImageChange,
    
    // Categories
    categories,
    showCategoryForm,
    setShowCategoryForm,
    categoryName,
    setCategoryName,
    editCategoryId,
    setEditCategoryId,
    loadingCategories,
    fetchCategories,
    handleCategorySubmit,
    handleEditCategory,
    handleDeleteCategory,
    
    // Testimonials
    testimonials,
    showTestimonialForm,
    setShowTestimonialForm,
    testimonialImages,
    setTestimonialImages,
    testimonialPreviews,
    setTestimonialPreviews,
    loadingTestimonials,
    fetchTestimonials,
    handleTestimonialSubmit,
    handleDeleteTestimonial,
    handleTestimonialImageChange,
    handleTestimonialDrop,
    
    // Sidebar
    sidebarOpen,
    setSidebarOpen,
    
    // Loading geral
    loading,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}