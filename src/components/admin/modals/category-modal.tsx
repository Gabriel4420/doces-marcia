import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";

export function CategoryModal() {
  const {
    showCategoryForm,
    setShowCategoryForm,
    categoryName,
    setCategoryName,
    editCategoryId,
    setEditCategoryId,
    handleCategorySubmit,
  } = useAdmin();

  const handleClose = () => {
    setShowCategoryForm(false);
    setEditCategoryId(null);
    setCategoryName("");
  };

  if (!showCategoryForm) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editCategoryId ? "Editar Categoria" : "Cadastrar Categoria"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome da Categoria
            </label>
            <Input
              placeholder="Digite o nome da categoria"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
            >
              {editCategoryId ? "Atualizar" : "Cadastrar"}
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 