"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useAdminTabs } from "@/hooks/use-admin-tabs";
import { useAdminProducts } from "@/hooks/use-admin-products";
import { useAdminCategories } from "@/hooks/use-admin-categories";
import { useAdminTestimonials } from "@/hooks/use-admin-testimonials";
import { useAdminSidebar } from "@/hooks/use-admin-sidebar";

interface AdminContextType {
  // Tabs
  tab: string;
  setTab: (tab: string) => void;
  TABS: string[];
  
  // Products
  products: any[];
  showProductForm: boolean;
  setShowProductForm: (show: boolean) => void;
  productData: any;
  setProductData: (data: any) => void;
  editProductId: number | null;
  setEditProductId: (id: number | null) => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  loadingProducts: boolean;
  fetchProducts: () => Promise<void>;
  handleProductSubmit: (e: any) => void;
  handleEditProduct: (prod: any) => void;
  handleDeleteProduct: (id: number) => void;
  handleImageChange: (e: any) => void;
  
  // Categories
  categories: any[];
  showCategoryForm: boolean;
  setShowCategoryForm: (show: boolean) => void;
  categoryName: string;
  setCategoryName: (name: string) => void;
  editCategoryId: number | null;
  setEditCategoryId: (id: number | null) => void;
  loadingCategories: boolean;
  fetchCategories: () => Promise<void>;
  handleCategorySubmit: (e: any) => void;
  handleEditCategory: (cat: any) => void;
  handleDeleteCategory: (id: number) => void;
  
  // Testimonials
  testimonials: any[];
  showTestimonialForm: boolean;
  setShowTestimonialForm: (show: boolean) => void;
  testimonialImage: File | null;
  setTestimonialImage: (file: File | null) => void;
  testimonialPreview: string | null;
  setTestimonialPreview: (url: string | null) => void;
  loadingTestimonials: boolean;
  fetchTestimonials: () => Promise<void>;
  handleTestimonialSubmit: (e: any) => void;
  handleDeleteTestimonial: (id: number) => void;
  handleTestimonialImageChange: (e: any) => void;
  
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Loading geral
  loading: boolean;
}

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
    testimonialImage,
    setTestimonialImage,
    testimonialPreview,
    setTestimonialPreview,
    loading: loadingTestimonials,
    fetchTestimonials,
    handleTestimonialSubmit,
    handleDeleteTestimonial,
    handleTestimonialImageChange,
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
    testimonialImage,
    setTestimonialImage,
    testimonialPreview,
    setTestimonialPreview,
    loadingTestimonials,
    fetchTestimonials,
    handleTestimonialSubmit,
    handleDeleteTestimonial,
    handleTestimonialImageChange,
    
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