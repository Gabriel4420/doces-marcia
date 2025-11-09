export interface AdminContextType {
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
  handleDeleteProduct: (id: number, imageUrl?: string) => void;
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
  testimonialImages: File[];
  setTestimonialImages: (files: File[]) => void;
  testimonialPreviews: string[];
  setTestimonialPreviews: (urls: string[]) => void;
  loadingTestimonials: boolean;
  fetchTestimonials: () => Promise<void>;
  handleTestimonialSubmit: (e: any) => void;
  handleDeleteTestimonial: (id: number, imageUrl?: string) => void;
  handleTestimonialImageChange: (e: any) => void;
  handleTestimonialDrop: (files: File[]) => void;
  
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Loading geral
  loading: boolean;
}