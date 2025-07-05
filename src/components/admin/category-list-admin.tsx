import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";

export function CategoryListAdmin() {
  const {
    categories,
    loading,
    setShowCategoryForm,
    handleEditCategory,
    handleDeleteCategory,
  } = useAdmin();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-xl font-semibold text-center">Categorias</h2>
        <Button 
          onClick={() => setShowCategoryForm(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
      </div>
      
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="space-y-2 w-full">
          {categories.map((c: any) => (
            <li key={c.id} className="bg-white dark:bg-gray-800 rounded p-3 flex justify-between items-center">
              <span>{c.name}</span>
              <div className="flex gap-2">
                <Button 
                  className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" 
                  onClick={() => handleEditCategory(c)}
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </Button>
                <Button 
                  className="border border-red-500 text-red-600 bg-white hover:bg-red-50" 
                  onClick={() => handleDeleteCategory(c.id)}
                >
                  <Trash className="w-4 h-4" />
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 