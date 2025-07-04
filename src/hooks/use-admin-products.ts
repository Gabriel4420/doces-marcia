import { useState, useCallback } from "react";

export function useAdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productData, setProductData] = useState<any>({ name: "", category: "", image: "", imageFile: null });
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    setProducts(await res.json());
    setLoading(false);
  }, []);

  // CRUD Produto
  const handleProductSubmit = async (e: any) => {
    e.preventDefault();
    if (!productData.name || !productData.category) return;
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    if (productData.imageFile) {
      formData.append("image", productData.imageFile);
    } else if (productData.image) {
      formData.append("imageUrl", productData.image);
    }
    if (editProductId) {
      formData.append("id", String(editProductId));
      await fetch("/api/products", {
        method: "PUT",
        body: formData,
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
    }
    setProductData({ name: "", category: "", image: "", imageFile: null });
    setEditProductId(null);
    setShowProductForm(false);
    setImagePreview(null);
    fetchProducts();
  };

  const handleEditProduct = (prod: any) => {
    setProductData({ name: prod.name, category: prod.category, image: prod.image || "", imageFile: null });
    setEditProductId(prod.id);
    setShowProductForm(true);
    setImagePreview(prod.image || null);
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev: any) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return {
    products,
    setProducts,
    showProductForm,
    setShowProductForm,
    productData,
    setProductData,
    editProductId,
    setEditProductId,
    imagePreview,
    setImagePreview,
    loading,
    fetchProducts,
    handleProductSubmit,
    handleEditProduct,
    handleDeleteProduct,
    handleImageChange,
  };
} 