import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Image as ImageIcon, Trash } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";
import { useRef, useState } from "react";

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
    loading,
  } = useAdmin();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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

            {/* Dropzone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                setUploadError(null);
                const files = Array.from(e.dataTransfer.files || []);
                if (files.length !== 1) {
                  setUploadError("Selecione apenas um arquivo.");
                  return;
                }
                const file = files[0];
                const allowed = ["image/jpeg", "image/png", "image/gif"];
                if (!allowed.includes(file.type)) {
                  setUploadError("Formato inválido. Use JPG, PNG ou GIF.");
                  return;
                }
                if (file.size > 5 * 1024 * 1024) {
                  setUploadError("Arquivo muito grande. Máximo de 5MB.");
                  return;
                }
                setProductData({ ...productData, imageFile: file });
                setImagePreview(URL.createObjectURL(file));
              }}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Área para selecionar ou soltar imagem do produto"
              className={`rounded-lg p-4 text-center border-2 border-dashed transition-colors ${
                isDragging
                  ? "border-pink-600 bg-pink-50 dark:bg-pink-900/30"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => {
                  setUploadError(null);
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const allowed = ["image/jpeg", "image/png", "image/gif"];
                  if (!allowed.includes(file.type)) {
                    setUploadError("Formato inválido. Use JPG, PNG ou GIF.");
                    e.currentTarget.value = "";
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    setUploadError("Arquivo muito grande. Máximo de 5MB.");
                    e.currentTarget.value = "";
                    return;
                  }
                  // Reuse existing handler to keep behavior consistent
                  handleImageChange(e);
                }}
                className="hidden"
                id="product-image"
              />

              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-6 w-6 text-pink-600" />
                <span className="cursor-pointer text-pink-600 hover:text-pink-700 font-medium">
                  Clique para selecionar uma imagem
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF até 5MB — ou arraste e solte aqui
                </span>
              </div>
            </div>

            {/* Error message */}
            <div aria-live="polite" className="mt-2 text-xs">
              {uploadError && (
                <p className="text-red-600 dark:text-red-400">{uploadError}</p>
              )}
            </div>

            {/* Preview + Remove */}
            {imagePreview && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={imagePreview}
                  alt="Pré-visualização da imagem do produto"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => {
                    setProductData({ ...productData, imageFile: null, image: "" });
                    setImagePreview(null);
                    setUploadError(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                >
                  <Trash className="w-4 h-4 mr-2" /> Remover imagem
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
              disabled={loading}
            >
              {loading ? "Enviando..." : editProductId ? "Atualizar" : "Cadastrar"}
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