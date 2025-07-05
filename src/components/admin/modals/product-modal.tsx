import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";

export function ProductModal() {
  const {
    showProductForm,
    setShowProductForm,
    productData,
    setProductData,
    editProductId,
    setEditProductId,
    imagePreview,
    setImagePreview,
    categories,
    handleProductSubmit,
    handleImageChange,
  } = useAdmin();

  const handleClose = () => {
    setShowProductForm(false);
    setEditProductId(null);
    setProductData({ name: "", category: "", image: "", imageFile: null });
    setImagePreview(null);
  };

  if (!showProductForm) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editProductId ? "Editar Produto" : "Cadastrar Produto"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleProductSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome do Produto
            </label>
            <Input
              placeholder="Digite o nome do produto"
              value={productData.name}
              onChange={e => setProductData({ ...productData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoria
            </label>
            <select
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={productData.category}
              onChange={e => setProductData({ ...productData, category: e.target.value })}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Imagem do Produto
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="product-image"
              />
              <label
                htmlFor="product-image"
                className="cursor-pointer text-pink-600 hover:text-pink-700 font-medium"
              >
                Clique para selecionar uma imagem
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                PNG, JPG, JPEG até 5MB
              </p>
            </div>
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
            >
              {editProductId ? "Atualizar" : "Cadastrar"}
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