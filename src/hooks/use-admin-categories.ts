import { useState, useCallback } from "react";

export function useAdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/categories");
    setCategories(await res.json());
    setLoading(false);
  }, []);

  // CRUD Categoria
  const handleCategorySubmit = async (e: any) => {
    e.preventDefault();
    if (!categoryName) return;
    if (editCategoryId) {
      await fetch("/api/categories", {
        method: "PUT",
        body: JSON.stringify({ id: editCategoryId, name: categoryName }),
      });
    } else {
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: categoryName }),
      });
    }
    setCategoryName("");
    setEditCategoryId(null);
    setShowCategoryForm(false);
    fetchCategories();
  };

  const handleEditCategory = (cat: any) => {
    setCategoryName(cat.name);
    setEditCategoryId(cat.id);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id: number) => {
    await fetch("/api/categories", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchCategories();
  };

  return {
    categories,
    setCategories,
    showCategoryForm,
    setShowCategoryForm,
    categoryName,
    setCategoryName,
    editCategoryId,
    setEditCategoryId,
    loading,
    fetchCategories,
    handleCategorySubmit,
    handleEditCategory,
    handleDeleteCategory,
  };
} 